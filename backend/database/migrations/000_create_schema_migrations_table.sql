-- ============================================================
-- Migration 000_create_schema_migrations_table.sql
-- Bookkeeping ledger: every migration below checks this table
-- before doing any work, so re-running a file is always a no-op
-- if it already applied. Run this file first, always.
-- ============================================================
CREATE TABLE IF NOT EXISTS schema_migrations (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  filename    VARCHAR(255) UNIQUE NOT NULL,
  applied_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO schema_migrations (filename) VALUES ('000_create_schema_migrations_table.sql');
