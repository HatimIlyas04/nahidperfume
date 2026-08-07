const activityLogsRepo = require('../db/activityLogsRepo');

async function log(req, action, { entityType, entityId, details } = {}) {
  try {
    await activityLogsRepo.create({
      adminId: req.admin ? req.admin.id : null,
      action,
      entityType,
      entityId,
      details,
      ipAddress: req.ip,
    });
  } catch (err) {
    // Logging must never break the primary request.
    // eslint-disable-next-line no-console
    console.error('[activityLogService] failed to log action', action, err.message);
  }
}

module.exports = { log };
