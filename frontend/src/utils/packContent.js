const GENDER_WORD = {
  fr: { Femme: "féminins", Homme: "masculins" },
  ar: { Femme: "نسائية", Homme: "رجالية" },
  en: { Femme: "for women", Homme: "for men" },
};

// Builds the "4 parfums féminins de 60ml • Concentration Extrait de Parfum"
// summary line from the pack's actual perfumes -- never a hardcoded string,
// since a pack's gender/size mix could differ from the current all-Femme/
// 60ml catalog. Returns null (render nothing) when the perfumes don't share
// a single gender/size, or the fields aren't present on the payload (the
// lean pack-list projection includes them, but guard anyway), rather than
// stating a detail that might not be true for every perfume in the pack.
export function buildPackContentDetail(perfumes, lang) {
  if (!Array.isArray(perfumes) || perfumes.length === 0) return null;

  const genders = [...new Set(perfumes.map((p) => p.gender).filter(Boolean))];
  const sizes = [...new Set(perfumes.map((p) => p.size).filter(Boolean))];
  if (genders.length !== 1 || sizes.length !== 1) return null;

  const concentrations = [...new Set(perfumes.map((p) => p.concentration).filter(Boolean))];
  const concentration = concentrations.length === 1 ? concentrations[0] : null;
  const genderWord = GENDER_WORD[lang]?.[genders[0]] || null;
  const size = sizes[0];
  const count = perfumes.length;

  if (lang === "ar") {
    let line = genderWord ? `${count} عطور ${genderWord} بحجم ${size} مل` : `${count} عطور بحجم ${size} مل`;
    if (concentration) line += ` • تركيز ${concentration}`;
    return line;
  }
  if (lang === "en") {
    let line = genderWord ? `${count} perfumes ${genderWord}, ${size}ml` : `${count} perfumes, ${size}ml`;
    if (concentration) line += ` • Concentration ${concentration}`;
    return line;
  }
  let line = genderWord ? `${count} parfums ${genderWord} de ${size}ml` : `${count} parfums de ${size}ml`;
  if (concentration) line += ` • Concentration ${concentration}`;
  return line;
}
