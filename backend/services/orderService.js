const jwt = require('jsonwebtoken');
const { withTransaction } = require('../config/db');
const env = require('../config/env');
const ordersRepo = require('../db/ordersRepo');
const orderItemsRepo = require('../db/orderItemsRepo');
const packsRepo = require('../db/packsRepo');
const customersRepo = require('../db/customersRepo');
const packService = require('./packService');
const customPackService = require('./customPackService');
const couponService = require('./couponService');
const notificationService = require('./notificationService');
const whatsappService = require('./whatsappService');
const emailService = require('./emailService');
const settingsRepo = require('../db/settingsRepo');
const AppError = require('../utils/AppError');
const { requireString, requireMoroccanPhone, toInt } = require('../utils/validators');

const VALID_STATUSES = ['pending', 'confirmed', 'preparing', 'shipping', 'delivered', 'cancelled'];

/** Resolves one submitted cart line into a priced, snapshot-ready item. */
async function resolveLine(line) {
  const quantity = line.quantity ? toInt(line.quantity, 'quantity', { min: 1, max: 20 }) : 1;

  if (line.item_type === 'ready_pack') {
    const pack = await packService.getPack(toInt(line.pack_id, 'pack_id'));
    if (!pack.is_active) throw new AppError(`Pack "${pack.title}" is no longer available`, 400);
    return {
      item_type: 'ready_pack',
      source_pack_id: pack.id,
      item_name_snapshot: pack.title,
      item_image_snapshot: pack.cover_image,
      unit_price: Number(pack.price),
      quantity,
      perfumes: pack.perfumes.map((p) => ({
        perfume_id: p.perfume_id,
        perfume_name_snapshot: p.name,
        perfume_image_snapshot: p.image_url,
      })),
    };
  }

  if (line.item_type === 'ready_pack_customized') {
    const packId = toInt(line.pack_id, 'pack_id');
    const pack = await packsRepo.findById(packId);
    if (!pack) throw new AppError('Pack not found', 404);
    if (!pack.is_active) throw new AppError(`Pack "${pack.title}" is no longer available`, 400);
    if (!Array.isArray(line.replacements) || !line.replacements.length) {
      throw new AppError('Customized pack requires at least one replacement', 400);
    }
    const perfumes = await packService.resolveCustomizedSelection(packId, line.replacements);
    return {
      item_type: 'ready_pack_customized',
      source_pack_id: pack.id,
      item_name_snapshot: `${pack.title} (personnalisé)`,
      item_image_snapshot: pack.cover_image,
      unit_price: Number(pack.price),
      quantity,
      perfumes: perfumes.map((p) => ({
        perfume_id: p.id,
        perfume_name_snapshot: p.name,
        perfume_image_snapshot: p.image_url,
      })),
    };
  }

  if (line.item_type === 'custom_pack') {
    const perfumeIds = Array.isArray(line.perfume_ids) ? line.perfume_ids.map((id) => toInt(id, 'perfume_id')) : [];
    const { perfumes, price } = await customPackService.buildCustomPack(perfumeIds);
    const settings = await customPackService.getSettings();
    return {
      item_type: 'custom_pack',
      source_pack_id: null,
      item_name_snapshot: settings.title || 'Pack personnalisé',
      item_image_snapshot: null,
      unit_price: price,
      quantity,
      perfumes: perfumes.map((p) => ({
        perfume_id: p.id,
        perfume_name_snapshot: p.name,
        perfume_image_snapshot: p.image_url,
      })),
    };
  }

  throw new AppError(`Unsupported item_type: ${line.item_type}`, 400);
}

async function computeShipping(subtotal) {
  const settings = await settingsRepo.findPublic();
  const map = Object.fromEntries(settings.map((s) => [s.setting_key, s.setting_value]));
  const flatRate = Number(map.shipping_flat_rate || 0);
  const freeThreshold = map.free_shipping_threshold ? Number(map.free_shipping_threshold) : null;
  if (freeThreshold !== null && subtotal >= freeThreshold) return 0;
  return flatRate;
}

async function createOrder(payload) {
  const customerInput = payload.customer || {};
  const name = requireString(customerInput.name, 'Customer name', { maxLength: 255 });
  const phone = requireMoroccanPhone(customerInput.phone);
  const address = requireString(customerInput.address, 'Address', { maxLength: 2000 });
  const city = customerInput.city ? requireString(customerInput.city, 'City', { maxLength: 100 }) : null;
  const email = customerInput.email ? requireString(customerInput.email, 'Email', { maxLength: 255 }) : null;

  if (!Array.isArray(payload.items) || !payload.items.length) {
    throw new AppError('Order must contain at least one item', 400);
  }
  if (payload.items.length > 20) {
    throw new AppError('Too many items in one order', 400);
  }

  const resolvedItems = [];
  for (const line of payload.items) {
    // eslint-disable-next-line no-await-in-loop
    resolvedItems.push(await resolveLine(line));
  }

  const subtotal = resolvedItems.reduce((sum, it) => sum + it.unit_price * it.quantity, 0);
  const shipping = await computeShipping(subtotal);

  let coupon = null;
  let discount = 0;
  if (payload.coupon_code) {
    const result = await couponService.previewCoupon(payload.coupon_code, subtotal);
    coupon = result.coupon;
    discount = result.discount;
  }

  const total = Math.max(0, subtotal + shipping - discount);

  return withTransaction(async (conn) => {
    if (coupon) {
      await couponService.reserveCoupon(coupon.id, conn);
    }

    const orderId = await ordersRepo.create(
      {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        customer_address: address,
        customer_city: city,
        subtotal_amount: subtotal,
        shipping_amount: shipping,
        discount_amount: discount,
        coupon_id: coupon ? coupon.id : null,
        coupon_code_snapshot: coupon ? coupon.code : null,
        total_amount: total,
        payment_method: 'cod',
        status: 'pending',
      },
      conn
    );

    await ordersRepo.setOrderNumber(orderId, `NHD-${String(orderId).padStart(6, '0')}`, conn);

    for (const item of resolvedItems) {
      // eslint-disable-next-line no-await-in-loop
      const orderItemId = await orderItemsRepo.create(
        {
          order_id: orderId,
          item_type: item.item_type,
          source_pack_id: item.source_pack_id,
          item_name_snapshot: item.item_name_snapshot,
          item_image_snapshot: item.item_image_snapshot,
          unit_price: item.unit_price,
          quantity: item.quantity,
        },
        conn
      );
      // eslint-disable-next-line no-await-in-loop
      await orderItemsRepo.addPerfumeSnapshots(orderItemId, item.perfumes, conn);
    }

    const customer = await customersRepo.upsertForOrder(
      { name, email, phone, deviceToken: customerInput.deviceToken, orderTotal: total, orderId },
      conn
    );
    await conn.query('UPDATE orders SET customer_id = ? WHERE id = ?', [customer.id, orderId]);

    return ordersRepo.findById(orderId, conn);
  }).then((order) => {
    // Fire-and-forget: the order is already committed at this point, and
    // none of notifyAdmins/WhatsApp/email affects what the customer needs
    // back. Previously these were awaited in sequence before responding,
    // adding the combined latency of a DB write + 3 outbound API calls to
    // every checkout's response time for zero benefit to the customer.
    notifyOrderCreated(order).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('[orderService] post-order notification failed', err.message);
    });
    // Short-lived token scoping the Thank You page's one-click upsell to
    // exactly this order — nothing else lets a client mutate an order total.
    const upsellToken = jwt.sign({ orderId: order.id, purpose: 'upsell' }, env.jwtSecret, { expiresIn: '30m' });
    // resolvedItems is already in memory from earlier in this function --
    // reusing it here means the Thank You page can show "which pack did I
    // just order" without a second request (GET /api/orders/:id is
    // admin-only, and adding a public one just for this would be exactly
    // the kind of unnecessary extra API call this order flow avoids
    // elsewhere).
    const items = resolvedItems.map((item) => ({
      title: item.item_name_snapshot,
      price: item.unit_price,
      quantity: item.quantity,
    }));
    return { ...order, upsell_token: upsellToken, items };
  });
}

/** Runs every post-order notification channel concurrently — one channel
 *  failing (e.g. email misconfigured) must not stop the others from sending. */
async function notifyOrderCreated(order) {
  const items = await orderItemsRepo.findByOrderId(order.id);
  const orderWithItems = { ...order, items };
  await Promise.allSettled([
    notificationService.notifyAdmins({
      type: 'new_order',
      title: `Nouvelle commande ${order.order_number}`,
      body: `${order.customer_name} — ${order.total_amount} MAD`,
      link: `/admin/orders/${order.id}`,
      relatedId: order.id,
    }),
    whatsappService.sendAdminOrderAlert(orderWithItems),
    emailService.sendAdminOrderNotification(orderWithItems),
    emailService.sendOrderConfirmation(orderWithItems),
  ]);
}

/** Verifies the Thank You page's upsell token scopes to this exact order. */
function verifyUpsellToken(token, orderId) {
  let payload;
  try {
    payload = jwt.verify(token, env.jwtSecret);
  } catch {
    throw new AppError('This upsell offer has expired.', 401);
  }
  if (payload.purpose !== 'upsell' || payload.orderId !== orderId) {
    throw new AppError('Invalid upsell token for this order.', 401);
  }
}

/** Runs the WhatsApp admin alert for an accepted post-purchase upsell —
 * mirrors notifyOrderCreated's fire-and-forget pattern: the upsell is
 * already committed to the DB by the time this runs, so a WhatsApp/network
 * failure here must never surface as an error to the customer. */
async function notifyUpsellApplied(order, upsellItem) {
  await whatsappService.sendAdminUpsellAlert(order, upsellItem).catch((err) => {
    // eslint-disable-next-line no-console
    console.error('[orderService] upsell notification failed', err.message);
  });
}

/** Applies a post-purchase upsell pack to an existing order — never creates
 * a new order, just appends one more ready_pack line item to the SAME
 * order and recomputes its total (so "which order does this belong to" is
 * trivially the order_id already on the row, no separate relation needed).
 * A customer can accept more than one upsell pack (each one is validated
 * against the currently active offers and priced server-side); accepting
 * the SAME pack twice is rejected, but different packs are not. */
async function applyUpsell(orderId, token, packId) {
  verifyUpsellToken(token, orderId);

  const order = await ordersRepo.findById(orderId);
  if (!order) throw new AppError('Order not found', 404);

  const offers = await packService.getUpsellOffers();
  const offerPack = offers.find((p) => p.id === packId);
  if (!offerPack) throw new AppError('This upsell offer is no longer available.', 404);

  const existingItems = await orderItemsRepo.findByOrderId(orderId);
  if (existingItems.some((item) => item.source_pack_id === packId)) {
    throw new AppError('This pack has already been added to your order.', 409);
  }

  const upsellPrice = offerPack.upsell_price !== null ? Number(offerPack.upsell_price) : Number(offerPack.price);

  const { updatedOrder, upsellItem } = await withTransaction(async (conn) => {
    const orderItemId = await orderItemsRepo.create(
      {
        order_id: orderId,
        item_type: 'ready_pack',
        source_pack_id: offerPack.id,
        item_name_snapshot: `${offerPack.title} (offre spéciale)`,
        item_image_snapshot: offerPack.cover_image,
        unit_price: upsellPrice,
        quantity: 1,
      },
      conn
    );
    await orderItemsRepo.addPerfumeSnapshots(
      orderItemId,
      offerPack.perfumes.map((p) => ({
        perfume_id: p.perfume_id,
        perfume_name_snapshot: p.name,
        perfume_image_snapshot: p.image_url,
      })),
      conn
    );

    const newTotal = Number(order.total_amount) + upsellPrice;
    await conn.query(
      'UPDATE orders SET total_amount = ?, subtotal_amount = subtotal_amount + ?, upsell_applied_at = NOW() WHERE id = ?',
      [newTotal, upsellPrice, orderId]
    );

    return {
      updatedOrder: await ordersRepo.findById(orderId, conn),
      upsellItem: { pack_title: offerPack.title, unit_price: upsellPrice },
    };
  });

  notifyUpsellApplied(updatedOrder, upsellItem).catch(() => {});
  return updatedOrder;
}

async function listOrders(filters) {
  const { rows, total } = await ordersRepo.findAll(filters);
  const itemsByOrderId = await orderItemsRepo.findByOrderIds(rows.map((o) => o.id));
  const withItems = rows.map((order) => ({ ...order, items: itemsByOrderId.get(order.id) || [] }));
  return { rows: withItems, total };
}

async function getOrder(id) {
  const order = await ordersRepo.findById(id);
  if (!order) throw new AppError('Order not found', 404);
  const items = await orderItemsRepo.findByOrderId(id);
  return { ...order, items };
}

async function trackOrder(orderNumber, phone) {
  const order = await ordersRepo.findByOrderNumberAndPhone(orderNumber, phone);
  if (!order) throw new AppError('Order not found — check your order number and phone number', 404);
  const items = await orderItemsRepo.findByOrderId(order.id);
  return { ...order, items };
}

async function updateStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new AppError(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`, 400);
  }
  const order = await ordersRepo.updateStatus(id, status);
  if (!order) throw new AppError('Order not found', 404);

  if (['shipping', 'delivered', 'cancelled'].includes(status)) {
    emailService.sendShippingUpdate(order).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('[orderService] shipping update email failed', err.message);
    });
  }

  return order;
}

async function updateNotes(id, notes) {
  const order = await ordersRepo.updateNotes(id, notes);
  if (!order) throw new AppError('Order not found', 404);
  return order;
}

async function getStats() {
  const [orderStats, topPerfumes] = await Promise.all([
    ordersRepo.getStats(),
    orderItemsRepo.findTopPerfumes(10),
  ]);
  return { ...orderStats, topPerfumes };
}

module.exports = {
  createOrder,
  listOrders,
  getOrder,
  trackOrder,
  updateStatus,
  updateNotes,
  getStats,
  applyUpsell,
  VALID_STATUSES,
};
