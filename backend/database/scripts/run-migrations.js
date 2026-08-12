/**
 * Runs every migration file in backend/database/migrations/, in order,
 * against the database configured in .env. Each file is idempotent
 * (guarded by the schema_migrations ledger), so re-running this script
 * is always safe.
 *
 * Uses its own throwaway connection with multipleStatements enabled
 * (required to run files containing CREATE PROCEDURE ... END blocks) —
 * this is NOT enabled on the main application pool (config/db.js),
 * keeping the normal request path free of stacked-query risk.
 *
 * Exports the underlying pieces so server.js can run pending migrations
 * automatically at startup (see server.js) without duplicating this
 * logic — this file is the single source of truth for "how migrations
 * are applied" whether invoked via the CLI below or from server startup.
 *
 * CLI usage: node database/scripts/run-migrations.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');

const ORDER = [
  '000_create_schema_migrations_table.sql',
  '001_rename_products_to_perfumes.sql',
  '002_admins_roles.sql',
  '003_customers.sql',
  '004_packs_and_pack_perfumes.sql',
  '005_custom_pack_settings.sql',
  '006_orders_orderitems_restructure.sql',
  '007_feedbacks.sql',
  '008_testimonials.sql',
  '009_wishlist.sql',
  '010_notifications.sql',
  '011_settings.sql',
  '012_banners.sql',
  '013_homepage_sections.sql',
  '014_faq.sql',
  '015_contact_messages.sql',
  '016_coupon_codes.sql',
  '017_activity_logs.sql',
  '018_indexes_cleanup.sql',
  '019_pack_upsell_offer.sql',
  '020_cro_settings.sql',
  '021_pack_badge.sql',
  '022_customers_sort_index.sql',
  'data-migration.sql',
  '023_free_delivery.sql',
  '024_site_content.sql',
  '025_whatsapp_setting.sql',
  '026_banner_ugc_fields.sql',
  '027_trust_badges.sql',
  '028_homepage_sections_bilingual.sql',
  '029_pack_pricing_correction.sql',
  '030_announcements.sql',
  '031_pack_feedback_images.sql',
];

/** Strips the mysql-CLI-only DELIMITER directive so the file can be sent
 *  as a single multi-statement query via a driver instead of the CLI. */
function stripDelimiterDirectives(sql) {
  return sql
    .split('\n')
    .filter((line) => !/^\s*DELIMITER\s+/i.test(line))
    .join('\n')
    .replace(/\$\$/g, ';');
}

function createConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    multipleStatements: true,
    // mysql2 has no default connect timeout -- against an unreachable
    // host (wrong DB_HOST, network/firewall issue) createConnection()
    // would otherwise hang indefinitely instead of failing fast, which
    // is exactly wrong for a startup gate that must not block forever.
    connectTimeout: 10000,
  });
}

/** Runs every migration in ORDER against `conn`, skipping ones already
 *  recorded in schema_migrations (each file guards itself on that check,
 *  so this is safe to call against a partially- or fully-migrated DB).
 *  Never calls process.exit() — callers decide what to do with the
 *  returned results (the CLI wrapper below, or server.js at startup). */
async function runMigrations(conn, { onProgress } = {}) {
  const results = [];

  for (const filename of ORDER) {
    const filePath = path.join(MIGRATIONS_DIR, filename);
    if (!fs.existsSync(filePath)) {
      results.push({ filename, status: 'MISSING_FILE' });
      onProgress?.(filename, 'MISSING_FILE');
      break;
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const sql = stripDelimiterDirectives(raw);

    try {
      // eslint-disable-next-line no-await-in-loop
      await conn.query(sql);
      // eslint-disable-next-line no-await-in-loop
      const [[ledgerRow]] = await conn.query(
        'SELECT filename FROM schema_migrations WHERE filename = ?',
        [filename]
      );
      if (ledgerRow) {
        results.push({ filename, status: 'OK' });
        onProgress?.(filename, 'OK');
      } else {
        results.push({ filename, status: 'RAN_BUT_NOT_LEDGERED' });
        onProgress?.(filename, 'RAN_BUT_NOT_LEDGERED');
      }
    } catch (err) {
      // A duplicate-key error on the ledger's UNIQUE filename column
      // means another process already applied this exact migration
      // between our own check and our own attempt (e.g. an overlapping
      // Render restart) — a benign race, not a real failure.
      if (err.code === 'ER_DUP_ENTRY' && /schema_migrations/.test(err.sqlMessage || '')) {
        results.push({ filename, status: 'ALREADY_APPLIED_CONCURRENTLY' });
        onProgress?.(filename, 'ALREADY_APPLIED_CONCURRENTLY');
        continue;
      }
      results.push({ filename, status: 'FAILED', error: err.message });
      onProgress?.(filename, 'FAILED', err);
      break;
    }
  }

  return results;
}

/** Confirms each table in `tables` is actually queryable. Returns the
 *  subset that's still missing (empty array = all present). Used as a
 *  post-migration sanity check, not just trusting the ledger. */
async function verifyTables(conn, tables) {
  const missing = [];
  for (const table of tables) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await conn.query(`SELECT 1 FROM \`${table}\` LIMIT 1`);
    } catch (err) {
      if (err.code === 'ER_NO_SUCH_TABLE') missing.push(table);
      else throw err;
    }
  }
  return missing;
}

module.exports = { runMigrations, verifyTables, createConnection, ORDER };

if (require.main === module) {
  (async () => {
    const conn = await createConnection();
    const results = await runMigrations(conn, {
      onProgress: (filename, status, err) => {
        if (status === 'FAILED') {
          console.error(`[migrate] ${filename}: FAILED — ${err.message}`);
          console.error('[migrate] Stopping here. Fix the issue and re-run this script — already-applied migrations will be skipped automatically.');
        } else if (status === 'MISSING_FILE') {
          console.error(`[migrate] ${filename}: FILE NOT FOUND, stopping.`);
        } else {
          console.log(`[migrate] ${filename}: ${status}`);
        }
      },
    });
    await conn.end();

    const failed = results.find((r) => r.status !== 'OK' && r.status !== 'ALREADY_APPLIED_CONCURRENTLY');
    console.log('\n[migrate] Summary:');
    results.forEach((r) => console.log(`  ${r.filename}: ${r.status}${r.error ? ' — ' + r.error : ''}`));
    process.exit(failed ? 1 : 0);
  })().catch((err) => {
    console.error('[migrate] Unexpected failure:', err);
    process.exit(1);
  });
}
