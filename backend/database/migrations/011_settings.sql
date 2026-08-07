-- ============================================================
-- Migration 011_settings.sql
--
-- Key-value business config (shipping rate, contact numbers,
-- social links, currency, ...). NEVER put secrets here (API keys,
-- JWT secret, DB credentials) — those stay in .env only.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_011$$
CREATE PROCEDURE __run_migration_011()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '011_settings.sql') THEN

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
      ('contact_whatsapp', '', 'contact'),
      ('contact_email', '', 'contact'),
      ('instagram_url', '', 'social'),
      ('facebook_url', '', 'social'),
      ('shipping_flat_rate', '30', 'shipping'),
      ('free_shipping_threshold', '', 'shipping')
    ON DUPLICATE KEY UPDATE setting_key = setting_key;

    INSERT INTO schema_migrations (filename) VALUES ('011_settings.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_011();
DROP PROCEDURE __run_migration_011;
