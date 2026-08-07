-- ============================================================
-- Migration 010_notifications.sql
--
-- Persisted admin notification feed (order arrived, new feedback,
-- new contact message, ...). Persisted so the unread count/bell
-- survives a dashboard refresh; Socket.IO push is wired on top of
-- this table in a later phase, not part of Phase 1.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_010$$
CREATE PROCEDURE __run_migration_010()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '010_notifications.sql') THEN

    CREATE TABLE IF NOT EXISTS notifications (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      type        VARCHAR(50) NOT NULL COMMENT 'e.g. new_order, new_feedback, new_contact_message',
      title       VARCHAR(255) NOT NULL,
      body        TEXT NULL,
      link        VARCHAR(500) NULL,
      related_id  INT NULL,
      is_read     TINYINT(1) NOT NULL DEFAULT 0,
      read_at     TIMESTAMP NULL,
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_notifications_unread (is_read, created_at)
    );

    INSERT INTO schema_migrations (filename) VALUES ('010_notifications.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_010();
DROP PROCEDURE __run_migration_010;
