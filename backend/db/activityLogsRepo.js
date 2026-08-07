const { pool } = require('../config/db');

async function create({ adminId, action, entityType, entityId, details, ipAddress }, conn = pool) {
  await conn.query(
    `INSERT INTO activity_logs (admin_id, action, entity_type, entity_id, details_json, ip_address)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      adminId || null,
      action,
      entityType || null,
      entityId || null,
      details ? JSON.stringify(details) : null,
      ipAddress || null,
    ]
  );
}

async function findAll({ page = 1, pageSize = 50 } = {}, conn = pool) {
  const offset = (page - 1) * pageSize;
  const [rows] = await conn.query(
    `SELECT l.*, a.username AS admin_username
     FROM activity_logs l
     LEFT JOIN admins a ON a.id = l.admin_id
     ORDER BY l.created_at DESC
     LIMIT ? OFFSET ?`,
    [pageSize, offset]
  );
  const [[{ total }]] = await conn.query('SELECT COUNT(*) AS total FROM activity_logs');
  return { rows, total };
}

module.exports = { create, findAll };
