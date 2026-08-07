import axios from "axios";

const FALLBACK_API_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://nahidperfume-backend.onrender.com";

/**
 * Validates and normalizes a candidate base URL, rejecting anything that
 * isn't a clean absolute http(s) URL. This exists because VITE_API_URL is
 * an environment variable set outside this codebase (in the Vercel
 * dashboard) — a human can paste the wrong thing into that field, and
 * nothing in this repo would catch it at build time. It already happened:
 * VITE_API_URL was set to a pasted Markdown link — literally the string
 * "[https://nahidperfume-backend.onrender.com](https://nahidperfume-backend.onrender.com)"
 * — which `import.meta.env.VITE_API_URL || fallback` has no way to
 * distinguish from a real URL, since it's non-empty. Every request then
 * silently built on that garbage baseURL, and because it doesn't start
 * with "http"/"https" as its first characters, the browser resolved it as
 * a *relative* path against the current page instead of an absolute URL —
 * i.e. https://www.nahidperfumes.com/[https://...](https://...)/api/packs
 * — a same-origin request Vercel has no route for, so it 404'd. `new
 * URL()` throws on this shape (it requires a valid scheme at the very
 * start), which is exactly the validation needed here.
 */
function sanitizeApiBaseUrl(candidate) {
  if (typeof candidate !== "string") return null;
  const trimmed = candidate.trim();
  if (!trimmed) return null;
  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
  return trimmed.replace(/\/+$/, "");
}

// Computed here, independently of any other module — this must NOT depend
// on axios.defaults.baseURL having already been set elsewhere (e.g. by
// App.jsx). ES modules evaluate all of a module's imports before running
// its own body, so whichever module happens to import this file first
// (transitively, however deep) determines this value. That previously broke
// in production: Navbar.jsx (rendered eagerly, outside the lazy/Suspense
// boundary) imports this module, so this file evaluated — and froze
// baseURL:"" via axios.create() — before App.jsx's own body ever ran.
// Vite's dev-only proxy (server.proxy['/api'] in vite.config.js) masked it
// completely in local dev, since relative "/api/..." calls still resolved.
export const API_BASE_URL = sanitizeApiBaseUrl(import.meta.env.VITE_API_URL) || FALLBACK_API_URL;

if (import.meta.env.VITE_API_URL && !sanitizeApiBaseUrl(import.meta.env.VITE_API_URL)) {
  // Loud on purpose: a malformed VITE_API_URL is exactly the kind of bug
  // that silently 404s every single request with no obvious cause in the
  // UI. This must not fail silently a second time.
  console.error(
    `[api] VITE_API_URL is set but is not a valid URL: ${JSON.stringify(import.meta.env.VITE_API_URL)}. ` +
    `Falling back to ${FALLBACK_API_URL}. Fix the VITE_API_URL environment variable in the Vercel dashboard ` +
    `— it must be a plain URL like "https://nahidperfume-backend.onrender.com", not Markdown or any other formatting.`
  );
}

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const unwrap = (res) => res.data.data;

// ── Resilience layer: survives a sleeping Render free-tier backend ─────
// Generous enough for a cold container (measured ~26s in production) to
// finish waking up within the first attempt. Writes (POST/PUT/DELETE) get
// this same generous single-attempt timeout but are never auto-retried —
// retrying a non-idempotent request (e.g. checkout) risks a duplicate order.
const FIRST_ATTEMPT_TIMEOUT = 40000;
// A retry only happens after the first attempt already failed, so by then
// the backend has very likely finished waking up — short timeouts are fine.
const RETRY_TIMEOUT = 8000;
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY = 1000;

api.defaults.timeout = FIRST_ATTEMPT_TIMEOUT;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Retries GET-only, and only on network errors/timeouts or 5xx — never on 4xx (those won't fix themselves). */
async function withRetry(requestFn) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await requestFn(attempt === 0 ? FIRST_ATTEMPT_TIMEOUT : RETRY_TIMEOUT);
    } catch (err) {
      const status = err.response?.status;
      const isRetryable = !err.response || status >= 500;
      if (!isRetryable || attempt >= MAX_RETRIES) throw err;
      await wait(RETRY_BASE_DELAY * 2 ** attempt);
    }
  }
}

// Public, infrequently-changing endpoints — safe to dedupe/short-cache
// client-side on top of the backend's own Cache-Control headers.
const CACHEABLE_PREFIXES = [
  "/api/packs", "/api/perfumes", "/api/faq", "/api/testimonials",
  "/api/banners", "/api/homepage-sections", "/api/settings", "/api/custom-pack-settings",
];
// Within FRESH_TTL: return the cache, no network call at all.
// Between FRESH_TTL and STALE_TTL: stale-while-revalidate — return the
// cached value immediately (this call never waits on the network), and
// kick off a background refetch that updates the cache for next time.
// Past STALE_TTL: the data is too old to show at all; fetch normally.
const FRESH_TTL_MS = 30000;
const STALE_TTL_MS = 5 * 60 * 1000;
const responseCache = new Map(); // key -> { response, cachedAt }
const inFlightRequests = new Map(); // key -> Promise (dedupes concurrent identical calls)
const revalidating = new Set(); // keys with a background refetch already in flight

function isCacheableUrl(url) {
  return CACHEABLE_PREFIXES.some((p) => url.startsWith(p));
}
function requestKey(url, config) {
  return `${url}?${JSON.stringify(config?.params || {})}`;
}

const rawGet = api.get.bind(api);

function revalidateInBackground(key, url, config) {
  if (revalidating.has(key)) return;
  revalidating.add(key);
  withRetry((timeout) => rawGet(url, { ...config, timeout }))
    .then((res) => responseCache.set(key, { response: res, cachedAt: Date.now() }))
    .catch(() => {}) // the stale value already served this call; a failed background refresh isn't user-visible
    .finally(() => revalidating.delete(key));
}

/**
 * Drop-in replacement for axios `.get()`: retries transient failures with
 * backoff, dedupes concurrent identical requests, and stale-while-revalidate
 * caches cacheable public endpoints — all transparent to existing call sites.
 */
api.get = function resilientGet(url, config = {}) {
  const cacheable = isCacheableUrl(url);
  const key = requestKey(url, config);

  if (cacheable) {
    const cached = responseCache.get(key);
    if (cached) {
      const age = Date.now() - cached.cachedAt;
      if (age < FRESH_TTL_MS) return Promise.resolve(cached.response);
      if (age < STALE_TTL_MS) {
        revalidateInBackground(key, url, config);
        return Promise.resolve(cached.response);
      }
    }
    if (inFlightRequests.has(key)) return inFlightRequests.get(key);
  }

  const promise = withRetry((timeout) => rawGet(url, { ...config, timeout }))
    .then((res) => {
      if (cacheable) responseCache.set(key, { response: res, cachedAt: Date.now() });
      return res;
    })
    .finally(() => inFlightRequests.delete(key));

  if (cacheable) inFlightRequests.set(key, promise);
  return promise;
};

/** Stable per-browser identity for wishlist, with no login system. */
export function getDeviceToken() {
  let token = localStorage.getItem("nahid_device_token");
  if (!token) {
    token = `dev_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem("nahid_device_token", token);
  }
  return token;
}

// ── Perfumes (catalog only) ─────────────────────────────────
export const perfumesApi = {
  list: (params) => api.get("/api/perfumes", { params }).then(unwrap),
  get: (id) => api.get(`/api/perfumes/${id}`).then(unwrap),
};

// ── Packs ────────────────────────────────────────────────────
export const packsApi = {
  list: () => api.get("/api/packs").then(unwrap),
  get: (id) => api.get(`/api/packs/${id}`).then(unwrap),
  getUpsellOffer: () => api.get("/api/packs/upsell-offer").then(unwrap),
};

// ── Custom pack settings ─────────────────────────────────────
export const customPackSettingsApi = {
  get: () => api.get("/api/custom-pack-settings").then(unwrap),
};

// ── Orders ───────────────────────────────────────────────────
export const ordersApi = {
  create: (payload) => api.post("/api/orders", payload).then(unwrap),
  track: (orderNumber, phone) =>
    api.get("/api/orders/track", { params: { order_number: orderNumber, phone } }).then(unwrap),
  applyUpsell: (orderId, upsellToken) =>
    api.post(`/api/orders/${orderId}/upsell`, { upsell_token: upsellToken }).then(unwrap),
};

// ── Coupons ──────────────────────────────────────────────────
export const couponsApi = {
  validate: (code, subtotal) => api.post("/api/coupons/validate", { code, subtotal }).then(unwrap),
};

// ── Feedbacks (reviews) ──────────────────────────────────────
export const feedbacksApi = {
  listApproved: () => api.get("/api/feedbacks").then(unwrap),
  submit: (payload) => api.post("/api/feedbacks", payload).then(unwrap),
};

// ── Testimonials ─────────────────────────────────────────────
export const testimonialsApi = {
  listActive: () => api.get("/api/testimonials").then(unwrap),
};

// ── FAQ ──────────────────────────────────────────────────────
export const faqApi = {
  listActive: (category) => api.get("/api/faq", { params: { category } }).then(unwrap),
};

// ── Banners ──────────────────────────────────────────────────
export const bannersApi = {
  listActive: (placement) => api.get("/api/banners", { params: { placement } }).then(unwrap),
};

// ── Homepage sections ────────────────────────────────────────
export const homepageSectionsApi = {
  listActive: () => api.get("/api/homepage-sections").then(unwrap),
};

// ── Contact ──────────────────────────────────────────────────
export const contactApi = {
  submit: (payload) => api.post("/api/contact", payload).then(unwrap),
};

// ── Wishlist (device-token based, no login) ──────────────────
export const wishlistApi = {
  get: () => api.get("/api/wishlist", { params: { device_token: getDeviceToken() } }).then(unwrap),
  addPerfume: (perfumeId) =>
    api.post("/api/wishlist/perfumes", { device_token: getDeviceToken(), perfume_id: perfumeId }).then(unwrap),
  removePerfume: (perfumeId) =>
    api.delete(`/api/wishlist/perfumes/${perfumeId}`, { params: { device_token: getDeviceToken() } }).then(unwrap),
  addPack: (packId) =>
    api.post("/api/wishlist/packs", { device_token: getDeviceToken(), pack_id: packId }).then(unwrap),
  removePack: (packId) =>
    api.delete(`/api/wishlist/packs/${packId}`, { params: { device_token: getDeviceToken() } }).then(unwrap),
};

// ── Settings (public) ────────────────────────────────────────
export const settingsApi = {
  getPublic: () => api.get("/api/settings/public").then(unwrap),
};

// ═══════════════════════════════════════════════════════════
// ADMIN (all require a Bearer token, attached by the interceptor above)
// ═══════════════════════════════════════════════════════════

export const adminAuthApi = {
  login: (username, password) => api.post("/api/admin/login", { username, password }).then(unwrap),
  verify: () => api.get("/api/admin/verify").then(unwrap),
  changePassword: (current_password, new_password) =>
    api.post("/api/admin/change-password", { current_password, new_password }).then(unwrap),
};

export const adminAdminsApi = {
  list: () => api.get("/api/admin/admins").then(unwrap),
  create: (data) => api.post("/api/admin/admins", data).then(unwrap),
  update: (id, data) => api.put(`/api/admin/admins/${id}`, data).then(unwrap),
  remove: (id) => api.delete(`/api/admin/admins/${id}`),
};

export const adminPerfumesApi = {
  list: () => api.get("/api/admin/perfumes").then(unwrap),
  create: (data) => api.post("/api/admin/perfumes", data).then(unwrap),
  update: (id, data) => api.put(`/api/admin/perfumes/${id}`, data).then(unwrap),
  setActive: (id, is_active) => api.patch(`/api/admin/perfumes/${id}/active`, { is_active }).then(unwrap),
  remove: (id) => api.delete(`/api/admin/perfumes/${id}`),
};

export const adminPacksApi = {
  list: () => api.get("/api/admin/packs").then(unwrap),
  get: (id) => api.get(`/api/packs/${id}`).then(unwrap),
  create: (data) => api.post("/api/admin/packs", data).then(unwrap),
  update: (id, data) => api.put(`/api/admin/packs/${id}`, data).then(unwrap),
  setActive: (id, is_active) => api.patch(`/api/admin/packs/${id}/active`, { is_active }).then(unwrap),
  reorder: (items) => api.patch("/api/admin/packs/reorder", { items }).then(unwrap),
  duplicate: (id) => api.post(`/api/admin/packs/${id}/duplicate`).then(unwrap),
  remove: (id) => api.delete(`/api/admin/packs/${id}`),
};

export const adminCustomPackSettingsApi = {
  update: (data) => api.put("/api/admin/custom-pack-settings", data).then(unwrap),
};

export const adminOrdersApi = {
  list: (params) => api.get("/api/admin/orders", { params }).then(unwrap),
  get: (id) => api.get(`/api/admin/orders/${id}`).then(unwrap),
  updateStatus: (id, status) => api.put(`/api/admin/orders/${id}/status`, { status }).then(unwrap),
  updateNotes: (id, admin_notes) => api.put(`/api/admin/orders/${id}/notes`, { admin_notes }).then(unwrap),
  stats: () => api.get("/api/admin/orders/stats").then(unwrap),
};

export const adminCouponsApi = {
  list: () => api.get("/api/admin/coupons").then(unwrap),
  create: (data) => api.post("/api/admin/coupons", data).then(unwrap),
  update: (id, data) => api.put(`/api/admin/coupons/${id}`, data).then(unwrap),
  remove: (id) => api.delete(`/api/admin/coupons/${id}`),
};

export const adminFeedbacksApi = {
  list: (status) => api.get("/api/admin/feedbacks", { params: { status } }).then(unwrap),
  setStatus: (id, status) => api.put(`/api/admin/feedbacks/${id}/status`, { status }).then(unwrap),
  remove: (id) => api.delete(`/api/admin/feedbacks/${id}`),
};

export const adminTestimonialsApi = {
  list: () => api.get("/api/admin/testimonials").then(unwrap),
  create: (data) => api.post("/api/admin/testimonials", data).then(unwrap),
  update: (id, data) => api.put(`/api/admin/testimonials/${id}`, data).then(unwrap),
  reorder: (items) => api.patch("/api/admin/testimonials/reorder", { items }).then(unwrap),
  remove: (id) => api.delete(`/api/admin/testimonials/${id}`),
};

export const adminFaqApi = {
  list: () => api.get("/api/admin/faq").then(unwrap),
  create: (data) => api.post("/api/admin/faq", data).then(unwrap),
  update: (id, data) => api.put(`/api/admin/faq/${id}`, data).then(unwrap),
  reorder: (items) => api.patch("/api/admin/faq/reorder", { items }).then(unwrap),
  remove: (id) => api.delete(`/api/admin/faq/${id}`),
};

export const adminBannersApi = {
  list: () => api.get("/api/admin/banners").then(unwrap),
  create: (data) => api.post("/api/admin/banners", data).then(unwrap),
  update: (id, data) => api.put(`/api/admin/banners/${id}`, data).then(unwrap),
  reorder: (items) => api.patch("/api/admin/banners/reorder", { items }).then(unwrap),
  remove: (id) => api.delete(`/api/admin/banners/${id}`),
};

export const adminHomepageSectionsApi = {
  list: () => api.get("/api/admin/homepage-sections").then(unwrap),
  update: (id, data) => api.put(`/api/admin/homepage-sections/${id}`, data).then(unwrap),
  reorder: (items) => api.patch("/api/admin/homepage-sections/reorder", { items }).then(unwrap),
};

export const adminContactMessagesApi = {
  list: (status) => api.get("/api/admin/contact-messages", { params: { status } }).then(unwrap),
  setStatus: (id, status) => api.put(`/api/admin/contact-messages/${id}/status`, { status }).then(unwrap),
  remove: (id) => api.delete(`/api/admin/contact-messages/${id}`),
};

export const adminNotificationsApi = {
  list: (unread) => api.get("/api/admin/notifications", { params: { unread } }).then(unwrap),
  markRead: (id) => api.put(`/api/admin/notifications/${id}/read`).then(unwrap),
  markAllRead: () => api.put("/api/admin/notifications/read-all").then(unwrap),
};

export const adminSettingsApi = {
  list: () => api.get("/api/admin/settings").then(unwrap),
  update: (settings) => api.put("/api/admin/settings", { settings }).then(unwrap),
};

export const adminActivityLogsApi = {
  list: (params) => api.get("/api/admin/activity-logs", { params }).then(unwrap),
};

export const adminCustomersApi = {
  list: (params) => api.get("/api/admin/customers", { params }).then(unwrap),
};

export const uploadApi = {
  image: (file) => {
    const form = new FormData();
    form.append("file", file);
    return api.post("/api/upload/image", form, { headers: { "Content-Type": "multipart/form-data" } });
  },
};
