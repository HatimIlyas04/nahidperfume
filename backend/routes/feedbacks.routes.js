const express = require('express');
const controller = require('../controllers/feedbacksController');
const authAdmin = require('../middleware/authAdmin');
const asyncHandler = require('../middleware/asyncHandler');
const { publicWriteLimiter } = require('../middleware/rateLimiters');

const router = express.Router();
router.get('/', asyncHandler(controller.listApproved));
router.post('/', publicWriteLimiter, asyncHandler(controller.submit));

const adminRouter = express.Router();
adminRouter.use(authAdmin);
adminRouter.get('/', asyncHandler(controller.listAll));
adminRouter.put('/:id/status', asyncHandler(controller.setStatus));
adminRouter.delete('/:id', asyncHandler(controller.remove));

module.exports = { publicRouter: router, adminRouter };
