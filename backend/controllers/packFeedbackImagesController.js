const packFeedbackImagesRepo = require('../db/packFeedbackImagesRepo');
const packsRepo = require('../db/packsRepo');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { toInt, toBool, requireString } = require('../utils/validators');

async function requirePack(packId) {
  const pack = await packsRepo.findById(packId);
  if (!pack) throw new AppError('Pack not found', 404);
  return pack;
}

async function listAll(req, res) {
  const packId = toInt(req.params.packId, 'packId');
  await requirePack(packId);
  const rows = await packFeedbackImagesRepo.findAllByPackId(packId);
  return success(res, rows);
}

async function create(req, res) {
  const packId = toInt(req.params.packId, 'packId');
  await requirePack(packId);
  const imageUrl = requireString(req.body.image_url, 'image_url', { maxLength: 500 });
  let row;
  try {
    const existing = await packFeedbackImagesRepo.findAllByPackId(packId);
    row = await packFeedbackImagesRepo.create({
      pack_id: packId,
      image_url: imageUrl,
      display_order: existing.length,
      is_active: 1,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[PACK_FEEDBACK_UPLOAD] packId=${packId} database=FAILED code=${err.code || 'unknown'} message=${err.sqlMessage || err.message}`);
    throw err; // still handled centrally (errorHandler.js) for the HTTP response
  }
  // eslint-disable-next-line no-console
  console.log(`[PACK_FEEDBACK_UPLOAD] packId=${packId} database=OK imageId=${row.id}`);
  await activityLogService.log(req, 'pack_feedback_image.create', { entityType: 'pack_feedback_image', entityId: row.id, details: { pack_id: packId } });
  return created(res, row);
}

async function update(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await packFeedbackImagesRepo.findById(id);
  if (!existing) throw new AppError('Feedback image not found', 404);

  const data = {};
  if (req.body.image_url !== undefined) data.image_url = requireString(req.body.image_url, 'image_url', { maxLength: 500 });
  if (req.body.is_active !== undefined) data.is_active = toBool(req.body.is_active) ? 1 : 0;

  const row = await packFeedbackImagesRepo.update(id, existing.pack_id, data);
  await activityLogService.log(req, 'pack_feedback_image.update', { entityType: 'pack_feedback_image', entityId: id });
  return success(res, row);
}

async function reorder(req, res) {
  const packId = toInt(req.params.packId, 'packId');
  await requirePack(packId);
  await packFeedbackImagesRepo.reorder(packId, req.body.items || []);
  return success(res, { ok: true });
}

async function remove(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await packFeedbackImagesRepo.findById(id);
  if (!existing) throw new AppError('Feedback image not found', 404);
  await packFeedbackImagesRepo.remove(id, existing.pack_id);
  await activityLogService.log(req, 'pack_feedback_image.delete', { entityType: 'pack_feedback_image', entityId: id, details: { pack_id: existing.pack_id } });
  return res.status(204).send();
}

module.exports = { listAll, create, update, reorder, remove };
