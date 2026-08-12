const { pool } = require('../config/db');
const cache = require('../utils/memoryCache');

const SELECTABLE_FIELDS = `
  id, name, slug, description, category, gender, product_type, inspired_by,
  concentration, scent_family, scent_intensity, longevity, top_notes,
  middle_notes, base_notes, ingredients, size, image_url, gallery_images,
  is_new, is_bestseller, is_active, display_order, created_at, updated_at
`;

// Every other public catalog/content repo (packs via packService, faq,
// testimonials, banners, ...) caches its list read in-process -- this one
// was missed. Matches /api/perfumes' cachePublic(60) HTTP header tier.
const LIST_CACHE_PREFIX = 'perfumes:list:';
const LIST_CACHE_TTL_MS = 60 * 1000;

async function findAll({ isActive, gender, category, productType } = {}, conn = pool) {
  const cacheKey = `${LIST_CACHE_PREFIX}${isActive}:${gender || ''}:${category || ''}:${productType || ''}`;
  return cache.getOrSet(cacheKey, LIST_CACHE_TTL_MS, async () => {
    const where = [];
    const params = [];

    if (isActive !== undefined) {
      where.push('is_active = ?');
      params.push(isActive ? 1 : 0);
    }
    if (gender) {
      where.push('gender = ?');
      params.push(gender);
    }
    if (category) {
      where.push('category = ?');
      params.push(category);
    }
    if (productType) {
      where.push('product_type = ?');
      params.push(productType);
    }

    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const [rows] = await conn.query(
      `SELECT ${SELECTABLE_FIELDS} FROM perfumes ${whereSql} ORDER BY display_order ASC, name ASC`,
      params
    );
    return rows;
  });
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query(`SELECT ${SELECTABLE_FIELDS} FROM perfumes WHERE id = ?`, [id]);
  return rows[0] || null;
}

async function findByIds(ids, conn = pool) {
  if (!ids.length) return [];
  const [rows] = await conn.query(
    `SELECT ${SELECTABLE_FIELDS} FROM perfumes WHERE id IN (?)`,
    [ids]
  );
  return rows;
}

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO perfumes SET ?', [data]);
  cache.delPrefix(LIST_CACHE_PREFIX);
  return findById(result.insertId, conn);
}

async function update(id, data, conn = pool) {
  await conn.query('UPDATE perfumes SET ? WHERE id = ?', [data, id]);
  cache.delPrefix(LIST_CACHE_PREFIX);
  return findById(id, conn);
}

async function setActive(id, isActive, conn = pool) {
  await conn.query('UPDATE perfumes SET is_active = ? WHERE id = ?', [isActive ? 1 : 0, id]);
  cache.delPrefix(LIST_CACHE_PREFIX);
  return findById(id, conn);
}

async function remove(id, conn = pool) {
  await conn.query('DELETE FROM perfumes WHERE id = ?', [id]);
  cache.delPrefix(LIST_CACHE_PREFIX);
}

async function isReferencedByAnyPack(id, conn = pool) {
  const [rows] = await conn.query('SELECT 1 FROM pack_perfumes WHERE perfume_id = ? LIMIT 1', [id]);
  return rows.length > 0;
}

module.exports = { findAll, findById, findByIds, create, update, setActive, remove, isReferencedByAnyPack };
