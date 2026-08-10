const express = require('express');
const controller = require('../controllers/packsController');
const authAdmin = require('../middleware/authAdmin');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();
router.get('/', asyncHandler(controller.list));
router.get('/upsell-offers', asyncHandler(controller.getUpsellOffers));
router.get('/:id', asyncHandler(controller.getOne));

const adminRouter = express.Router();
adminRouter.use(authAdmin);
adminRouter.get('/', asyncHandler(controller.listForAdmin));
adminRouter.post('/', asyncHandler(controller.create));
adminRouter.patch('/reorder', asyncHandler(controller.reorder));
adminRouter.put('/:id', asyncHandler(controller.update));
adminRouter.patch('/:id/active', asyncHandler(controller.setActive));
adminRouter.post('/:id/duplicate', asyncHandler(controller.duplicate));
adminRouter.delete('/:id', asyncHandler(controller.remove));

module.exports = { publicRouter: router, adminRouter };
