const customPackSettingsRepo = require('../db/customPackSettingsRepo');
const perfumesRepo = require('../db/perfumesRepo');
const AppError = require('../utils/AppError');

async function getSettings() {
  const settings = await customPackSettingsRepo.get();
  if (!settings) throw new AppError('Custom pack settings are not configured', 500);
  return settings;
}

async function updateSettings(data) {
  return customPackSettingsRepo.update(data);
}

/** Validates a customer's free selection of 4 perfumes and returns them + the price. */
async function buildCustomPack(perfumeIds) {
  const settings = await getSettings();
  if (!settings.is_active) {
    throw new AppError('Custom packs are currently unavailable', 400);
  }
  if (!Array.isArray(perfumeIds) || perfumeIds.length !== 4) {
    throw new AppError('A custom pack must contain exactly 4 perfumes', 400);
  }
  if (new Set(perfumeIds).size !== 4) {
    throw new AppError('A custom pack cannot contain the same perfume twice', 400);
  }

  const perfumes = await perfumesRepo.findByIds(perfumeIds);
  if (perfumes.length !== 4) {
    throw new AppError('One or more selected perfumes could not be found', 400);
  }
  const inactive = perfumes.filter((p) => !p.is_active);
  if (inactive.length) {
    throw new AppError('One or more selected perfumes is no longer available', 400);
  }

  // Preserve the customer's chosen order (1-4), not the DB fetch order.
  const ordered = perfumeIds.map((id) => perfumes.find((p) => p.id === id));

  return { perfumes: ordered, price: Number(settings.flat_price) };
}

module.exports = { getSettings, updateSettings, buildCustomPack };
