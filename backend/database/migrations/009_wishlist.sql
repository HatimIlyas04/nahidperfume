-- ============================================================
-- Migration 009_wishlist.sql
--
-- Two separate tables (perfumes vs packs) rather than one
-- polymorphic table with two nullable target columns — MySQL
-- unique indexes don't treat NULLs as equal, so a single table
-- couldn't actually prevent duplicate wishlist entries.
-- Wishlist was purely localStorage before this; this is new
-- server-side storage, not a migration of existing data.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_009$$
CREATE PROCEDURE __run_migration_009()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '009_wishlist.sql') THEN

    CREATE TABLE IF NOT EXISTS wishlist_perfumes (
      id           INT AUTO_INCREMENT PRIMARY KEY,
      device_token VARCHAR(64) NOT NULL,
      customer_id  INT NULL,
      perfume_id   INT NOT NULL,
      created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uniq_wishlist_perfume (device_token, perfume_id),
      INDEX idx_wishlist_perfumes_device (device_token),
      CONSTRAINT fk_wishlist_perfumes_customer
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
      CONSTRAINT fk_wishlist_perfumes_perfume
        FOREIGN KEY (perfume_id) REFERENCES perfumes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS wishlist_packs (
      id           INT AUTO_INCREMENT PRIMARY KEY,
      device_token VARCHAR(64) NOT NULL,
      customer_id  INT NULL,
      pack_id      INT NOT NULL,
      created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uniq_wishlist_pack (device_token, pack_id),
      INDEX idx_wishlist_packs_device (device_token),
      CONSTRAINT fk_wishlist_packs_customer
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
      CONSTRAINT fk_wishlist_packs_pack
        FOREIGN KEY (pack_id) REFERENCES packs(id) ON DELETE CASCADE
    );

    INSERT INTO schema_migrations (filename) VALUES ('009_wishlist.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_009();
DROP PROCEDURE __run_migration_009;
