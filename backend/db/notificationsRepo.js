const { pool } = require('../config/db');

async function create({ type, title, body, link, relatedId }, conn = pool) {
  const [result] = await conn.query(
    'INSERT INTO notifications (type, title, body, link, related_id) VALUES (?, ?, ?, ?, ?)',
    [type, title, body || null, link || null, relatedId || null]
  );
  const [rows] = await conn.query('SELECT * FROM notifications WHERE id = ?', [result.insertId]);
  return rows[0];
}

async function findAll({ unreadOnly = false, limit = 50 } = {}, conn = pool) {
  const whereSql = unreadOnly ? 'WHERE is_read = 0' : '';
  const [rows] = await conn.query(
    `SELECT * FROM notifications ${whereSql} ORDER BY created_at DESC LIMIT ?`,
    [limit]
  );
  return rows;
}

async function countUnread(conn = pool) {
  const [[{ count }]] = await conn.query('SELECT COUNT(*) AS count FROM notifications WHERE is_read = 0');
  return count;
}

async function markRead(id, conn = pool) {
  await conn.query('UPDATE notifications SET is_read = 1, read_at = NOW() WHERE id = ?', [id]);
}

async function markAllRead(conn = pool) {
  await conn.query('UPDATE notifications SET is_read = 1, read_at = NOW() WHERE is_read = 0');
}

module.exports = { create, findAll, countUnread, markRead, markAllRead };
