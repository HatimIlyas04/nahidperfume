const { pool } = require('../config/db');

/** Upserts by endpoint (unique per browser/device) -- re-activating
 *  notifications on a device that was already subscribed refreshes its
 *  keys/admin_id instead of creating a duplicate row for the same device. */
async function upsert({ adminId, endpoint, p256dh, auth, userAgent }, conn = pool) {
  await conn.query(
    `INSERT INTO push_subscriptions (admin_id, endpoint, p256dh, auth, user_agent)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE admin_id = VALUES(admin_id), p256dh = VALUES(p256dh),
       auth = VALUES(auth), user_agent = VALUES(user_agent)`,
    [adminId, endpoint, p256dh, auth, userAgent || null]
  );
  const [rows] = await conn.query('SELECT * FROM push_subscriptions WHERE endpoint = ?', [endpoint]);
  return rows[0];
}

async function findAll(conn = pool) {
  const [rows] = await conn.query('SELECT * FROM push_subscriptions');
  return rows;
}

async function findByAdmin(adminId, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM push_subscriptions WHERE admin_id = ?', [adminId]);
  return rows;
}

async function removeByEndpoint(endpoint, conn = pool) {
  await conn.query('DELETE FROM push_subscriptions WHERE endpoint = ?', [endpoint]);
}

/** Bulk-removes subscriptions the push service confirmed are dead (410
 *  Gone / 404 Not Found) -- keeps the table from accumulating endpoints
 *  for uninstalled devices/revoked permissions indefinitely. */
async function removeByEndpoints(endpoints, conn = pool) {
  if (!endpoints.length) return;
  await conn.query('DELETE FROM push_subscriptions WHERE endpoint IN (?)', [endpoints]);
}

module.exports = { upsert, findAll, findByAdmin, removeByEndpoint, removeByEndpoints };
