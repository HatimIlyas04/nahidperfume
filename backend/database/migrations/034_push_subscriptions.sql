-- ============================================================
-- Migration 034_push_subscriptions.sql
--
-- Web Push subscriptions for admin order alerts (real Android/desktop
-- push notifications via the Push API + VAPID -- no WhatsApp/Meta/paid
-- service involved). One row per browser/device an admin has enabled
-- notifications on, so the same admin can receive pushes on a phone, a
-- laptop and a tablet at once without one device's subscription
-- overwriting another's.
-- ============================================================
DELIMITER $
DROP PROCEDURE IF EXISTS __run_migration_034$
CREATE PROCEDURE __run_migration_034()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '034_push_subscriptions.sql') THEN

    CREATE TABLE IF NOT EXISTS push_subscriptions (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      admin_id    INT NOT NULL,
      endpoint    VARCHAR(500) NOT NULL,
      p256dh      VARCHAR(255) NOT NULL,
      auth        VARCHAR(255) NOT NULL,
      user_agent  VARCHAR(255) NULL,
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      -- Prefix length keeps this compatible with older utf8mb4 InnoDB index
      -- byte limits regardless of the host's innodb_large_prefix setting --
      -- re-subscribing the same browser (endpoint unchanged) upserts instead
      -- of piling up duplicate rows for the same device.
      UNIQUE KEY uniq_push_subscriptions_endpoint (endpoint(191)),
      INDEX idx_push_subscriptions_admin (admin_id),
      CONSTRAINT fk_push_subscriptions_admin FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
    );

    INSERT INTO schema_migrations (filename) VALUES ('034_push_subscriptions.sql');
  END IF;
END$
DELIMITER ;

CALL __run_migration_034();
DROP PROCEDURE __run_migration_034;
