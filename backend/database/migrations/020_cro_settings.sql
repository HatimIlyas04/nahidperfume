-- ============================================================
-- Migration 020_cro_settings.sql
--
-- Seeds new admin-editable settings for the CRO landing-page
-- features (countdown banner, social-proof popup toggle). Uses
-- the existing generic `settings` key-value table — no schema
-- change needed, just new rows the admin Settings page can edit.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_020$$
CREATE PROCEDURE __run_migration_020()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '020_cro_settings.sql') THEN

    INSERT INTO settings (setting_key, setting_value, setting_group) VALUES
      ('countdown_enabled', '0', 'cro'),
      ('countdown_end_at', '', 'cro'),
      ('countdown_label', 'Offre spéciale se termine dans', 'cro'),
      ('social_proof_enabled', '1', 'cro')
    ON DUPLICATE KEY UPDATE setting_key = setting_key;

    INSERT INTO schema_migrations (filename) VALUES ('020_cro_settings.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_020();
DROP PROCEDURE __run_migration_020;
