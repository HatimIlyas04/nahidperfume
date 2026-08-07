const homepageSectionsRepo = require('../db/homepageSectionsRepo');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success } = require('../utils/responseShape');
const { toInt, toBool } = require('../utils/validators');

const ALLOWED_FIELDS = ['title', 'subtitle', 'content_json', 'is_active', 'display_order'];

function pickPayload(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (data.is_active !== undefined) data.is_active = toBool(data.is_active) ? 1 : 0;
  if (data.display_order !== undefined) data.display_order = toInt(data.display_order, 'display_order');
  if (data.content_json !== undefined && typeof data.content_json !== 'string') {
    data.content_json = JSON.stringify(data.content_json);
  }
  return data;
}

async function listActive(req, res) {
  const sections = await homepageSectionsRepo.findActive();
  return success(res, sections);
}

async function listAll(req, res) {
  const sections = await homepageSectionsRepo.findAll();
  return success(res, sections);
}

async function update(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await homepageSectionsRepo.findById(id);
  if (!existing) throw new AppError('Homepage section not found', 404);
  const section = await homepageSectionsRepo.update(id, pickPayload(req.body));
  await activityLogService.log(req, 'homepage_section.update', { entityType: 'homepage_section', entityId: id });
  return success(res, section);
}

async function reorder(req, res) {
  await homepageSectionsRepo.reorder(req.body.items || []);
  return success(res, { ok: true });
}

module.exports = { listActive, listAll, update, reorder };
