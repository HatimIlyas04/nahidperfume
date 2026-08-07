const feedbacksRepo = require('../db/feedbacksRepo');
const notificationService = require('../services/notificationService');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { toInt, requireString } = require('../utils/validators');

async function listApproved(req, res) {
  const feedbacks = await feedbacksRepo.findApproved();
  return success(res, feedbacks);
}

async function submit(req, res) {
  const firstName = requireString(req.body.first_name, 'first_name', { maxLength: 100 });
  const lastName = requireString(req.body.last_name, 'last_name', { maxLength: 100 });
  const message = requireString(req.body.message, 'message', { maxLength: 2000, minLength: 5 });
  const rating = toInt(req.body.rating, 'rating', { min: 1, max: 5 });
  const avatar = req.body.avatar ? String(req.body.avatar).slice(0, 50) : 'bloom';

  const feedback = await feedbacksRepo.create({
    first_name: firstName,
    last_name: lastName,
    message,
    rating,
    avatar,
    status: 'pending',
  });

  await notificationService.notifyAdmins({
    type: 'new_feedback',
    title: 'Nouvel avis client',
    body: `${firstName} ${lastName} — ${rating}/5`,
    link: `/admin/feedbacks`,
    relatedId: feedback.id,
  });

  return created(res, feedback);
}

async function listAll(req, res) {
  const feedbacks = await feedbacksRepo.findAll({ status: req.query.status });
  return success(res, feedbacks);
}

async function setStatus(req, res) {
  const id = toInt(req.params.id, 'id');
  if (!['approved', 'rejected', 'pending'].includes(req.body.status)) {
    throw new AppError('Invalid status', 400);
  }
  const feedback = await feedbacksRepo.setStatus(id, req.body.status);
  if (!feedback) throw new AppError('Feedback not found', 404);
  await activityLogService.log(req, 'feedback.status_change', { entityType: 'feedback', entityId: id });
  return success(res, feedback);
}

async function remove(req, res) {
  const id = toInt(req.params.id, 'id');
  await feedbacksRepo.remove(id);
  await activityLogService.log(req, 'feedback.delete', { entityType: 'feedback', entityId: id });
  return res.status(204).send();
}

module.exports = { listApproved, submit, listAll, setStatus, remove };
