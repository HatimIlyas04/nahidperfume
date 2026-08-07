const express = require('express');
const controller = require('../controllers/testimonialsController');
const authAdmin = require('../middleware/authAdmin');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();
router.get('/', asyncHandler(controller.listActive));

const adminRouter = express.Router();
adminRouter.use(authAdmin);
adminRouter.get('/', asyncHandler(controller.listAll));
adminRouter.post('/', asyncHandler(controller.create));
adminRouter.patch('/reorder', asyncHandler(controller.reorder));
adminRouter.put('/:id', asyncHandler(controller.update));
adminRouter.delete('/:id', asyncHandler(controller.remove));

module.exports = { publicRouter: router, adminRouter };
