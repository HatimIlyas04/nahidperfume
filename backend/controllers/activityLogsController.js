const activityLogsRepo = require('../db/activityLogsRepo');
const { success } = require('../utils/responseShape');
const { toInt } = require('../utils/validators');

async function list(req, res) {
  const { page, page_size: pageSize } = req.query;
  const result = await activityLogsRepo.findAll({
    page: page ? toInt(page, 'page', { min: 1 }) : 1,
    pageSize: pageSize ? toInt(pageSize, 'page_size', { min: 1, max: 200 }) : 50,
  });
  return success(res, result);
}

module.exports = { list };
