/** Accepts 0[5-7]XXXXXXXX or +212[5-7]XXXXXXXX (spaces/dashes ignored). */
export function isValidMoroccanPhone(value) {
  const cleaned = String(value || "").replace(/[\s.-]/g, "");
  return /^(?:\+212|0)[5-7]\d{8}$/.test(cleaned);
}
