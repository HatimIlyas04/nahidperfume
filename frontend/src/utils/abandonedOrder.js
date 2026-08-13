// Tracks an in-progress direct order so a customer who starts filling the
// form but leaves without confirming can be reminded on a later visit.
// Deliberately stores ONLY pack identification + quantity, never name/
// phone/address -- the form itself is the source of truth for those, and
// persisting a customer's contact details in plain localStorage indefinitely
// is exactly the kind of "sensitive info" this feature has no real need to
// keep. Resuming re-opens the pack's own order form; the customer retypes
// their details, which is a small, deliberate tradeoff for not storing PII
// longer than the current form session needs it.
const STORAGE_KEY = "nahid_pending_order";
const SESSION_DISMISS_KEY = "nahid_pending_order_dismissed";
const DRAFT_TTL_MS = 48 * 60 * 60 * 1000; // 48h -- long enough to catch "came back the next day", short enough that a month-old glance doesn't resurface as if it just happened

export function saveDraft(pack, quantity) {
  if (!pack?.id) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      packId: pack.id,
      packTitle: pack.title,
      packImage: pack.cover_image,
      packPrice: pack.price,
      quantity,
      savedAt: Date.now(),
    }));
    // A fresh save means the customer is actively engaged again -- any
    // earlier "don't show this session" dismissal shouldn't suppress a
    // reminder for what is, in effect, a renewed attempt.
    sessionStorage.removeItem(SESSION_DISMISS_KEY);
  } catch {
    // Storage can throw in private-browsing modes on some browsers --
    // the reminder is a nice-to-have, never worth breaking the order form over.
  }
}

export function getDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw);
    if (!draft?.packId || !draft?.savedAt) return null;
    if (Date.now() - draft.savedAt > DRAFT_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_DISMISS_KEY);
  } catch {
    // ignore
  }
}

export function dismissForSession() {
  try { sessionStorage.setItem(SESSION_DISMISS_KEY, "1"); } catch { /* ignore */ }
}

export function isDismissedThisSession() {
  try { return sessionStorage.getItem(SESSION_DISMISS_KEY) === "1"; } catch { return false; }
}
