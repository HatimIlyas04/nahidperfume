-- ============================================================
-- Migration 003_customers.sql
--
-- Passive CRM record, NOT a login system. Guest checkout stays
-- guest checkout — this table just lets the admin dashboard see
-- "who has ordered before" (found-or-created by phone at checkout).
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_003$$
CREATE PROCEDURE __run_migration_003()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '003_customers.sql') THEN

    CREATE TABLE IF NOT EXISTS customers (
      id              INT AUTO_INCREMENT PRIMARY KEY,
      name            VARCHAR(255) NOT NULL,
      email           VARCHAR(255) NULL,
      phone           VARCHAR(20)  NULL,
      device_token    VARCHAR(64)  NULL,
      first_order_id  INT NULL,
      orders_count    INT NOT NULL DEFAULT 0,
      total_spent     DECIMAL(10,2) NOT NULL DEFAULT 0,
      created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_customers_phone (phone),
      INDEX idx_customers_email (email),
      INDEX idx_customers_device_token (device_token)
    );

    ALTER TABLE customers
      ADD CONSTRAINT fk_customers_first_order
        FOREIGN KEY (first_order_id) REFERENCES orders(id) ON DELETE SET NULL;

    INSERT INTO schema_migrations (filename) VALUES ('003_customers.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_003();
DROP PROCEDURE __run_migration_003;
