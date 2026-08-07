const { pool } = require('../config/db');

async function findApproved(conn = pool) {
  const [rows] = await conn.query(
    "SELECT * FROM feedbacks WHERE status = 'approved' ORDER BY created_at DESC"
  );
  return rows;
}

async function findAll({ status } = {}, conn = pool) {
  const where = [];
  const params = [];
  if (status) {
    where.push('status = ?');
    params.push(status);
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [rows] = await conn.query(`SELECT * FROM feedbacks ${whereSql} ORDER BY created_at DESC`, params);
  return rows;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM feedbacks WHERE id = ?', [id]);
  return rows[0] || null;
}

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO feedbacks SET ?', [data]);
  return findById(result.insertId, conn);
}

async function setStatus(id, status, conn = pool) {
  await conn.query('UPDATE feedbacks SET status = ? WHERE id = ?', [status, id]);
  return findById(id, conn);
}

async function remove(id, conn = pool) {
  await conn.query('DELETE FROM feedbacks WHERE id = ?', [id]);
}

module.exports = { findApproved, findAll, findById, create, setStatus, remove };
