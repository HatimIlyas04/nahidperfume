const { pool } = require('../config/db');
const cache = require('../utils/memoryCache');

const ACTIVE_CACHE_PREFIX = 'faq:active:';
const ACTIVE_CACHE_TTL_MS = 300 * 1000; // matches cachePublic(300) on /api/faq

async function findActive(category, conn = pool) {
  return cache.getOrSet(`${ACTIVE_CACHE_PREFIX}${category || ''}`, ACTIVE_CACHE_TTL_MS, async () => {
    const params = [];
    let sql = 'SELECT id, question, answer, category, display_order FROM faq WHERE is_active = 1';
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    sql += ' ORDER BY display_order ASC, id ASC';
    const [rows] = await conn.query(sql, params);
    return rows;
  });
}

async function findAll(conn = pool) {
  const [rows] = await conn.query('SELECT * FROM faq ORDER BY display_order ASC, id ASC');
  return rows;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM faq WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO faq SET ?', [data]);
  cache.delPrefix(ACTIVE_CACHE_PREFIX);
  return findById(result.insertId, conn);
}

async function update(id, data, conn = pool) {
  await conn.query('UPDATE faq SET ? WHERE id = ?', [data, id]);
  cache.delPrefix(ACTIVE_CACHE_PREFIX);
  return findById(id, conn);
}

async function reorder(items, conn = pool) {
  for (const { id, display_order: displayOrder } of items) {
    // eslint-disable-next-line no-await-in-loop
    await conn.query('UPDATE faq SET display_order = ? WHERE id = ?', [displayOrder, id]);
  }
  cache.delPrefix(ACTIVE_CACHE_PREFIX);
}

async function remove(id, conn = pool) {
  await conn.query('DELETE FROM faq WHERE id = ?', [id]);
  cache.delPrefix(ACTIVE_CACHE_PREFIX);
}

module.exports = { findActive, findAll, findById, create, update, reorder, remove };
