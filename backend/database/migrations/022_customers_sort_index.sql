-- ============================================================
-- Migration 022_customers_sort_index.sql
--
-- The admin Customers list sorts by total_spent DESC, orders_count DESC
-- (customersRepo.findAll) with neither column indexed, forcing a filesort
-- on every page load. Adds a composite index covering that exact sort.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_022$$
CREATE PROCEDURE __run_migration_022()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '022_customers_sort_index.sql') THEN

    ALTER TABLE customers
      ADD INDEX idx_customers_spend_sort (total_spent DESC, orders_count DESC);

    INSERT INTO schema_migrations (filename) VALUES ('022_customers_sort_index.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_022();
DROP PROCEDURE __run_migration_022;
