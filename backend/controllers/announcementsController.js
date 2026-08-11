const announcementsRepo = require('../db/announcementsRepo');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { toInt, toBool, requireString } = require('../utils/validators');

const ALLOWED_FIELDS = ['text_fr', 'text_ar', 'is_active', 'display_order'];

function pickPayload(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (data.text_fr) data.text_fr = requireString(data.text_fr, 'text_fr', { maxLength: 200 });
  if (data.is_active !== undefined) data.is_active = toBool(data.is_active) ? 1 : 0;
  if (data.display_order !== undefined) data.display_order = toInt(data.display_order, 'display_order');
  return data;
}

async function listPublic(req, res) {
  const rows = await announcementsRepo.findActive();
  return success(res, rows);
}

async function listAll(req, res) {
  const rows = await announcementsRepo.findAll();
  return success(res, rows);
}

async function create(req, res) {
  const data = pickPayload(req.body);
  requireString(data.text_fr, 'text_fr', { maxLength: 200 });
  const row = await announcementsRepo.create(data);
  await activityLogService.log(req, 'announcement.create', { entityType: 'announcement', entityId: row.id });
  return created(res, row);
}

async function update(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await announcementsRepo.findById(id);
  if (!existing) throw new AppError('Announcement not found', 404);
  const row = await announcementsRepo.update(id, pickPayload(req.body));
  await activityLogService.log(req, 'announcement.update', { entityType: 'announcement', entityId: id });
  return success(res, row);
}

async function reorder(req, res) {
  await announcementsRepo.reorder(req.body.items || []);
  return success(res, { ok: true });
}

async function remove(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await announcementsRepo.findById(id);
  if (!existing) throw new AppError('Announcement not found', 404);
  await announcementsRepo.remove(id);
  await activityLogService.log(req, 'announcement.delete', { entityType: 'announcement', entityId: id });
  return res.status(204).send();
}

module.exports = { listPublic, listAll, create, update, reorder, remove };
