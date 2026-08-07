-- ============================================================
-- Migration 008_testimonials.sql
--
-- Small, hand-curated marketing quotes for homepage placement —
-- distinct from `feedbacks` (the public moderation queue). An
-- admin can "promote" an approved feedback into a testimonial via
-- source_feedback_id, or write one from scratch.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_008$$
CREATE PROCEDURE __run_migration_008()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '008_testimonials.sql') THEN

    CREATE TABLE IF NOT EXISTS testimonials (
      id                 INT AUTO_INCREMENT PRIMARY KEY,
      source_feedback_id INT NULL,
      name               VARCHAR(150) NOT NULL,
      role_or_location   VARCHAR(150) NULL,
      avatar_url         VARCHAR(500) NULL,
      rating             TINYINT NULL,
      quote              TEXT NOT NULL,
      is_active          TINYINT(1) NOT NULL DEFAULT 1,
      display_order      INT NOT NULL DEFAULT 0,
      created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_testimonials_active (is_active),
      CONSTRAINT fk_testimonials_feedback
        FOREIGN KEY (source_feedback_id) REFERENCES feedbacks(id) ON DELETE SET NULL
    );

    INSERT INTO schema_migrations (filename) VALUES ('008_testimonials.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_008();
DROP PROCEDURE __run_migration_008;
