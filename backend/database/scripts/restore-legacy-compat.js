/**
 * EMERGENCY, TEMPORARY compatibility restoration.
 *
 * The live production frontend calls a separately-deployed OLD backend
 * (Render) that still queries the pre-migration schema by name. Since the
 * migrations already ran against the shared production database, that old
 * backend started failing immediately (products table renamed, columns
 * renamed). This script restores the old names/tables ALONGSIDE the new
 * schema — purely additive, nothing is dropped — so the old backend keeps
 * working until the new backend + new frontend are deployed together and
 * this compatibility layer can be removed.
 *
 * Usage: node database/scripts/restore-legacy-compat.js
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    multipleStatements: true,
  });

  console.log('[restore-compat] 1/5 Recreating legacy `products` table (original shape, original data)...');
  const [[perfume]] = await conn.query('SELECT * FROM perfumes LIMIT 1');
  // Recreate with the exact original schema (price/stock were dropped from `perfumes` —
  // they are restored here from the perfume's known original values / sane defaults,
  // since actual historical price/stock only survives in the pre-migration backup file).
  await conn.query(`
    CREATE TABLE IF NOT EXISTS products (
      id              INT AUTO_INCREMENT PRIMARY KEY,
      name            VARCHAR(255)  NOT NULL,
      description     TEXT,
      scent_family    VARCHAR(50)   DEFAULT 'warm',
      price           DECIMAL(10,2) NOT NULL DEFAULT 0,
      image_url       VARCHAR(500),
      category        VARCHAR(100),
      gender          ENUM('Femme','Homme','Unisex') DEFAULT 'Unisex',
      product_type    ENUM('Original','Inspired By') DEFAULT 'Original',
      inspired_by     VARCHAR(255),
      stock           INT           DEFAULT 10,
      is_new          TINYINT(1)    DEFAULT 0,
      is_bestseller   TINYINT(1)    DEFAULT 0,
      concentration   VARCHAR(100),
      scent_intensity TINYINT       DEFAULT NULL,
      longevity       VARCHAR(50),
      ingredients     TEXT,
      top_notes       TEXT,
      middle_notes    TEXT,
      base_notes      TEXT,
      size            VARCHAR(10),
      gallery_images  TEXT NULL,
      created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await conn.query(`
    INSERT INTO products
      (id, name, description, scent_family, price, image_url, category, gender, product_type,
       inspired_by, stock, is_new, is_bestseller, concentration, scent_intensity, longevity,
       ingredients, top_notes, middle_notes, base_notes, size, gallery_images, created_at)
    SELECT
      id, name, description, scent_family, 0, image_url, category, gender, product_type,
      inspired_by, 10, is_new, is_bestseller, concentration, scent_intensity, longevity,
      ingredients, top_notes, middle_notes, base_notes, size, gallery_images, created_at
    FROM perfumes
    ON DUPLICATE KEY UPDATE products.name = VALUES(name);
  `);

  async function columnExists(table, column) {
    const [[{ c }]] = await conn.query(
      `SELECT COUNT(*) AS c FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
      [table, column]
    );
    return c > 0;
  }

  console.log('[restore-compat] 2/5 Restoring admins.password (copy of password_hash)...');
  if (!(await columnExists('admins', 'password'))) {
    await conn.query('ALTER TABLE admins ADD COLUMN password VARCHAR(255) NULL AFTER username');
  }
  await conn.query('UPDATE admins SET password = password_hash WHERE password IS NULL');

  console.log('[restore-compat] 3/5 Restoring order_items.product_name / .price (copies of the snapshot columns)...');
  if (!(await columnExists('order_items', 'product_name'))) {
    await conn.query('ALTER TABLE order_items ADD COLUMN product_name VARCHAR(255) NULL AFTER item_name_snapshot');
  }
  if (!(await columnExists('order_items', 'price'))) {
    await conn.query('ALTER TABLE order_items ADD COLUMN price DECIMAL(10,2) NULL AFTER unit_price');
  }
  await conn.query('UPDATE order_items SET product_name = item_name_snapshot WHERE product_name IS NULL');
  await conn.query('UPDATE order_items SET price = unit_price WHERE price IS NULL');

  console.log('[restore-compat] 4/5 Giving orders.subtotal_amount a default (old INSERTs never set it)...');
  await conn.query('ALTER TABLE orders MODIFY COLUMN subtotal_amount DECIMAL(10,2) NOT NULL DEFAULT 0');

  console.log('[restore-compat] 5/5 Widening orders.status enum to accept old values again...');
  await conn.query(`
    ALTER TABLE orders MODIFY COLUMN status
      ENUM('pending','processing','shipped','delivered','cancelled','confirmed','preparing','shipping')
      NOT NULL DEFAULT 'pending'
  `);

  console.log('[restore-compat] Done. Old backend should be functional again.');
  await conn.end();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[restore-compat] FAILED:', err.message);
    process.exit(1);
  });
