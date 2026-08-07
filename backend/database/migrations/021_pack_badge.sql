-- ============================================================
-- Migration 021_pack_badge.sql
--
-- Adds an admin-selectable marketing badge to packs, shown on the
-- pack card in the storefront (BEST SELLER / NEW / LIMITED). Kept
-- as a simple nullable enum rather than reusing is_featured, since
-- a pack can now carry exactly one specific badge or none.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_021$$
CREATE PROCEDURE __run_migration_021()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '021_pack_badge.sql') THEN

    ALTER TABLE packs
      ADD COLUMN badge ENUM('best_seller', 'new', 'limited') NULL AFTER is_featured;

    INSERT INTO schema_migrations (filename) VALUES ('021_pack_badge.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_021();
DROP PROCEDURE __run_migration_021;
