const { pool } = require('../config/db');
const cache = require('../utils/memoryCache');

const PUBLIC_CACHE_KEY = 'site-content:public';
const PUBLIC_CACHE_TTL_MS = 300 * 1000; // matches the faq/settings cachePublic tier -- rarely-changing admin copy

/** Public shape: only keys with at least one language filled in, as
 * { [content_key]: { fr, ar } } -- the frontend layers this in front of
 * the hardcoded translations, so untouched keys are simply absent here
 * and fall through to the existing default automatically. */
async function findPublicMap(conn = pool) {
  return cache.getOrSet(PUBLIC_CACHE_KEY, PUBLIC_CACHE_TTL_MS, async () => {
    const [rows] = await conn.query(
      'SELECT content_key, value_fr, value_ar FROM site_content WHERE value_fr IS NOT NULL OR value_ar IS NOT NULL'
    );
    const map = {};
    for (const row of rows) {
      map[row.content_key] = { fr: row.value_fr, ar: row.value_ar };
    }
    return map;
  });
}

async function findAll(conn = pool) {
  const [rows] = await conn.query('SELECT * FROM site_content ORDER BY category ASC, content_key ASC');
  return rows;
}

async function upsert(contentKey, category, valueFr, valueAr, conn = pool) {
  await conn.query(
    `INSERT INTO site_content (content_key, category, value_fr, value_ar) VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE value_fr = VALUES(value_fr), value_ar = VALUES(value_ar)`,
    [contentKey, category, valueFr, valueAr]
  );
  cache.del(PUBLIC_CACHE_KEY);
  const [rows] = await conn.query('SELECT * FROM site_content WHERE content_key = ?', [contentKey]);
  return rows[0] || null;
}

/** "Reset to default": blanks both values so the row stops overriding
 * the hardcoded translation, without deleting the row (keeps the
 * category/key around for the admin editor to keep listing it). */
async function resetToDefault(contentKey, conn = pool) {
  await conn.query('UPDATE site_content SET value_fr = NULL, value_ar = NULL WHERE content_key = ?', [contentKey]);
  cache.del(PUBLIC_CACHE_KEY);
  const [rows] = await conn.query('SELECT * FROM site_content WHERE content_key = ?', [contentKey]);
  return rows[0] || null;
}

module.exports = { findPublicMap, findAll, upsert, resetToDefault };
