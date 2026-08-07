const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('../utils/AppError');

module.exports = function authAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return next(new AppError('Authentication required', 401));
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.admin = { id: payload.id, username: payload.username, role: payload.role };
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token', 401));
  }
};
