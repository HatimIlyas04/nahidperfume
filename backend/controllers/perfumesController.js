const perfumesRepo = require('../db/perfumesRepo');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { requireString, toInt, toBool, slugify } = require('../utils/validators');

const ALLOWED_FIELDS = [
  'name', 'slug', 'description', 'category', 'gender', 'product_type', 'inspired_by',
  'concentration', 'scent_family', 'scent_intensity', 'longevity', 'top_notes',
  'middle_notes', 'base_notes', 'ingredients', 'size', 'image_url', 'gallery_images',
  'is_new', 'is_bestseller', 'is_active', 'display_order',
];

function pickPayload(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (data.name) data.name = requireString(data.name, 'name', { maxLength: 255 });
  if (data.is_new !== undefined) data.is_new = toBool(data.is_new) ? 1 : 0;
  if (data.is_bestseller !== undefined) data.is_bestseller = toBool(data.is_bestseller) ? 1 : 0;
  if (data.is_active !== undefined) data.is_active = toBool(data.is_active) ? 1 : 0;
  if (data.display_order !== undefined) data.display_order = toInt(data.display_order, 'display_order');
  return data;
}

async function list(req, res) {
  const { gender, category, product_type: productType, active } = req.query;
  const isActive = active === undefined ? undefined : active === 'true';
  const perfumes = await perfumesRepo.findAll({ isActive, gender, category, productType });
  return success(res, perfumes);
}

async function listForAdmin(req, res) {
  const perfumes = await perfumesRepo.findAll({});
  return success(res, perfumes);
}

async function getOne(req, res) {
  const perfume = await perfumesRepo.findById(toInt(req.params.id, 'id'));
  if (!perfume) throw new AppError('Perfume not found', 404);
  return success(res, perfume);
}

async function create(req, res) {
  const data = pickPayload(req.body);
  requireString(data.name, 'name', { maxLength: 255 });
  if (!data.slug && data.name) data.slug = `${slugify(data.name)}-${Date.now().toString(36)}`;
  const perfume = await perfumesRepo.create(data);
  await activityLogService.log(req, 'perfume.create', { entityType: 'perfume', entityId: perfume.id });
  return created(res, perfume);
}

async function update(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await perfumesRepo.findById(id);
  if (!existing) throw new AppError('Perfume not found', 404);
  const data = pickPayload(req.body);
  const perfume = await perfumesRepo.update(id, data);
  await activityLogService.log(req, 'perfume.update', { entityType: 'perfume', entityId: id });
  return success(res, perfume);
}

async function setActive(req, res) {
  const id = toInt(req.params.id, 'id');
  const perfume = await perfumesRepo.setActive(id, toBool(req.body.is_active));
  if (!perfume) throw new AppError('Perfume not found', 404);
  await activityLogService.log(req, 'perfume.toggle_active', { entityType: 'perfume', entityId: id });
  return success(res, perfume);
}

async function remove(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await perfumesRepo.findById(id);
  if (!existing) throw new AppError('Perfume not found', 404);
  const referenced = await perfumesRepo.isReferencedByAnyPack(id);
  if (referenced) {
    throw new AppError('This perfume is used in one or more packs. Deactivate it instead of deleting, or remove it from those packs first.', 409);
  }
  await perfumesRepo.remove(id);
  await activityLogService.log(req, 'perfume.delete', { entityType: 'perfume', entityId: id });
  return res.status(204).send();
}

module.exports = { list, listForAdmin, getOne, create, update, setActive, remove };
