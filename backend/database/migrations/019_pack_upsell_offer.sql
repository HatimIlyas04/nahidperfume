-- ============================================================
-- Migration 019_pack_upsell_offer.sql
--
-- Adds a designated "post-purchase upsell" pack for the Thank You
-- page's one-click offer ("Add another pack for only 200 MAD").
-- Admin flags exactly one pack as the upsell offer with its own
-- special price — enforced in packService (only one flips true at
-- a time), not by a DB constraint.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_019$$
CREATE PROCEDURE __run_migration_019()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '019_pack_upsell_offer.sql') THEN

    ALTER TABLE packs
      ADD COLUMN is_upsell_offer TINYINT(1) NOT NULL DEFAULT 0 AFTER is_featured,
      ADD COLUMN upsell_price DECIMAL(10,2) NULL AFTER is_upsell_offer;

    ALTER TABLE packs
      ADD INDEX idx_packs_upsell (is_upsell_offer);

    -- Tracks whether the one-click upsell was already applied to an
    -- order, so the offer can't be accepted twice on the same order.
    ALTER TABLE orders
      ADD COLUMN upsell_applied_at TIMESTAMP NULL AFTER whatsapp_notified_at;

    INSERT INTO schema_migrations (filename) VALUES ('019_pack_upsell_offer.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_019();
DROP PROCEDURE __run_migration_019;
