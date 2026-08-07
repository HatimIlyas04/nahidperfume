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

async function sendAdminOrderAlert(order) {
  if (!env.ultramsg.instanceId || !env.ultramsg.token || !env.ultramsg.adminNumbers.length) {
    // eslint-disable-next-line no-console
    console.log(`[whatsappService] not configured yet — would have alerted about order #${order.id}`);
    return { sent: false, reason: 'not_configured' };
  }

  const body = formatOrderMessage(order);
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
  if (anySucceeded) {
    await ordersRepo.markWhatsappNotified(order.id);
  }

  const failures = results.filter((r) => r.status === 'rejected');
  if (failures.length) {
    // eslint-disable-next-line no-console
    console.error(`[whatsappService] ${failures.length}/${results.length} WhatsApp alert(s) failed for order #${order.id}`);
  }

  return { sent: anySucceeded, total: results.length, failed: failures.length };
}

module.exports = { sendAdminOrderAlert, formatOrderMessage };
