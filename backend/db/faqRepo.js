const { pool } = require('../config/db');

async function findActive(category, conn = pool) {
  const params = [];
  let sql = 'SELECT * FROM faq WHERE is_active = 1';
  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }
  sql += ' ORDER BY display_order ASC, id ASC';
  const [rows] = await conn.query(sql, params);
  return rows;
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
  return findById(result.insertId, conn);
}

async function update(id, data, conn = pool) {
  await conn.query('UPDATE faq SET ? WHERE id = ?', [data, id]);
  return findById(id, conn);
}

async function reorder(items, conn = pool) {
  for (const { id, display_order: displayOrder } of items) {
    // eslint-disable-next-line no-await-in-loop
    await conn.query('UPDATE faq SET display_order = ? WHERE id = ?', [displayOrder, id]);
  }
}

async function remove(id, conn = pool) {
  await conn.query('DELETE FROM faq WHERE id = ?', [id]);
}

module.exports = { findActive, findAll, findById, create, update, reorder, remove };
