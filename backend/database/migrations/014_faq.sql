-- ============================================================
-- Migration 014_faq.sql
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_014$$
CREATE PROCEDURE __run_migration_014()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '014_faq.sql') THEN

    CREATE TABLE IF NOT EXISTS faq (
      id             INT AUTO_INCREMENT PRIMARY KEY,
      question       VARCHAR(500) NOT NULL,
      answer         TEXT NOT NULL,
      category       VARCHAR(100) NULL,
      is_active      TINYINT(1) NOT NULL DEFAULT 1,
      display_order  INT NOT NULL DEFAULT 0,
      created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_faq_active (is_active),
      INDEX idx_faq_category (category)
    );

    INSERT INTO schema_migrations (filename) VALUES ('014_faq.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_014();
DROP PROCEDURE __run_migration_014;
