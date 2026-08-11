const FALLBACK_NUMBER = "212636572200";

/**
 * Builds a wa.me link from whatever format the admin-configured
 * settings.contact_whatsapp happens to be in (0636572200, 636572200,
 * +212636572200, ...) -- normalizes to the 212-prefixed digits-only
 * format wa.me requires, regardless of how it was typed in Settings.
 */
export function whatsAppLink(rawNumber) {
  const digits = String(rawNumber || "").replace(/\D/g, "");
  if (!digits) return `https://wa.me/${FALLBACK_NUMBER}`;
  const local = digits.replace(/^212/, "").replace(/^0/, "");
  return `https://wa.me/212${local}`;
}
