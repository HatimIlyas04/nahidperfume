-- ============================================================
-- Migration 034_push_subscriptions.sql
--
-- Web Push subscriptions for admin order alerts (real Android/desktop
-- push notifications via the Push API + VAPID -- no WhatsApp/Meta/paid
-- service involved). One row per browser/device an admin has enabled
-- notifications on, so the same admin can receive pushes on a phone, a
-- laptop and a tablet at once without one device's subscription
-- overwriting another's.
--
-- No CREATE PROCEDURE / DELIMITER here on purpose (unlike earlier
-- migrations): this only ever CREATEs a brand-new table, never ALTERs an
-- existing one, so CREATE TABLE IF NOT EXISTS is already naturally
-- idempotent on its own -- a stored-procedure guard would add complexity
-- for zero extra safety here. This also sidesteps the exact bug that
-- broke the first version of this file: run-migrations.js's
-- stripDelimiterDirectives() only rewrites a doubled delimiter marker
-- back into a semicolon (matching every other migration's convention),
-- and this file previously used a single marker character instead of a
-- doubled one, which was left as a stray, invalid character in the SQL
-- sent to MySQL instead of being converted -- causing the reported
-- syntax error right after the DROP PROCEDURE line. Note for future
-- edits: that same rewrite is a blind text substitution across this
-- entire file, comments included, so this comment itself avoids typing
-- the literal doubled-marker character sequence.
-- ============================================================

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  admin_id    INT NOT NULL,
  endpoint    VARCHAR(500) NOT NULL,
  p256dh      VARCHAR(255) NOT NULL,
  auth        VARCHAR(255) NOT NULL,
  user_agent  VARCHAR(255) NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_push_subscriptions_endpoint (endpoint(191)),
  INDEX idx_push_subscriptions_admin (admin_id),
  CONSTRAINT fk_push_subscriptions_admin FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

-- INSERT IGNORE relies on schema_migrations.filename's existing UNIQUE
-- constraint: a second run (table already exists) hits the duplicate key
-- and is silently skipped instead of erroring, so this whole file is
-- safe to execute any number of times, from any state.
INSERT IGNORE INTO schema_migrations (filename) VALUES ('034_push_subscriptions.sql');
