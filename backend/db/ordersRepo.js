const { pool } = require('../config/db');

async function findAll({ status, search, page = 1, pageSize = 20 } = {}, conn = pool) {
  const where = [];
  const params = [];
  if (status) {
    where.push('status = ?');
    params.push(status);
  }
  if (search) {
    where.push('(order_number LIKE ? OR customer_name LIKE ? OR customer_phone LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const offset = (page - 1) * pageSize;

  const [rows] = await conn.query(
    `SELECT * FROM orders ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );
  const [[{ total }]] = await conn.query(`SELECT COUNT(*) AS total FROM orders ${whereSql}`, params);
  return { rows, total };
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM orders WHERE id = ?', [id]);
  return rows[0] || null;
}

async function findByOrderNumberAndPhone(orderNumber, phone, conn = pool) {
  const [rows] = await conn.query(
    'SELECT * FROM orders WHERE order_number = ? AND customer_phone = ?',
    [orderNumber, phone]
  );
  return rows[0] || null;
}

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO orders SET ?', [data]);
  return result.insertId;
}

async function setOrderNumber(id, orderNumber, conn = pool) {
  await conn.query('UPDATE orders SET order_number = ? WHERE id = ?', [orderNumber, id]);
}

async function updateStatus(id, status, conn = pool) {
  await conn.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
  return findById(id, conn);
}

async function updateNotes(id, adminNotes, conn = pool) {
  await conn.query('UPDATE orders SET admin_notes = ? WHERE id = ?', [adminNotes, id]);
  return findById(id, conn);
}

async function markWhatsappNotified(id, conn = pool) {
  await conn.query('UPDATE orders SET whatsapp_notified_at = NOW() WHERE id = ?', [id]);
}

/** order_items and order_item_perfumes cascade automatically (ON DELETE
 *  CASCADE, see schema.sql); customers.first_order_id is set NULL by its
 *  own FK if this was that customer's first order. */
async function remove(id, conn = pool) {
  const [result] = await conn.query('DELETE FROM orders WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

async function getStats(conn = pool) {
  // Three independent aggregates over the same table — safe to fire
  // concurrently (each pool.query() call checks out its own connection),
  // unlike queries inside a transaction which must share one connection.
  const [[[totals]], [byStatus], [revenueByDay]] = await Promise.all([
    conn.query(
      `SELECT
         COUNT(*) AS totalOrders,
         COALESCE(SUM(total_amount), 0) AS totalRevenue,
         COALESCE(SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END), 0) AS pendingOrders,
         COALESCE(SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END), 0) AS ordersToday,
         COALESCE(SUM(CASE WHEN DATE(created_at) = CURDATE() THEN total_amount ELSE 0 END), 0) AS revenueToday
       FROM orders`
    ),
    conn.query(`SELECT status, COUNT(*) AS count FROM orders GROUP BY status`),
    conn.query(
      `SELECT DATE(created_at) AS date, COUNT(*) AS orders, SUM(total_amount) AS revenue
       FROM orders
       WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date ASC`
    ),
  ]);
  return { totals, byStatus, revenueByDay };
}

module.exports = {
  findAll,
  findById,
  findByOrderNumberAndPhone,
  create,
  setOrderNumber,
  updateStatus,
  updateNotes,
  markWhatsappNotified,
  remove,
  getStats,
};
