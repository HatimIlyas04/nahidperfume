const env = require('../config/env');

// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  if (err && err.isAppError) {
    return res.status(err.statusCode).json({ success: false, error: err.message, details: err.details });
  }

  if (err && err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ success: false, error: 'This value already exists (duplicate entry).' });
  }

  if (err && (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED')) {
    return res.status(409).json({ success: false, error: 'This item is still referenced elsewhere and cannot be deleted.' });
  }

  // A missing table (ER_NO_SUCH_TABLE / errno 1146) means a database
  // migration hasn't been applied to this environment yet -- an
  // operational config issue, not a security-sensitive detail, so it's
  // safe (and far more actionable than a bare 500) to say so directly
  // without leaking the actual table/column name or a stack trace.
  if (err && err.code === 'ER_NO_SUCH_TABLE') {
    // eslint-disable-next-line no-console
    console.error('[error] missing table -- pending migration:', err.sqlMessage || err.message);
    return res.status(503).json({
      success: false,
      error: 'A required database table is missing. A pending database migration needs to be applied.',
    });
  }

  // eslint-disable-next-line no-console
  console.error('[error]', err);
  return res.status(500).json({
    success: false,
    error: 'Internal server error',
    ...(env.nodeEnv !== 'production' ? { message: err.message, stack: err.stack } : {}),
  });
};
