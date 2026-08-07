/** Short-lived cache for public GET content that changes infrequently
 * (packs, perfumes, FAQ, testimonials, homepage sections, banners, settings).
 * Only applies to GET — writes (admin) are never cached. */
module.exports = function cachePublic(maxAgeSeconds = 60) {
  return (req, res, next) => {
    if (req.method === 'GET') {
      res.set('Cache-Control', `public, max-age=${maxAgeSeconds}`);
    }
    next();
  };
};
