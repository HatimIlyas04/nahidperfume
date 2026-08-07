require('dotenv').config();

const http = require('http');
const env = require('./config/env');
const app = require('./app');
const socketService = require('./services/socketService');
const { pool } = require('./config/db');

const httpServer = http.createServer(app);
socketService.init(httpServer);

httpServer.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] Nahid Perfumes API listening on port ${env.port} (${env.nodeEnv})`);
});

httpServer.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    // eslint-disable-next-line no-console
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
  // eslint-disable-next-line no-console
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
