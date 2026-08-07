const express = require('express');
const controller = require('../controllers/couponCodesController');
const authAdmin = require('../middleware/authAdmin');
const asyncHandler = require('../middleware/asyncHandler');
const { publicWriteLimiter } = require('../middleware/rateLimiters');

const router = express.Router();
router.post('/validate', publicWriteLimiter, asyncHandler(controller.validate));

const adminRouter = express.Router();
adminRouter.use(authAdmin);
adminRouter.get('/', asyncHandler(controller.list));
adminRouter.post('/', asyncHandler(controller.create));
adminRouter.put('/:id', asyncHandler(controller.update));
adminRouter.delete('/:id', asyncHandler(controller.remove));

module.exports = { publicRouter: router, adminRouter };
