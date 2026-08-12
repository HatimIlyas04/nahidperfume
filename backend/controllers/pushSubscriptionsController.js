const env = require('../config/env');
const pushSubscriptionsRepo = require('../db/pushSubscriptionsRepo');
const webPushService = require('../services/webPushService');
const AppError = require('../utils/AppError');
const { success } = require('../utils/responseShape');
const { requireString } = require('../utils/validators');

async function getVapidPublicKey(req, res) {
  if (!env.vapid.publicKey) {
    throw new AppError('Push notifications are not configured on this server yet.', 503);
  }
  return success(res, { publicKey: env.vapid.publicKey });
}

async function subscribe(req, res) {
  const endpoint = requireString(req.body.endpoint, 'endpoint', { maxLength: 500 });
  const keys = req.body.keys || {};
  const p256dh = requireString(keys.p256dh, 'keys.p256dh', { maxLength: 255 });
  const auth = requireString(keys.auth, 'keys.auth', { maxLength: 255 });
  const userAgent = req.body.user_agent ? String(req.body.user_agent).slice(0, 255) : null;

  const subscription = await pushSubscriptionsRepo.upsert({
    adminId: req.admin.id,
    endpoint,
    p256dh,
    auth,
    userAgent,
  });
  return success(res, { id: subscription.id }, 201);
}

async function unsubscribe(req, res) {
  const endpoint = requireString(req.body.endpoint, 'endpoint', { maxLength: 500 });
  await pushSubscriptionsRepo.removeByEndpoint(endpoint);
  return success(res, { ok: true });
}

async function test(req, res) {
  const result = await webPushService.sendTestPush(req.admin.id);
  if (result.reason === 'not_configured') {
    throw new AppError('Push notifications are not configured on this server yet.', 503);
  }
  if (result.reason === 'no_subscriptions') {
    throw new AppError('No device is registered for notifications yet on this account.', 400);
  }
  return success(res, result);
}

module.exports = { getVapidPublicKey, subscribe, unsubscribe, test };
