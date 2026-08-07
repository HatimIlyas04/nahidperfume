const { pool } = require('../config/db');

async function findActive(conn = pool) {
  const [rows] = await conn.query(
    'SELECT * FROM homepage_sections WHERE is_active = 1 ORDER BY display_order ASC'
  );
  return rows;
}

async function findAll(conn = pool) {
  const [rows] = await conn.query('SELECT * FROM homepage_sections ORDER BY display_order ASC');
  return rows;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM homepage_sections WHERE id = ?', [id]);
  return rows[0] || null;
}

async function update(id, data, conn = pool) {
  await conn.query('UPDATE homepage_sections SET ? WHERE id = ?', [data, id]);
  return findById(id, conn);
}

async function reorder(items, conn = pool) {
  for (const { id, display_order: displayOrder } of items) {
    // eslint-disable-next-line no-await-in-loop
    await conn.query('UPDATE homepage_sections SET display_order = ? WHERE id = ?', [displayOrder, id]);
  }
}

module.exports = { findActive, findAll, findById, update, reorder };
