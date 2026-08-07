-- ============================================================
-- Migration 013_homepage_sections.sql
--
-- CMS-lite: lets admin toggle/reorder/edit-copy for each known
-- homepage section without a deploy. `section_key` is a fixed
-- set the frontend knows how to render; `content_json` carries
-- any section-specific flexible payload (e.g. hero CTA text).
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_013$$
CREATE PROCEDURE __run_migration_013()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '013_homepage_sections.sql') THEN

    CREATE TABLE IF NOT EXISTS homepage_sections (
      id             INT AUTO_INCREMENT PRIMARY KEY,
      section_key    VARCHAR(50) NOT NULL UNIQUE,
      title          VARCHAR(255) NULL,
      subtitle       VARCHAR(255) NULL,
      content_json   TEXT NULL,
      is_active      TINYINT(1) NOT NULL DEFAULT 1,
      display_order  INT NOT NULL DEFAULT 0,
      created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_homepage_sections_order (display_order)
    );

    INSERT INTO homepage_sections (section_key, title, subtitle, display_order) VALUES
      ('hero', 'Nahid Perfumes', 'Des packs de parfums curés pour chaque instant', 1),
      ('featured_packs', 'Nos Packs Vedettes', NULL, 2),
      ('custom_pack_builder', 'Créez Votre Propre Pack', 'Choisissez 4 parfums, à votre image', 3),
      ('why_choose_us', 'Pourquoi Nous Choisir', NULL, 4),
      ('bestsellers', 'Meilleures Ventes', NULL, 5),
      ('testimonials', 'Avis de nos Clients', NULL, 6),
      ('faq_preview', 'Questions Fréquentes', NULL, 7),
      ('instagram_gallery', 'Suivez-nous sur Instagram', NULL, 8),
      ('newsletter', 'Restez Informé', 'Recevez nos nouveautés et offres exclusives', 9)
    ON DUPLICATE KEY UPDATE section_key = section_key;

    INSERT INTO schema_migrations (filename) VALUES ('013_homepage_sections.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_013();
DROP PROCEDURE __run_migration_013;
