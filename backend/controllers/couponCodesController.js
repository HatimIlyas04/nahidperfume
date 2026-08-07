const couponCodesRepo = require('../db/couponCodesRepo');
const couponService = require('../services/couponService');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { toInt, toPrice, toBool, requireString } = require('../utils/validators');

async function validate(req, res) {
  const code = requireString(req.body.code, 'code', { maxLength: 50 });
  const subtotal = Number(req.body.subtotal);
  if (!Number.isFinite(subtotal) || subtotal < 0) throw new AppError('Invalid subtotal', 400);
  const { coupon, discount } = await couponService.previewCoupon(code, subtotal);
  return success(res, {
    code: coupon.code,
    discount_type: coupon.discount_type,
    discount_value: coupon.discount_value,
    discount,
  });
}

const ALLOWED_FIELDS = [
  'code', 'discount_type', 'discount_value', 'min_order_amount', 'max_uses',
  'max_uses_per_customer', 'is_active', 'starts_at', 'expires_at',
];

function pickPayload(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (data.code) data.code = requireString(data.code, 'code', { maxLength: 50 }).toUpperCase();
  if (data.discount_type && !['percent', 'fixed'].includes(data.discount_type)) {
    throw new AppError('discount_type must be "percent" or "fixed"', 400);
  }
  if (data.discount_value !== undefined) data.discount_value = toPrice(data.discount_value, 'discount_value');
  if (data.min_order_amount !== undefined && data.min_order_amount !== null) {
    data.min_order_amount = toPrice(data.min_order_amount, 'min_order_amount');
  }
  if (data.max_uses !== undefined && data.max_uses !== null) data.max_uses = toInt(data.max_uses, 'max_uses', { min: 1 });
  if (data.is_active !== undefined) data.is_active = toBool(data.is_active) ? 1 : 0;
  return data;
}

async function list(req, res) {
  const coupons = await couponCodesRepo.findAll();
  return success(res, coupons);
}

async function create(req, res) {
  const data = pickPayload(req.body);
  requireString(data.code, 'code', { maxLength: 50 });
  if (!data.discount_type) throw new AppError('discount_type is required', 400);
  if (data.discount_value === undefined) throw new AppError('discount_value is required', 400);
  const coupon = await couponCodesRepo.create(data);
  await activityLogService.log(req, 'coupon.create', { entityType: 'coupon', entityId: coupon.id });
  return created(res, coupon);
}

async function update(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await couponCodesRepo.findById(id);
  if (!existing) throw new AppError('Coupon not found', 404);
  const data = pickPayload(req.body);
  const coupon = await couponCodesRepo.update(id, data);
  await activityLogService.log(req, 'coupon.update', { entityType: 'coupon', entityId: id });
  return success(res, coupon);
}

async function remove(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await couponCodesRepo.findById(id);
  if (!existing) throw new AppError('Coupon not found', 404);
  await couponCodesRepo.remove(id);
  await activityLogService.log(req, 'coupon.delete', { entityType: 'coupon', entityId: id });
  return res.status(204).send();
}

module.exports = { validate, list, create, update, remove };
