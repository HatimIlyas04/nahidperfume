-- ============================================================
-- Migration 004_packs_and_pack_perfumes.sql
--
-- Ready packs: admin-curated, always exactly 4 perfumes.
-- MySQL cannot enforce "exactly 4 rows" via a constraint — that
-- invariant is enforced in the backend service layer
-- (packService.js) inside a transaction on every create/update.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_004$$
CREATE PROCEDURE __run_migration_004()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '004_packs_and_pack_perfumes.sql') THEN

    CREATE TABLE IF NOT EXISTS packs (
      id                 INT AUTO_INCREMENT PRIMARY KEY,
      title              VARCHAR(255) NOT NULL,
      slug               VARCHAR(255) NULL UNIQUE,
      description        TEXT NULL,
      cover_image        VARCHAR(500) NULL,
      gallery_images     TEXT NULL,
      price              DECIMAL(10,2) NOT NULL,
      compare_at_price   DECIMAL(10,2) NULL,
      is_active          TINYINT(1) NOT NULL DEFAULT 1,
      is_featured        TINYINT(1) NOT NULL DEFAULT 0,
      display_order      INT NOT NULL DEFAULT 0,
      created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_packs_active (is_active),
      INDEX idx_packs_display_order (display_order)
    );

    CREATE TABLE IF NOT EXISTS pack_perfumes (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      pack_id     INT NOT NULL,
      perfume_id  INT NOT NULL,
      position    TINYINT NOT NULL COMMENT '1-4, display order within the pack',
      UNIQUE KEY uniq_pack_position (pack_id, position),
      UNIQUE KEY uniq_pack_perfume (pack_id, perfume_id),
      INDEX idx_pack_perfumes_perfume (perfume_id),
      CONSTRAINT fk_pack_perfumes_pack
        FOREIGN KEY (pack_id) REFERENCES packs(id) ON DELETE CASCADE,
      CONSTRAINT fk_pack_perfumes_perfume
        FOREIGN KEY (perfume_id) REFERENCES perfumes(id) ON DELETE RESTRICT
    );

    INSERT INTO schema_migrations (filename) VALUES ('004_packs_and_pack_perfumes.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_004();
DROP PROCEDURE __run_migration_004;
