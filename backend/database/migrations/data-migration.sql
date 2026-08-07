-- ============================================================
-- data-migration.sql
-- Run this LAST, after 000-018 have all applied successfully.
--
-- Does two things:
--   1. Remaps orders.status old values -> new values
--      (processing -> preparing, shipped -> shipping)
--   2. Copies reviews -> feedbacks (status derived from is_approved)
--
-- Does NOT drop the old `reviews` table automatically — that is a
-- separate, manual final step at the bottom of this file. Run it
-- yourself only after you've spot-checked that feedbacks looks right.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_data_migration$$
CREATE PROCEDURE __run_data_migration()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = 'data-migration.sql') THEN

    -- ── 1. Order status remap ──────────────────────────────
    -- Widen the enum to accept both old and new values, remap the
    -- rows, then narrow it to the final set. Idempotent: once no
    -- row has the old values, the UPDATEs are no-ops on a re-run.
    ALTER TABLE orders
      MODIFY COLUMN status
        ENUM('pending','processing','shipped','delivered','cancelled','confirmed','preparing','shipping')
        NOT NULL DEFAULT 'pending';

    UPDATE orders SET status = 'preparing' WHERE status = 'processing';
    UPDATE orders SET status = 'shipping'  WHERE status = 'shipped';

    ALTER TABLE orders
      MODIFY COLUMN status
        ENUM('pending','confirmed','preparing','shipping','delivered','cancelled')
        NOT NULL DEFAULT 'pending';

    -- ── 2. reviews -> feedbacks ─────────────────────────────
    -- Guarded independently of the outer ledger check so a retry
    -- after a mid-script failure never double-inserts.
    IF (SELECT COUNT(*) FROM feedbacks) = 0 AND (SELECT COUNT(*) FROM reviews) > 0 THEN
      INSERT INTO feedbacks (first_name, last_name, avatar, rating, message, status, created_at)
      SELECT
        first_name,
        last_name,
        avatar,
        rating,
        message,
        CASE WHEN is_approved = 1 THEN 'approved' ELSE 'pending' END,
        created_at
      FROM reviews;
    END IF;

    -- Abort (and roll back the ledger insert below) if the copy
    -- didn't fully land — surfaces loudly instead of silently
    -- dropping `reviews` on a mismatched copy later.
    IF (SELECT COUNT(*) FROM feedbacks) <> (SELECT COUNT(*) FROM reviews) THEN
      SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'feedbacks row count does not match reviews row count — investigate before proceeding';
    END IF;

    INSERT INTO schema_migrations (filename) VALUES ('data-migration.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_data_migration();
DROP PROCEDURE __run_data_migration;

-- ============================================================
-- MANUAL FINAL STEP — do not automate this.
-- Only after confirming `SELECT COUNT(*) FROM feedbacks` matches
-- `SELECT COUNT(*) FROM reviews` and spot-checking a few rows,
-- run this yourself to drop the old table:
--
--   DROP TABLE reviews;
-- ============================================================
