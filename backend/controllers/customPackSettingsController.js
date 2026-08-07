const customPackService = require('../services/customPackService');
const activityLogService = require('../services/activityLogService');
const { success } = require('../utils/responseShape');
const { toPrice, toBool, requireString } = require('../utils/validators');

async function getPublic(req, res) {
  const settings = await customPackService.getSettings();
  return success(res, settings);
}

async function update(req, res) {
  const data = {};
  if (req.body.is_active !== undefined) data.is_active = toBool(req.body.is_active) ? 1 : 0;
  if (req.body.flat_price !== undefined) data.flat_price = toPrice(req.body.flat_price, 'flat_price');
  if (req.body.title !== undefined) data.title = requireString(req.body.title, 'title', { maxLength: 255 });
  if (req.body.description !== undefined) data.description = req.body.description;

  const settings = await customPackService.updateSettings(data);
  await activityLogService.log(req, 'custom_pack_settings.update', {});
  return success(res, settings);
}

module.exports = { getPublic, update };
