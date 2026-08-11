-- ============================================================
-- Migration 027_trust_badges.sql
--
-- The trust-badge strip under the homepage packs grid (TrustBadges.jsx)
-- was 100% hardcoded via a translation array (t("trustBadges.items")),
-- with no admin control and no per-language pairing beyond whatever
-- was in the fr/en/ar translation files. New small table, seeded from
-- the current 4 hardcoded items, so nothing visually changes until an
-- admin edits it.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_027$$
CREATE PROCEDURE __run_migration_027()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '027_trust_badges.sql') THEN

    CREATE TABLE IF NOT EXISTS trust_badges (
      id             INT AUTO_INCREMENT PRIMARY KEY,
      icon_key       VARCHAR(30) NOT NULL DEFAULT 'shield',
      title_fr       VARCHAR(150) NOT NULL,
      title_ar       VARCHAR(150) NULL,
      subtitle_fr    VARCHAR(150) NULL,
      subtitle_ar    VARCHAR(150) NULL,
      display_order  INT NOT NULL DEFAULT 0,
      is_active      TINYINT(1) NOT NULL DEFAULT 1,
      created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_trust_badges_active (is_active)
    );

    INSERT INTO trust_badges (icon_key, title_fr, title_ar, subtitle_fr, subtitle_ar, display_order) VALUES
      ('shield',    'Paiement sécurisé',        'دفع آمن',                 'Paiement à la livraison', 'الدفع عند الاستلام', 1),
      ('truck',     'Livraison gratuite',       'توصيل مجاني',             'Partout au Maroc',        'في جميع أنحاء المغرب', 2),
      ('refresh',   'Satisfait ou remboursé',   'رضا تام أو استرجاع',       'Sous 7 jours',            'خلال 7 أيام', 3),
      ('phone',     'Support client',           'خدمة العملاء',            'Réponse rapide',          'رد سريع', 4);

    INSERT INTO schema_migrations (filename) VALUES ('027_trust_badges.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_027();
DROP PROCEDURE __run_migration_027;
