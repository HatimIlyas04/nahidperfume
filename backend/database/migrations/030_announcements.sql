-- ============================================================
-- Migration 030_announcements.sql
--
-- The navbar's scrolling announcement ticker (Navbar.jsx, nb-ann-track)
-- was 100% hardcoded via a translation array (t("nav.announcements")),
-- with no admin control. New small table, same pattern as
-- 027_trust_badges.sql, seeded from the current 5 hardcoded items so
-- nothing visually changes until an admin edits it.
-- ============================================================
DELIMITER $$
DROP PROCEDURE IF EXISTS __run_migration_030$$
CREATE PROCEDURE __run_migration_030()
BEGIN
  IF NOT EXISTS (SELECT 1 FROM schema_migrations WHERE filename = '030_announcements.sql') THEN

    CREATE TABLE IF NOT EXISTS announcements (
      id             INT AUTO_INCREMENT PRIMARY KEY,
      text_fr        VARCHAR(200) NOT NULL,
      text_ar        VARCHAR(200) NULL,
      display_order  INT NOT NULL DEFAULT 0,
      is_active      TINYINT(1) NOT NULL DEFAULT 1,
      created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_announcements_active (is_active)
    );

    INSERT INTO announcements (text_fr, text_ar, display_order) VALUES
      ('Livraison offerte dès 160 MAD', 'توصيل مجاني من 160 درهم', 1),
      ('Échantillon gratuit avec chaque commande', 'عينة مجانية مع كل طلب', 2),
      ('Nouveauté — Collection Oud de Camboge', 'جديد — مجموعة عود كامبودج', 3),
      ('Paiement à la livraison — 100% sécurisé', 'الدفع عند الاستلام — آمن 100%', 4),
      ('4.9 / 5 · 2 400 clients satisfaits', '4.9/5 · 2400 عميل راضٍ', 5);

    INSERT INTO schema_migrations (filename) VALUES ('030_announcements.sql');
  END IF;
END$$
DELIMITER ;

CALL __run_migration_030();
DROP PROCEDURE __run_migration_030;
