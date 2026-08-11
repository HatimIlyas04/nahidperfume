const { pool } = require('../config/db');
const cache = require('../utils/memoryCache');

const cacheKey = (packId) => `pack-feedback-images:active:${packId}`;
const ACTIVE_CACHE_TTL_MS = 60 * 1000; // matches the pack-detail cache tier

async function findActiveByPackId(packId, conn = pool) {
  return cache.getOrSet(cacheKey(packId), ACTIVE_CACHE_TTL_MS, async () => {
    const [rows] = await conn.query(
      'SELECT id, image_url, display_order FROM pack_feedback_images WHERE pack_id = ? AND is_active = 1 ORDER BY display_order ASC, id ASC',
      [packId]
    );
    return rows;
  });
}

async function findAllByPackId(packId, conn = pool) {
  const [rows] = await conn.query(
    'SELECT * FROM pack_feedback_images WHERE pack_id = ? ORDER BY display_order ASC, id ASC',
    [packId]
  );
  return rows;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM pack_feedback_images WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO pack_feedback_images SET ?', [data]);
  cache.del(cacheKey(data.pack_id));
  return findById(result.insertId, conn);
}

async function update(id, packId, data, conn = pool) {
  await conn.query('UPDATE pack_feedback_images SET ? WHERE id = ?', [data, id]);
  cache.del(cacheKey(packId));
  return findById(id, conn);
}

async function reorder(packId, items, conn = pool) {
  for (const { id, display_order: displayOrder } of items) {
    // eslint-disable-next-line no-await-in-loop
    await conn.query('UPDATE pack_feedback_images SET display_order = ? WHERE id = ? AND pack_id = ?', [displayOrder, id, packId]);
  }
  cache.del(cacheKey(packId));
}

async function remove(id, packId, conn = pool) {
  await conn.query('DELETE FROM pack_feedback_images WHERE id = ?', [id]);
  cache.del(cacheKey(packId));
}

module.exports = { findActiveByPackId, findAllByPackId, findById, create, update, reorder, remove };
