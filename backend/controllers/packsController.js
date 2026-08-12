const packService = require('../services/packService');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { requireString, toInt, toBool, toPrice } = require('../utils/validators');

const ALLOWED_FIELDS = [
  'title', 'gender', 'slug', 'description', 'cover_image', 'gallery_images', 'price', 'stock_quantity',
  'compare_at_price', 'is_active', 'is_featured', 'badge', 'is_upsell_offer', 'upsell_price', 'display_order',
];

const ALLOWED_BADGES = ['best_seller', 'new', 'limited'];
const ALLOWED_GENDERS = ['Femme', 'Homme', 'Unisexe'];

function pickPayload(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (data.title) data.title = requireString(data.title, 'title', { maxLength: 255 });
  if (data.gender !== undefined && !ALLOWED_GENDERS.includes(data.gender)) {
    throw new AppError(`Invalid gender. Must be one of: ${ALLOWED_GENDERS.join(', ')}`, 400);
  }
  if (data.price !== undefined) data.price = toPrice(data.price, 'price');
  if (data.stock_quantity !== undefined) data.stock_quantity = toInt(data.stock_quantity, 'stock_quantity', { min: 0 });
  if (data.compare_at_price !== undefined && data.compare_at_price !== null) {
    data.compare_at_price = toPrice(data.compare_at_price, 'compare_at_price');
  }
  if (data.upsell_price !== undefined && data.upsell_price !== null && data.upsell_price !== '') {
    data.upsell_price = toPrice(data.upsell_price, 'upsell_price');
  } else if (data.upsell_price === '') {
    data.upsell_price = null;
  }
  if (data.is_active !== undefined) data.is_active = toBool(data.is_active) ? 1 : 0;
  if (data.is_featured !== undefined) data.is_featured = toBool(data.is_featured) ? 1 : 0;
  if (data.badge !== undefined) data.badge = ALLOWED_BADGES.includes(data.badge) ? data.badge : null;
  if (data.is_upsell_offer !== undefined) data.is_upsell_offer = toBool(data.is_upsell_offer) ? 1 : 0;
  if (data.display_order !== undefined) data.display_order = toInt(data.display_order, 'display_order');
  return data;
}

async function list(req, res) {
  const gender = ALLOWED_GENDERS.includes(req.query.gender) ? req.query.gender : undefined;
  const packs = await packService.listPacks({ isActive: true, gender });
  return success(res, packs);
}

async function listForAdmin(req, res) {
  const packs = await packService.listPacks({});
  return success(res, packs);
}

async function getOne(req, res) {
  const pack = await packService.getPack(toInt(req.params.id, 'id'));
  return success(res, pack);
}

async function getUpsellOffers(req, res) {
  const packs = await packService.getUpsellOffers();
  return success(res, packs);
}

async function create(req, res) {
  const data = pickPayload(req.body);
  requireString(data.title, 'title', { maxLength: 255 });
  if (data.price === undefined) data.price = toPrice(req.body.price, 'price');
  const pack = await packService.createPack({ ...data, perfumeIds: req.body.perfume_ids });
  await activityLogService.log(req, 'pack.create', { entityType: 'pack', entityId: pack.id });
  return created(res, pack);
}

async function update(req, res) {
  const id = toInt(req.params.id, 'id');
  const data = pickPayload(req.body);
  const pack = await packService.updatePack(id, { ...data, perfumeIds: req.body.perfume_ids });
  await activityLogService.log(req, 'pack.update', { entityType: 'pack', entityId: id });
  return success(res, pack);
}

async function setActive(req, res) {
  const id = toInt(req.params.id, 'id');
  const pack = await packService.setActive(id, toBool(req.body.is_active));
  await activityLogService.log(req, 'pack.toggle_active', { entityType: 'pack', entityId: id });
  return success(res, pack);
}

async function reorder(req, res) {
  await packService.reorder(req.body.items || []);
  await activityLogService.log(req, 'pack.reorder', {});
  return success(res, { ok: true });
}

async function duplicate(req, res) {
  const id = toInt(req.params.id, 'id');
  const pack = await packService.duplicatePack(id);
  await activityLogService.log(req, 'pack.duplicate', { entityType: 'pack', entityId: pack.id });
  return created(res, pack);
}

async function remove(req, res) {
  const id = toInt(req.params.id, 'id');
  await packService.deletePack(id);
  await activityLogService.log(req, 'pack.delete', { entityType: 'pack', entityId: id });
  return res.status(204).send();
}

module.exports = { list, listForAdmin, getOne, getUpsellOffers, create, update, setActive, reorder, duplicate, remove };
