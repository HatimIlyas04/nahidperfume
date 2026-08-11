const siteContentRepo = require('../db/siteContentRepo');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success } = require('../utils/responseShape');
const { requireString } = require('../utils/validators');

async function listPublic(req, res) {
  const map = await siteContentRepo.findPublicMap();
  return success(res, map);
}

async function listAll(req, res) {
  const rows = await siteContentRepo.findAll();
  return success(res, rows);
}

async function upsert(req, res) {
  const key = requireString(req.params.key, 'key', { maxLength: 150 });
  const category = requireString(req.body.category, 'category', { maxLength: 50 });
  const valueFr = req.body.value_fr === undefined || req.body.value_fr === '' ? null : String(req.body.value_fr);
  const valueAr = req.body.value_ar === undefined || req.body.value_ar === '' ? null : String(req.body.value_ar);
  const row = await siteContentRepo.upsert(key, category, valueFr, valueAr);
  await activityLogService.log(req, 'site_content.update', { entityType: 'site_content', entityId: key });
  return success(res, row);
}

async function resetToDefault(req, res) {
  const key = requireString(req.params.key, 'key', { maxLength: 150 });
  const row = await siteContentRepo.resetToDefault(key);
  if (!row) throw new AppError('Content key not found', 404);
  await activityLogService.log(req, 'site_content.reset', { entityType: 'site_content', entityId: key });
  return success(res, row);
}

module.exports = { listPublic, listAll, upsert, resetToDefault };
