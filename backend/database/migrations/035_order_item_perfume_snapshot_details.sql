-- ============================================================
-- Migration 035_order_item_perfume_snapshot_details.sql
--
-- order_item_perfumes only snapshotted a perfume's name and image at the
-- moment an order was placed -- an admin opening an order had no way to
-- see that perfume's inspiration/concentration/size/gender without
-- separately looking it up (and looking it up in the LIVE perfumes table
-- can already be wrong if the perfume was edited or deleted since).
--
-- Adds four more snapshot columns, all nullable so every existing
-- order_item_perfumes row (created before this migration) is untouched --
-- historical orders simply have NULL here, which the admin UI displays as
-- "not recorded for this order" rather than fabricating a value. Never
-- backfilled from the current perfumes table: that would silently claim a
-- past order had info it didn't actually capture, which is exactly the
-- kind of historical-accuracy mistake this migration exists to avoid
-- making worse.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_035$$
CREATE PROCEDURE __run_migration_035()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '035_order_item_perfume_snapshot_details.sql') THEN

    ALTER TABLE order_item_perfumes
      ADD COLUMN perfume_inspired_by_snapshot VARCHAR(255) NULL AFTER perfume_image_snapshot,
      ADD COLUMN perfume_concentration_snapshot VARCHAR(100) NULL AFTER perfume_inspired_by_snapshot,
      ADD COLUMN perfume_size_snapshot VARCHAR(20) NULL AFTER perfume_concentration_snapshot,
      ADD COLUMN perfume_gender_snapshot VARCHAR(20) NULL AFTER perfume_size_snapshot;

    INSERT INTO schema_migrations (filename) VALUES ('035_order_item_perfume_snapshot_details.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_035();
DROP PROCEDURE __run_migration_035;
