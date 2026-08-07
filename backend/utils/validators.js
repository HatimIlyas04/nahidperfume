const AppError = require('./AppError');

function toPrice(value, fieldName = 'price') {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0 || num > 1000000) {
    throw new AppError(`Invalid ${fieldName}: must be a number between 0 and 1,000,000`, 400);
  }
  return Math.round(num * 100) / 100;
}

function toInt(value, fieldName = 'value', { min = null, max = null } = {}) {
  const num = Number(value);
  if (!Number.isInteger(num)) {
    throw new AppError(`Invalid ${fieldName}: must be an integer`, 400);
  }
  if (min !== null && num < min) throw new AppError(`Invalid ${fieldName}: must be >= ${min}`, 400);
  if (max !== null && num > max) throw new AppError(`Invalid ${fieldName}: must be <= ${max}`, 400);
  return num;
}

function toBool(value) {
  return value === true || value === 1 || value === '1' || value === 'true';
}

function requireString(value, fieldName, { maxLength = 1000, minLength = 1 } = {}) {
  if (typeof value !== 'string' || value.trim().length < minLength) {
    throw new AppError(`${fieldName} is required`, 400);
  }
  const trimmed = value.trim();
  if (trimmed.length > maxLength) {
    throw new AppError(`${fieldName} must be at most ${maxLength} characters`, 400);
  }
  return trimmed;
}

/** Accepts 0[5-7]XXXXXXXX or +212[5-7]XXXXXXXX (spaces/dashes ignored) —
 *  mirrors frontend/src/utils/validation.js so a request that bypasses the
 *  browser form (direct API call) can't slip a malformed phone number past
 *  checkout, where it would later break WhatsApp notification delivery
 *  and order-tracking lookups. */
function requireMoroccanPhone(value, fieldName = 'Phone number') {
  const cleaned = String(value || '').replace(/[\s.-]/g, '');
  if (!/^(?:\+212|0)[5-7]\d{8}$/.test(cleaned)) {
    throw new AppError(`${fieldName} must be a valid Moroccan phone number`, 400);
  }
  return cleaned;
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 240);
}

module.exports = { toPrice, toInt, toBool, requireString, requireMoroccanPhone, slugify };
