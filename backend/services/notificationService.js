const notificationsRepo = require('../db/notificationsRepo');
const socketService = require('./socketService');

/** Persists the notification (for the bell's history/unread count) and
 * pushes it live to any connected admin dashboards via Socket.IO. */
async function notifyAdmins({ type, title, body, link, relatedId }) {
  const notification = await notificationsRepo.create({ type, title, body, link, relatedId });
  socketService.emitToAdmins('new_notification', notification);
  return notification;
}

module.exports = { notifyAdmins };
