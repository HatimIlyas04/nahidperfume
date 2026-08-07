-- ============================================================
-- Migration 006_orders_orderitems_restructure.sql
-- HIGHEST-RISK FILE — touches the only tables with real customer
-- data. Review this one carefully before running. Nothing here
-- deletes existing order rows; it only adds columns/tables and
-- backfills sane defaults for pre-existing orders.
--
-- Note: the `status` enum itself (pending/processing/shipped/...
-- -> pending/confirmed/preparing/shipping/...) is intentionally
-- NOT changed here — that remap runs in data-migration.sql, after
-- every schema migration has applied, to keep this file DDL-only.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_006$$
CREATE PROCEDURE __run_migration_006()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '006_orders_orderitems_restructure.sql') THEN

    -- ── orders: new columns ─────────────────────────────────
    ALTER TABLE orders
      ADD COLUMN order_number VARCHAR(20) NULL UNIQUE AFTER id,
      ADD COLUMN customer_id INT NULL AFTER order_number,
      ADD COLUMN customer_city VARCHAR(100) NULL AFTER customer_address,
      ADD COLUMN subtotal_amount DECIMAL(10,2) NULL AFTER total_amount,
      ADD COLUMN shipping_amount DECIMAL(10,2) NOT NULL DEFAULT 0 AFTER subtotal_amount,
      ADD COLUMN discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0 AFTER shipping_amount,
      ADD COLUMN coupon_id INT NULL AFTER discount_amount,
      ADD COLUMN coupon_code_snapshot VARCHAR(50) NULL AFTER coupon_id,
      ADD COLUMN payment_method ENUM('cod') NOT NULL DEFAULT 'cod' AFTER coupon_code_snapshot,
      ADD COLUMN admin_notes TEXT NULL AFTER payment_method,
      ADD COLUMN whatsapp_notified_at TIMESTAMP NULL AFTER admin_notes,
      ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

    -- Backfill: pre-existing orders had no subtotal/shipping/discount
    -- breakdown, so subtotal = total, shipping/discount stay at 0.
    UPDATE orders SET subtotal_amount = total_amount WHERE subtotal_amount IS NULL;

    -- order_number: human-friendly display reference, zero-padded id.
    UPDATE orders SET order_number = CONCAT('NHD-', LPAD(id, 6, '0')) WHERE order_number IS NULL;

    ALTER TABLE orders
      MODIFY COLUMN subtotal_amount DECIMAL(10,2) NOT NULL,
      ADD CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
      ADD INDEX idx_orders_status (status),
      ADD INDEX idx_orders_created_at (created_at);

    -- ── order_items: new columns + renames ──────────────────
    ALTER TABLE order_items
      ADD COLUMN item_type ENUM('legacy_product','ready_pack','ready_pack_customized','custom_pack')
        NOT NULL DEFAULT 'legacy_product' AFTER order_id,
      ADD COLUMN source_pack_id INT NULL AFTER item_type,
      CHANGE COLUMN product_name item_name_snapshot VARCHAR(255) NOT NULL,
      ADD COLUMN item_image_snapshot VARCHAR(500) NULL AFTER item_name_snapshot,
      CHANGE COLUMN price unit_price DECIMAL(10,2) NOT NULL;

    -- Orphan-check: null out any product_id pointing at a perfume that
    -- was hard-deleted in the past (the original schema never enforced
    -- this FK), so the new FK constraint below doesn't fail.
    UPDATE order_items
      SET product_id = NULL
      WHERE product_id IS NOT NULL
        AND product_id NOT IN (SELECT id FROM perfumes);

    ALTER TABLE order_items
      ADD CONSTRAINT fk_order_items_perfume
        FOREIGN KEY (product_id) REFERENCES perfumes(id) ON DELETE SET NULL,
      ADD CONSTRAINT fk_order_items_pack
        FOREIGN KEY (source_pack_id) REFERENCES packs(id) ON DELETE SET NULL,
      ADD INDEX idx_order_items_type (item_type);

    -- ── order_item_perfumes: 4-perfume snapshot per pack-type line ──
    CREATE TABLE IF NOT EXISTS order_item_perfumes (
      id                     INT AUTO_INCREMENT PRIMARY KEY,
      order_item_id          INT NOT NULL,
      perfume_id             INT NULL,
      position               TINYINT NOT NULL COMMENT '1-4',
      perfume_name_snapshot  VARCHAR(255) NOT NULL,
      perfume_image_snapshot VARCHAR(500) NULL,
      UNIQUE KEY uniq_order_item_position (order_item_id, position),
      INDEX idx_order_item_perfumes_perfume (perfume_id),
      CONSTRAINT fk_oip_order_item
        FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE,
      CONSTRAINT fk_oip_perfume
        FOREIGN KEY (perfume_id) REFERENCES perfumes(id) ON DELETE SET NULL
    );

    INSERT INTO schema_migrations (filename) VALUES ('006_orders_orderitems_restructure.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_006();
DROP PROCEDURE __run_migration_006;
