const express = require('express');
const controller = require('../controllers/homepageSectionsController');
const authAdmin = require('../middleware/authAdmin');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();
router.get('/', asyncHandler(controller.listActive));

const adminRouter = express.Router();
adminRouter.use(authAdmin);
adminRouter.get('/', asyncHandler(controller.listAll));
adminRouter.patch('/reorder', asyncHandler(controller.reorder));
adminRouter.put('/:id', asyncHandler(controller.update));

module.exports = { publicRouter: router, adminRouter };
