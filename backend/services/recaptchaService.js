const axios = require('axios');
const env = require('../config/env');

/**
 * Verifies a reCAPTCHA v3 token. Returns true (allow the request through)
 * when reCAPTCHA isn't configured yet — this is a defense layer, not a
 * hard requirement, so it must never brick checkout/contact/feedback if
 * RECAPTCHA_SECRET_KEY hasn't been set.
 */
async function verify(token, action) {
  if (!env.recaptcha.secretKey) {
    return { passed: true, reason: 'not_configured' };
  }
  if (!token) {
    return { passed: false, reason: 'missing_token' };
  }

  try {
    const { data } = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({ secret: env.recaptcha.secretKey, response: token }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 8000 }
    );
    if (!data.success) return { passed: false, reason: 'verification_failed' };
    if (action && data.action !== action) return { passed: false, reason: 'action_mismatch' };
    if (typeof data.score === 'number' && data.score < env.recaptcha.minScore) {
      return { passed: false, reason: 'low_score', score: data.score };
    }
    return { passed: true, score: data.score };
  } catch (err) {
    // Network hiccup on Google's side shouldn't block real customers.
    // eslint-disable-next-line no-console
    console.error('[recaptchaService] verification request failed', err.message);
    return { passed: true, reason: 'verify_request_failed' };
  }
}

module.exports = { verify };
