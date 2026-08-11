-- ============================================================
-- Migration 025_whatsapp_setting.sql
--
-- Fixes a real bug: WhatsApp links were hardcoded to
-- wa.me/212636550058 in 3 frontend files -- the WRONG number. The
-- correct one (0636572200) already had a home in the settings table
-- (contact_whatsapp, seeded blank in schema.sql) but nothing wrote to
-- it or read from it. This migration sets the value; the frontend
-- fix (reading it instead of hardcoding) ships in the same PR as this
-- migration.
-- ============================================================
INSERT INTO settings (setting_key, setting_value, setting_group) VALUES
  ('contact_whatsapp', '0636572200', 'contact')
ON DUPLICATE KEY UPDATE setting_value = '0636572200';

INSERT INTO schema_migrations (filename)
SELECT '025_whatsapp_setting.sql' WHERE NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '025_whatsapp_setting.sql');
