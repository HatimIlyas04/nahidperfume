const { pool } = require('../config/db');

async function get(conn = pool) {
  const [rows] = await conn.query(
    'SELECT id, is_active, flat_price, title, description, updated_at FROM custom_pack_settings WHERE id = 1'
  );
  return rows[0] || null;
}

async function update(data, conn = pool) {
  await conn.query('UPDATE custom_pack_settings SET ? WHERE id = 1', [data]);
  return get(conn);
}

module.exports = { get, update };
