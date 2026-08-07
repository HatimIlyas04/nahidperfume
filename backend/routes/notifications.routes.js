const express = require('express');
const controller = require('../controllers/notificationsController');
const authAdmin = require('../middleware/authAdmin');
const asyncHandler = require('../middleware/asyncHandler');

const adminRouter = express.Router();
adminRouter.use(authAdmin);
adminRouter.get('/', asyncHandler(controller.list));
adminRouter.put('/:id/read', asyncHandler(controller.markRead));
adminRouter.put('/read-all', asyncHandler(controller.markAllRead));

module.exports = { adminRouter };
