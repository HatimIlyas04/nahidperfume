-- ============================================================
-- Migration 007_feedbacks.sql
--
-- Fresh table replacing `reviews`. Kept separate from `reviews`
-- (not a rename) so data-migration.sql can copy + verify row
-- counts before the old table is dropped. Upgrades the boolean
-- `is_approved` to a tri-state status (pending/approved/rejected)
-- since the admin UI already distinguishes approve vs reject.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_007$$
CREATE PROCEDURE __run_migration_007()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '007_feedbacks.sql') THEN

    CREATE TABLE IF NOT EXISTS feedbacks (
      id           INT AUTO_INCREMENT PRIMARY KEY,
      customer_id  INT NULL,
      first_name   VARCHAR(100) NOT NULL,
      last_name    VARCHAR(100) NOT NULL,
      avatar       VARCHAR(50) NOT NULL DEFAULT 'bloom',
      rating       TINYINT NOT NULL,
      message      TEXT NOT NULL,
      status       ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
      created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_feedbacks_status (status),
      INDEX idx_feedbacks_rating (rating),
      CONSTRAINT fk_feedbacks_customer
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
    );

    INSERT INTO schema_migrations (filename) VALUES ('007_feedbacks.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_007();
DROP PROCEDURE __run_migration_007;
