// Mirrors the thresholds requested for stock display: >5 = healthy,
// 1-5 = low (show the exact remaining count), 0 = out. A missing/non-numeric
// value is treated as out-of-stock rather than assumed healthy -- never
// silently let a customer order something the backend can't confirm exists.
export function getStockLevel(stock) {
  const n = Number(stock);
  if (!Number.isFinite(n) || n <= 0) return "out";
  if (n <= 5) return "low";
  return "in";
}

export function isOutOfStock(stock) {
  return getStockLevel(stock) === "out";
}
