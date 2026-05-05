const KEY = 'nahid_products_v1';
const TTL = 5 * 60 * 1000; // 5 minutes

export function getCachedProducts() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > TTL) { localStorage.removeItem(KEY); return null; }
    return data;
  } catch {
    return null;
  }
}

export function setCachedProducts(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

export function clearProductCache() {
  localStorage.removeItem(KEY);
}
