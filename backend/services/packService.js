const { pool, withTransaction } = require('../config/db');
const packsRepo = require('../db/packsRepo');
const packPerfumesRepo = require('../db/packPerfumesRepo');
const perfumesRepo = require('../db/perfumesRepo');
const packFeedbackImagesRepo = require('../db/packFeedbackImagesRepo');
const AppError = require('../utils/AppError');
const cache = require('../utils/memoryCache');

const LIST_CACHE_PREFIX = 'packs:list:';
const LIST_CACHE_TTL_MS = 60 * 1000; // matches cachePublic(60) on /api/packs
const DETAIL_CACHE_PREFIX = 'packs:detail:';
const DETAIL_CACHE_TTL_MS = 60 * 1000; // matches cachePublic(60) on /api/packs/:id

// Packs are admin-edited, not high-frequency writes -- clearing every
// cached detail view on any single pack's write (rather than tracking
// which exact id changed) is simpler and cheap at this scale, same
// tradeoff the existing list-cache invalidation already makes.
function invalidatePackCaches() {
  cache.delPrefix(LIST_CACHE_PREFIX);
  cache.delPrefix(DETAIL_CACHE_PREFIX);
}

async function validatePerfumeIds(perfumeIds) {
  if (!Array.isArray(perfumeIds) || perfumeIds.length !== 4) {
    throw new AppError('A pack must contain exactly 4 perfumes', 400);
  }
  const unique = new Set(perfumeIds);
  if (unique.size !== 4) {
    throw new AppError('A pack cannot contain the same perfume twice', 400);
  }
  const perfumes = await perfumesRepo.findByIds(perfumeIds);
  if (perfumes.length !== 4) {
    throw new AppError('One or more selected perfumes could not be found', 400);
  }
  const inactive = perfumes.filter((p) => !p.is_active);
  if (inactive.length) {
    throw new AppError(`These perfumes are inactive and cannot be added to a pack: ${inactive.map((p) => p.name).join(', ')}`, 400);
  }
  return perfumes;
}

async function attachPerfumes(packs, { lean = false } = {}, conn = pool) {
  if (!packs.length) return packs;
  const rows = await packPerfumesRepo.findByPackIds(packs.map((p) => p.id), { lean }, conn);
  return packs.map((pack) => ({
    ...pack,
    perfumes: rows.filter((r) => r.pack_id === pack.id).sort((a, b) => a.position - b.position),
  }));
}

// List views (homepage, packs listing, admin packs table) only ever render
// a thumbnail + name per perfume slot — lean avoids shipping every
// perfume's full record (ingredients/notes/concentration/etc.) for every
// pack on the page. The single-pack detail view below needs the full
// record (perfume modal, replace-a-perfume), so it stays non-lean.
async function listPacks({ isActive, gender } = {}) {
  return cache.getOrSet(`${LIST_CACHE_PREFIX}${isActive}:${gender || ''}`, LIST_CACHE_TTL_MS, async () => {
    const packs = await packsRepo.findAll({ isActive, gender });
    return attachPerfumes(packs, { lean: true });
  });
}

// GET /api/packs/:id (single-pack detail -- everything PackDetails.jsx
// needs) previously ran 3 sequential, uncached queries (pack row, perfume
// join, feedback images) on EVERY request -- unlike listPacks() below,
// which was already cached. Measured at ~725ms per visit on a cache miss
// (roughly 3x the ~240ms Aiven round-trip cost measured elsewhere in this
// project), paid by every single customer opening a pack page, every time,
// with zero mitigation. Only cached when called with the default pool
// (conn === pool): createPack/updatePack/duplicatePack call this with an
// explicit transaction connection right after writing, and must always
// read fresh, uncached data in that case -- caching a transactional read
// could return stale pre-write data if the cache happened to already be
// warm, which would be a real correctness bug, not just a staleness one.
async function getPack(id, conn = pool) {
  if (conn !== pool) return fetchPackUncached(id, conn);
  return cache.getOrSet(`${DETAIL_CACHE_PREFIX}${id}`, DETAIL_CACHE_TTL_MS, () => fetchPackUncached(id, conn));
}

async function fetchPackUncached(id, conn) {
  const pack = await packsRepo.findById(id, conn);
  if (!pack) throw new AppError('Pack not found', 404);
  const [withPerfumes] = await attachPerfumes([pack], { lean: false }, conn);
  // Defensive: a feedback-images lookup failure (e.g. pending migration)
  // must never take down the core pack-detail response that already
  // works today -- degrade to an empty gallery instead of a 500.
  const feedbackImages = await packFeedbackImagesRepo.findActiveByPackId(id, conn).catch(() => []);
  return { ...withPerfumes, feedback_images: feedbackImages };
}

async function createPack({ perfumeIds, ...packData }) {
  await validatePerfumeIds(perfumeIds);
  const result = await withTransaction(async (conn) => {
    const pack = await packsRepo.create(packData, conn);
    await packPerfumesRepo.replaceForPack(pack.id, perfumeIds, conn);
    return getPack(pack.id, conn);
  });
  invalidatePackCaches();
  return result;
}

async function updatePack(id, { perfumeIds, ...packData }) {
  const existing = await packsRepo.findById(id);
  if (!existing) throw new AppError('Pack not found', 404);

  const result = await withTransaction(async (conn) => {
    if (Object.keys(packData).length) {
      await packsRepo.update(id, packData, conn);
    }
    if (perfumeIds) {
      await validatePerfumeIds(perfumeIds);
      await packPerfumesRepo.replaceForPack(id, perfumeIds, conn);
    }
    return getPack(id, conn);
  });
  invalidatePackCaches();
  return result;
}

// Any number of packs can be flagged is_upsell_offer=1 -- the Thank You
// page shows all of them (see orderService.applyUpsell for the per-pack
// idempotency check that lets a customer accept more than one).
async function getUpsellOffers() {
  const packs = await packsRepo.findUpsellOffers();
  if (!packs.length) return [];
  return attachPerfumes(packs, { lean: true });
}

async function setActive(id, isActive) {
  const pack = await packsRepo.setActive(id, isActive);
  if (!pack) throw new AppError('Pack not found', 404);
  invalidatePackCaches();
  return getPack(id);
}

async function reorder(items) {
  await packsRepo.reorder(items);
  invalidatePackCaches();
}

async function duplicatePack(id) {
  const source = await getPack(id);
  const result = await withTransaction(async (conn) => {
    const copy = await packsRepo.create(
      {
        title: `${source.title} (copie)`,
        slug: null,
        description: source.description,
        cover_image: source.cover_image,
        gallery_images: source.gallery_images,
        price: source.price,
        compare_at_price: source.compare_at_price,
        is_active: 0,
        is_featured: 0,
        display_order: source.display_order,
      },
      conn
    );
    await packPerfumesRepo.replaceForPack(
      copy.id,
      source.perfumes.map((p) => p.perfume_id),
      conn
    );
    return getPack(copy.id, conn);
  });
  invalidatePackCaches();
  return result;
}

async function deletePack(id) {
  const existing = await packsRepo.findById(id);
  if (!existing) throw new AppError('Pack not found', 404);
  await packsRepo.remove(id);
  invalidatePackCaches();
}

/**
 * Given a ready pack and a set of "replace perfume" swaps, resolves the
 * final 4-perfume list for a customized order line. Never mutates the
 * original pack — used only to build the order_item_perfumes snapshot.
 */
async function resolveCustomizedSelection(packId, replacements) {
  const pack = await getPack(packId);
  const finalIds = pack.perfumes.map((p) => p.perfume_id);

  for (const { position, newPerfumeId } of replacements) {
    if (position < 1 || position > 4) throw new AppError('Invalid pack position', 400);
    finalIds[position - 1] = newPerfumeId;
  }

  await validatePerfumeIds(finalIds);
  const perfumes = await perfumesRepo.findByIds(finalIds, pool);
  return finalIds.map((id) => perfumes.find((p) => p.id === id));
}

module.exports = {
  listPacks,
  getPack,
  createPack,
  updatePack,
  setActive,
  reorder,
  duplicatePack,
  deletePack,
  validatePerfumeIds,
  resolveCustomizedSelection,
  getUpsellOffers,
  invalidateListCache: invalidatePackCaches,
};
