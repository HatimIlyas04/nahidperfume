const faqRepo = require('../db/faqRepo');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { toInt, toBool, requireString } = require('../utils/validators');

const ALLOWED_FIELDS = ['question', 'answer', 'category', 'is_active', 'display_order'];

function pickPayload(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (data.question) data.question = requireString(data.question, 'question', { maxLength: 500 });
  if (data.answer) data.answer = requireString(data.answer, 'answer', { maxLength: 5000 });
  if (data.is_active !== undefined) data.is_active = toBool(data.is_active) ? 1 : 0;
  if (data.display_order !== undefined) data.display_order = toInt(data.display_order, 'display_order');
  return data;
}

async function listActive(req, res) {
  const faqs = await faqRepo.findActive(req.query.category);
  return success(res, faqs);
}

async function listAll(req, res) {
  const faqs = await faqRepo.findAll();
  return success(res, faqs);
}

async function create(req, res) {
  const data = pickPayload(req.body);
  requireString(data.question, 'question', { maxLength: 500 });
  requireString(data.answer, 'answer', { maxLength: 5000 });
  const faq = await faqRepo.create(data);
  await activityLogService.log(req, 'faq.create', { entityType: 'faq', entityId: faq.id });
  return created(res, faq);
}

async function update(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await faqRepo.findById(id);
  if (!existing) throw new AppError('FAQ entry not found', 404);
  const faq = await faqRepo.update(id, pickPayload(req.body));
  await activityLogService.log(req, 'faq.update', { entityType: 'faq', entityId: id });
  return success(res, faq);
}

async function reorder(req, res) {
  await faqRepo.reorder(req.body.items || []);
  return success(res, { ok: true });
}

async function remove(req, res) {
  const id = toInt(req.params.id, 'id');
  await faqRepo.remove(id);
  await activityLogService.log(req, 'faq.delete', { entityType: 'faq', entityId: id });
  return res.status(204).send();
}

module.exports = { listActive, listAll, create, update, reorder, remove };
