const orderService = require('../services/orderService');
const couponService = require('../services/couponService');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { toInt, requireString } = require('../utils/validators');

async function create(req, res) {
  const order = await orderService.createOrder(req.body);
  return created(res, order);
}

async function track(req, res) {
  const orderNumber = requireString(req.query.order_number, 'order_number', { maxLength: 20 });
  const phone = requireString(req.query.phone, 'phone', { maxLength: 20 });
  const order = await orderService.trackOrder(orderNumber, phone);
  return success(res, order);
}

async function validateCoupon(req, res) {
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

async function list(req, res) {
  const { status, search, page, page_size: pageSize } = req.query;
  const result = await orderService.listOrders({
    status,
    search,
    page: page ? toInt(page, 'page', { min: 1 }) : 1,
    pageSize: pageSize ? toInt(pageSize, 'page_size', { min: 1, max: 100 }) : 20,
  });
  return success(res, result);
}

async function getOne(req, res) {
  const order = await orderService.getOrder(toInt(req.params.id, 'id'));
  return success(res, order);
}

async function updateStatus(req, res) {
  const id = toInt(req.params.id, 'id');
  const order = await orderService.updateStatus(id, req.body.status);
  await activityLogService.log(req, 'order.status_change', {
    entityType: 'order',
    entityId: id,
    details: { status: req.body.status },
  });
  return success(res, order);
}

async function updateNotes(req, res) {
  const id = toInt(req.params.id, 'id');
  const order = await orderService.updateNotes(id, req.body.admin_notes || null);
  await activityLogService.log(req, 'order.notes_update', { entityType: 'order', entityId: id });
  return success(res, order);
}

async function stats(req, res) {
  const data = await orderService.getStats();
  return success(res, data);
}

async function applyUpsell(req, res) {
  const id = toInt(req.params.id, 'id');
  const token = requireString(req.body.upsell_token, 'upsell_token', { maxLength: 2000 });
  const order = await orderService.applyUpsell(id, token);
  return success(res, order);
}

module.exports = { create, track, validateCoupon, list, getOne, updateStatus, updateNotes, stats, applyUpsell };
