const { pool } = require('../config/db');

const FIELDS = `
  id, title, slug, description, cover_image, gallery_images, price,
  compare_at_price, is_active, is_featured, badge, is_upsell_offer, upsell_price,
  display_order, created_at, updated_at
`;

async function findAll({ isActive } = {}, conn = pool) {
  const where = [];
  const params = [];
  if (isActive !== undefined) {
    where.push('is_active = ?');
    params.push(isActive ? 1 : 0);
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [rows] = await conn.query(
    `SELECT ${FIELDS} FROM packs ${whereSql} ORDER BY display_order ASC, id DESC`,
    params
  );
  return rows;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query(`SELECT ${FIELDS} FROM packs WHERE id = ?`, [id]);
  return rows[0] || null;
}

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO packs SET ?', [data]);
  return findById(result.insertId, conn);
}

async function update(id, data, conn = pool) {
  await conn.query('UPDATE packs SET ? WHERE id = ?', [data, id]);
  return findById(id, conn);
}

async function setActive(id, isActive, conn = pool) {
  await conn.query('UPDATE packs SET is_active = ? WHERE id = ?', [isActive ? 1 : 0, id]);
  return findById(id, conn);
}

async function reorder(items, conn = pool) {
  for (const { id, display_order: displayOrder } of items) {
    // eslint-disable-next-line no-await-in-loop
    await conn.query('UPDATE packs SET display_order = ? WHERE id = ?', [displayOrder, id]);
  }
}

async function remove(id, conn = pool) {
  await conn.query('DELETE FROM packs WHERE id = ?', [id]);
}

async function findUpsellOffer(conn = pool) {
  const [rows] = await conn.query(
    `SELECT ${FIELDS} FROM packs WHERE is_upsell_offer = 1 AND is_active = 1 LIMIT 1`
  );
  return rows[0] || null;
}

/** Only one pack can be the upsell offer at a time. */
async function clearOtherUpsellOffers(exceptId, conn = pool) {
  await conn.query('UPDATE packs SET is_upsell_offer = 0 WHERE id != ?', [exceptId]);
}

module.exports = {
  findAll, findById, create, update, setActive, reorder, remove,
  findUpsellOffer, clearOtherUpsellOffers,
};
