const customersRepo = require('../db/customersRepo');
const { success } = require('../utils/responseShape');
const { toInt } = require('../utils/validators');

async function list(req, res) {
  const { search, page, page_size: pageSize } = req.query;
  const result = await customersRepo.findAll({
    search,
    page: page ? toInt(page, 'page', { min: 1 }) : 1,
    pageSize: pageSize ? toInt(pageSize, 'page_size', { min: 1, max: 100 }) : 20,
  });
  return success(res, result);
}

module.exports = { list };
