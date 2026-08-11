const trustBadgesRepo = require('../db/trustBadgesRepo');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { toInt, toBool, requireString } = require('../utils/validators');

const ALLOWED_FIELDS = ['icon_key', 'title_fr', 'title_ar', 'subtitle_fr', 'subtitle_ar', 'is_active', 'display_order'];
const ALLOWED_ICONS = ['shield', 'truck', 'refresh', 'phone'];

function pickPayload(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (data.title_fr) data.title_fr = requireString(data.title_fr, 'title_fr', { maxLength: 150 });
  if (data.icon_key !== undefined && !ALLOWED_ICONS.includes(data.icon_key)) {
    throw new AppError(`Invalid icon_key. Must be one of: ${ALLOWED_ICONS.join(', ')}`, 400);
  }
  if (data.is_active !== undefined) data.is_active = toBool(data.is_active) ? 1 : 0;
  if (data.display_order !== undefined) data.display_order = toInt(data.display_order, 'display_order');
  return data;
}

async function listPublic(req, res) {
  const rows = await trustBadgesRepo.findActive();
  return success(res, rows);
}

async function listAll(req, res) {
  const rows = await trustBadgesRepo.findAll();
  return success(res, rows);
}

async function create(req, res) {
  const data = pickPayload(req.body);
  requireString(data.title_fr, 'title_fr', { maxLength: 150 });
  const badge = await trustBadgesRepo.create(data);
  await activityLogService.log(req, 'trust_badge.create', { entityType: 'trust_badge', entityId: badge.id });
  return created(res, badge);
}

async function update(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await trustBadgesRepo.findById(id);
  if (!existing) throw new AppError('Trust badge not found', 404);
  const badge = await trustBadgesRepo.update(id, pickPayload(req.body));
  await activityLogService.log(req, 'trust_badge.update', { entityType: 'trust_badge', entityId: id });
  return success(res, badge);
}

async function reorder(req, res) {
  await trustBadgesRepo.reorder(req.body.items || []);
  return success(res, { ok: true });
}

async function remove(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await trustBadgesRepo.findById(id);
  if (!existing) throw new AppError('Trust badge not found', 404);
  await trustBadgesRepo.remove(id);
  await activityLogService.log(req, 'trust_badge.delete', { entityType: 'trust_badge', entityId: id });
  return res.status(204).send();
}

module.exports = { listPublic, listAll, create, update, reorder, remove };
