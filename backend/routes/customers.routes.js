const express = require('express');
const controller = require('../controllers/customersController');
const authAdmin = require('../middleware/authAdmin');
const asyncHandler = require('../middleware/asyncHandler');

const adminRouter = express.Router();
adminRouter.use(authAdmin);
adminRouter.get('/', asyncHandler(controller.list));

module.exports = { adminRouter };
