/**
 * Post-migration verification: table existence, row-count parity,
 * foreign keys, and indexes. Read-only.
 * Usage: node database/scripts/verify.js
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

const EXPECTED_TABLES = [
  'schema_migrations', 'admins', 'perfumes', 'customers', 'packs', 'pack_perfumes',
  'custom_pack_settings', 'coupon_codes', 'orders', 'order_items', 'order_item_perfumes',
  'feedbacks', 'testimonials', 'wishlist_perfumes', 'wishlist_packs', 'notifications',
  'settings', 'banners', 'homepage_sections', 'faq', 'contact_messages', 'activity_logs',
];

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  });

  console.log('=== Table existence ===');
  const [tables] = await conn.query('SHOW TABLES');
  const existing = new Set(tables.map((r) => Object.values(r)[0]));
  for (const t of EXPECTED_TABLES) {
    console.log(`  ${existing.has(t) ? 'OK  ' : 'MISSING'} ${t}`);
  }
  const unexpectedLegacy = ['products', 'reviews'].filter((t) => existing.has(t));
  console.log(`  (legacy tables still present, expected until manual cleanup: ${unexpectedLegacy.join(', ') || 'none'})`);

  console.log('\n=== Row counts ===');
  for (const t of ['perfumes', 'customers', 'packs', 'pack_perfumes', 'orders', 'order_items', 'order_item_perfumes', 'feedbacks', 'admins', 'settings', 'homepage_sections']) {
    if (!existing.has(t)) continue;
    const [[{ c }]] = await conn.query(`SELECT COUNT(*) AS c FROM \`${t}\``);
    console.log(`  ${t}: ${c}`);
  }
  if (existing.has('reviews')) {
    const [[{ c }]] = await conn.query('SELECT COUNT(*) AS c FROM reviews');
    console.log(`  reviews (legacy, pending manual drop): ${c}`);
  }

  console.log('\n=== Foreign keys ===');
  const [fks] = await conn.query(
    `SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
     FROM information_schema.KEY_COLUMN_USAGE
     WHERE TABLE_SCHEMA = DATABASE() AND REFERENCED_TABLE_NAME IS NOT NULL
     ORDER BY TABLE_NAME, COLUMN_NAME`
  );
  fks.forEach((fk) =>
    console.log(`  ${fk.TABLE_NAME}.${fk.COLUMN_NAME} -> ${fk.REFERENCED_TABLE_NAME}.${fk.REFERENCED_COLUMN_NAME} (${fk.CONSTRAINT_NAME})`)
  );
  console.log(`  Total FKs: ${fks.length}`);

  console.log('\n=== Indexes (non-PK) ===');
  const [idx] = await conn.query(
    `SELECT TABLE_NAME, INDEX_NAME, GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) AS cols
     FROM information_schema.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE() AND INDEX_NAME != 'PRIMARY'
     GROUP BY TABLE_NAME, INDEX_NAME
     ORDER BY TABLE_NAME, INDEX_NAME`
  );
  idx.forEach((i) => console.log(`  ${i.TABLE_NAME}.${i.INDEX_NAME} (${i.cols})`));
  console.log(`  Total non-PK indexes: ${idx.length}`);

  console.log('\n=== orders.status enum values present ===');
  const [statusRows] = await conn.query(
    `SELECT DISTINCT status FROM orders`
  );
  console.log(`  Distinct statuses in use: ${statusRows.map((r) => r.status).join(', ') || '(no orders yet)'}`);

  await conn.end();
  console.log('\n[verify] Done.');
}

main().catch((err) => {
  console.error('[verify] FAILED:', err.message);
  process.exit(1);
});
