const { pool } = require('../config/db');
const cache = require('../utils/memoryCache');

const ACTIVE_CACHE_PREFIX = 'banners:active:';
const ACTIVE_CACHE_TTL_MS = 120 * 1000; // matches cachePublic(120) on /api/banners

async function findActive(placement, conn = pool) {
  return cache.getOrSet(`${ACTIVE_CACHE_PREFIX}${placement || ''}`, ACTIVE_CACHE_TTL_MS, async () => {
    const params = [];
    let sql = `SELECT * FROM banners WHERE is_active = 1
               AND (starts_at IS NULL OR starts_at <= NOW())
               AND (ends_at IS NULL OR ends_at >= NOW())`;
    if (placement) {
      sql += ' AND placement = ?';
      params.push(placement);
    }
    sql += ' ORDER BY display_order ASC, id DESC';
    const [rows] = await conn.query(sql, params);
    return rows;
  });
}

async function findAll(conn = pool) {
  const [rows] = await conn.query('SELECT * FROM banners ORDER BY display_order ASC, id DESC');
  return rows;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM banners WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO banners SET ?', [data]);
  cache.delPrefix(ACTIVE_CACHE_PREFIX);
  return findById(result.insertId, conn);
}

async function update(id, data, conn = pool) {
  await conn.query('UPDATE banners SET ? WHERE id = ?', [data, id]);
  cache.delPrefix(ACTIVE_CACHE_PREFIX);
  return findById(id, conn);
}

async function reorder(items, conn = pool) {
  for (const { id, display_order: displayOrder } of items) {
    // eslint-disable-next-line no-await-in-loop
    await conn.query('UPDATE banners SET display_order = ? WHERE id = ?', [displayOrder, id]);
  }
  cache.delPrefix(ACTIVE_CACHE_PREFIX);
}

async function remove(id, conn = pool) {
  await conn.query('DELETE FROM banners WHERE id = ?', [id]);
  cache.delPrefix(ACTIVE_CACHE_PREFIX);
}

module.exports = { findActive, findAll, findById, create, update, reorder, remove };
