-- ============================================================
-- Migration 018_indexes_cleanup.sql
-- Final pass: composite indexes for the query patterns Phase 1's
-- admin dashboard and storefront rely on most.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_018$$
CREATE PROCEDURE __run_migration_018()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '018_indexes_cleanup.sql') THEN

    ALTER TABLE perfumes
      ADD INDEX idx_perfumes_active_category (is_active, category);

    ALTER TABLE orders
      ADD INDEX idx_orders_status_created (status, created_at);

    ALTER TABLE order_items
      ADD INDEX idx_order_items_order (order_id);

    INSERT INTO schema_migrations (filename) VALUES ('018_indexes_cleanup.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_018();
DROP PROCEDURE __run_migration_018;
