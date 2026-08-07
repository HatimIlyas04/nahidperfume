const AppError = require('../utils/AppError');

module.exports = function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.admin) {
      return next(new AppError('Authentication required', 401));
    }
    if (!roles.includes(req.admin.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};
