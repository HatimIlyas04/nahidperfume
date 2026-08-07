/**
 * Requests an appropriately-sized, auto-format/quality Cloudinary
 * rendition instead of the full-size original (uploads are already
 * capped at 900x900 — see backend/routes/upload.js). Cuts bytes
 * transferred on grids where an image never renders larger than a few
 * hundred px. No-op for non-Cloudinary URLs (external/legacy images).
 */
export function cldResize(url, width) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/w_${width},c_limit,q_auto,f_auto/`);
}
