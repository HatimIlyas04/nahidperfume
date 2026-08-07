/**
 * DIY backup tool (no mysqldump available in this environment).
 * Dumps every existing table's CREATE TABLE statement + all rows as
 * INSERT statements into a single timestamped, restorable .sql file
 * under backend/database/backups/ (gitignored — contains real customer data).
 *
 * Usage: node database/scripts/backup.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

function sqlEscapeValue(value) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'bigint') return value.toString();
  if (Buffer.isBuffer(value)) return `0x${value.toString('hex')}`;
  if (value instanceof Date) return `'${value.toISOString().slice(0, 19).replace('T', ' ')}'`;
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  });

  const [tables] = await conn.query('SHOW TABLES');
  const tableNames = tables.map((row) => Object.values(row)[0]);

  const outDir = path.join(__dirname, '..', 'backups');
  fs.mkdirSync(outDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outFile = path.join(outDir, `backup_${timestamp}.sql`);

  const chunks = [`-- Backup taken ${new Date().toISOString()}\n-- Database: ${process.env.DB_NAME}\n\n`];
  const summary = [];

  for (const table of tableNames) {
    const [[{ 'Create Table': createStatement }]] = await conn.query(`SHOW CREATE TABLE \`${table}\``);
    chunks.push(`-- ── Table: ${table} ──\nDROP TABLE IF EXISTS \`${table}_restore_placeholder\`;\n`);
    chunks.push(`${createStatement.replace(`CREATE TABLE \`${table}\``, `CREATE TABLE IF NOT EXISTS \`${table}_restored\``)};\n\n`);

    const [rows] = await conn.query(`SELECT * FROM \`${table}\``);
    summary.push({ table, rowCount: rows.length });

    if (rows.length) {
      const columns = Object.keys(rows[0]);
      chunks.push(`-- ${rows.length} row(s)\n`);
      for (const row of rows) {
        const values = columns.map((col) => sqlEscapeValue(row[col])).join(', ');
        chunks.push(`INSERT INTO \`${table}_restored\` (\`${columns.join('`, `')}\`) VALUES (${values});\n`);
      }
      chunks.push('\n');
    }
  }

  fs.writeFileSync(outFile, chunks.join(''));

  console.log(`[backup] Wrote ${outFile}`);
  console.log('[backup] Row counts:');
  summary.forEach((s) => console.log(`  ${s.table}: ${s.rowCount}`));

  await conn.end();
  return { outFile, summary };
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[backup] FAILED:', err.message);
    process.exit(1);
  });
