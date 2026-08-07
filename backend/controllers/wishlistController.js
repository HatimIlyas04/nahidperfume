const wishlistRepo = require('../db/wishlistRepo');
const AppError = require('../utils/AppError');
const { success } = require('../utils/responseShape');
const { toInt, requireString } = require('../utils/validators');

function getDeviceToken(req) {
  const token = req.query.device_token || req.body.device_token;
  return requireString(token, 'device_token', { maxLength: 64, minLength: 8 });
}

async function get(req, res) {
  const deviceToken = getDeviceToken(req);
  const wishlist = await wishlistRepo.getForDevice(deviceToken);
  return success(res, wishlist);
}

async function addPerfume(req, res) {
  const deviceToken = getDeviceToken(req);
  const perfumeId = toInt(req.body.perfume_id, 'perfume_id');
  await wishlistRepo.addPerfume(deviceToken, perfumeId);
  return success(res, { ok: true });
}

async function removePerfume(req, res) {
  const deviceToken = getDeviceToken(req);
  const perfumeId = toInt(req.params.perfumeId, 'perfumeId');
  await wishlistRepo.removePerfume(deviceToken, perfumeId);
  return success(res, { ok: true });
}

async function addPack(req, res) {
  const deviceToken = getDeviceToken(req);
  const packId = toInt(req.body.pack_id, 'pack_id');
  await wishlistRepo.addPack(deviceToken, packId);
  return success(res, { ok: true });
}

async function removePack(req, res) {
  const deviceToken = getDeviceToken(req);
  const packId = toInt(req.params.packId, 'packId');
  await wishlistRepo.removePack(deviceToken, packId);
  return success(res, { ok: true });
}

module.exports = { get, addPerfume, removePerfume, addPack, removePack };
