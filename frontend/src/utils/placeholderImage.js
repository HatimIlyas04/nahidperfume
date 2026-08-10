/**
 * Neutral "no photo yet" placeholder for pack/perfume product images.
 * Deliberately NOT the site logo (/nahid1.png) -- showing the brand mark
 * in place of a missing product photo reads as if that logo *is* the
 * product photo, which is exactly the confusion this exists to avoid.
 */
export const NO_IMAGE_PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#F4EFE8"/>
  <g fill="none" stroke="#C9BFB0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="45" y="55" width="110" height="90" rx="8"/>
    <circle cx="75" cy="85" r="10"/>
    <path d="M45 130 L80 100 L110 122 L135 100 L155 118"/>
  </g>
</svg>`.trim());
