-- ============================================================
-- Migration 012_banners.sql
-- Homepage/marketing banner slots, schedulable and reorderable.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_012$$
CREATE PROCEDURE __run_migration_012()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '012_banners.sql') THEN

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

    INSERT INTO schema_migrations (filename) VALUES ('012_banners.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_012();
DROP PROCEDURE __run_migration_012;
