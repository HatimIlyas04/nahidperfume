const express = require('express');
const controller = require('../controllers/siteContentController');
const authAdmin = require('../middleware/authAdmin');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();
router.get('/', asyncHandler(controller.listPublic));

const adminRouter = express.Router();
adminRouter.use(authAdmin);
adminRouter.get('/', asyncHandler(controller.listAll));
adminRouter.put('/:key', asyncHandler(controller.upsert));
adminRouter.delete('/:key', asyncHandler(controller.resetToDefault));

module.exports = { publicRouter: router, adminRouter };
