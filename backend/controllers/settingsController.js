const settingsRepo = require('../db/settingsRepo');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success } = require('../utils/responseShape');

async function getPublic(req, res) {
  const rows = await settingsRepo.findPublic();
  return success(res, Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value])));
}

async function getAll(req, res) {
  const rows = await settingsRepo.findAll();
  return success(res, rows);
}

async function update(req, res) {
  const entries = req.body.settings;
  if (!Array.isArray(entries) || !entries.length) {
    throw new AppError('settings must be a non-empty array of { key, value }', 400);
  }
  for (const entry of entries) {
    if (!entry.key || typeof entry.key !== 'string') {
      throw new AppError('Each setting entry needs a string "key"', 400);
    }
  }
  await settingsRepo.upsertMany(entries);
  await activityLogService.log(req, 'settings.update', { details: { keys: entries.map((e) => e.key) } });
  const rows = await settingsRepo.findAll();
  return success(res, rows);
}

module.exports = { getPublic, getAll, update };
