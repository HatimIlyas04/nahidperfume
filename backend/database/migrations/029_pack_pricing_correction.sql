-- ============================================================
-- Migration 029_pack_pricing_correction.sql
--
-- Data-only correction, no structural change. Two drifted values found
-- live in production that both contradicted the "200 DH all-inclusive"
-- pack price policy:
--
-- 1. `settings.shipping_flat_rate` was still '30' even though migration
--    023_free_delivery.sql was supposed to zero it out -- that migration's
--    row already exists in schema_migrations on this DB (so it silently
--    no-op'd rather than never ran), meaning the UPDATE itself never
--    actually landed. Application code (backend/services/orderService.js)
--    no longer reads this setting for order-total calculation at all as
--    of this same change -- shipping is now a hardcoded 0, so this row is
--    purely for Admin > Settings display accuracy, not calculation.
--
-- 2. `packs.upsell_price` was 175.00 on the live post-purchase upsell
--    pack instead of the intended 150.00 promotional price.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_029$$
CREATE PROCEDURE __run_migration_029()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '029_pack_pricing_correction.sql') THEN

    UPDATE settings SET setting_value = '0' WHERE setting_key = 'shipping_flat_rate';
    UPDATE packs SET upsell_price = 150.00 WHERE is_upsell_offer = 1;

    INSERT INTO schema_migrations (filename) VALUES ('029_pack_pricing_correction.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_029();
DROP PROCEDURE __run_migration_029;
