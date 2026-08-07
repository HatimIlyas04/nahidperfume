const testimonialsRepo = require('../db/testimonialsRepo');
const feedbacksRepo = require('../db/feedbacksRepo');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { toInt, toBool, requireString } = require('../utils/validators');

const ALLOWED_FIELDS = [
  'source_feedback_id', 'name', 'role_or_location', 'avatar_url', 'rating',
  'quote', 'is_active', 'display_order',
];

function pickPayload(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (data.name) data.name = requireString(data.name, 'name', { maxLength: 150 });
  if (data.quote) data.quote = requireString(data.quote, 'quote', { maxLength: 2000 });
  if (data.is_active !== undefined) data.is_active = toBool(data.is_active) ? 1 : 0;
  if (data.display_order !== undefined) data.display_order = toInt(data.display_order, 'display_order');
  return data;
}

async function listActive(req, res) {
  const testimonials = await testimonialsRepo.findActive();
  return success(res, testimonials);
}

async function listAll(req, res) {
  const testimonials = await testimonialsRepo.findAll();
  return success(res, testimonials);
}

async function create(req, res) {
  const data = pickPayload(req.body);
  requireString(data.name, 'name', { maxLength: 150 });
  requireString(data.quote, 'quote', { maxLength: 2000 });

  if (data.source_feedback_id) {
    const feedback = await feedbacksRepo.findById(data.source_feedback_id);
    if (!feedback) throw new AppError('Source feedback not found', 404);
  }

  const testimonial = await testimonialsRepo.create(data);
  await activityLogService.log(req, 'testimonial.create', { entityType: 'testimonial', entityId: testimonial.id });
  return created(res, testimonial);
}

async function update(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await testimonialsRepo.findById(id);
  if (!existing) throw new AppError('Testimonial not found', 404);
  const testimonial = await testimonialsRepo.update(id, pickPayload(req.body));
  await activityLogService.log(req, 'testimonial.update', { entityType: 'testimonial', entityId: id });
  return success(res, testimonial);
}

async function reorder(req, res) {
  await testimonialsRepo.reorder(req.body.items || []);
  return success(res, { ok: true });
}

async function remove(req, res) {
  const id = toInt(req.params.id, 'id');
  await testimonialsRepo.remove(id);
  await activityLogService.log(req, 'testimonial.delete', { entityType: 'testimonial', entityId: id });
  return res.status(204).send();
}

module.exports = { listActive, listAll, create, update, reorder, remove };
