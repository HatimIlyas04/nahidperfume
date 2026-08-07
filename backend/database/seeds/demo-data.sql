-- ============================================================
-- Optional demo data for local/dev/staging testing only.
-- Do NOT run against production. Safe to run multiple times
-- (guarded by name/title lookups).
-- ============================================================

INSERT INTO perfumes (name, description, category, gender, product_type, concentration, scent_family, longevity, top_notes, middle_notes, base_notes, image_url, is_active)
SELECT * FROM (SELECT
  'Ambre Royal' AS name, 'Un sillage boisé et ambré, chaleureux et envoûtant.' AS description,
  'Boisé' AS category, 'Homme' AS gender, 'Original' AS product_type, 'Eau de Parfum' AS concentration,
  'warm' AS scent_family, 'Longue (8h+)' AS longevity,
  'Bergamote, Poivre rose' AS top_notes, 'Ambre, Cannelle' AS middle_notes, 'Bois de santal, Musc' AS base_notes,
  NULL AS image_url, 1 AS is_active
) t WHERE NOT EXISTS (SELECT 1 FROM perfumes WHERE name = 'Ambre Royal');

INSERT INTO perfumes (name, description, category, gender, product_type, concentration, scent_family, longevity, top_notes, middle_notes, base_notes, image_url, is_active)
SELECT * FROM (SELECT
  'Fleur de Lune', 'Un bouquet floral lumineux aux notes de jasmin et de pivoine.',
  'Floral', 'Femme', 'Original', 'Eau de Parfum',
  'floral', 'Moyenne (5-6h)',
  'Pivoine, Poire', 'Jasmin, Rose', 'Musc blanc, Vanille',
  NULL, 1
) t WHERE NOT EXISTS (SELECT 1 FROM perfumes WHERE name = 'Fleur de Lune');

INSERT INTO perfumes (name, description, category, gender, product_type, concentration, scent_family, longevity, top_notes, middle_notes, base_notes, image_url, is_active)
SELECT * FROM (SELECT
  'Oud Intense', 'Un oud profond et mystérieux, pour une présence inoubliable.',
  'Oriental', 'Unisex', 'Original', 'Extrait de Parfum',
  'oriental', 'Très longue (10h+)',
  'Safran', 'Oud, Rose de Damas', 'Patchouli, Ambre gris',
  NULL, 1
) t WHERE NOT EXISTS (SELECT 1 FROM perfumes WHERE name = 'Oud Intense');

INSERT INTO perfumes (name, description, category, gender, product_type, concentration, scent_family, longevity, top_notes, middle_notes, base_notes, image_url, is_active)
SELECT * FROM (SELECT
  'Citrus Fraîcheur', 'Une explosion d''agrumes pétillante et énergisante.',
  'Frais', 'Unisex', 'Original', 'Eau de Toilette',
  'fresh', 'Courte (3-4h)',
  'Citron, Bergamote, Pamplemousse', 'Menthe, Basilic', 'Musc, Bois blanc',
  NULL, 1
) t WHERE NOT EXISTS (SELECT 1 FROM perfumes WHERE name = 'Citrus Fraîcheur');

INSERT INTO perfumes (name, description, category, gender, product_type, concentration, scent_family, longevity, top_notes, middle_notes, base_notes, image_url, is_active)
SELECT * FROM (SELECT
  'Vanille Sensuelle', 'Une gourmandise chaude et enveloppante à la vanille de Madagascar.',
  'Gourmand', 'Femme', 'Original', 'Eau de Parfum',
  'gourmand', 'Longue (8h+)',
  'Amande, Caramel', 'Vanille, Fleur d''oranger', 'Fève tonka, Musc',
  NULL, 1
) t WHERE NOT EXISTS (SELECT 1 FROM perfumes WHERE name = 'Vanille Sensuelle');

INSERT INTO perfumes (name, description, category, gender, product_type, concentration, scent_family, longevity, top_notes, middle_notes, base_notes, image_url, is_active)
SELECT * FROM (SELECT
  'Cuir Noir', 'Un accord de cuir viril et sophistiqué.',
  'Boisé', 'Homme', 'Original', 'Eau de Parfum',
  'woody', 'Longue (8h+)',
  'Cardamome', 'Cuir, Tabac', 'Vétiver, Bois de oud',
  NULL, 1
) t WHERE NOT EXISTS (SELECT 1 FROM perfumes WHERE name = 'Cuir Noir');

INSERT INTO perfumes (name, description, category, gender, product_type, concentration, scent_family, longevity, top_notes, middle_notes, base_notes, image_url, is_active)
SELECT * FROM (SELECT
  'Jardin Secret', 'Une escapade verte et fleurie, fraîche comme la rosée du matin.',
  'Floral', 'Femme', 'Original', 'Eau de Toilette',
  'green', 'Moyenne (5-6h)',
  'Feuille de figuier, Herbe coupée', 'Muguet, Freesia', 'Musc, Cèdre',
  NULL, 1
) t WHERE NOT EXISTS (SELECT 1 FROM perfumes WHERE name = 'Jardin Secret');

INSERT INTO perfumes (name, description, category, gender, product_type, concentration, scent_family, longevity, top_notes, middle_notes, base_notes, image_url, is_active)
SELECT * FROM (SELECT
  'Épices d''Orient', 'Un voyage épicé entre safran, cardamome et bois précieux.',
  'Oriental', 'Homme', 'Original', 'Eau de Parfum',
  'spicy', 'Longue (8h+)',
  'Cardamome, Poivre noir', 'Safran, Cannelle', 'Bois de santal, Ambre',
  NULL, 1
) t WHERE NOT EXISTS (SELECT 1 FROM perfumes WHERE name = 'Épices d''Orient');

-- ── Two demo ready packs, 4 perfumes each ────────────────────────
INSERT INTO packs (title, description, price, compare_at_price, is_active, is_featured, display_order)
SELECT * FROM (SELECT 'Pack Signature Homme', 'Quatre signatures masculines incontournables.', 250.00, 340.00, 1, 1, 1) t
WHERE NOT EXISTS (SELECT 1 FROM packs WHERE title = 'Pack Signature Homme');

INSERT INTO pack_perfumes (pack_id, perfume_id, position)
SELECT p.id, f.id, x.pos FROM packs p
JOIN (
  SELECT 'Ambre Royal' AS name, 1 AS pos UNION ALL
  SELECT 'Oud Intense', 2 UNION ALL
  SELECT 'Cuir Noir', 3 UNION ALL
  SELECT 'Épices d''Orient', 4
) x ON 1=1
JOIN perfumes f ON f.name = x.name
WHERE p.title = 'Pack Signature Homme'
  AND NOT EXISTS (SELECT 1 FROM pack_perfumes WHERE pack_id = p.id);

INSERT INTO packs (title, description, price, compare_at_price, is_active, is_featured, display_order)
SELECT * FROM (SELECT 'Pack Éclat Féminin', 'Une palette florale et gourmande pour toutes les occasions.', 250.00, 340.00, 1, 1, 2) t
WHERE NOT EXISTS (SELECT 1 FROM packs WHERE title = 'Pack Éclat Féminin');

INSERT INTO pack_perfumes (pack_id, perfume_id, position)
SELECT p.id, f.id, x.pos FROM packs p
JOIN (
  SELECT 'Fleur de Lune' AS name, 1 AS pos UNION ALL
  SELECT 'Vanille Sensuelle', 2 UNION ALL
  SELECT 'Jardin Secret', 3 UNION ALL
  SELECT 'Citrus Fraîcheur', 4
) x ON 1=1
JOIN perfumes f ON f.name = x.name
WHERE p.title = 'Pack Éclat Féminin'
  AND NOT EXISTS (SELECT 1 FROM pack_perfumes WHERE pack_id = p.id);

-- ── One demo coupon ───────────────────────────────────────────
INSERT INTO coupon_codes (code, discount_type, discount_value, min_order_amount, is_active)
SELECT * FROM (SELECT 'BIENVENUE10', 'percent', 10.00, 200.00, 1) t
WHERE NOT EXISTS (SELECT 1 FROM coupon_codes WHERE code = 'BIENVENUE10');

-- ── A couple of FAQ entries ────────────────────────────────────
INSERT INTO faq (question, answer, display_order)
SELECT * FROM (SELECT 'Puis-je remplacer un parfum dans un pack prêt ?', 'Oui — ouvrez le pack, cliquez sur "Personnaliser" puis "Remplacer" sur le parfum de votre choix.', 1) t
WHERE NOT EXISTS (SELECT 1 FROM faq WHERE question = 'Puis-je remplacer un parfum dans un pack prêt ?');

INSERT INTO faq (question, answer, display_order)
SELECT * FROM (SELECT 'Combien de parfums contient un pack personnalisé ?', 'Exactement 4 parfums de votre choix parmi toute notre collection.', 2) t
WHERE NOT EXISTS (SELECT 1 FROM faq WHERE question = 'Combien de parfums contient un pack personnalisé ?');
