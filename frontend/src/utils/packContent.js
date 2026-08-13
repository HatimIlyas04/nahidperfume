const GENDER_WORD = {
  fr: { Femme: "féminins", Homme: "masculins" },
  ar: { Femme: "نسائية", Homme: "رجالية" },
  en: { Femme: "for women", Homme: "for men" },
};

// Arabic verb conjugation is gendered ("اطلبي" feminine vs "اطلب"
// masculine/neutral) -- French/English don't distinguish, which is why
// every "...Feminine" key is identical to its base key in those two
// languages and only actually differs in the Arabic strings. Femme packs
// get the feminine form; Homme and Unisexe both get the neutral/masculine
// default, matching "for neutral/general contexts use the neutral form"
// rather than guessing at a pack with mixed/no gender.
export function getOrderCta(gender, t) {
  return gender === "Femme" ? t("packCard.orderFeminine") : t("packCard.order");
}

/** Same gendered-CTA pattern as getOrderCta, generalized to any
 *  translation key that has a matching "<key>Feminine" counterpart. */
export function getGenderedCta(gender, t, baseKey) {
  return gender === "Femme" ? t(`${baseKey}Feminine`) : t(baseKey);
}

const COUNT_ONLY = {
  fr: (count) => `Contient ${count} parfums`,
  ar: (count) => `تحتوي على ${count} عطور`,
  en: (count) => `Contains ${count} perfumes`,
};

// Builds the ONE-sentence pack summary ("Contient 4 parfums féminins de
// 60ml" / "تحتوي على 4 عطور نسائية بحجم 60 مل") from the pack's actual
// perfumes -- never a hardcoded string or count, since a pack's gender/
// size/perfume count could differ from the current all-Femme/60ml/4-slot
// catalog. This is the ONLY pack-content sentence rendered anywhere on the
// site -- there used to also be a separate static "Contains 4 perfumes"
// label rendered alongside this one, producing exactly the duplicated
// wording ("تحتوي على 4 عطور" + "4 عطور نسائية بحجم 60 مل" back to back)
// this function now replaces outright.
// Always returns a real sentence (never null): when gender or size isn't
// uniform across the pack's perfumes (rare, but possible on a customized/
// mixed pack), falls back to a count-only sentence rather than stating a
// gender/size detail that might not hold for every perfume in the pack.
export function buildPackContentDetail(perfumes, lang) {
  if (!Array.isArray(perfumes) || perfumes.length === 0) return null;
  const count = perfumes.length;

  const genders = [...new Set(perfumes.map((p) => p.gender).filter(Boolean))];
  const sizes = [...new Set(perfumes.map((p) => p.size).filter(Boolean))];
  if (genders.length !== 1 || sizes.length !== 1) {
    return (COUNT_ONLY[lang] || COUNT_ONLY.fr)(count);
  }

  const concentrations = [...new Set(perfumes.map((p) => p.concentration).filter(Boolean))];
  const concentration = concentrations.length === 1 ? concentrations[0] : null;
  const genderWord = GENDER_WORD[lang]?.[genders[0]] || null;
  const size = sizes[0];

  if (lang === "ar") {
    let line = genderWord ? `تحتوي على ${count} عطور ${genderWord} بحجم ${size} مل` : `تحتوي على ${count} عطور بحجم ${size} مل`;
    if (concentration) line += ` • تركيز ${concentration}`;
    return line;
  }
  if (lang === "en") {
    let line = genderWord ? `Contains ${count} perfumes ${genderWord}, ${size}ml` : `Contains ${count} perfumes, ${size}ml`;
    if (concentration) line += ` • Concentration ${concentration}`;
    return line;
  }
  let line = genderWord ? `Contient ${count} parfums ${genderWord} de ${size}ml` : `Contient ${count} parfums de ${size}ml`;
  if (concentration) line += ` • Concentration ${concentration}`;
  return line;
}
