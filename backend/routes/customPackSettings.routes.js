const express = require('express');
const controller = require('../controllers/customPackSettingsController');
const authAdmin = require('../middleware/authAdmin');
const requireRole = require('../middleware/requireRole');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();
router.get('/', asyncHandler(controller.getPublic));

const adminRouter = express.Router();
adminRouter.use(authAdmin, requireRole('super_admin'));
adminRouter.put('/', asyncHandler(controller.update));

module.exports = { publicRouter: router, adminRouter };
