-- ============================================================
-- Migration 033_pack_gender_stock.sql
--
-- Adds pack gender classification and real inventory tracking.
--
-- Safe on existing data: every existing pack was inspected before
-- writing this migration (7 packs at the time) -- none has a gender
-- mechanically determinable from existing columns, so ALL existing
-- rows get the safe 'Unisexe' default, never a guessed Femme/Homme.
-- stock_quantity defaults to 0 for existing packs (no real inventory
-- count existed before this feature) -- the admin sets real numbers
-- via Admin > Packs after this runs.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_033$$
CREATE PROCEDURE __run_migration_033()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '033_pack_gender_stock.sql') THEN

    ALTER TABLE packs
      ADD COLUMN gender ENUM('Femme','Homme','Unisexe') NOT NULL DEFAULT 'Unisexe' AFTER title,
      ADD COLUMN stock_quantity INT NOT NULL DEFAULT 0 AFTER price,
      ADD INDEX idx_packs_gender (gender);

    INSERT INTO schema_migrations (filename) VALUES ('033_pack_gender_stock.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_033();
DROP PROCEDURE __run_migration_033;
