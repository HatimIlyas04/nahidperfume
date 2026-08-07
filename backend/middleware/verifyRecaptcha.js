const recaptchaService = require('../services/recaptchaService');
const AppError = require('../utils/AppError');

/** Verifies req.body.recaptcha_token against the given action name. No-ops
 * cleanly if RECAPTCHA_SECRET_KEY isn't configured (see recaptchaService). */
module.exports = function verifyRecaptcha(action) {
  return async (req, res, next) => {
    const result = await recaptchaService.verify(req.body.recaptcha_token, action);
    if (!result.passed) {
      return next(new AppError('Security check failed. Please refresh and try again.', 400));
    }
    next();
  };
};
