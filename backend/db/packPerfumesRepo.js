const { pool } = require('../config/db');

async function findByPackId(packId, conn = pool) {
  const [rows] = await conn.query(
    `SELECT pp.pack_id, pp.perfume_id, pp.position, p.*
     FROM pack_perfumes pp
     JOIN perfumes p ON p.id = pp.perfume_id
     WHERE pp.pack_id = ?
     ORDER BY pp.position ASC`,
    [packId]
  );
  return rows;
}

async function findByPackIds(packIds, conn = pool) {
  if (!packIds.length) return [];
  const [rows] = await conn.query(
    `SELECT pp.pack_id, pp.perfume_id, pp.position, p.*
     FROM pack_perfumes pp
     JOIN perfumes p ON p.id = pp.perfume_id
     WHERE pp.pack_id IN (?)
     ORDER BY pp.pack_id ASC, pp.position ASC`,
    [packIds]
  );
  return rows;
}

async function replaceForPack(packId, perfumeIds, conn = pool) {
  await conn.query('DELETE FROM pack_perfumes WHERE pack_id = ?', [packId]);
  const rows = perfumeIds.map((perfumeId, index) => [packId, perfumeId, index + 1]);
  await conn.query('INSERT INTO pack_perfumes (pack_id, perfume_id, position) VALUES ?', [rows]);
}

module.exports = { findByPackId, findByPackIds, replaceForPack };
