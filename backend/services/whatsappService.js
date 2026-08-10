const axios = require('axios');
const env = require('../config/env');
const ordersRepo = require('../db/ordersRepo');

const PAYMENT_LABEL = { cod: 'Paiement à la livraison' };

function formatOrderMessage(order) {
  const lines = [
    `🛍️ *Nouvelle commande ${order.order_number}*`,
    '',
    `👤 Client: ${order.customer_name}`,
    `📞 Téléphone: ${order.customer_phone}`,
    order.customer_city ? `🏙️ Ville: ${order.customer_city}` : null,
    `📍 Adresse: ${order.customer_address}`,
    '',
    '📦 Contenu:',
    ...order.items.map((item) => {
      const perfumeList = (item.perfumes || []).map((p) => `   • ${p.perfume_name_snapshot}`).join('\n');
      return `- ${item.item_name_snapshot} × ${item.quantity} (${Math.round(item.unit_price * item.quantity)} MAD)${perfumeList ? `\n${perfumeList}` : ''}`;
    }),
    '',
    `💰 Total: ${Math.round(order.total_amount)} MAD`,
    `💳 Paiement: ${PAYMENT_LABEL[order.payment_method] || order.payment_method}`,
    `🕐 ${new Date(order.created_at).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}`,
  ].filter(Boolean);

  return lines.join('\n');
}

function formatUpsellMessage(order, upsellItem) {
  const lines = [
    '🎁 *UPSELL — NOUVELLE COMMANDE ADDITIONNELLE*',
    '',
    `Commande originale: ${order.order_number}`,
    '',
    'Client:',
    order.customer_name,
    '',
    'Pack ajouté:',
    upsellItem.pack_title,
    '',
    'Prix promotionnel:',
    `${Math.round(upsellItem.unit_price)} DH`,
    '',
    'Livraison:',
    'Gratuite',
    '',
    'Total supplémentaire:',
    `${Math.round(upsellItem.unit_price)} DH`,
  ];

  return lines.join('\n');
}

/** Shared UltraMsg dispatch — used by both the order-creation alert and the
 * upsell alert. Returns {sent:false, reason:'not_configured'} rather than
 * throwing when credentials aren't set, so callers can fire-and-forget this
 * without special-casing "WhatsApp isn't set up yet". */
async function sendToAdmins(body) {
  if (!env.ultramsg.instanceId || !env.ultramsg.token || !env.ultramsg.adminNumbers.length) {
    return { sent: false, reason: 'not_configured' };
  }

  const url = `https://api.ultramsg.com/${env.ultramsg.instanceId}/messages/chat`;
  const results = await Promise.allSettled(
    env.ultramsg.adminNumbers.map((to) =>
      axios.post(
        url,
        new URLSearchParams({ token: env.ultramsg.token, to, body, priority: '1' }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 10000 }
      )
    )
  );

  const anySucceeded = results.some((r) => r.status === 'fulfilled');
  const failures = results.filter((r) => r.status === 'rejected');
  return { sent: anySucceeded, total: results.length, failed: failures.length };
}

async function sendAdminOrderAlert(order) {
  const result = await sendToAdmins(formatOrderMessage(order));
  if (result.sent) await ordersRepo.markWhatsappNotified(order.id);
  if (result.reason === 'not_configured') {
    // eslint-disable-next-line no-console
    console.log(`[whatsappService] not configured yet — would have alerted about order #${order.id}`);
  } else if (result.failed) {
    // eslint-disable-next-line no-console
    console.error(`[whatsappService] ${result.failed}/${result.total} WhatsApp alert(s) failed for order #${order.id}`);
  }
  return result;
}

async function sendAdminUpsellAlert(order, upsellItem) {
  const result = await sendToAdmins(formatUpsellMessage(order, upsellItem));
  if (result.reason === 'not_configured') {
    // eslint-disable-next-line no-console
    console.log(`[whatsappService] not configured yet — would have alerted about upsell on order #${order.id}`);
  } else if (result.failed) {
    // eslint-disable-next-line no-console
    console.error(`[whatsappService] ${result.failed}/${result.total} upsell WhatsApp alert(s) failed for order #${order.id}`);
  }
  return result;
}

module.exports = { sendAdminOrderAlert, sendAdminUpsellAlert, formatOrderMessage, formatUpsellMessage };
