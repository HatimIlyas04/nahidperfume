const SLOW_THRESHOLD_MS = 300;

/**
 * Logs every request's duration and flags anything over 300ms as slow —
 * cheap (process.hrtime, no external deps) and safe to run in production
 * on Render's free tier. Not a replacement for real APM, just enough to
 * see which endpoint is actually slow instead of guessing.
 */
module.exports = function responseTime(req, res, next) {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    const line = `${req.method} ${req.originalUrl} ${res.statusCode} ${ms.toFixed(1)}ms`;
    if (ms > SLOW_THRESHOLD_MS) {
      // eslint-disable-next-line no-console
      console.warn(`[slow] ${line}`);
    } else if (process.env.LOG_ALL_REQUESTS === '1') {
      // eslint-disable-next-line no-console
      console.log(`[req] ${line}`);
    }
  });
  next();
};
