const { pool } = require('../config/db');

const SAFE_FIELDS = 'id, username, role, full_name, is_active, last_login_at, created_at, updated_at';

async function findByUsername(username, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM admins WHERE username = ?', [username]);
  return rows[0] || null;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query(`SELECT ${SAFE_FIELDS} FROM admins WHERE id = ?`, [id]);
  return rows[0] || null;
}

async function findAll(conn = pool) {
  const [rows] = await conn.query(`SELECT ${SAFE_FIELDS} FROM admins ORDER BY created_at ASC`);
  return rows;
}

async function countSuperAdmins(conn = pool) {
  const [[{ count }]] = await conn.query(
    "SELECT COUNT(*) AS count FROM admins WHERE role = 'super_admin' AND is_active = 1"
  );
  return count;
}

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO admins SET ?', [data]);
  return findById(result.insertId, conn);
}

async function update(id, data, conn = pool) {
  await conn.query('UPDATE admins SET ? WHERE id = ?', [data, id]);
  return findById(id, conn);
}

async function updatePasswordHash(id, passwordHash, conn = pool) {
  await conn.query('UPDATE admins SET password_hash = ? WHERE id = ?', [passwordHash, id]);
}

async function touchLastLogin(id, conn = pool) {
  await conn.query('UPDATE admins SET last_login_at = NOW() WHERE id = ?', [id]);
}

async function remove(id, conn = pool) {
  await conn.query('DELETE FROM admins WHERE id = ?', [id]);
}

module.exports = {
  findByUsername,
  findById,
  findAll,
  countSuperAdmins,
  create,
  update,
  updatePasswordHash,
  touchLastLogin,
  remove,
};
