/**
 * Creates the first super_admin account if none exists yet.
 * Usage: node database/seeds/seedAdmin.js [username] [password]
 * Defaults to username "nahid" and a random generated password
 * (printed once — save it immediately, it is not shown again).
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { pool } = require('../../config/db');

async function main() {
  const username = process.argv[2] || 'nahid';
  const password = process.argv[3] || crypto.randomBytes(9).toString('base64url');

  const [existing] = await pool.query('SELECT id FROM admins WHERE username = ?', [username]);
  if (existing.length) {
    console.log(`[seedAdmin] Admin "${username}" already exists — nothing to do.`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await pool.query(
    'INSERT INTO admins (username, password_hash, role, full_name, is_active) VALUES (?, ?, ?, ?, 1)',
    [username, passwordHash, 'super_admin', 'Super Admin']
  );

  console.log('[seedAdmin] Super admin created:');
  console.log(`  username: ${username}`);
  console.log(`  password: ${password}`);
  console.log('[seedAdmin] Save this password now — it will not be shown again.');
  process.exit(0);
}

main().catch((err) => {
  console.error('[seedAdmin] failed:', err.message);
  process.exit(1);
});
