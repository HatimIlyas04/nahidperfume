const { pool } = require('../config/db');

async function findByPhone(phone, conn = pool) {
  if (!phone) return null;
  const [rows] = await conn.query('SELECT * FROM customers WHERE phone = ? LIMIT 1', [phone]);
  return rows[0] || null;
}

async function findById(id, conn = pool) {
  const [rows] = await conn.query('SELECT * FROM customers WHERE id = ?', [id]);
  return rows[0] || null;
}

async function findAll({ search, page = 1, pageSize = 20 } = {}, conn = pool) {
  const where = [];
  const params = [];
  if (search) {
    where.push('(name LIKE ? OR phone LIKE ? OR email LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const offset = (page - 1) * pageSize;

  const [rows] = await conn.query(
    `SELECT * FROM customers ${whereSql} ORDER BY total_spent DESC, orders_count DESC LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );
  const [[{ total }]] = await conn.query(`SELECT COUNT(*) AS total FROM customers ${whereSql}`, params);
  return { rows, total };
}

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO customers SET ?', [data]);
  return findById(result.insertId, conn);
}

async function update(id, data, conn = pool) {
  await conn.query('UPDATE customers SET ? WHERE id = ?', [data, id]);
  return findById(id, conn);
}

/** Finds a customer by phone, or creates one; then bumps their order stats. */
async function upsertForOrder({ name, email, phone, deviceToken, orderTotal, orderId }, conn = pool) {
  let customer = await findByPhone(phone, conn);

  if (!customer) {
    customer = await create(
      {
        name,
        email: email || null,
        phone: phone || null,
        device_token: deviceToken || null,
        first_order_id: orderId,
        orders_count: 1,
        total_spent: orderTotal,
      },
      conn
    );
    return customer;
  }

  await update(
    customer.id,
    {
      name,
      email: email || customer.email,
      device_token: deviceToken || customer.device_token,
      orders_count: customer.orders_count + 1,
      total_spent: Number(customer.total_spent) + Number(orderTotal),
    },
    conn
  );
  return findById(customer.id, conn);
}

/** Reverses upsertForOrder's increment when the order it was recorded for
 *  is deleted. Clamped at 0 so this can never go negative (e.g. if stats
 *  were already inconsistent for an unrelated reason). */
async function decrementForOrder(customerId, orderTotal, conn = pool) {
  await conn.query(
    'UPDATE customers SET orders_count = GREATEST(0, orders_count - 1), total_spent = GREATEST(0, total_spent - ?) WHERE id = ?',
    [orderTotal, customerId]
  );
}

module.exports = { findByPhone, findById, findAll, create, update, upsertForOrder, decrementForOrder };
