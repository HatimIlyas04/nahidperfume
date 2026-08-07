import axios from "axios";

export const api = axios.create({
  baseURL: axios.defaults.baseURL || "",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const unwrap = (res) => res.data.data;

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
