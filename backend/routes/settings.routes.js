const express = require('express');
const controller = require('../controllers/settingsController');
const authAdmin = require('../middleware/authAdmin');
const requireRole = require('../middleware/requireRole');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();
router.get('/public', asyncHandler(controller.getPublic));

const adminRouter = express.Router();
adminRouter.use(authAdmin);
adminRouter.get('/', asyncHandler(controller.getAll));
adminRouter.put('/', requireRole('super_admin'), asyncHandler(controller.update));

module.exports = { publicRouter: router, adminRouter };
