const { pool } = require('../config/db');

async function create(data, conn = pool) {
  const [result] = await conn.query('INSERT INTO order_items SET ?', [data]);
  return result.insertId;
}

async function findByOrderId(orderId, conn = pool) {
  const [items] = await conn.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
  if (!items.length) return [];

  const itemIds = items.map((i) => i.id);
  const [perfumeRows] = await conn.query(
    `SELECT * FROM order_item_perfumes WHERE order_item_id IN (?) ORDER BY position ASC`,
    [itemIds]
  );

  return items.map((item) => ({
    ...item,
    perfumes: perfumeRows.filter((p) => p.order_item_id === item.id),
  }));
}

/**
 * Batches item (+ perfume snapshot) lookups for a whole page of orders into
 * exactly 2 queries total, instead of 2 per order — used by the admin
 * orders list, which previously fired findByOrderId() once per row.
 */
async function findByOrderIds(orderIds, conn = pool) {
  const byOrderId = new Map(orderIds.map((id) => [id, []]));
  if (!orderIds.length) return byOrderId;

  const [items] = await conn.query('SELECT * FROM order_items WHERE order_id IN (?)', [orderIds]);
  if (!items.length) return byOrderId;

  const itemIds = items.map((i) => i.id);
  const [perfumeRows] = await conn.query(
    `SELECT * FROM order_item_perfumes WHERE order_item_id IN (?) ORDER BY position ASC`,
    [itemIds]
  );

  for (const item of items) {
    byOrderId.get(item.order_id).push({
      ...item,
      perfumes: perfumeRows.filter((p) => p.order_item_id === item.id),
    });
  }
  return byOrderId;
}

async function addPerfumeSnapshots(orderItemId, perfumes, conn = pool) {
  const rows = perfumes.map((p, index) => [
    orderItemId,
    p.perfume_id,
    index + 1,
    p.perfume_name_snapshot,
    p.perfume_image_snapshot || null,
  ]);
  await conn.query(
    `INSERT INTO order_item_perfumes
       (order_item_id, perfume_id, position, perfume_name_snapshot, perfume_image_snapshot)
     VALUES ?`,
    [rows]
  );
}

/** Best-selling perfumes across all order/pack types, for the analytics dashboard. */
async function findTopPerfumes(limit = 10, conn = pool) {
  const [rows] = await conn.query(
    `SELECT oip.perfume_id, oip.perfume_name_snapshot, COUNT(*) AS timesIncluded
     FROM order_item_perfumes oip
     JOIN order_items oi ON oi.id = oip.order_item_id
     JOIN orders o ON o.id = oi.order_id
     WHERE o.status != 'cancelled'
     GROUP BY oip.perfume_id, oip.perfume_name_snapshot
     ORDER BY timesIncluded DESC
     LIMIT ?`,
    [limit]
  );
  return rows;
}

module.exports = { create, findByOrderId, findByOrderIds, addPerfumeSnapshots, findTopPerfumes };
