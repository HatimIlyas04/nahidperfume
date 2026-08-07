-- ============================================================
-- Migration 002_admins_roles.sql
--
-- Adds role-based access (super_admin vs admin) and account
-- hygiene fields to the admins table. Renames `password` to
-- `password_hash` for clarity (same bcrypt values, just a
-- clearer column name). Existing admin rows are backfilled to
-- 'super_admin' so nobody loses access after this migration.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_002$$
CREATE PROCEDURE __run_migration_002()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '002_admins_roles.sql') THEN

    ALTER TABLE admins
      CHANGE COLUMN password password_hash VARCHAR(255) NOT NULL,
      ADD COLUMN role ENUM('super_admin','admin') NOT NULL DEFAULT 'admin' AFTER password_hash,
      ADD COLUMN full_name VARCHAR(150) NULL AFTER role,
      ADD COLUMN is_active TINYINT(1) NOT NULL DEFAULT 1 AFTER full_name,
      ADD COLUMN last_login_at TIMESTAMP NULL AFTER is_active,
      ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

    -- Every admin that existed before this migration becomes a super_admin.
    -- Any admin created after this migration defaults to the 'admin' role.
    UPDATE admins SET role = 'super_admin';

    INSERT INTO schema_migrations (filename) VALUES ('002_admins_roles.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_002();
DROP PROCEDURE __run_migration_002;
