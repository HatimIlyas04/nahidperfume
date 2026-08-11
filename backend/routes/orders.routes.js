const express = require('express');
const controller = require('../controllers/ordersController');
const authAdmin = require('../middleware/authAdmin');
const asyncHandler = require('../middleware/asyncHandler');
const { orderCreateLimiter, publicWriteLimiter } = require('../middleware/rateLimiters');
const verifyRecaptcha = require('../middleware/verifyRecaptcha');

const router = express.Router();
router.post('/', orderCreateLimiter, verifyRecaptcha('checkout'), asyncHandler(controller.create));
router.get('/track', asyncHandler(controller.track));
router.post('/:id/upsell', publicWriteLimiter, asyncHandler(controller.applyUpsell));

const adminRouter = express.Router();
adminRouter.use(authAdmin);
adminRouter.get('/', asyncHandler(controller.list));
adminRouter.get('/stats', asyncHandler(controller.stats));
adminRouter.get('/:id', asyncHandler(controller.getOne));
adminRouter.put('/:id/status', asyncHandler(controller.updateStatus));
adminRouter.put('/:id/notes', asyncHandler(controller.updateNotes));
adminRouter.delete('/:id', asyncHandler(controller.remove));

module.exports = { publicRouter: router, adminRouter };
