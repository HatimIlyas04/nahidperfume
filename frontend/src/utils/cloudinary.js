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

// Feedback screenshots (WhatsApp chats, Instagram DMs) are customer
// uploads of unknown, often large, original size -- these are the exact
// widths PackFeedbackGallery actually needs, so the grid never requests
// more bytes than it can render and the 1200px version only ever loads
// once a customer opens the lightbox.
export const FEEDBACK_IMAGE_WIDTHS = { mobile: 400, desktop: 600, lightbox: 1200 };

/** Semantic wrapper around cldResize for feedback screenshots -- same
 *  underlying transformation (c_limit never crops or upscales), just
 *  named for this call site instead of a bare width number. */
export function getFeedbackImageUrl(url, width = FEEDBACK_IMAGE_WIDTHS.desktop) {
  return cldResize(url, width);
}
