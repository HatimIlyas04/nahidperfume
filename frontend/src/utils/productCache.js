const KEY = 'nahid_products_v2';
const TTL = 60 * 1000; // 1 minute — short enough that stale data resolves quickly

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
