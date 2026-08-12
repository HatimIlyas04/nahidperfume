const { pool } = require('../config/db');
const cache = require('../utils/memoryCache');

const ACTIVE_CACHE_KEY = 'trust-badges:active';
const ACTIVE_CACHE_TTL_MS = 120 * 1000; // matches cachePublic(120) on /api/trust-badges

async function findActive(conn = pool) {
  return cache.getOrSet(ACTIVE_CACHE_KEY, ACTIVE_CACHE_TTL_MS, async () => {
    const [rows] = await conn.query(
      `SELECT id, icon_key, title_fr, title_ar, subtitle_fr, subtitle_ar, display_order
       FROM trust_badges WHERE is_active = 1 ORDER BY display_order ASC, id ASC`
    );
    return rows;
  });
}

async function findAll(conn = pool) {
  const [rows] = await conn.query('SELECT * FROM trust_badges ORDER BY display_order ASC, id ASC');
  return rows;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM trust_badges WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO trust_badges SET ?', [data]);
  cache.del(ACTIVE_CACHE_KEY);
  return findById(result.insertId, conn);
}

async function update(id, data, conn = pool) {
  await conn.query('UPDATE trust_badges SET ? WHERE id = ?', [data, id]);
  cache.del(ACTIVE_CACHE_KEY);
  return findById(id, conn);
}

async function reorder(items, conn = pool) {
  for (const { id, display_order: displayOrder } of items) {
    // eslint-disable-next-line no-await-in-loop
    await conn.query('UPDATE trust_badges SET display_order = ? WHERE id = ?', [displayOrder, id]);
  }
  cache.del(ACTIVE_CACHE_KEY);
}

async function remove(id, conn = pool) {
  await conn.query('DELETE FROM trust_badges WHERE id = ?', [id]);
  cache.del(ACTIVE_CACHE_KEY);
}

module.exports = { findActive, findAll, findById, create, update, reorder, remove };
