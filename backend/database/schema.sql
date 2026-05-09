-- ============================================================
-- NAHID PERFUME — Database Schema
-- Run once on a fresh database, or use the ALTER TABLE
-- block below to upgrade an existing installation.
-- ============================================================

-- ── Products table (full create) ────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(255)  NOT NULL,
  description     TEXT,
  scent_family    VARCHAR(50)   DEFAULT 'warm',
  price           DECIMAL(10,2) NOT NULL,
  image_url       VARCHAR(500),
  category        VARCHAR(100),
  gender          ENUM('Femme','Homme','Unisex') DEFAULT 'Unisex',
  product_type    ENUM('Original','Inspired By') DEFAULT 'Original',
  inspired_by     VARCHAR(255),
  stock           INT           DEFAULT 10,
  is_new          TINYINT(1)    DEFAULT 0,
  is_bestseller   TINYINT(1)    DEFAULT 0,
  -- ── New fields (v2) ──────────────────────────────────────
  concentration   VARCHAR(100),
  scent_intensity TINYINT       DEFAULT NULL COMMENT '1-5 scale',
  longevity       VARCHAR(50),
  ingredients     TEXT,
  top_notes       TEXT,
  middle_notes    TEXT,
  base_notes      TEXT,
  size            VARCHAR(10)   COMMENT 'auto-set: 30ml / 50ml',
  created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ── Orders table ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  customer_name    VARCHAR(255) NOT NULL,
  customer_email   VARCHAR(255) NOT NULL,
  customer_phone   VARCHAR(20),
  customer_address TEXT,
  total_amount     DECIMAL(10,2),
  status           ENUM('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Order items table ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  order_id     INT NOT NULL,
  product_id   INT,
  product_name VARCHAR(255),
  quantity     INT,
  price        DECIMAL(10,2),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- ── Admins table ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(100) UNIQUE NOT NULL,
  password   VARCHAR(255)        NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- UPGRADE SCRIPT — run this if the table already exists
-- ============================================================
-- ALTER TABLE products
--   ADD COLUMN IF NOT EXISTS concentration   VARCHAR(100) DEFAULT NULL AFTER inspired_by,
--   ADD COLUMN IF NOT EXISTS scent_intensity TINYINT      DEFAULT NULL AFTER concentration,
--   ADD COLUMN IF NOT EXISTS longevity       VARCHAR(50)  DEFAULT NULL AFTER scent_intensity,
--   ADD COLUMN IF NOT EXISTS ingredients     TEXT         DEFAULT NULL AFTER longevity,
--   ADD COLUMN IF NOT EXISTS top_notes       TEXT         DEFAULT NULL AFTER ingredients,
--   ADD COLUMN IF NOT EXISTS middle_notes    TEXT         DEFAULT NULL AFTER top_notes,
--   ADD COLUMN IF NOT EXISTS base_notes      TEXT         DEFAULT NULL AFTER middle_notes,
--   ADD COLUMN IF NOT EXISTS size            VARCHAR(10)  DEFAULT NULL AFTER base_notes;
