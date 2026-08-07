-- ============================================================
-- Migration 005_custom_pack_settings.sql
--
-- Singleton config row controlling the "build your own pack"
-- feature: flat price only (per business decision), can be
-- edited by the admin at any time without a schema change.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_005$$
CREATE PROCEDURE __run_migration_005()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '005_custom_pack_settings.sql') THEN

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

    INSERT INTO schema_migrations (filename) VALUES ('005_custom_pack_settings.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_005();
DROP PROCEDURE __run_migration_005;
