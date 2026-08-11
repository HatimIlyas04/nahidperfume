const bannersRepo = require('../db/bannersRepo');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { toInt, toBool, requireString } = require('../utils/validators');

const ALLOWED_FIELDS = [
  'title', 'caption', 'customer_name', 'subtitle', 'image_url', 'mobile_image_url', 'link_url', 'cta_label',
  'placement', 'is_active', 'display_order', 'starts_at', 'ends_at',
];

function pickPayload(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (data.image_url) data.image_url = requireString(data.image_url, 'image_url', { maxLength: 500 });
  if (data.is_active !== undefined) data.is_active = toBool(data.is_active) ? 1 : 0;
  if (data.display_order !== undefined) data.display_order = toInt(data.display_order, 'display_order');
  return data;
}

async function listActive(req, res) {
  const banners = await bannersRepo.findActive(req.query.placement);
  return success(res, banners);
}

async function listAll(req, res) {
  const banners = await bannersRepo.findAll();
  return success(res, banners);
}

async function create(req, res) {
  const data = pickPayload(req.body);
  requireString(data.image_url, 'image_url', { maxLength: 500 });
  const banner = await bannersRepo.create(data);
  await activityLogService.log(req, 'banner.create', { entityType: 'banner', entityId: banner.id });
  return created(res, banner);
}

async function update(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await bannersRepo.findById(id);
  if (!existing) throw new AppError('Banner not found', 404);
  const banner = await bannersRepo.update(id, pickPayload(req.body));
  await activityLogService.log(req, 'banner.update', { entityType: 'banner', entityId: id });
  return success(res, banner);
}

async function reorder(req, res) {
  await bannersRepo.reorder(req.body.items || []);
  return success(res, { ok: true });
}

async function remove(req, res) {
  const id = toInt(req.params.id, 'id');
  await bannersRepo.remove(id);
  await activityLogService.log(req, 'banner.delete', { entityType: 'banner', entityId: id });
  return res.status(204).send();
}

module.exports = { listActive, listAll, create, update, reorder, remove };
