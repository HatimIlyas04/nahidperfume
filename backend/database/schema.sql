-- ============================================================
-- NAHID PERFUMES — Consolidated Schema (packs-only business model)
--
-- This file is the FINAL-STATE reference schema, for setting up a
-- BRAND NEW empty database (fresh dev/staging environment, or CI).
--
-- If you already have a live production database with existing data
-- (products/orders/admins/reviews), do NOT run this file — use the
-- incremental, data-preserving migrations in
-- backend/database/migrations/ instead (see migrations/RUNBOOK.md).
-- ============================================================

CREATE TABLE IF NOT EXISTS schema_migrations (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  filename    VARCHAR(255) UNIQUE NOT NULL,
  applied_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT IGNORE INTO schema_migrations (filename)
  SELECT * FROM (SELECT f FROM (
    SELECT '000_create_schema_migrations_table.sql' AS f UNION ALL
    SELECT '001_rename_products_to_perfumes.sql' UNION ALL
    SELECT '002_admins_roles.sql' UNION ALL
    SELECT '003_customers.sql' UNION ALL
    SELECT '004_packs_and_pack_perfumes.sql' UNION ALL
    SELECT '005_custom_pack_settings.sql' UNION ALL
    SELECT '006_orders_orderitems_restructure.sql' UNION ALL
    SELECT '007_feedbacks.sql' UNION ALL
    SELECT '008_testimonials.sql' UNION ALL
    SELECT '009_wishlist.sql' UNION ALL
    SELECT '010_notifications.sql' UNION ALL
    SELECT '011_settings.sql' UNION ALL
    SELECT '012_banners.sql' UNION ALL
    SELECT '013_homepage_sections.sql' UNION ALL
    SELECT '014_faq.sql' UNION ALL
    SELECT '015_contact_messages.sql' UNION ALL
    SELECT '016_coupon_codes.sql' UNION ALL
    SELECT '017_activity_logs.sql' UNION ALL
    SELECT '018_indexes_cleanup.sql' UNION ALL
    SELECT 'data-migration.sql'
  ) t) x;

-- ── admins ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  username       VARCHAR(100) UNIQUE NOT NULL,
  password_hash  VARCHAR(255) NOT NULL,
  role           ENUM('super_admin','admin') NOT NULL DEFAULT 'admin',
  full_name      VARCHAR(150) NULL,
  is_active      TINYINT(1) NOT NULL DEFAULT 1,
  last_login_at  TIMESTAMP NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- No default admin is seeded here (bcrypt hashing needs Node, not SQL).
-- Run: node database/seeds/seedAdmin.js

-- ── perfumes (catalog only — never sold individually) ──────────
CREATE TABLE IF NOT EXISTS perfumes (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(255) NOT NULL,
  slug            VARCHAR(255) NULL UNIQUE,
  description     TEXT,
  category        VARCHAR(100),
  gender          ENUM('Femme','Homme','Unisex') DEFAULT 'Unisex',
  product_type    ENUM('Original','Inspired By') DEFAULT 'Original',
  inspired_by     VARCHAR(255),
  concentration   VARCHAR(100),
  scent_family    VARCHAR(50) DEFAULT 'warm',
  scent_intensity TINYINT NULL COMMENT '1-5 scale',
  longevity       VARCHAR(50),
  top_notes       TEXT,
  middle_notes    TEXT,
  base_notes      TEXT,
  ingredients     TEXT,
  size            VARCHAR(10),
  image_url       VARCHAR(500),
  gallery_images  TEXT COMMENT 'JSON-encoded array of image URLs',
  is_new          TINYINT(1) DEFAULT 0,
  is_bestseller   TINYINT(1) DEFAULT 0,
  is_active       TINYINT(1) NOT NULL DEFAULT 1,
  display_order   INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_perfumes_category (category),
  INDEX idx_perfumes_gender (gender),
  INDEX idx_perfumes_active (is_active),
  INDEX idx_perfumes_type (product_type),
  INDEX idx_perfumes_active_category (is_active, category)
);

-- ── customers (passive CRM record, NOT a login system) ──────────
CREATE TABLE IF NOT EXISTS customers (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(255) NOT NULL,
  email           VARCHAR(255) NULL,
  phone           VARCHAR(20)  NULL,
  device_token    VARCHAR(64)  NULL,
  first_order_id  INT NULL,
  orders_count    INT NOT NULL DEFAULT 0,
  total_spent     DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_customers_phone (phone),
  INDEX idx_customers_email (email),
  INDEX idx_customers_device_token (device_token)
);

-- ── packs (ready packs, admin-curated, always 4 perfumes) ───────
CREATE TABLE IF NOT EXISTS packs (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  title              VARCHAR(255) NOT NULL,
  gender             ENUM('Femme','Homme','Unisexe') NOT NULL DEFAULT 'Unisexe',
  slug               VARCHAR(255) NULL UNIQUE,
  description        TEXT NULL,
  cover_image        VARCHAR(500) NULL,
  gallery_images     TEXT NULL,
  price              DECIMAL(10,2) NOT NULL,
  stock_quantity     INT NOT NULL DEFAULT 0,
  compare_at_price   DECIMAL(10,2) NULL,
  is_active          TINYINT(1) NOT NULL DEFAULT 1,
  is_featured        TINYINT(1) NOT NULL DEFAULT 0,
  is_upsell_offer    TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'the single pack offered on the post-checkout one-click upsell',
  upsell_price       DECIMAL(10,2) NULL COMMENT 'special price shown only in the upsell offer',
  display_order      INT NOT NULL DEFAULT 0,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_packs_active (is_active),
  INDEX idx_packs_upsell (is_upsell_offer),
  INDEX idx_packs_display_order (display_order),
  INDEX idx_packs_gender (gender)
);

-- ── pack_perfumes (exactly 4 rows per pack, enforced in app code) ─
CREATE TABLE IF NOT EXISTS pack_perfumes (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  pack_id     INT NOT NULL,
  perfume_id  INT NOT NULL,
  position    TINYINT NOT NULL COMMENT '1-4, display order within the pack',
  UNIQUE KEY uniq_pack_position (pack_id, position),
  UNIQUE KEY uniq_pack_perfume (pack_id, perfume_id),
  INDEX idx_pack_perfumes_perfume (perfume_id),
  CONSTRAINT fk_pack_perfumes_pack FOREIGN KEY (pack_id) REFERENCES packs(id) ON DELETE CASCADE,
  CONSTRAINT fk_pack_perfumes_perfume FOREIGN KEY (perfume_id) REFERENCES perfumes(id) ON DELETE RESTRICT
);

-- ── custom_pack_settings (singleton row) ─────────────────────────
CREATE TABLE IF NOT EXISTS custom_pack_settings (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  is_active    TINYINT(1) NOT NULL DEFAULT 1,
  flat_price   DECIMAL(10,2) NOT NULL DEFAULT 250.00,
  title        VARCHAR(255) NULL,
  description  TEXT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO custom_pack_settings (id, is_active, flat_price, title, description)
VALUES (1, 1, 250.00, 'Créez votre propre pack', 'Choisissez exactement 4 parfums parmi notre collection.')
ON DUPLICATE KEY UPDATE id = id;

-- ── coupon_codes (created before orders so the FK below is valid) ─
CREATE TABLE IF NOT EXISTS coupon_codes (
  id                     INT AUTO_INCREMENT PRIMARY KEY,
  code                   VARCHAR(50) NOT NULL UNIQUE,
  discount_type          ENUM('percent','fixed') NOT NULL,
  discount_value         DECIMAL(10,2) NOT NULL,
  min_order_amount       DECIMAL(10,2) NULL,
  max_uses               INT NULL,
  used_count             INT NOT NULL DEFAULT 0,
  max_uses_per_customer  INT NULL,
  is_active              TINYINT(1) NOT NULL DEFAULT 1,
  starts_at              TIMESTAMP NULL,
  expires_at             TIMESTAMP NULL,
  created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_coupon_codes_active (is_active)
);

-- ── orders ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                    INT AUTO_INCREMENT PRIMARY KEY,
  order_number          VARCHAR(20) NULL UNIQUE,
  customer_id           INT NULL,
  customer_name         VARCHAR(255) NOT NULL,
  customer_email        VARCHAR(255) NULL,
  customer_phone        VARCHAR(20) NOT NULL,
  customer_address      TEXT NOT NULL,
  customer_city         VARCHAR(100) NULL,
  subtotal_amount       DECIMAL(10,2) NOT NULL,
  shipping_amount       DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount_amount       DECIMAL(10,2) NOT NULL DEFAULT 0,
  coupon_id             INT NULL,
  coupon_code_snapshot  VARCHAR(50) NULL,
  total_amount          DECIMAL(10,2) NOT NULL,
  payment_method        ENUM('cod') NOT NULL DEFAULT 'cod',
  status                ENUM('pending','confirmed','preparing','shipping','delivered','cancelled') NOT NULL DEFAULT 'pending',
  admin_notes           TEXT NULL,
  whatsapp_notified_at  TIMESTAMP NULL,
  upsell_applied_at     TIMESTAMP NULL,
  created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_orders_status (status),
  INDEX idx_orders_created_at (created_at),
  INDEX idx_orders_status_created (status, created_at),
  CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
  CONSTRAINT fk_orders_coupon FOREIGN KEY (coupon_id) REFERENCES coupon_codes(id) ON DELETE SET NULL
);
ALTER TABLE customers
  ADD CONSTRAINT fk_customers_first_order FOREIGN KEY (first_order_id) REFERENCES orders(id) ON DELETE SET NULL;

-- ── order_items + order_item_perfumes ───────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id                    INT AUTO_INCREMENT PRIMARY KEY,
  order_id              INT NOT NULL,
  item_type             ENUM('legacy_product','ready_pack','ready_pack_customized','custom_pack') NOT NULL DEFAULT 'legacy_product',
  product_id            INT NULL COMMENT 'legacy individual-perfume order lines only',
  source_pack_id        INT NULL,
  item_name_snapshot    VARCHAR(255) NOT NULL,
  item_image_snapshot   VARCHAR(500) NULL,
  unit_price            DECIMAL(10,2) NOT NULL,
  quantity              INT NOT NULL DEFAULT 1,
  created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_order_items_type (item_type),
  INDEX idx_order_items_order (order_id),
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_perfume FOREIGN KEY (product_id) REFERENCES perfumes(id) ON DELETE SET NULL,
  CONSTRAINT fk_order_items_pack FOREIGN KEY (source_pack_id) REFERENCES packs(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_item_perfumes (
  id                      INT AUTO_INCREMENT PRIMARY KEY,
  order_item_id           INT NOT NULL,
  perfume_id              INT NULL,
  position                TINYINT NOT NULL COMMENT '1-4',
  perfume_name_snapshot   VARCHAR(255) NOT NULL,
  perfume_image_snapshot  VARCHAR(500) NULL,
  UNIQUE KEY uniq_order_item_position (order_item_id, position),
  INDEX idx_order_item_perfumes_perfume (perfume_id),
  CONSTRAINT fk_oip_order_item FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE,
  CONSTRAINT fk_oip_perfume FOREIGN KEY (perfume_id) REFERENCES perfumes(id) ON DELETE SET NULL
);

-- ── feedbacks (public review moderation queue) ──────────────────
CREATE TABLE IF NOT EXISTS feedbacks (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  customer_id  INT NULL,
  first_name   VARCHAR(100) NOT NULL,
  last_name    VARCHAR(100) NOT NULL,
  avatar       VARCHAR(50) NOT NULL DEFAULT 'bloom',
  rating       TINYINT NOT NULL,
  message      TEXT NOT NULL,
  status       ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_feedbacks_status (status),
  INDEX idx_feedbacks_rating (rating),
  CONSTRAINT fk_feedbacks_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- ── testimonials (curated marketing quotes) ──────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  source_feedback_id INT NULL,
  name               VARCHAR(150) NOT NULL,
  role_or_location   VARCHAR(150) NULL,
  avatar_url         VARCHAR(500) NULL,
  rating             TINYINT NULL,
  quote              TEXT NOT NULL,
  is_active          TINYINT(1) NOT NULL DEFAULT 1,
  display_order      INT NOT NULL DEFAULT 0,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_testimonials_active (is_active),
  CONSTRAINT fk_testimonials_feedback FOREIGN KEY (source_feedback_id) REFERENCES feedbacks(id) ON DELETE SET NULL
);

-- ── wishlist ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlist_perfumes (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  device_token VARCHAR(64) NOT NULL,
  customer_id  INT NULL,
  perfume_id   INT NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_wishlist_perfume (device_token, perfume_id),
  INDEX idx_wishlist_perfumes_device (device_token),
  CONSTRAINT fk_wishlist_perfumes_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
  CONSTRAINT fk_wishlist_perfumes_perfume FOREIGN KEY (perfume_id) REFERENCES perfumes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS wishlist_packs (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  device_token VARCHAR(64) NOT NULL,
  customer_id  INT NULL,
  pack_id      INT NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_wishlist_pack (device_token, pack_id),
  INDEX idx_wishlist_packs_device (device_token),
  CONSTRAINT fk_wishlist_packs_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
  CONSTRAINT fk_wishlist_packs_pack FOREIGN KEY (pack_id) REFERENCES packs(id) ON DELETE CASCADE
);

-- ── notifications (admin bell) ───────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  type        VARCHAR(50) NOT NULL,
  title       VARCHAR(255) NOT NULL,
  body        TEXT NULL,
  link        VARCHAR(500) NULL,
  related_id  INT NULL,
  is_read     TINYINT(1) NOT NULL DEFAULT 0,
  read_at     TIMESTAMP NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_notifications_unread (is_read, created_at)
);

-- ── settings (business config only, never secrets) ────────────────
CREATE TABLE IF NOT EXISTS settings (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  setting_key    VARCHAR(100) NOT NULL UNIQUE,
  setting_value  TEXT NULL,
  setting_group  VARCHAR(50) NULL,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO settings (setting_key, setting_value, setting_group) VALUES
  ('site_name', 'Nahid Perfumes', 'general'),
  ('currency', 'MAD', 'general'),
  ('contact_phone', '', 'contact'),
  ('contact_whatsapp', '0636572200', 'contact'),
  ('contact_email', '', 'contact'),
  ('instagram_url', '', 'social'),
  ('facebook_url', '', 'social'),
  ('shipping_flat_rate', '0', 'shipping'),
  ('free_shipping_threshold', '', 'shipping'),
  ('countdown_enabled', '0', 'cro'),
  ('countdown_end_at', '', 'cro'),
  ('countdown_label', 'Offre spéciale se termine dans', 'cro'),
  ('social_proof_enabled', '1', 'cro')
ON DUPLICATE KEY UPDATE setting_key = setting_key;

-- ── banners ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS banners (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  title             VARCHAR(255) NULL,
  subtitle          VARCHAR(255) NULL,
  image_url         VARCHAR(500) NOT NULL,
  mobile_image_url  VARCHAR(500) NULL,
  link_url          VARCHAR(500) NULL,
  cta_label         VARCHAR(100) NULL,
  placement         VARCHAR(50) NOT NULL DEFAULT 'homepage_hero',
  is_active         TINYINT(1) NOT NULL DEFAULT 1,
  display_order     INT NOT NULL DEFAULT 0,
  starts_at         TIMESTAMP NULL,
  ends_at           TIMESTAMP NULL,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_banners_placement_active (placement, is_active)
);

-- ── homepage_sections (CMS-lite) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS homepage_sections (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  section_key    VARCHAR(50) NOT NULL UNIQUE,
  title          VARCHAR(255) NULL,
  subtitle       VARCHAR(255) NULL,
  content_json   TEXT NULL,
  is_active      TINYINT(1) NOT NULL DEFAULT 1,
  display_order  INT NOT NULL DEFAULT 0,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_homepage_sections_order (display_order)
);
INSERT INTO homepage_sections (section_key, title, subtitle, display_order) VALUES
  ('hero', 'Nahid Perfumes', 'Des packs de parfums curés pour chaque instant', 1),
  ('featured_packs', 'Nos Packs Vedettes', NULL, 2),
  ('custom_pack_builder', 'Créez Votre Propre Pack', 'Choisissez 4 parfums, à votre image', 3),
  ('why_choose_us', 'Pourquoi Nous Choisir', NULL, 4),
  ('bestsellers', 'Meilleures Ventes', NULL, 5),
  ('testimonials', 'Avis de nos Clients', NULL, 6),
  ('faq_preview', 'Questions Fréquentes', NULL, 7),
  ('instagram_gallery', 'Suivez-nous sur Instagram', NULL, 8),
  ('newsletter', 'Restez Informé', 'Recevez nos nouveautés et offres exclusives', 9)
ON DUPLICATE KEY UPDATE section_key = section_key;

-- ── faq ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faq (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  question       VARCHAR(500) NOT NULL,
  answer         TEXT NOT NULL,
  category       VARCHAR(100) NULL,
  is_active      TINYINT(1) NOT NULL DEFAULT 1,
  display_order  INT NOT NULL DEFAULT 0,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_faq_active (is_active),
  INDEX idx_faq_category (category)
);

-- ── contact_messages ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NULL,
  phone       VARCHAR(20) NULL,
  subject     VARCHAR(255) NULL,
  message     TEXT NOT NULL,
  status      ENUM('new','read','replied','archived') NOT NULL DEFAULT 'new',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_contact_messages_status (status)
);

-- ── activity_logs ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activity_logs (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  admin_id      INT NULL,
  action        VARCHAR(100) NOT NULL,
  entity_type   VARCHAR(50) NULL,
  entity_id     INT NULL,
  details_json  TEXT NULL,
  ip_address    VARCHAR(45) NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_activity_logs_admin (admin_id),
  INDEX idx_activity_logs_created (created_at),
  INDEX idx_activity_logs_entity (entity_type, entity_id),
  CONSTRAINT fk_activity_logs_admin FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL
);
