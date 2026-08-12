const express = require('express');
const controller = require('../controllers/pushSubscriptionsController');
const authAdmin = require('../middleware/authAdmin');
const asyncHandler = require('../middleware/asyncHandler');

// Entirely admin-only -- subscription management and the VAPID public key
// must never be reachable without a valid admin session (the public key
// isn't secret by cryptographic design, but exposing this endpoint
// publicly would still let anyone probe whether push is configured).
const adminRouter = express.Router();
adminRouter.use(authAdmin);
adminRouter.get('/vapid-public-key', asyncHandler(controller.getVapidPublicKey));
adminRouter.post('/subscribe', asyncHandler(controller.subscribe));
adminRouter.post('/unsubscribe', asyncHandler(controller.unsubscribe));
adminRouter.post('/test', asyncHandler(controller.test));

module.exports = { adminRouter };
