const express = require('express');
const controller = require('../controllers/packFeedbackImagesController');
const authAdmin = require('../middleware/authAdmin');
const asyncHandler = require('../middleware/asyncHandler');

// Mounted at /api/admin/packs/:packId/feedback-images
const nestedRouter = express.Router({ mergeParams: true });
nestedRouter.use(authAdmin);
nestedRouter.get('/', asyncHandler(controller.listAll));
nestedRouter.post('/', asyncHandler(controller.create));
nestedRouter.patch('/reorder', asyncHandler(controller.reorder));

// Mounted at /api/admin/pack-feedback-images/:id -- update/delete address a
// single image directly, no need for the parent pack_id in the URL.
const flatRouter = express.Router();
flatRouter.use(authAdmin);
flatRouter.put('/:id', asyncHandler(controller.update));
flatRouter.delete('/:id', asyncHandler(controller.remove));

module.exports = { nestedRouter, flatRouter };
