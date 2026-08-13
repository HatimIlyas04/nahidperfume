-- ============================================================
-- production-pending-migrations.sql
--
-- Consolidates migrations 024, 027, 030, and 031 into one safe,
-- idempotent, manually-runnable script for the production Aiven
-- database, for use WITHOUT the Node migration runner (e.g. pasted
-- directly into Aiven's SQL console, or piped through the `mysql`
-- CLI).
--
-- SAFE TO RUN ON THE EXISTING PRODUCTION DATABASE, INCLUDING
-- MULTIPLE TIMES:
--   - Every CREATE TABLE uses IF NOT EXISTS -- never touches an
--     existing table, never drops/truncates anything.
--   - Every seed INSERT uses ON DUPLICATE KEY UPDATE / INSERT IGNORE
--     against a UNIQUE key, so re-running this file is always a
--     no-op for rows that already exist -- it can never create
--     duplicate seed rows.
--   - Nothing here touches customers, orders, packs, perfumes, or
--     any other existing table's data. Only 4 new tables are
--     created; pack_feedback_images references packs(id) via a
--     read-only foreign key (ON DELETE CASCADE only affects rows
--     inside pack_feedback_images itself if a pack is ever deleted
--     later -- it never deletes or modifies any pack).
--   - Registers each filename in schema_migrations (ledger table),
--     so if `node database/scripts/run-migrations.js` is ever run
--     afterwards, it correctly recognizes these as already applied
--     and skips them -- this prevents the Node runner from
--     re-inserting duplicate seed rows (trust_badges/announcements
--     have no unique constraint on their seed columns, only on id).
--
-- Verified against the actual current repositories/controllers
-- before writing this file (not invented):
--   - backend/db/siteContentRepo.js        -> content_key, value_fr, value_ar, category
--   - backend/controllers/trustBadgesController.js
--                                           -> icon_key, title_fr, title_ar,
--                                              subtitle_fr, subtitle_ar, display_order, is_active
--   - backend/controllers/announcementsController.js
--                                           -> text_fr, text_ar, display_order, is_active
--   - backend/db/packFeedbackImagesRepo.js
--     backend/controllers/packFeedbackImagesController.js
--                                           -> pack_id, image_url, display_order, is_active
--
-- Source migration files (verbatim origin of every statement below):
--   backend/database/migrations/024_site_content.sql
--   backend/database/migrations/027_trust_badges.sql
--   backend/database/migrations/030_announcements.sql
--   backend/database/migrations/031_pack_feedback_images.sql
-- ============================================================

-- Defensive only -- this table already exists in production (it's
-- migration 000, the very first one ever run). Included so this
-- script has zero external dependencies and is safe to run standalone.
CREATE TABLE IF NOT EXISTS schema_migrations (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  filename    VARCHAR(255) UNIQUE NOT NULL,
  applied_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 024_site_content.sql
-- ============================================================
CREATE TABLE IF NOT EXISTS site_content (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  content_key   VARCHAR(150) NOT NULL UNIQUE,
  value_fr      TEXT NULL,
  value_ar      TEXT NULL,
  category      VARCHAR(50) NOT NULL,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_site_content_category (category)
);

INSERT INTO site_content (content_key, category, value_fr, value_ar) VALUES
  ('nav.links.home', 'nav', 'Accueil', 'الرئيسية'),
  ('nav.links.ourStory', 'nav', 'Notre Histoire', 'قصتنا'),
  ('nav.links.packs', 'nav', 'Packs', 'الباقات'),
  ('nav.links.createPack', 'nav', 'Créer Mon Pack', 'أنشئوا باقتكم'),
  ('nav.shopLabel', 'nav', 'Shop', 'تسوق'),
  ('nav.shopByGenre', 'nav', 'Shop par genre', 'التسوق حسب الجنس'),
  ('nav.viewAll', 'nav', 'Voir tout', 'عرض الكل'),
  ('nav.ourHistory', 'nav', 'Notre histoire', 'قصتنا'),
  ('nav.originals', 'nav', 'Catalogue', 'أوريجينالز'),
  ('nav.exclusif', 'nav', 'Exclusif', 'حصري'),
  ('nav.searchPlaceholder', 'nav', 'Rechercher…', 'بحث…'),
  ('nav.searchLabel', 'nav', 'Recherche', 'بحث'),
  ('nav.suggestions', 'nav', 'Suggestions', 'اقتراحات'),
  ('nav.results', 'nav', 'Résultats', 'النتائج'),
  ('nav.searching', 'nav', 'Recherche en cours…', 'جارٍ البحث…'),
  ('nav.noResults', 'nav', 'Aucun résultat pour', 'لا توجد نتائج لـ'),
  ('nav.viewAllResults', 'nav', 'Tous les résultats pour', 'جميع النتائج لـ'),
  ('nav.dashboard', 'nav', 'Dashboard', 'لوحة التحكم'),
  ('nav.logout', 'nav', 'Déco', 'خروج'),
  ('nav.disconnect', 'nav', 'Déconnexion', 'تسجيل الخروج'),
  ('nav.proSpace', 'nav', 'Espace Pro', 'المنطقة المهنية'),
  ('nav.admin', 'nav', 'Admin', 'مشرف'),
  ('nav.favorites', 'nav', 'Favoris', 'المفضلة'),
  ('nav.navigation', 'nav', 'Navigation', 'التنقل'),
  ('nav.perfumes', 'nav', 'Parfums', 'العطور'),
  ('nav.account', 'nav', 'Compte', 'الحساب'),
  ('nav.help', 'nav', 'Aide', 'المساعدة'),
  ('nav.delivery', 'nav', 'Livraison', 'التوصيل'),
  ('nav.faq', 'nav', 'FAQ', 'الأسئلة الشائعة'),
  ('nav.contact', 'nav', 'Contact', 'التواصل'),
  ('nav.exploreCollection', 'nav', 'Explorer la collection', 'استكشف المجموعة'),
  ('nav.searchPerfume', 'nav', 'Rechercher un parfum…', 'ابحث عن عطر…'),
  ('nav.legalNotice', 'nav', 'Mentions légales', 'الشروط القانونية'),
  ('nav.privacy', 'nav', 'Confidentialité', 'الخصوصية'),
  ('nav.terms', 'nav', 'CGV', 'الشروط العامة'),
  ('nav.language', 'nav', 'Langue', 'اللغة'),
  ('home.eyebrow', 'home', '✦ Packs de Parfums Curés', '✦ باقات عطور منتقاة بعناية'),
  ('home.title', 'home', 'Nos Packs de 4 Parfums', 'باقاتنا من 4 عطور'),
  ('home.subtitle', 'home', 'Chaque pack réunit 4 parfums pensés pour s''harmoniser. Prêt-à-offrir, personnalisable, ou entièrement sur-mesure.', 'كل باقة تجمع 4 عطور مصممة لتنسجم معاً. جاهزة للإهداء، قابلة للتخصيص، أو مصممة بالكامل حسب طلبكم.'),
  ('home.viewAll', 'home', 'Voir tous les packs', 'عرض جميع الباقات'),
  ('home.comingSoon', 'home', 'Nos packs arrivent très bientôt. Revenez vite !', 'باقاتنا قادمة قريباً جداً. عودوا لزيارتنا!'),
  ('home.ctaTitle', 'home', 'Créez votre propre pack', 'أنشئوا باقتكم الخاصة'),
  ('home.ctaText', 'home', 'Choisissez exactement 4 parfums parmi toute notre collection. Votre pack, votre prix, votre style.', 'اختاروا بالضبط 4 عطور من مجموعتنا الكاملة. باقتكم، سعركم، أسلوبكم.'),
  ('home.ctaBtn', 'home', 'Commencer', 'ابدأوا الآن'),
  ('home.whyEyebrow', 'home', '✦ Pourquoi Nahid', '✦ لماذا ناهد'),
  ('home.whyTitle', 'home', 'L''excellence, pack après pack', 'التميز، باقة تلو الأخرى'),
  ('home.ugcEyebrow', 'home', '✦ Nos clients', '✦ عملاؤنا'),
  ('home.ugcTitle', 'home', 'Ils ont reçu leur pack', 'استلموا باقتهم'),
  ('home.faqEyebrow', 'home', '✦ Questions', '✦ أسئلة'),
  ('home.faqTitle', 'home', 'Foire Aux Questions', 'الأسئلة الشائعة')
ON DUPLICATE KEY UPDATE content_key = content_key;

INSERT INTO site_content (content_key, category, value_fr, value_ar) VALUES
  ('home.newsletterTitle', 'home', 'Restez informé', 'ابقَ على اطلاع'),
  ('home.newsletterText', 'home', 'Recevez nos nouveaux packs et offres exclusives en avant-première.', 'احصل على باقاتنا الجديدة وعروضنا الحصرية أولاً بأول.'),
  ('home.newsletterPlaceholder', 'home', 'Votre email', 'بريدكم الإلكتروني'),
  ('home.newsletterSuccessTitle', 'home', 'Merci !', 'شكراً لكم!'),
  ('home.newsletterSuccessText', 'home', 'Vous êtes inscrit à notre newsletter.', 'تم تسجيلكم في نشرتنا الإخبارية.'),
  ('home.addedToCart', 'home', 'Ajouté au panier', 'أُضيف إلى السلة'),
  ('directOrder.title', 'directOrder', 'Commandez en 2 minutes', 'اطلبوا باك العطور ديالكم الآن'),
  ('directOrder.subtitle', 'directOrder', 'Choisissez un pack, remplissez vos informations, c''est livré.', 'اختاروا الباك المناسب لكم وكملوا الطلب مباشرة من الموقع'),
  ('directOrder.yourPack', 'directOrder', 'Votre pack', 'باقتكم'),
  ('directOrder.choosePackLabel', 'directOrder', 'Choisir un pack', 'اختاروا الباك'),
  ('directOrder.noPackPrompt', 'directOrder', 'Choisissez un pack ci-dessus pour commencer votre commande.', 'اختاروا باقة من الأعلى لبدء طلبكم.'),
  ('directOrder.formTitle', 'directOrder', 'Informations de livraison', 'معلومات التوصيل'),
  ('directOrder.quantityLabel', 'directOrder', 'Quantité', 'الكمية'),
  ('directOrder.cityPlaceholder', 'directOrder', 'Choisir une ville', 'اختاروا المدينة'),
  ('directOrder.cityOther', 'directOrder', 'Autre ville', 'مدينة أخرى'),
  ('directOrder.cityOtherPlaceholder', 'directOrder', 'Précisez votre ville', 'حددوا مدينتكم'),
  ('directOrder.confirmBtn', 'directOrder', 'Confirmer ma commande', 'تأكيد الطلب'),
  ('directOrder.successTitle', 'directOrder', 'Commande enregistrée !', 'تم تسجيل طلبكم بنجاح'),
  ('directOrder.successText', 'directOrder', 'Nous vous contacterons bientôt pour confirmer la livraison.', 'سنتواصل معكم قريباً لتأكيد التوصيل.'),
  ('reviewsSection.eyebrow', 'reviewsSection', '✦ Témoignages', '✦ آراء عملائنا'),
  ('reviewsSection.title', 'reviewsSection', 'Ils ont trouvé leur signature', 'وجدوا توقيعهم العطري'),
  ('reviewsSection.reviewsWord', 'reviewsSection', 'avis', 'تقييم'),
  ('reviewsSection.ctaSub', 'reviewsSection', 'Vous avez essayé un de nos parfums ?', 'جربتم أحد عطورنا؟'),
  ('reviewsSection.ctaBtn', 'reviewsSection', 'Laisser mon avis', 'شاركونا رأيكم'),
  ('packsPage.title', 'packsPage', 'Nos Packs', 'باقاتنا'),
  ('packsPage.subtitle', 'packsPage', 'Chaque pack réunit 4 parfums pensés pour s''harmoniser. Personnalisez-les à volonté ou créez le vôtre.', 'كل باقة تجمع 4 عطور مصممة لتنسجم معاً. خصصوها بحرية أو أنشئوا باقتكم الخاصة.'),
  ('packsPage.searchPlaceholder', 'packsPage', 'Rechercher un pack...', 'ابحث عن باقة...'),
  ('packsPage.sortDefault', 'packsPage', 'Tri par défaut', 'الترتيب الافتراضي'),
  ('packsPage.sortPriceAsc', 'packsPage', 'Prix croissant', 'السعر تصاعدياً'),
  ('packsPage.sortPriceDesc', 'packsPage', 'Prix décroissant', 'السعر تنازلياً'),
  ('packsPage.empty', 'packsPage', 'Aucun pack ne correspond à votre recherche.', 'لا توجد باقة مطابقة لبحثكم.'),
  ('packsPage.addedToCart', 'packsPage', 'Ajouté au panier', 'أُضيف إلى السلة'),
  ('packsPage.errorTitle', 'packsPage', 'Erreur', 'خطأ'),
  ('packsPage.errorText', 'packsPage', 'Impossible de charger les packs.', 'تعذر تحميل الباقات.'),
  ('packCard.details', 'packCard', 'Détails', 'التفاصيل'),
  ('packCard.addToCart', 'packCard', 'Ajouter', 'إضافة'),
  ('packCard.bestSeller', 'packCard', 'Best Seller', 'الأكثر مبيعاً'),
  ('packCard.new', 'packCard', 'Nouveau', 'جديد'),
  ('packCard.limited', 'packCard', 'Édition limitée', 'إصدار محدود'),
  ('packCard.customize', 'packCard', 'Personnaliser', 'تخصيص'),
  ('packCard.perfumesCount', 'packCard', 'parfums', 'عطور'),
  ('packCard.choosePack', 'packCard', 'Choisir ce pack', 'اختاروا هذا الباك'),
  ('packCard.order', 'packCard', 'Commander maintenant', 'اطلبوا الآن'),
  ('packCard.viewDetails', 'packCard', 'Détails du pack', 'تفاصيل الباك'),
  ('packDetails.back', 'packDetails', 'Retour aux packs', 'العودة إلى الباقات'),
  ('packDetails.addToCart', 'packDetails', 'Ajouter au panier', 'أضيفوا إلى السلة'),
  ('packDetails.wishlist', 'packDetails', 'Favoris', 'المفضلة'),
  ('packDetails.share', 'packDetails', 'Partager', 'مشاركة'),
  ('packDetails.linkCopied', 'packDetails', 'Lien copié !', 'تم نسخ الرابط!'),
  ('packDetails.perfumesTitle', 'packDetails', 'Les 4 parfums de ce pack', 'العطور الأربعة في هذه الباقة')
ON DUPLICATE KEY UPDATE content_key = content_key;

INSERT INTO site_content (content_key, category, value_fr, value_ar) VALUES
  ('packDetails.containsFour', 'packDetails', 'Contient 4 parfums', 'تحتوي على 4 عطور'),
  ('packDetails.youSave', 'packDetails', 'Vous économisez', 'توفر'),
  ('packDetails.customizeToggle', 'packDetails', 'Personnaliser le pack', 'خصصوا هذه الباقة'),
  ('packDetails.finishCustomize', 'packDetails', 'Terminer la personnalisation', 'إنهاء التخصيص'),
  ('packDetails.replace', 'packDetails', 'Remplacer', 'استبدال'),
  ('packDetails.changedTag', 'packDetails', 'Remplacé', 'تم الاستبدال'),
  ('packDetails.customizedSuffix', 'packDetails', '(personnalisé)', '(مخصصة)'),
  ('packDetails.customizedNote', 'packDetails', 'Pack personnalisé — le pack original n''est pas modifié.', 'باقة مخصصة — الباقة الأصلية لم تتغير.'),
  ('packDetails.customizedCta', 'packDetails', 'Ajouter la version personnalisée', 'أضف النسخة المخصصة'),
  ('packDetails.addedTitle', 'packDetails', 'Ajouté au panier !', 'أُضيف إلى السلة!'),
  ('packDetails.viewCartBtn', 'packDetails', 'Voir mon panier', 'عرض سلتي'),
  ('packDetails.continueBtn', 'packDetails', 'Continuer', 'متابعة'),
  ('packDetails.loading', 'packDetails', 'Chargement...', 'جارٍ التحميل...'),
  ('packDetails.notFound', 'packDetails', 'Pack introuvable', 'الباقة غير موجودة'),
  ('packDetails.errorTitle', 'packDetails', 'Erreur', 'خطأ'),
  ('packDetails.wishlistError', 'packDetails', 'Impossible de mettre à jour vos favoris.', 'تعذر تحديث المفضلة.'),
  ('replaceModal.title', 'replaceModal', 'Remplacer le parfum', 'استبدال هذا العطر'),
  ('replaceModal.close', 'replaceModal', 'Fermer', 'إغلاق'),
  ('replaceModal.currentLabel', 'replaceModal', 'Parfum actuel', 'العطر الحالي'),
  ('replaceModal.chooseNewLabel', 'replaceModal', 'Choisissez le nouveau parfum', 'اختر العطر الجديد'),
  ('replaceModal.searchPlaceholder', 'replaceModal', 'Rechercher un parfum...', 'ابحث عن عطر...'),
  ('replaceModal.empty', 'replaceModal', 'Aucun parfum trouvé', 'لم يتم العثور على أي عطر'),
  ('perfumeModal.close', 'perfumeModal', 'Fermer', 'إغلاق'),
  ('perfumeModal.size', 'perfumeModal', 'Taille', 'الحجم'),
  ('perfumeModal.concentration', 'perfumeModal', 'Concentration', 'التركيز'),
  ('perfumeModal.longevity', 'perfumeModal', 'Tenue', 'الثبات'),
  ('perfumeModal.scentFamily', 'perfumeModal', 'Famille olfactive', 'العائلة العطرية'),
  ('perfumeModal.inspiration', 'perfumeModal', 'Inspiration', 'مستوحى من'),
  ('perfumeModal.topNotes', 'perfumeModal', 'Tête', 'المقدمة'),
  ('perfumeModal.middleNotes', 'perfumeModal', 'Cœur', 'القلب'),
  ('perfumeModal.baseNotes', 'perfumeModal', 'Fond', 'القاعدة'),
  ('perfumeCard.inspiredBy', 'perfumeCard', 'Inspiration :', 'مستوحى من'),
  ('buildPack.title', 'buildPack', 'Créez Votre Propre Pack', 'أنشئوا باقتكم الخاصة'),
  ('buildPack.subtitle', 'buildPack', 'Choisissez exactement 4 parfums parmi notre collection et composez un pack unique, à votre image.', 'اختاروا بالضبط 4 عطور من مجموعتنا وكوّنوا باقة فريدة على طريقتكم.'),
  ('buildPack.unavailableTitle', 'buildPack', 'Création de pack temporairement indisponible', 'إنشاء الباقات غير متاح مؤقتاً'),
  ('buildPack.unavailableText', 'buildPack', 'Revenez bientôt pour créer votre propre pack sur mesure.', 'عودوا قريباً لإنشاء باقتكم المخصصة.'),
  ('buildPack.selectedCount', 'buildPack', 'sélectionnés', 'محدد'),
  ('buildPack.searchPlaceholder', 'buildPack', 'Rechercher un parfum...', 'ابحث عن عطر...'),
  ('buildPack.allGenders', 'buildPack', 'Tous', 'الكل'),
  ('buildPack.view', 'buildPack', 'Voir', 'عرض'),
  ('buildPack.yourPack', 'buildPack', 'Votre pack', 'باقتكم'),
  ('buildPack.chooseAPerfume', 'buildPack', 'Choisissez un parfum', 'اختاروا عطراً'),
  ('buildPack.priceLabel', 'buildPack', 'Prix du pack', 'سعر الباقة'),
  ('buildPack.addToCart', 'buildPack', 'Ajouter au panier', 'أضف إلى السلة'),
  ('buildPack.remaining', 'buildPack', 'Encore', 'تبقى'),
  ('buildPack.remainingSuffix', 'buildPack', 'parfum(s)', 'عطر(اً)'),
  ('buildPack.addedTitle', 'buildPack', 'Ajouté au panier !', 'أُضيف إلى السلة!'),
  ('buildPack.addedText', 'buildPack', 'Votre pack personnalisé a été ajouté.', 'تمت إضافة باقتكم المخصصة.'),
  ('buildPack.continueBtn', 'buildPack', 'Continuer mes achats', 'متابعة التسوق'),
  ('buildPack.viewCartBtn', 'buildPack', 'Voir mon panier', 'عرض سلتي'),
  ('buildPack.loadError', 'buildPack', 'Impossible de charger les parfums.', 'تعذر تحميل العطور.')
ON DUPLICATE KEY UPDATE content_key = content_key;

INSERT INTO site_content (content_key, category, value_fr, value_ar) VALUES
  ('buildPack.errorTitle', 'buildPack', 'Erreur', 'خطأ'),
  ('buildPack.loading', 'buildPack', 'Chargement des parfums...', 'جارٍ تحميل العطور...'),
  ('buildPack.noMatch', 'buildPack', 'Aucun parfum ne correspond à votre recherche.', 'لا يوجد عطر يطابق بحثكم.'),
  ('buildPack.defaultTitle', 'buildPack', 'Pack Personnalisé', 'باقة مخصصة'),
  ('buildPack.remove', 'buildPack', 'Retirer', 'إزالة'),
  ('cart.title', 'cart', 'Mon Panier', 'سلتي'),
  ('cart.emptyTitle', 'cart', 'Votre panier est vide', 'سلتكم فارغة'),
  ('cart.emptyText', 'cart', 'Découvrez nos packs de parfums curés avec soin.', 'اكتشف باقات عطورنا المنتقاة بعناية.'),
  ('cart.exploreBtn', 'cart', 'Explorer les packs', 'استكشف الباقات'),
  ('cart.typeReadyPack', 'cart', 'Pack prêt', 'باقة جاهزة'),
  ('cart.typeCustomized', 'cart', 'Pack personnalisé', 'باقة مخصصة'),
  ('cart.typeCustom', 'cart', 'Pack sur-mesure', 'باقة حسب الطلب'),
  ('cart.summaryTitle', 'cart', 'Résumé', 'الملخص'),
  ('cart.subtotal', 'cart', 'Sous-total', 'المجموع الفرعي'),
  ('cart.shipping', 'cart', 'Livraison', 'التوصيل'),
  ('cart.free', 'cart', 'Gratuite', 'مجاني'),
  ('cart.discount', 'cart', 'Réduction', 'الخصم'),
  ('cart.couponPlaceholder', 'cart', 'Code promo', 'رمز الخصم'),
  ('cart.couponSuccessTitle', 'cart', 'Coupon appliqué !', 'تم تطبيق الرمز!'),
  ('cart.couponErrorTitle', 'cart', 'Coupon invalide', 'رمز غير صالح'),
  ('cart.couponErrorText', 'cart', 'Ce code n''est pas valide.', 'هذا الرمز غير صالح.'),
  ('cart.total', 'cart', 'Total', 'المجموع'),
  ('cart.checkoutBtn', 'cart', 'Passer commande', 'إتمام الطلب'),
  ('cart.remove', 'cart', 'Retirer', 'إزالة'),
  ('checkout.title', 'checkout', 'Finaliser ma commande', 'إتمام طلبي'),
  ('checkout.deliveryTitle', 'checkout', 'Informations de livraison', 'معلومات التوصيل'),
  ('checkout.fullName', 'checkout', 'Nom complet', 'الاسم الكامل'),
  ('checkout.fullNameError', 'checkout', 'Le nom est requis', 'الاسم مطلوب'),
  ('checkout.phone', 'checkout', 'Téléphone', 'رقم الهاتف'),
  ('checkout.phonePlaceholder', 'checkout', '06 12 34 56 78', '06 12 34 56 78'),
  ('checkout.phoneError', 'checkout', 'Numéro marocain invalide (ex: 06 12 34 56 78)', 'رقم هاتف مغربي غير صالح (مثال: 06 12 34 56 78)'),
  ('checkout.city', 'checkout', 'Ville', 'المدينة'),
  ('checkout.cityError', 'checkout', 'La ville est requise', 'المدينة مطلوبة'),
  ('checkout.address', 'checkout', 'Adresse complète', 'العنوان الكامل'),
  ('checkout.addressError', 'checkout', 'L''adresse est requise', 'العنوان مطلوب'),
  ('checkout.note', 'checkout', 'Note (optionnel)', 'ملاحظة (اختياري)'),
  ('checkout.notePlaceholder', 'checkout', 'Instructions de livraison, etc.', 'تعليمات التوصيل، إلخ.'),
  ('checkout.trustSecure', 'checkout', 'Paiement sécurisé', 'دفع آمن'),
  ('checkout.trustDelivery', 'checkout', 'Livraison partout au Maroc', 'توصيل في جميع أنحاء المغرب'),
  ('checkout.trustRefund', 'checkout', 'Satisfait ou remboursé', 'رضا تام أو استرجاع'),
  ('checkout.paymentTitle', 'checkout', 'Paiement', 'الدفع'),
  ('checkout.codTitle', 'checkout', 'Paiement à la livraison', 'الدفع عند الاستلام'),
  ('checkout.codText', 'checkout', 'Payez en espèces à la réception. Zéro risque, zéro prépaiement.', 'ادفع نقداً عند الاستلام. بدون أي مخاطرة، بدون دفع مسبق.'),
  ('checkout.summaryTitle', 'checkout', 'Résumé de commande', 'ملخص الطلب'),
  ('checkout.subtotal', 'checkout', 'Sous-total', 'المجموع الفرعي'),
  ('checkout.shipping', 'checkout', 'Livraison', 'التوصيل'),
  ('checkout.total', 'checkout', 'Total', 'المجموع'),
  ('checkout.submitBtn', 'checkout', 'Confirmer la commande', 'تأكيد الطلب'),
  ('checkout.submitting', 'checkout', 'Envoi en cours...', 'جارٍ الإرسال...'),
  ('checkout.errorTitle', 'checkout', 'Erreur lors de la commande', 'خطأ أثناء الطلب')
ON DUPLICATE KEY UPDATE content_key = content_key;

INSERT INTO site_content (content_key, category, value_fr, value_ar) VALUES
  ('checkout.errorRetry', 'checkout', 'Veuillez réessayer.', 'يرجى المحاولة مرة أخرى.'),
  ('checkout.emptyCartTitle', 'checkout', 'Votre panier est vide', 'سلتكم فارغة'),
  ('checkout.exploreBtn', 'checkout', 'Explorer les packs', 'استكشف الباقات'),
  ('thankYou.title', 'thankYou', 'Merci pour votre commande !', 'مبروك! تم تسجيل طلبكم بنجاح 🎉'),
  ('thankYou.subtitle', 'thankYou', 'Votre commande a bien été reçue et sera traitée sous peu.', 'تم استلام طلبكم وسيتم التواصل معكم قريباً لتأكيد التوصيل.'),
  ('thankYou.totalLabel', 'thankYou', 'Total', 'المجموع'),
  ('thankYou.codLabel', 'thankYou', 'Paiement à la livraison', 'الدفع عند الاستلام'),
  ('thankYou.upsellSectionTitle', 'thankYou', '🎁 Offre spéciale pour nos nouveaux clients', '🎁 عرض خاص لزبنائنا الجدد'),
  ('thankYou.upsellSectionSubtitle', 'thankYou', 'Offre spéciale : votre 2ème pack à seulement 150 DH', 'عرض خاص: الباقة الثانية بـ 150 درهم فقط'),
  ('thankYou.upsellBadge', 'thankYou', 'Offre spéciale', 'عرض خاص'),
  ('thankYou.upsellFreeDelivery', 'thankYou', 'Livraison incluse', 'التوصيل مشمول'),
  ('thankYou.upsellDecline', 'thankYou', 'Non merci, je garde ma commande telle quelle', 'لا شكراً، أكتفي بطلبـي'),
  ('thankYou.upsellAccept', 'thankYou', 'Ajouter ce pack pour', 'أضيفوا هذا الباك بـ'),
  ('thankYou.upsellAdding', 'thankYou', 'Ajout...', 'جارٍ الإضافة...'),
  ('thankYou.upsellSuccessTitle', 'thankYou', 'Pack ajouté à votre commande !', 'تمت إضافة الباقة إلى طلبكم!'),
  ('thankYou.upsellErrorTitle', 'thankYou', 'Erreur', 'خطأ'),
  ('thankYou.upsellErrorText', 'thankYou', 'Impossible d''ajouter ce pack.', 'تعذر إضافة هذه الباقة.'),
  ('thankYou.continueBtn', 'thankYou', 'Continuer mes achats', 'متابعة التسوق'),
  ('contactPage.title', 'contactPage', 'Contactez-nous', 'تواصل معنا'),
  ('contactPage.subtitle', 'contactPage', 'Une question sur un pack ou votre commande ? Notre équipe vous répond rapidement.', 'لديكم سؤال حول باقة أو طلبكم؟ فريقنا يرد بسرعة.'),
  ('contactPage.phoneLabel', 'contactPage', 'Téléphone', 'الهاتف'),
  ('contactPage.emailLabel', 'contactPage', 'Email', 'البريد الإلكتروني'),
  ('contactPage.deliveryLabel', 'contactPage', 'Livraison', 'التوصيل'),
  ('contactPage.deliveryValue', 'contactPage', 'Partout au Maroc · Paiement à la livraison', 'في جميع أنحاء المغرب · الدفع عند الاستلام'),
  ('contactPage.fullName', 'contactPage', 'Nom complet', 'الاسم الكامل'),
  ('contactPage.phone', 'contactPage', 'Téléphone', 'الهاتف'),
  ('contactPage.email', 'contactPage', 'Email', 'البريد الإلكتروني'),
  ('contactPage.subject', 'contactPage', 'Sujet', 'الموضوع'),
  ('contactPage.message', 'contactPage', 'Message', 'الرسالة'),
  ('contactPage.submitBtn', 'contactPage', 'Envoyer le message', 'إرسال الرسالة'),
  ('contactPage.sending', 'contactPage', 'Envoi...', 'جارٍ الإرسال...'),
  ('contactPage.successTitle', 'contactPage', 'Message envoyé !', 'تم إرسال الرسالة!'),
  ('contactPage.successText', 'contactPage', 'Nous vous répondrons très vite.', 'سنرد عليكم في أقرب وقت.'),
  ('contactPage.errorTitle', 'contactPage', 'Erreur', 'خطأ'),
  ('contactPage.errorRetry', 'contactPage', 'Veuillez réessayer.', 'يرجى المحاولة مرة أخرى.'),
  ('faqPage.title', 'faqPage', 'Questions Fréquentes', 'الأسئلة الشائعة'),
  ('faqPage.subtitle', 'faqPage', 'Tout ce qu''il faut savoir sur nos packs de parfums.', 'كل ما تحتاج معرفته عن باقات عطورنا.'),
  ('faqPage.empty', 'faqPage', 'Aucune question pour le moment.', 'لا توجد أسئلة بعد.'),
  ('orderTrackingPage.title', 'orderTrackingPage', 'Suivre ma commande', 'تتبع طلبي'),
  ('orderTrackingPage.subtitle', 'orderTrackingPage', 'Entrez votre numéro de commande et votre téléphone pour suivre son avancement.', 'أدخلوا رقم طلبكم ورقم هاتفكم لتتبع حالته.'),
  ('orderTrackingPage.orderNumberPlaceholder', 'orderTrackingPage', 'Numéro de commande (ex: NHD-000123)', 'رقم الطلب (مثال: NHD-000123)'),
  ('orderTrackingPage.phonePlaceholder', 'orderTrackingPage', 'Téléphone', 'الهاتف'),
  ('orderTrackingPage.submitBtn', 'orderTrackingPage', 'Suivre', 'تتبع'),
  ('orderTrackingPage.searching', 'orderTrackingPage', 'Recherche...', 'جارٍ البحث...'),
  ('orderTrackingPage.notFound', 'orderTrackingPage', 'Commande introuvable. Vérifiez le numéro et le téléphone.', 'الطلب غير موجود. تحقق من الرقم والهاتف.'),
  ('orderTrackingPage.cancelled', 'orderTrackingPage', 'Cette commande a été annulée.', 'تم إلغاء هذا الطلب.'),
  ('orderTrackingPage.steps.pending', 'orderTrackingPage', 'Reçue', 'تم الاستلام'),
  ('orderTrackingPage.steps.confirmed', 'orderTrackingPage', 'Confirmée', 'تم التأكيد'),
  ('orderTrackingPage.steps.preparing', 'orderTrackingPage', 'Préparation', 'قيد التحضير'),
  ('orderTrackingPage.steps.shipping', 'orderTrackingPage', 'Expédition', 'قيد الشحن')
ON DUPLICATE KEY UPDATE content_key = content_key;

INSERT INTO site_content (content_key, category, value_fr, value_ar) VALUES
  ('orderTrackingPage.steps.delivered', 'orderTrackingPage', 'Livrée', 'تم التسليم'),
  ('wishlistPage.title', 'wishlistPage', 'Mes Favoris', 'مفضلتي'),
  ('wishlistPage.subtitle', 'wishlistPage', 'Retrouvez les parfums et packs que vous avez aimés.', 'اعثروا على العطور والباقات التي أعجبتكم.'),
  ('wishlistPage.loading', 'wishlistPage', 'Chargement...', 'جارٍ التحميل...'),
  ('wishlistPage.emptyTitle', 'wishlistPage', 'Aucun favori pour le moment', 'لا توجد عناصر مفضلة بعد'),
  ('wishlistPage.exploreBtn', 'wishlistPage', 'Découvrir nos packs', 'اكتشف باقاتنا'),
  ('wishlistPage.packsTitle', 'wishlistPage', 'Packs favoris', 'الباقات المفضلة'),
  ('wishlistPage.perfumesTitle', 'wishlistPage', 'Parfums favoris', 'العطور المفضلة'),
  ('wishlistPage.perfumesNote', 'wishlistPage', 'Ces parfums ne sont disponibles qu''au sein de nos packs.', 'هذه العطور متاحة فقط ضمن باقاتنا.'),
  ('wishlistPage.addToCart', 'wishlistPage', 'Ajouter', 'إضافة'),
  ('wishlistPage.addedToCart', 'wishlistPage', 'Ajouté au panier', 'أُضيف إلى السلة'),
  ('countdown.defaultLabel', 'countdown', 'Offre spéciale se termine dans', 'ينتهي العرض الخاص خلال'),
  ('whatsapp.tooltip', 'whatsapp', 'Contactez-nous sur WhatsApp', 'تواصل معنا عبر واتساب')
ON DUPLICATE KEY UPDATE content_key = content_key;


-- ============================================================
-- 027_trust_badges.sql
-- ============================================================
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

INSERT INTO trust_badges (icon_key, title_fr, title_ar, subtitle_fr, subtitle_ar, display_order)
SELECT * FROM (SELECT 'shield' AS a, 'Paiement sécurisé' AS b, 'دفع آمن' AS c, 'Paiement à la livraison' AS d, 'الدفع عند الاستلام' AS e, 1 AS f) t
WHERE NOT EXISTS (SELECT 1 FROM trust_badges WHERE icon_key = 'shield' AND title_fr = 'Paiement sécurisé');

INSERT INTO trust_badges (icon_key, title_fr, title_ar, subtitle_fr, subtitle_ar, display_order)
SELECT * FROM (SELECT 'truck' AS a, 'Livraison gratuite' AS b, 'توصيل مجاني' AS c, 'Partout au Maroc' AS d, 'في جميع أنحاء المغرب' AS e, 2 AS f) t
WHERE NOT EXISTS (SELECT 1 FROM trust_badges WHERE icon_key = 'truck' AND title_fr = 'Livraison gratuite');

INSERT INTO trust_badges (icon_key, title_fr, title_ar, subtitle_fr, subtitle_ar, display_order)
SELECT * FROM (SELECT 'refresh' AS a, 'Satisfait ou remboursé' AS b, 'رضا تام أو استرجاع' AS c, 'Sous 7 jours' AS d, 'خلال 7 أيام' AS e, 3 AS f) t
WHERE NOT EXISTS (SELECT 1 FROM trust_badges WHERE icon_key = 'refresh' AND title_fr = 'Satisfait ou remboursé');

INSERT INTO trust_badges (icon_key, title_fr, title_ar, subtitle_fr, subtitle_ar, display_order)
SELECT * FROM (SELECT 'phone' AS a, 'Support client' AS b, 'خدمة العملاء' AS c, 'Réponse rapide' AS d, 'رد سريع' AS e, 4 AS f) t
WHERE NOT EXISTS (SELECT 1 FROM trust_badges WHERE icon_key = 'phone' AND title_fr = 'Support client');


-- ============================================================
-- 030_announcements.sql
-- ============================================================
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

INSERT INTO announcements (text_fr, text_ar, display_order)
SELECT * FROM (SELECT 'Livraison offerte dès 160 MAD' AS a, 'توصيل مجاني من 160 درهم' AS b, 1 AS c) t
WHERE NOT EXISTS (SELECT 1 FROM announcements WHERE text_fr = 'Livraison offerte dès 160 MAD');

INSERT INTO announcements (text_fr, text_ar, display_order)
SELECT * FROM (SELECT 'Échantillon gratuit avec chaque commande' AS a, 'عينة مجانية مع كل طلب' AS b, 2 AS c) t
WHERE NOT EXISTS (SELECT 1 FROM announcements WHERE text_fr = 'Échantillon gratuit avec chaque commande');

INSERT INTO announcements (text_fr, text_ar, display_order)
SELECT * FROM (SELECT 'Nouveauté — Collection Oud de Camboge' AS a, 'جديد — مجموعة عود كامبودج' AS b, 3 AS c) t
WHERE NOT EXISTS (SELECT 1 FROM announcements WHERE text_fr = 'Nouveauté — Collection Oud de Camboge');

INSERT INTO announcements (text_fr, text_ar, display_order)
SELECT * FROM (SELECT 'Paiement à la livraison — 100% sécurisé' AS a, 'الدفع عند الاستلام — آمن 100%' AS b, 4 AS c) t
WHERE NOT EXISTS (SELECT 1 FROM announcements WHERE text_fr = 'Paiement à la livraison — 100% sécurisé');

INSERT INTO announcements (text_fr, text_ar, display_order)
SELECT * FROM (SELECT '4.9 / 5 · 2 400 clients satisfaits' AS a, '4.9/5 · 2400 عميل راضٍ' AS b, 5 AS c) t
WHERE NOT EXISTS (SELECT 1 FROM announcements WHERE text_fr = '4.9 / 5 · 2 400 clients satisfaits');


-- ============================================================
-- 031_pack_feedback_images.sql
-- No seed data (admin-uploaded content only). FK references the
-- existing packs table -- read-only with respect to packs; only
-- rows inside pack_feedback_images itself are ever affected.
-- ============================================================
CREATE TABLE IF NOT EXISTS pack_feedback_images (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  pack_id        INT NOT NULL,
  image_url      VARCHAR(500) NOT NULL,
  display_order  INT NOT NULL DEFAULT 0,
  is_active      TINYINT(1) NOT NULL DEFAULT 1,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_pack_feedback_images_pack (pack_id, is_active, display_order),
  CONSTRAINT fk_pack_feedback_images_pack FOREIGN KEY (pack_id) REFERENCES packs(id) ON DELETE CASCADE
);


-- ============================================================
-- Ledger: mark these 4 as applied so the Node migration runner
-- (node database/scripts/run-migrations.js), if ever run later,
-- correctly skips them instead of re-inserting seed rows.
-- ============================================================
INSERT IGNORE INTO schema_migrations (filename) VALUES
  ('024_site_content.sql'),
  ('027_trust_badges.sql'),
  ('030_announcements.sql'),
  ('031_pack_feedback_images.sql');
