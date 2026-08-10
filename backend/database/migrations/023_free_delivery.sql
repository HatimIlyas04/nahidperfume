-- ============================================================
-- Migration 023_free_delivery.sql
--
-- Business decision: pack prices are now all-inclusive (e.g. a
-- 200 DH pack costs the customer exactly 200 DH, delivery
-- included) instead of price + a 30 DH flat shipping fee added
-- at checkout. Unlike migration 020's INSERT ... ON DUPLICATE KEY
-- UPDATE setting_key = setting_key (a no-op if the row already
-- exists, used there to seed-without-clobbering), this migration
-- intentionally overwrites the existing shipping_flat_rate value
-- — that's the whole point of the change. Still admin-editable
-- afterwards via the Settings page if pricing policy changes again.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_023$$
CREATE PROCEDURE __run_migration_023()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '023_free_delivery.sql') THEN

    UPDATE settings SET setting_value = '0' WHERE setting_key = 'shipping_flat_rate';

    INSERT INTO schema_migrations (filename) VALUES ('023_free_delivery.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_023();
DROP PROCEDURE __run_migration_023;
