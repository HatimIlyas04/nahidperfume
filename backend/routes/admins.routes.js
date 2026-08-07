const express = require('express');
const controller = require('../controllers/adminsController');
const authAdmin = require('../middleware/authAdmin');
const requireRole = require('../middleware/requireRole');
const asyncHandler = require('../middleware/asyncHandler');
const { loginLimiter } = require('../middleware/rateLimiters');

// Mounted at /api/admin/* — auth endpoints available to any admin, admin
// management endpoints restricted to super_admin.
const adminRouter = express.Router();

adminRouter.post('/login', loginLimiter, asyncHandler(controller.login));
adminRouter.get('/verify', authAdmin, asyncHandler(controller.verify));
adminRouter.post('/change-password', authAdmin, asyncHandler(controller.changePassword));

adminRouter.get('/admins', authAdmin, requireRole('super_admin'), asyncHandler(controller.list));
adminRouter.post('/admins', authAdmin, requireRole('super_admin'), asyncHandler(controller.create));
adminRouter.put('/admins/:id', authAdmin, requireRole('super_admin'), asyncHandler(controller.update));
adminRouter.delete('/admins/:id', authAdmin, requireRole('super_admin'), asyncHandler(controller.remove));

module.exports = { adminRouter };
