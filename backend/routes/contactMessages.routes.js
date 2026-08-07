const express = require('express');
const controller = require('../controllers/contactMessagesController');
const authAdmin = require('../middleware/authAdmin');
const asyncHandler = require('../middleware/asyncHandler');
const { publicWriteLimiter } = require('../middleware/rateLimiters');
const verifyRecaptcha = require('../middleware/verifyRecaptcha');

const router = express.Router();
router.post('/', publicWriteLimiter, verifyRecaptcha('contact'), asyncHandler(controller.submit));

const adminRouter = express.Router();
adminRouter.use(authAdmin);
adminRouter.get('/', asyncHandler(controller.list));
adminRouter.put('/:id/status', asyncHandler(controller.setStatus));
adminRouter.delete('/:id', asyncHandler(controller.remove));

module.exports = { publicRouter: router, adminRouter };
