const IS_DEV = process.env.NODE_ENV !== 'production';

/**
 * Logs every request's duration — cheap (process.hrtime, no external deps),
 * safe on Render's free tier. Two modes:
 *  - Development: every request logged as `[PERF] METHOD path - Nms`, so
 *    you can see exactly what's slow while working locally.
 *  - Production: quiet unless a request crosses 300ms, so logs stay small
 *    (Render's free-tier log retention is limited) but a real slowdown
 *    still shows up instead of being silently lost.
 */
module.exports = function responseTime(req, res, next) {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    const line = `${req.method} ${req.originalUrl} - ${ms.toFixed(1)}ms`;

    if (IS_DEV) {
      const bucket = ms >= 1000 ? '🔴 CRITICAL' : ms >= 500 ? '🟠 SLOW' : ms >= 300 ? '🟡 OK' : ms >= 100 ? '🟢 FAST' : '⚡ INSTANT';
      // eslint-disable-next-line no-console
      console.log(`[PERF] ${line} [${bucket}]`);
      return;
    }

    if (ms > 300) {
      // eslint-disable-next-line no-console
      console.warn(`[slow] ${line} (${res.statusCode})`);
    }
  });
  next();
};
