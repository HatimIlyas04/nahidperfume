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

  // eslint-disable-next-line no-console
  console.error('[error]', err);
  return res.status(500).json({
    success: false,
    error: 'Internal server error',
    ...(env.nodeEnv !== 'production' ? { message: err.message, stack: err.stack } : {}),
  });
};
