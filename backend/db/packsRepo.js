const { pool } = require('../config/db');

const FIELDS = `
  id, title, gender, slug, description, cover_image, gallery_images, price, stock_quantity,
  compare_at_price, is_active, is_featured, badge, is_upsell_offer, upsell_price,
  display_order, created_at, updated_at
`;

async function findAll({ isActive, gender } = {}, conn = pool) {
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

/** Atomically decrements stock by `quantity`, but only if enough is
 *  available -- the WHERE clause reads the CURRENT row value at the
 *  moment the UPDATE executes, so under InnoDB (row-locked for the
 *  duration of the enclosing transaction) two concurrent orders for the
 *  last unit can never both succeed: whichever commits first wins,
 *  the second sees the already-decremented value and this returns false.
 *  Must be called with the transaction connection (`conn`), never the pool. */
async function decrementStock(id, quantity, conn) {
  const [result] = await conn.query(
    'UPDATE packs SET stock_quantity = stock_quantity - ? WHERE id = ? AND stock_quantity >= ?',
    [quantity, id, quantity]
  );
  return result.affectedRows > 0;
}

// Any number of packs can be flagged as an upsell offer -- the Thank You
// page shows every currently active one, not just a single "the" offer.
async function findUpsellOffers(conn = pool) {
  const [rows] = await conn.query(
    `SELECT ${FIELDS} FROM packs WHERE is_upsell_offer = 1 AND is_active = 1 ORDER BY display_order ASC, id DESC`
  );
  return rows;
}

module.exports = {
  findAll, findById, create, update, setActive, reorder, remove,
  findUpsellOffers, decrementStock,
};
