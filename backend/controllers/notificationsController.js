const notificationsRepo = require('../db/notificationsRepo');
const { success } = require('../utils/responseShape');
const { toInt, toBool } = require('../utils/validators');

async function list(req, res) {
  const unreadOnly = toBool(req.query.unread);
  const notifications = await notificationsRepo.findAll({ unreadOnly });
  const unreadCount = await notificationsRepo.countUnread();
  return success(res, { notifications, unreadCount });
}

async function markRead(req, res) {
  await notificationsRepo.markRead(toInt(req.params.id, 'id'));
  return success(res, { ok: true });
}

async function markAllRead(req, res) {
  await notificationsRepo.markAllRead();
  return success(res, { ok: true });
}

module.exports = { list, markRead, markAllRead };
