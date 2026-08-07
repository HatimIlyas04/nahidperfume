const express = require('express');
const controller = require('../controllers/wishlistController');
const asyncHandler = require('../middleware/asyncHandler');
const { publicWriteLimiter } = require('../middleware/rateLimiters');

const router = express.Router();
router.get('/', asyncHandler(controller.get));
router.post('/perfumes', publicWriteLimiter, asyncHandler(controller.addPerfume));
router.delete('/perfumes/:perfumeId', publicWriteLimiter, asyncHandler(controller.removePerfume));
router.post('/packs', publicWriteLimiter, asyncHandler(controller.addPack));
router.delete('/packs/:packId', publicWriteLimiter, asyncHandler(controller.removePack));

module.exports = { publicRouter: router };
