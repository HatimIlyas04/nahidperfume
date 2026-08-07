-- ============================================================
-- Migration 015_contact_messages.sql
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_015$$
CREATE PROCEDURE __run_migration_015()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '015_contact_messages.sql') THEN

    CREATE TABLE IF NOT EXISTS contact_messages (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(255) NOT NULL,
      email       VARCHAR(255) NULL,
      phone       VARCHAR(20) NULL,
      subject     VARCHAR(255) NULL,
      message     TEXT NOT NULL,
      status      ENUM('new','read','replied','archived') NOT NULL DEFAULT 'new',
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_contact_messages_status (status)
    );

    INSERT INTO schema_migrations (filename) VALUES ('015_contact_messages.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_015();
DROP PROCEDURE __run_migration_015;
