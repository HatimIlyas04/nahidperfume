require('dotenv').config();

const http = require('http');
const env = require('./config/env');
const app = require('./app');
const socketService = require('./services/socketService');
const { pool } = require('./config/db');
const { runMigrations, verifyTables, createConnection } = require('./database/scripts/run-migrations');

// The 4 tables added by migrations 024/027/030/031 -- everything this
// startup step exists to guarantee is actually queryable, not just
// "the migration script didn't throw." Older tables (packs, orders,
// customers, ...) aren't re-checked here since they're long-established
// and this check exists specifically to catch the "migration never
// applied to this environment" failure mode this project has hit
// repeatedly on Render's free tier (no Shell access to run the CLI).
const REQUIRED_TABLES = ['site_content', 'trust_badges', 'announcements', 'pack_feedback_images'];

// MySQL advisory lock name — GET_LOCK/RELEASE_LOCK are connection-scoped
// and auto-release if the connection drops, so a crashed startup can
// never leave migrations permanently locked out. Render's free tier only
// ever runs one instance, but a deploy can briefly overlap the old
// instance shutting down with the new one starting, so this guards
// against two processes racing to apply the same migration.
const MIGRATION_LOCK_NAME = 'nahid_perfumes_migrations';
const MIGRATION_LOCK_TIMEOUT_SEC = 30;

/** Logs only the error CODE for connection-level failures, never the
 *  raw driver message — MySQL's own "Access denied for user 'X'@'Y'"
 *  text embeds DB_USER, which must never reach the logs. Execution-time
 *  errors (bad SQL, missing table) are safe to log in full — their
 *  messages describe schema/query content, not credentials. */
function logMigrationFailure(stage, detail) {
  console.error('[MIGRATION] FAILED');
  console.error(`[MIGRATION] ${stage}`);
  console.error(`[MIGRATION] ${detail}`);
}

async function runStartupMigrations() {
  console.log('[MIGRATION] Starting production migrations...');

  let conn;
  try {
    conn = await createConnection();
  } catch (err) {
    logMigrationFailure('connect', err.code || 'Could not connect to the database.');
    process.exit(1);
  }

  let lockAcquired = false;
  try {
    const [[lockResult]] = await conn.query('SELECT GET_LOCK(?, ?) AS acquired', [MIGRATION_LOCK_NAME, MIGRATION_LOCK_TIMEOUT_SEC]);
    lockAcquired = lockResult.acquired === 1;
    if (!lockAcquired) {
      // Another process is already migrating (e.g. the previous deploy's
      // instance, still shutting down) — safe to proceed without
      // migrating ourselves; every migration is idempotent, so whichever
      // process finishes last leaves the DB in the same correct state.
      console.log('[MIGRATION] Another process is already applying migrations — skipping, proceeding to verification.');
    } else {
      const results = await runMigrations(conn, {
        onProgress: (filename, status) => {
          if (status === 'FAILED') {
            console.error(`[MIGRATION] ${filename}: FAILED`);
          } else {
            console.log(`[MIGRATION] ${filename}: ${status}`);
          }
        },
      });

      const failed = results.find((r) => r.status === 'FAILED');
      if (failed) {
        logMigrationFailure(failed.filename, failed.error);
        process.exit(1);
      }

      const applied = results.filter((r) => r.status === 'OK' || r.status === 'ALREADY_APPLIED_CONCURRENTLY');
      console.log(`[MIGRATION] Pending migrations checked: ${results.length}`);
      console.log(`[MIGRATION] Applied: ${applied.length > 0 ? applied.map((r) => r.filename).join(', ') : 'none (already up to date)'}`);
    }
  } catch (err) {
    logMigrationFailure('unexpected', err.message);
    process.exit(1);
  } finally {
    if (lockAcquired) {
      await conn.query('SELECT RELEASE_LOCK(?)', [MIGRATION_LOCK_NAME]).catch(() => {});
    }
    await conn.end().catch(() => {});
  }

  // Verify against a fresh connection (not the one that just ran
  // multi-statement migration files) that the tables this feature set
  // depends on are actually queryable now, not just ledgered.
  let verifyConn;
  try {
    verifyConn = await createConnection();
    const missing = await verifyTables(verifyConn, REQUIRED_TABLES);
    if (missing.length > 0) {
      logMigrationFailure('verification', `Tables still missing after migrations ran: ${missing.join(', ')}`);
      process.exit(1);
    }
  } catch (err) {
    logMigrationFailure('verification', err.message);
    process.exit(1);
  } finally {
    if (verifyConn) await verifyConn.end().catch(() => {});
  }

  console.log('[MIGRATION] Verification successful');
  console.log('[MIGRATION] Database is ready');
}

async function startServer() {
  await runStartupMigrations();

  console.log('[SERVER] Starting server...');

  const httpServer = http.createServer(app);
  socketService.init(httpServer);

  // Render (and most reverse proxies) sit in front of this server with
  // their own idle-connection timeout. If our keep-alive timeout is
  // shorter than theirs, the proxy can forward a request on a socket
  // we've already begun closing, producing an intermittent 502. Keeping
  // ours comfortably longer avoids that race — a well-known gotcha for
  // Node behind any LB/proxy.
  httpServer.keepAliveTimeout = 65000;
  httpServer.headersTimeout = 66000;

  httpServer.listen(env.port, () => {
    console.log(`[server] Nahid Perfumes API listening on port ${env.port} (${env.nodeEnv})`);
  });

  httpServer.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `[server] Port ${env.port} is already in use — another process (likely a previous ` +
        'dev server instance) is still holding it. Stop that process first, then restart.'
      );
      process.exit(1);
    }
    throw err;
  });

  // Ensures nodemon restarts (and Ctrl+C) release the port and DB pool
  // immediately instead of leaving a lingering process that the next
  // instance then collides with on the same port.
  let shuttingDown = false;
  function shutdown(signal) {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`[server] ${signal} received, shutting down gracefully...`);
    httpServer.close(() => {
      pool.end().finally(() => process.exit(0));
    });
    // Safety net: if something keeps the event loop alive, force-exit
    // rather than hang and block the next nodemon restart.
    setTimeout(() => process.exit(0), 5000).unref();
  }

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.once('SIGUSR2', () => shutdown('SIGUSR2')); // nodemon's restart signal
}

startServer().catch((err) => {
  logMigrationFailure('unexpected', err.message);
  process.exit(1);
});
