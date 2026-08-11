-- ============================================================
-- Migration 026_banner_ugc_fields.sql
--
-- The UGC gallery (Home.jsx, banners WHERE placement='ugc_gallery')
-- only ever had title/link_url -- no way to caption a customer photo
-- or credit who it's from. Two new nullable columns, no data loss,
-- reuses the existing banners table rather than a new one.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_026$$
CREATE PROCEDURE __run_migration_026()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '026_banner_ugc_fields.sql') THEN

    ALTER TABLE banners
      ADD COLUMN caption VARCHAR(255) NULL AFTER title,
      ADD COLUMN customer_name VARCHAR(150) NULL AFTER caption;

    INSERT INTO schema_migrations (filename) VALUES ('026_banner_ugc_fields.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_026();
DROP PROCEDURE __run_migration_026;
