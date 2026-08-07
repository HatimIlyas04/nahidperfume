const mysql = require('mysql2/promise');
const env = require('./env');

const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  // A single Render free-tier instance (512MB RAM, one process) never needs
  // 10 concurrent DB connections — 5 comfortably covers this app's request
  // volume while staying well under the connection cap of a shared/free
  // Aiven MySQL plan.
  connectionLimit: 5,
  maxIdle: 2,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});


/**
 * Runs `fn` with a single connection wrapped in a transaction.
 * `fn` receives the connection and must use it (not the pool) for every
 * query, so all statements share the same transaction.
 */
async function withTransaction(fn) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

module.exports = { pool, withTransaction };
