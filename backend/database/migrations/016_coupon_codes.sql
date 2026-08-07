-- ============================================================
-- Migration 016_coupon_codes.sql
--
-- Also adds the orders.coupon_id -> coupon_codes(id) foreign key
-- that migration 006 deliberately left as a plain column, since
-- this table didn't exist yet at that point in the sequence.
--
-- Concurrency note (enforced in couponService.js, not here):
-- used_count must be incremented atomically with order creation —
--   UPDATE coupon_codes SET used_count = used_count + 1
--   WHERE id = ? AND is_active = 1 AND (max_uses IS NULL OR used_count < max_uses)
-- inside the same transaction as the order insert, aborting the
-- order if affectedRows = 0.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_016$$
CREATE PROCEDURE __run_migration_016()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '016_coupon_codes.sql') THEN

    CREATE TABLE IF NOT EXISTS coupon_codes (
      id                     INT AUTO_INCREMENT PRIMARY KEY,
      code                   VARCHAR(50) NOT NULL UNIQUE,
      discount_type          ENUM('percent','fixed') NOT NULL,
      discount_value         DECIMAL(10,2) NOT NULL,
      min_order_amount       DECIMAL(10,2) NULL,
      max_uses               INT NULL,
      used_count             INT NOT NULL DEFAULT 0,
      max_uses_per_customer  INT NULL,
      is_active              TINYINT(1) NOT NULL DEFAULT 1,
      starts_at              TIMESTAMP NULL,
      expires_at             TIMESTAMP NULL,
      created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_coupon_codes_active (is_active)
    );

    ALTER TABLE orders
      ADD CONSTRAINT fk_orders_coupon
        FOREIGN KEY (coupon_id) REFERENCES coupon_codes(id) ON DELETE SET NULL;

    INSERT INTO schema_migrations (filename) VALUES ('016_coupon_codes.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_016();
DROP PROCEDURE __run_migration_016;
