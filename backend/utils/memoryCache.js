/** Tiny in-process TTL cache for read-heavy public GET data (packs, faq,
 * banners, testimonials, homepage sections, feedbacks, settings). Cuts
 * repeat DB round-trips to Aiven within the TTL window — the existing
 * `cachePublic` middleware only sets a browser/CDN Cache-Control header,
 * so a fresh visitor, a different device, or a cleared cache still hit the
 * DB on every request without this. Single Render instance, so a plain
 * Map is sufficient; no Redis/external dependency needed. */
const store = new Map();

function get(key) {
  const hit = store.get(key);
  if (!hit) return undefined;
  if (hit.expiresAt < Date.now()) {
    store.delete(key);
    return undefined;
  }
  return hit.value;
}

function set(key, value, ttlMs) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}

function del(key) {
  store.delete(key);
}

/** Clears every cached key starting with `prefix` — used to invalidate an
 * entity's cached reads (e.g. all `packs:list:*` variants) from a single
 * admin mutation without needing to know every exact key. */
function delPrefix(prefix) {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key);
  }
}

async function getOrSet(key, ttlMs, fn) {
  const cached = get(key);
  if (cached !== undefined) return cached;
  const value = await fn();
  set(key, value, ttlMs);
  return value;
}

module.exports = { get, set, del, delPrefix, getOrSet };
