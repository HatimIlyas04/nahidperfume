-- ============================================================
-- Migration 032_recommended_title.sql
--
-- packDetails.recommendedTitle was added to frontend/src/translations/
-- index.js (fixing a live "raw i18n key visible to customers" bug on
-- the Pack Details "Recommended packs" section) after 024_site_content
-- had already been applied to production, so it never got seeded into
-- the site_content CMS override table. Small follow-up seed so it's
-- also admin-editable, consistent with every other packDetails.* key.
--
-- Also corrects packDetails.perfumesTitle's seeded value to match the
-- new copy ("Les parfums de cette offre") from the PackDetails redesign
-- -- an UPDATE, not an INSERT, since 024 already seeded the old text.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_032$$
CREATE PROCEDURE __run_migration_032()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '032_recommended_title.sql') THEN

    INSERT INTO site_content (content_key, category, value_fr, value_ar) VALUES
      ('packDetails.recommendedTitle', 'packDetails', 'Vous pourriez aussi aimer', 'اكتشفي أيضاً عروضنا')
    ON DUPLICATE KEY UPDATE content_key = content_key;

    UPDATE site_content
      SET value_fr = 'Les parfums de cette offre', value_ar = 'عطور هذه الباقة'
      WHERE content_key = 'packDetails.perfumesTitle'
        AND value_fr = 'Les 4 parfums de ce pack';

    INSERT INTO schema_migrations (filename) VALUES ('032_recommended_title.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_032();
DROP PROCEDURE __run_migration_032;
