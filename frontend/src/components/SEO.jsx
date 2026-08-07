import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.nahidperfumes.com";
const DEFAULT_IMAGE = `${SITE_URL}/nahid1.png`;

/**
 * Drop-in per-page SEO: title, meta description, canonical, Open Graph,
 * Twitter Card, and optional JSON-LD structured data (e.g. Product schema
 * for a pack detail page).
 */
export default function SEO({ title, description, path = "/", image = DEFAULT_IMAGE, structuredData, noindex = false }) {
  const fullTitle = title ? `${title} | Nahid Perfumes` : "Nahid Perfumes — Packs de Parfums Curés | Maroc";
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}
