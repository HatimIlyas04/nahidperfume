const express = require('express');
const controller = require('../controllers/activityLogsController');
const authAdmin = require('../middleware/authAdmin');
const requireRole = require('../middleware/requireRole');
const asyncHandler = require('../middleware/asyncHandler');

const adminRouter = express.Router();
adminRouter.use(authAdmin, requireRole('super_admin'));
adminRouter.get('/', asyncHandler(controller.list));

module.exports = { adminRouter };
