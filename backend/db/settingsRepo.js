const { pool } = require('../config/db');

// Only these keys are ever exposed on the public (unauthenticated) endpoint.
// Everything else in the `settings` table is admin-only. Secrets never live
// in this table at all — they stay in .env.
const PUBLIC_KEYS = [
  'site_name',
  'currency',
  'contact_phone',
  'contact_whatsapp',
  'contact_email',
  'instagram_url',
  'facebook_url',
  'shipping_flat_rate',
  'free_shipping_threshold',
  'countdown_enabled',
  'countdown_end_at',
  'countdown_label',
  'social_proof_enabled',
];

async function findAll(conn = pool) {
  const [rows] = await conn.query('SELECT setting_key, setting_value, setting_group FROM settings');
  return rows;
}

async function findPublic(conn = pool) {
  const [rows] = await conn.query(
    'SELECT setting_key, setting_value FROM settings WHERE setting_key IN (?)',
    [PUBLIC_KEYS]
  );
  return rows;
}

async function upsertMany(entries, conn = pool) {
  for (const { key, value } of entries) {
    // eslint-disable-next-line no-await-in-loop
    await conn.query(
      'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)',
      [key, value]
    );
  }
}

module.exports = { findAll, findPublic, upsertMany, PUBLIC_KEYS };
