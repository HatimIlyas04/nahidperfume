-- ============================================================
-- Migration 028_homepage_sections_bilingual.sql
--
-- homepage_sections.title/subtitle were single-language fields (admin
-- typed whatever language they wanted, shown to every visitor
-- regardless of site language). Splits into _fr/_ar pairs; the
-- existing single-language value backfills into _fr (that's what's
-- actually in there today), _ar starts blank so the frontend's
-- existing hardcoded Arabic translation keeps showing until an admin
-- fills it in -- nothing regresses for Arabic visitors on deploy.
-- Old title/subtitle columns are kept (not dropped) so nothing else
-- referencing them breaks; the app stops reading them going forward.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_028$$
CREATE PROCEDURE __run_migration_028()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '028_homepage_sections_bilingual.sql') THEN

    ALTER TABLE homepage_sections
      ADD COLUMN title_fr VARCHAR(255) NULL AFTER title,
      ADD COLUMN title_ar VARCHAR(255) NULL AFTER title_fr,
      ADD COLUMN subtitle_fr VARCHAR(255) NULL AFTER subtitle,
      ADD COLUMN subtitle_ar VARCHAR(255) NULL AFTER subtitle_fr;

    UPDATE homepage_sections SET title_fr = title WHERE title IS NOT NULL;
    UPDATE homepage_sections SET subtitle_fr = subtitle WHERE subtitle IS NOT NULL;

    INSERT INTO schema_migrations (filename) VALUES ('028_homepage_sections_bilingual.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_028();
DROP PROCEDURE __run_migration_028;
