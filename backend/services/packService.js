const { pool, withTransaction } = require('../config/db');
const packsRepo = require('../db/packsRepo');
const packPerfumesRepo = require('../db/packPerfumesRepo');
const perfumesRepo = require('../db/perfumesRepo');
const AppError = require('../utils/AppError');

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

async function attachPerfumes(packs, conn = pool) {
  if (!packs.length) return packs;
  const rows = await packPerfumesRepo.findByPackIds(packs.map((p) => p.id), conn);
  return packs.map((pack) => ({
    ...pack,
    perfumes: rows.filter((r) => r.pack_id === pack.id).sort((a, b) => a.position - b.position),
  }));
}

async function listPacks({ isActive } = {}) {
  const packs = await packsRepo.findAll({ isActive });
  return attachPerfumes(packs);
}

async function getPack(id, conn = pool) {
  const pack = await packsRepo.findById(id, conn);
  if (!pack) throw new AppError('Pack not found', 404);
  const [withPerfumes] = await attachPerfumes([pack], conn);
  return withPerfumes;
}

async function createPack({ perfumeIds, ...packData }) {
  await validatePerfumeIds(perfumeIds);
  return withTransaction(async (conn) => {
    const pack = await packsRepo.create(packData, conn);
    await packPerfumesRepo.replaceForPack(pack.id, perfumeIds, conn);
    if (packData.is_upsell_offer) {
      await packsRepo.clearOtherUpsellOffers(pack.id, conn);
    }
    return getPack(pack.id, conn);
  });
}

async function updatePack(id, { perfumeIds, ...packData }) {
  const existing = await packsRepo.findById(id);
  if (!existing) throw new AppError('Pack not found', 404);

  return withTransaction(async (conn) => {
    if (Object.keys(packData).length) {
      await packsRepo.update(id, packData, conn);
    }
    if (perfumeIds) {
      await validatePerfumeIds(perfumeIds);
      await packPerfumesRepo.replaceForPack(id, perfumeIds, conn);
    }
    if (packData.is_upsell_offer) {
      await packsRepo.clearOtherUpsellOffers(id, conn);
    }
    return getPack(id, conn);
  });
}

async function getUpsellOffer() {
  const pack = await packsRepo.findUpsellOffer();
  if (!pack) return null;
  const [withPerfumes] = await attachPerfumes([pack]);
  return withPerfumes;
}

async function setActive(id, isActive) {
  const pack = await packsRepo.setActive(id, isActive);
  if (!pack) throw new AppError('Pack not found', 404);
  return getPack(id);
}

async function reorder(items) {
  await packsRepo.reorder(items);
}

async function duplicatePack(id) {
  const source = await getPack(id);
  return withTransaction(async (conn) => {
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
}

async function deletePack(id) {
  const existing = await packsRepo.findById(id);
  if (!existing) throw new AppError('Pack not found', 404);
  await packsRepo.remove(id);
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
  getUpsellOffer,
};
