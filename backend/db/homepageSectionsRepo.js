const { pool } = require('../config/db');
const cache = require('../utils/memoryCache');

const ACTIVE_CACHE_KEY = 'homepage-sections:active';
const ACTIVE_CACHE_TTL_MS = 120 * 1000; // matches cachePublic(120) on /api/homepage-sections

async function findActive(conn = pool) {
  return cache.getOrSet(ACTIVE_CACHE_KEY, ACTIVE_CACHE_TTL_MS, async () => {
    const [rows] = await conn.query(
      `SELECT id, section_key, title, title_fr, title_ar, subtitle, subtitle_fr, subtitle_ar,
              content_json, display_order
       FROM homepage_sections WHERE is_active = 1 ORDER BY display_order ASC`
    );
    return rows;
  });
}

async function findAll(conn = pool) {
  const [rows] = await conn.query('SELECT * FROM homepage_sections ORDER BY display_order ASC');
  return rows;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM homepage_sections WHERE id = ?', [id]);
  return rows[0] || null;
}

async function update(id, data, conn = pool) {
  await conn.query('UPDATE homepage_sections SET ? WHERE id = ?', [data, id]);
  cache.del(ACTIVE_CACHE_KEY);
  return findById(id, conn);
}

async function reorder(items, conn = pool) {
  for (const { id, display_order: displayOrder } of items) {
    // eslint-disable-next-line no-await-in-loop
    await conn.query('UPDATE homepage_sections SET display_order = ? WHERE id = ?', [displayOrder, id]);
  }
  cache.del(ACTIVE_CACHE_KEY);
}

module.exports = { findActive, findAll, findById, update, reorder };
