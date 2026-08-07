/** Short-lived cache for public GET content that changes infrequently
 * (packs, perfumes, FAQ, testimonials, homepage sections, banners, settings).
 * Only applies to GET — writes (admin) are never cached. */
module.exports = function cachePublic(maxAgeSeconds = 60) {
  return (req, res, next) => {
    if (req.method === 'GET') {
      // stale-while-revalidate lets the browser show the cached response
      // instantly while it silently refetches in the background, instead
      // of blocking on a fresh request once max-age expires.
      res.set('Cache-Control', `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${maxAgeSeconds * 3}`);
    }
    next();
  };
};
