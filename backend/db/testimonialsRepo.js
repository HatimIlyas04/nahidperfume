const { pool } = require('../config/db');
const cache = require('../utils/memoryCache');

const ACTIVE_CACHE_KEY = 'testimonials:active';
const ACTIVE_CACHE_TTL_MS = 120 * 1000; // matches cachePublic(120) on /api/testimonials

async function findActive(conn = pool) {
  return cache.getOrSet(ACTIVE_CACHE_KEY, ACTIVE_CACHE_TTL_MS, async () => {
    const [rows] = await conn.query(
      `SELECT id, name, role_or_location, avatar_url, rating, quote, display_order
       FROM testimonials WHERE is_active = 1 ORDER BY display_order ASC, id DESC`
    );
    return rows;
  });
}

async function findAll(conn = pool) {
  const [rows] = await conn.query('SELECT * FROM testimonials ORDER BY display_order ASC, id DESC');
  return rows;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM testimonials WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO testimonials SET ?', [data]);
  cache.del(ACTIVE_CACHE_KEY);
  return findById(result.insertId, conn);
}

async function update(id, data, conn = pool) {
  await conn.query('UPDATE testimonials SET ? WHERE id = ?', [data, id]);
  cache.del(ACTIVE_CACHE_KEY);
  return findById(id, conn);
}

async function reorder(items, conn = pool) {
  for (const { id, display_order: displayOrder } of items) {
    // eslint-disable-next-line no-await-in-loop
    await conn.query('UPDATE testimonials SET display_order = ? WHERE id = ?', [displayOrder, id]);
  }
  cache.del(ACTIVE_CACHE_KEY);
}

async function remove(id, conn = pool) {
  await conn.query('DELETE FROM testimonials WHERE id = ?', [id]);
  cache.del(ACTIVE_CACHE_KEY);
}

module.exports = { findActive, findAll, findById, create, update, reorder, remove };
