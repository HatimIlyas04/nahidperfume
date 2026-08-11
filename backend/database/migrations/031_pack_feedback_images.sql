-- ============================================================
-- Migration 031_pack_feedback_images.sql
--
-- Dedicated per-pack customer feedback screenshot gallery -- separate
-- from the global `testimonials` table. Each pack can have 0..N feedback
-- images (WhatsApp screenshots, Instagram DMs, etc.), shown only on
-- that pack's own Pack Details page, never mixed with the site-wide
-- testimonials section.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_031$$
CREATE PROCEDURE __run_migration_031()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '031_pack_feedback_images.sql') THEN

    CREATE TABLE IF NOT EXISTS pack_feedback_images (
      id             INT AUTO_INCREMENT PRIMARY KEY,
      pack_id        INT NOT NULL,
      image_url      VARCHAR(500) NOT NULL,
      display_order  INT NOT NULL DEFAULT 0,
      is_active      TINYINT(1) NOT NULL DEFAULT 1,
      created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_pack_feedback_images_pack (pack_id, is_active, display_order),
      CONSTRAINT fk_pack_feedback_images_pack FOREIGN KEY (pack_id) REFERENCES packs(id) ON DELETE CASCADE
    );

    INSERT INTO schema_migrations (filename) VALUES ('031_pack_feedback_images.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_031();
DROP PROCEDURE __run_migration_031;
