const { pool } = require('../config/db');

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO contact_messages SET ?', [data]);
  return findById(result.insertId, conn);
}

async function findAll({ status } = {}, conn = pool) {
  const where = [];
  const params = [];
  if (status) {
    where.push('status = ?');
    params.push(status);
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [rows] = await conn.query(
    `SELECT * FROM contact_messages ${whereSql} ORDER BY created_at DESC`,
    params
  );
  return rows;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM contact_messages WHERE id = ?', [id]);
  return rows[0] || null;
}

async function setStatus(id, status, conn = pool) {
  await conn.query('UPDATE contact_messages SET status = ? WHERE id = ?', [status, id]);
  return findById(id, conn);
}

async function remove(id, conn = pool) {
  await conn.query('DELETE FROM contact_messages WHERE id = ?', [id]);
}

module.exports = { create, findAll, findById, setStatus, remove };
