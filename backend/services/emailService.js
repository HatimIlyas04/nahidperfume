const nodemailer = require('nodemailer');
const env = require('../config/env');

let transporter = null;
function getTransporter() {
  if (!env.smtp.host || !env.smtp.user || !env.smtp.password) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: { user: env.smtp.user, pass: env.smtp.password },
    });
  }
  return transporter;
}

const STATUS_LABEL_FR = {
  pending: 'En attente', confirmed: 'Confirmée', preparing: 'En préparation',
  shipping: 'En cours de livraison', delivered: 'Livrée', cancelled: 'Annulée',
};

function shell(title, bodyHtml) {
  return `
  <div style="font-family: 'DM Sans', Arial, sans-serif; background:#FAFAFA; padding:32px 16px;">
    <div style="max-width:560px; margin:0 auto; background:#FFFFFF; border-radius:20px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.06);">
      <div style="background:#1A1A1A; padding:28px 32px; text-align:center;">
        <span style="font-family: Georgia, serif; font-size:1.5rem; color:#EF776A; letter-spacing:0.02em;">Nahid Perfumes</span>
      </div>
      <div style="padding:32px;">
        <h2 style="font-family: Georgia, serif; font-weight:500; color:#1A1A1A; font-size:1.4rem; margin:0 0 16px;">${title}</h2>
        ${bodyHtml}
      </div>
      <div style="background:#FAFAFA; padding:20px 32px; text-align:center; color:#9B9B9B; font-size:0.72rem;">
        Nahid Perfumes — Packs de parfums curés · Maroc
      </div>
    </div>
  </div>`;
}

function itemsTable(items) {
  const rows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0; border-bottom:1px solid #F2F2F2; color:#1A1A1A; font-size:0.88rem;">
          ${item.item_name_snapshot} × ${item.quantity}
          ${item.perfumes?.length ? `<div style="font-size:0.74rem; color:#9B9B9B; margin-top:2px;">${item.perfumes.map((p) => p.perfume_name_snapshot).join(', ')}</div>` : ''}
        </td>
        <td style="padding:10px 0; border-bottom:1px solid #F2F2F2; text-align:right; color:#1A1A1A; font-size:0.88rem;">
          ${Math.round(item.unit_price * item.quantity)} MAD
        </td>
      </tr>`
    )
    .join('');
  return `<table style="width:100%; border-collapse:collapse; margin:16px 0;">${rows}</table>`;
}

async function send({ to, subject, html }) {
  const t = getTransporter();
  if (!t) {
    // eslint-disable-next-line no-console
    console.log(`[emailService] not configured yet — would have sent "${subject}" to ${to}`);
    return { sent: false, reason: 'not_configured' };
  }
  await t.sendMail({ from: `"Nahid Perfumes" <${env.smtp.user}>`, to, subject, html });
  return { sent: true };
}

async function sendOrderConfirmation(order) {
  if (!order.customer_email) return { sent: false, reason: 'no_customer_email' };
  const html = shell(
    'Merci pour votre commande !',
    `
    <p style="color:#6B6B6B; font-size:0.9rem; line-height:1.6;">
      Bonjour ${order.customer_name}, votre commande <strong>${order.order_number}</strong> a bien été reçue et sera traitée sous peu.
    </p>
    ${itemsTable(order.items)}
    <div style="display:flex; justify-content:space-between; padding-top:12px; font-weight:700; color:#1A1A1A;">
      <span>Total</span><span>${Math.round(order.total_amount)} MAD</span>
    </div>
    <p style="color:#9B9B9B; font-size:0.78rem; margin-top:20px;">Paiement à la livraison · Livraison partout au Maroc</p>
    `
  );
  return send({ to: order.customer_email, subject: `Confirmation de commande ${order.order_number}`, html });
}

async function sendAdminOrderNotification(order) {
  if (!env.smtp.adminEmail) return { sent: false, reason: 'no_admin_email' };
  const html = shell(
    `Nouvelle commande ${order.order_number}`,
    `
    <p style="color:#6B6B6B; font-size:0.9rem;"><strong>${order.customer_name}</strong> — ${order.customer_phone}</p>
    <p style="color:#6B6B6B; font-size:0.85rem;">${order.customer_address}${order.customer_city ? `, ${order.customer_city}` : ''}</p>
    ${itemsTable(order.items)}
    <div style="display:flex; justify-content:space-between; padding-top:12px; font-weight:700; color:#1A1A1A;">
      <span>Total</span><span>${Math.round(order.total_amount)} MAD</span>
    </div>
    `
  );
  return send({ to: env.smtp.adminEmail, subject: `🛍️ Nouvelle commande ${order.order_number}`, html });
}

async function sendShippingUpdate(order) {
  if (!order.customer_email) return { sent: false, reason: 'no_customer_email' };
  const label = STATUS_LABEL_FR[order.status] || order.status;
  const html = shell(
    `Mise à jour de votre commande`,
    `<p style="color:#6B6B6B; font-size:0.9rem; line-height:1.6;">
       Votre commande <strong>${order.order_number}</strong> est maintenant : <strong style="color:#EF776A;">${label}</strong>.
     </p>`
  );
  return send({ to: order.customer_email, subject: `Commande ${order.order_number} — ${label}`, html });
}

module.exports = { sendOrderConfirmation, sendAdminOrderNotification, sendShippingUpdate };
