const { pool } = require('../config/db');

async function getForDevice(deviceToken, conn = pool) {
  const [perfumes] = await conn.query(
    `SELECT p.* FROM wishlist_perfumes w JOIN perfumes p ON p.id = w.perfume_id
     WHERE w.device_token = ? ORDER BY w.created_at DESC`,
    [deviceToken]
  );
  const [packs] = await conn.query(
    `SELECT p.* FROM wishlist_packs w JOIN packs p ON p.id = w.pack_id
     WHERE w.device_token = ? ORDER BY w.created_at DESC`,
    [deviceToken]
  );
  return { perfumes, packs };
}

async function addPerfume(deviceToken, perfumeId, conn = pool) {
  await conn.query(
    'INSERT IGNORE INTO wishlist_perfumes (device_token, perfume_id) VALUES (?, ?)',
    [deviceToken, perfumeId]
  );
}

async function removePerfume(deviceToken, perfumeId, conn = pool) {
  await conn.query('DELETE FROM wishlist_perfumes WHERE device_token = ? AND perfume_id = ?', [
    deviceToken,
    perfumeId,
  ]);
}

async function addPack(deviceToken, packId, conn = pool) {
  await conn.query('INSERT IGNORE INTO wishlist_packs (device_token, pack_id) VALUES (?, ?)', [
    deviceToken,
    packId,
  ]);
}

async function removePack(deviceToken, packId, conn = pool) {
  await conn.query('DELETE FROM wishlist_packs WHERE device_token = ? AND pack_id = ?', [
    deviceToken,
    packId,
  ]);
}

module.exports = { getForDevice, addPerfume, removePerfume, addPack, removePack };
