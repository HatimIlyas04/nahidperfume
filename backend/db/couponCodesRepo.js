const { pool } = require('../config/db');

async function findByCode(code, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM coupon_codes WHERE code = ?', [code]);
  return rows[0] || null;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM coupon_codes WHERE id = ?', [id]);
  return rows[0] || null;
}

async function findAll(conn = pool) {
  const [rows] = await conn.query('SELECT * FROM coupon_codes ORDER BY created_at DESC');
  return rows;
}

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO coupon_codes SET ?', [data]);
  return findById(result.insertId, conn);
}

async function update(id, data, conn = pool) {
  await conn.query('UPDATE coupon_codes SET ? WHERE id = ?', [data, id]);
  return findById(id, conn);
}

async function remove(id, conn = pool) {
  await conn.query('DELETE FROM coupon_codes WHERE id = ?', [id]);
}

/**
 * Atomically reserves one use of a coupon. Returns true if the reservation
 * succeeded (caller should proceed with the order), false if the coupon is
 * no longer usable (inactive, expired, or exhausted) — must be called
 * inside the same transaction as the order insert.
 */
async function reserveUse(id, conn) {
  const [result] = await conn.query(
    `UPDATE coupon_codes
     SET used_count = used_count + 1
     WHERE id = ?
       AND is_active = 1
       AND (max_uses IS NULL OR used_count < max_uses)
       AND (starts_at IS NULL OR starts_at <= NOW())
       AND (expires_at IS NULL OR expires_at >= NOW())`,
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = { findByCode, findById, findAll, create, update, remove, reserveUse };
