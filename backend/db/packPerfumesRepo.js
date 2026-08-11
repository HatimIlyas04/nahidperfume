const { pool } = require('../config/db');

// The pack LIST view (homepage + admin packs table) only ever renders a
// perfume thumbnail + name per slot, plus the pack-level "contains" summary
// line (gender/size/concentration) -- never ingredients/notes/description/
// etc. Selecting p.* there means every pack in the public homepage payload
// carries the full perfume record (incl. long TEXT note fields) for no
// reason. The single-pack DETAIL view (PackDetails page, replace-perfume
// modal) genuinely needs the full record, so that path keeps p.*.
const LEAN_PERFUME_FIELDS = 'p.id, p.name, p.image_url, p.gender, p.size, p.concentration';

async function findByPackIds(packIds, { lean = false } = {}, conn = pool) {
  if (!packIds.length) return [];
  const [rows] = await conn.query(
    `SELECT pp.pack_id, pp.perfume_id, pp.position, ${lean ? LEAN_PERFUME_FIELDS : 'p.*'}
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

module.exports = { findByPackIds, replaceForPack };
