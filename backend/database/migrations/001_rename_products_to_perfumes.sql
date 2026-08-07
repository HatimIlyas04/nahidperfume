-- ============================================================
-- Migration 001_rename_products_to_perfumes.sql
--
-- Perfumes are no longer sold individually — they only exist as
-- display entities inside packs. This migration:
--   - renames `products` to `perfumes`
--   - drops `price` and `stock` (no individual sale, no per-perfume
--     inventory tracking — decided with the business owner; historical
--     order pricing already lives independently in order_items, so
--     nothing about past orders is lost by dropping these)
--   - adds `slug`, `is_active`, `display_order`, `updated_at`
--
-- Safe to re-run: skipped entirely if already applied.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_001$$
CREATE PROCEDURE __run_migration_001()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '001_rename_products_to_perfumes.sql') THEN

    RENAME TABLE products TO perfumes;

    ALTER TABLE perfumes
      DROP COLUMN price,
      DROP COLUMN stock,
      ADD COLUMN slug VARCHAR(255) NULL UNIQUE AFTER name,
      ADD COLUMN is_active TINYINT(1) NOT NULL DEFAULT 1 AFTER base_notes,
      ADD COLUMN display_order INT NOT NULL DEFAULT 0 AFTER is_active,
      ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

    ALTER TABLE perfumes
      ADD INDEX idx_perfumes_category (category),
      ADD INDEX idx_perfumes_gender (gender),
      ADD INDEX idx_perfumes_active (is_active),
      ADD INDEX idx_perfumes_type (product_type);

    INSERT INTO schema_migrations (filename) VALUES ('001_rename_products_to_perfumes.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_001();
DROP PROCEDURE __run_migration_001;
