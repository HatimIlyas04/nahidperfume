const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const env = require('./config/env');
const { pool } = require('./config/db');
const authAdmin = require('./middleware/authAdmin');
const errorHandler = require('./middleware/errorHandler');
const asyncHandler = require('./middleware/asyncHandler');
const { globalLimiter } = require('./middleware/rateLimiters');
const cachePublic = require('./middleware/cachePublic');

const perfumesRoutes = require('./routes/perfumes.routes');
const packsRoutes = require('./routes/packs.routes');
const customPackSettingsRoutes = require('./routes/customPackSettings.routes');
const ordersRoutes = require('./routes/orders.routes');
const couponCodesRoutes = require('./routes/couponCodes.routes');
const feedbacksRoutes = require('./routes/feedbacks.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');
const faqRoutes = require('./routes/faq.routes');
const bannersRoutes = require('./routes/banners.routes');
const homepageSectionsRoutes = require('./routes/homepageSections.routes');
const contactMessagesRoutes = require('./routes/contactMessages.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const notificationsRoutes = require('./routes/notifications.routes');
const settingsRoutes = require('./routes/settings.routes');
const adminsRoutes = require('./routes/admins.routes');
const activityLogsRoutes = require('./routes/activityLogs.routes');
const customersRoutes = require('./routes/customers.routes');
const uploadRouter = require('./routes/upload');

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());

// Hardcoded alongside env.allowedOrigins (not instead of) so a missing/stale
// ALLOWED_ORIGINS env var on the host can never take the production site down.
const PRODUCTION_ORIGINS = [
  'https://nahidperfumes.com',
  'https://www.nahidperfumes.com',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Same-origin / server-to-server requests have no Origin header.
      if (!origin) return callback(null, true);
      const isAllowed =
        env.allowedOrigins.includes(origin) ||
        PRODUCTION_ORIGINS.includes(origin) ||
        origin === 'http://localhost:3000' ||
        origin === 'http://localhost:5173' ||
        origin.endsWith('.vercel.app');
      // Reject via `false`, not a thrown Error — an Error here is caught by
      // the error handler and returned as a 500, which breaks CORS entirely
      // (no CORS headers at all) instead of just declining this one origin.
      callback(null, isAllowed);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '2mb' }));
app.use('/api', globalLimiter);

// ── Infra ──────────────────────────────────────────────────
app.get('/api/ping', (req, res) => res.json({ ok: true }));
app.get(
  '/api/health',
  asyncHandler(async (req, res) => {
    await pool.query('SELECT 1');
    res.json({ ok: true, db: 'connected' });
  })
);

// ── Public resource routes ────────────────────────────────
// Content-heavy, infrequently-changing GETs get a short cache (writes are unaffected).
app.use('/api/perfumes', cachePublic(60), perfumesRoutes.publicRouter);
app.use('/api/packs', cachePublic(60), packsRoutes.publicRouter);
app.use('/api/custom-pack-settings', cachePublic(60), customPackSettingsRoutes.publicRouter);
app.use('/api/orders', ordersRoutes.publicRouter);
app.use('/api/coupons', couponCodesRoutes.publicRouter);
app.use('/api/feedbacks', cachePublic(30), feedbacksRoutes.publicRouter);
app.use('/api/testimonials', cachePublic(120), testimonialsRoutes.publicRouter);
app.use('/api/faq', cachePublic(300), faqRoutes.publicRouter);
app.use('/api/banners', cachePublic(120), bannersRoutes.publicRouter);
app.use('/api/homepage-sections', cachePublic(120), homepageSectionsRoutes.publicRouter);
app.use('/api/contact', contactMessagesRoutes.publicRouter);
app.use('/api/wishlist', wishlistRoutes.publicRouter);
app.use('/api/settings', cachePublic(300), settingsRoutes.publicRouter);

// ── Admin resource routes (each sub-router applies authAdmin itself) ──
app.use('/api/admin/perfumes', perfumesRoutes.adminRouter);
app.use('/api/admin/packs', packsRoutes.adminRouter);
app.use('/api/admin/custom-pack-settings', customPackSettingsRoutes.adminRouter);
app.use('/api/admin/orders', ordersRoutes.adminRouter);
app.use('/api/admin/coupons', couponCodesRoutes.adminRouter);
app.use('/api/admin/feedbacks', feedbacksRoutes.adminRouter);
app.use('/api/admin/testimonials', testimonialsRoutes.adminRouter);
app.use('/api/admin/faq', faqRoutes.adminRouter);
app.use('/api/admin/banners', bannersRoutes.adminRouter);
app.use('/api/admin/homepage-sections', homepageSectionsRoutes.adminRouter);
app.use('/api/admin/contact-messages', contactMessagesRoutes.adminRouter);
app.use('/api/admin/notifications', notificationsRoutes.adminRouter);
app.use('/api/admin/settings', settingsRoutes.adminRouter);
app.use('/api/admin/activity-logs', activityLogsRoutes.adminRouter);
app.use('/api/admin/customers', customersRoutes.adminRouter);
// Admin auth (login/verify/change-password) + admins CRUD, all under /api/admin
app.use('/api/admin', adminsRoutes.adminRouter);

// ── Uploads (Cloudinary, admin-only) ──────────────────────
app.use('/api/upload', authAdmin, uploadRouter);

// ── 404 + centralized error handling ──────────────────────
app.use((req, res) => res.status(404).json({ success: false, error: 'Not found' }));
app.use(errorHandler);

module.exports = app;
