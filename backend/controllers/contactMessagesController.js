const contactMessagesRepo = require('../db/contactMessagesRepo');
const notificationService = require('../services/notificationService');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { toInt, requireString } = require('../utils/validators');

async function submit(req, res) {
  const name = requireString(req.body.name, 'name', { maxLength: 255 });
  const message = requireString(req.body.message, 'message', { maxLength: 3000, minLength: 5 });
  const email = req.body.email ? requireString(req.body.email, 'email', { maxLength: 255 }) : null;
  const phone = req.body.phone ? requireString(req.body.phone, 'phone', { maxLength: 20 }) : null;
  const subject = req.body.subject ? requireString(req.body.subject, 'subject', { maxLength: 255 }) : null;

  const contactMessage = await contactMessagesRepo.create({ name, email, phone, subject, message, status: 'new' });

  await notificationService.notifyAdmins({
    type: 'new_contact_message',
    title: 'Nouveau message de contact',
    body: `${name} — ${subject || message.slice(0, 60)}`,
    link: '/admin/contact-messages',
    relatedId: contactMessage.id,
  });

  return created(res, contactMessage);
}

async function list(req, res) {
  const messages = await contactMessagesRepo.findAll({ status: req.query.status });
  return success(res, messages);
}

async function setStatus(req, res) {
  const id = toInt(req.params.id, 'id');
  if (!['new', 'read', 'replied', 'archived'].includes(req.body.status)) {
    throw new AppError('Invalid status', 400);
  }
  const message = await contactMessagesRepo.setStatus(id, req.body.status);
  if (!message) throw new AppError('Message not found', 404);
  return success(res, message);
}

async function remove(req, res) {
  const id = toInt(req.params.id, 'id');
  await contactMessagesRepo.remove(id);
  await activityLogService.log(req, 'contact_message.delete', { entityType: 'contact_message', entityId: id });
  return res.status(204).send();
}

module.exports = { submit, list, setStatus, remove };
