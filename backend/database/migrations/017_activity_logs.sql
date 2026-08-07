-- ============================================================
-- Migration 017_activity_logs.sql
-- Admin action audit trail (who did what, when).
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_017$$
CREATE PROCEDURE __run_migration_017()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '017_activity_logs.sql') THEN

    CREATE TABLE IF NOT EXISTS activity_logs (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      admin_id      INT NULL,
      action        VARCHAR(100) NOT NULL COMMENT 'e.g. pack.create, order.status_change, admin.login',
      entity_type   VARCHAR(50) NULL,
      entity_id     INT NULL,
      details_json  TEXT NULL,
      ip_address    VARCHAR(45) NULL,
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_activity_logs_admin (admin_id),
      INDEX idx_activity_logs_created (created_at),
      INDEX idx_activity_logs_entity (entity_type, entity_id),
      CONSTRAINT fk_activity_logs_admin
        FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL
    );

    INSERT INTO schema_migrations (filename) VALUES ('017_activity_logs.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_017();
DROP PROCEDURE __run_migration_017;
