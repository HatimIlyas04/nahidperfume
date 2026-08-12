const webpush = require('web-push');
const env = require('../config/env');
const pushSubscriptionsRepo = require('../db/pushSubscriptionsRepo');

const configured = !!(env.vapid.publicKey && env.vapid.privateKey && env.vapid.subject);

if (configured) {
  webpush.setVapidDetails(env.vapid.subject, env.vapid.publicKey, env.vapid.privateKey);
}

/** Sends `payload` (a plain object, JSON-stringified here) to every stored
 *  subscription, in parallel, and never lets one dead device's failure
 *  affect delivery to the others. Any subscription the push service
 *  reports as gone (404/410 -- uninstalled app, revoked permission,
 *  expired endpoint) is deleted so the table doesn't grow unbounded with
 *  devices that will never receive anything again. Returns a summary
 *  instead of throwing: this must never be allowed to fail the caller
 *  (order creation) just because a phone's push subscription expired. */
async function sendToSubscriptions(subscriptions, payload) {
  if (!configured) {
    return { sent: 0, failed: 0, reason: 'not_configured' };
  }
  if (!subscriptions.length) {
    return { sent: 0, failed: 0, reason: 'no_subscriptions' };
  }

  const body = JSON.stringify(payload);
  const results = await Promise.allSettled(
    subscriptions.map((sub) =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        body
      )
    )
  );

  const deadEndpoints = [];
  let sent = 0;
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      sent += 1;
      return;
    }
    const statusCode = result.reason?.statusCode;
    if (statusCode === 404 || statusCode === 410) {
      deadEndpoints.push(subscriptions[i].endpoint);
    } else {
      // eslint-disable-next-line no-console
      console.error('[webPushService] push send failed:', statusCode || result.reason?.message);
    }
  });

  if (deadEndpoints.length) {
    await pushSubscriptionsRepo.removeByEndpoints(deadEndpoints);
  }

  return { sent, failed: results.length - sent, removed: deadEndpoints.length };
}

/** Order alert -- sent to every admin's every registered device, matching
 *  the "all active devices receive the notification" requirement. */
async function sendAdminOrderPush(order) {
  const subscriptions = await pushSubscriptionsRepo.findAll();
  const firstItemTitle = order.items?.[0]?.item_name_snapshot || order.items?.[0]?.title;
  return sendToSubscriptions(subscriptions, {
    title: '🔔 Nouvelle commande — Nahid Perfumes',
    body: `Commande ${order.order_number} • ${Math.round(order.total_amount)} DH • ${order.customer_name}`,
    data: {
      url: '/admin/orders',
      orderId: order.id,
      orderNumber: order.order_number,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      packTitle: firstItemTitle,
      total: order.total_amount,
    },
  });
}

/** Test push -- scoped to the requesting admin's own devices only, so
 *  "Tester les notifications" proves that admin's phone/browser works
 *  without also paging every other admin. */
async function sendTestPush(adminId) {
  const subscriptions = await pushSubscriptionsRepo.findByAdmin(adminId);
  return sendToSubscriptions(subscriptions, {
    title: '🧪 Test notification',
    body: 'Les notifications Nahid Perfumes fonctionnent correctement.',
    data: { url: '/admin/orders' },
  });
}

module.exports = { configured, sendAdminOrderPush, sendTestPush };
