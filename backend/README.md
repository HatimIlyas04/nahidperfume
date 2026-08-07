# Nahid Perfumes — Backend (Phase 1: Packs-Only API)

Express + MySQL (raw `mysql2`, no ORM) API for the packs-only business model. Perfumes are catalog-only; everything customers buy is a **pack of exactly 4 perfumes** — either admin-curated ("ready pack") or customer-built ("custom pack").

This README covers **Phase 1** (database + backend API) only. The customer storefront and admin dashboard UI ship in later phases and are not part of this backend repo.

## Architecture

```
backend/
  app.js              Express app assembly (middleware, routes) — no app.listen, testable
  server.js            Entrypoint: loads env, starts the HTTP server
  config/               env.js (validates required env vars at boot), db.js (pool + transaction helper)
  middleware/            authAdmin, requireRole, errorHandler, asyncHandler, rateLimiters
  db/                      One raw-SQL repository per resource (perfumesRepo, packsRepo, ordersRepo, ...)
  services/                 Business logic spanning multiple repos/transactions (orderService, packService, ...)
  controllers/                One per resource — parses req, calls service/repo, shapes response
  routes/                       One file per resource, exports { publicRouter, adminRouter }
  database/
    schema.sql                  Fresh-install schema (new/empty databases only)
    migrations/                  Numbered, idempotent migrations for an EXISTING production database
    seeds/                        seedAdmin.js (creates first super_admin), demo-data.sql (dev/staging only)
```

## Setup — brand new database (local dev / staging)

1. Copy `.env.example` to `.env` and fill in `DB_*`, a generated `JWT_SECRET`, and Cloudinary credentials.
2. Create the database, then run:
   ```
   mysql -u <user> -p <database> < database/schema.sql
   ```
3. Create your first admin login:
   ```
   node database/seeds/seedAdmin.js myusername
   ```
   The generated password is printed once — save it immediately.
4. (Optional, dev/staging only) Load sample perfumes/packs:
   ```
   mysql -u <user> -p <database> < database/seeds/demo-data.sql
   ```
5. Install dependencies and start:
   ```
   npm install
   npm run dev
   ```
6. Verify: `GET http://localhost:5000/api/health` should return `{ ok: true, db: "connected" }`.

## Setup — existing production database (this is your case)

**Do not run `schema.sql` against an existing database — it will conflict with your current tables.**

Follow `database/migrations/RUNBOOK.md` instead: it walks through taking a backup, applying the 19 numbered migration files in order (each is safe to re-run), and the final `data-migration.sql` that remaps order statuses and migrates `reviews` into `feedbacks`.

**Do not deploy this new backend to production until the new frontend (Phase 2) is ready.** The current live frontend expects the old API shapes (`/api/products`, old order fields); this backend expects the new schema. Deploying this before Phase 2 ships will break the live checkout. Keep the current backend running until the cutover.

## Required environment variables

See `.env.example`. Notably: `JWT_SECRET` is now **required** at boot (the server will refuse to start without it) — the previous hardcoded fallback secret has been removed as a security fix.

## API surface (Phase 1)

All public endpoints are unauthenticated; all `/api/admin/*` endpoints require `Authorization: Bearer <token>` from `POST /api/admin/login`. Some admin endpoints additionally require the `super_admin` role (admins management, settings, coupons config, custom-pack pricing, activity logs).

| Resource | Public | Admin |
|---|---|---|
| Perfumes | `GET /api/perfumes`, `GET /api/perfumes/:id` | full CRUD + `/active` toggle under `/api/admin/perfumes` |
| Packs | `GET /api/packs`, `GET /api/packs/:id` | CRUD + `/reorder`, `/:id/active`, `/:id/duplicate` under `/api/admin/packs` |
| Custom pack settings | `GET /api/custom-pack-settings` | `PUT /api/admin/custom-pack-settings` (super_admin) |
| Orders | `POST /api/orders`, `GET /api/orders/track` | list/detail/status/notes under `/api/admin/orders`, `GET /api/admin/orders/stats` |
| Coupons | `POST /api/coupons/validate` | CRUD under `/api/admin/coupons` |
| Feedbacks | `GET /api/feedbacks`, `POST /api/feedbacks` | moderation under `/api/admin/feedbacks` |
| Testimonials | `GET /api/testimonials` | CRUD + reorder under `/api/admin/testimonials` |
| FAQ | `GET /api/faq` | CRUD + reorder under `/api/admin/faq` |
| Banners | `GET /api/banners` | CRUD + reorder under `/api/admin/banners` |
| Homepage sections | `GET /api/homepage-sections` | edit + reorder under `/api/admin/homepage-sections` |
| Contact | `POST /api/contact` | list/status under `/api/admin/contact-messages` |
| Wishlist | full CRUD under `/api/wishlist` (device-token based, no login) | — |
| Notifications | — | `/api/admin/notifications` (admin bell, list/mark-read) |
| Settings | `GET /api/settings/public` | `/api/admin/settings` (write is super_admin only) |
| Admin auth | `POST /api/admin/login` | `/api/admin/verify`, `/api/admin/change-password`, admins CRUD (super_admin only) |
| Activity logs | — | `GET /api/admin/activity-logs` (super_admin only) |
| Uploads | — | `/api/upload/image`, `/api/upload/video`, `/api/upload/:public_id` (Cloudinary, unchanged from before) |

### Placing an order

`POST /api/orders` body shape:

```json
{
  "customer": { "name": "...", "phone": "...", "address": "...", "city": "...", "email": "optional", "deviceToken": "optional" },
  "items": [
    { "item_type": "ready_pack", "pack_id": 1, "quantity": 1 },
    { "item_type": "ready_pack_customized", "pack_id": 2, "replacements": [{ "position": 3, "newPerfumeId": 17 }] },
    { "item_type": "custom_pack", "perfume_ids": [4, 9, 12, 20] }
  ],
  "coupon_code": "optional"
}
```

The server re-validates everything (pack existence/active state, exactly-4-perfume rules, coupon eligibility) regardless of what the client sends — the request body is treated as untrusted input, not as pricing truth.

## Security notes

- CORS is now a real allow-list (`ALLOWED_ORIGINS` env var) instead of the previous bug that accepted every origin unconditionally.
- `helmet()` adds baseline security headers.
- All queries are parameterized (no string-concatenated SQL).
- Rate limiting on login, order creation, and other public write endpoints.
- Role-gated admin routes (`super_admin` vs `admin`) via `requireRole`.

## Notifications (implemented)

- **Socket.IO**: `services/socketService.js` attaches to the HTTP server in `server.js`; admin dashboards authenticate on connect with their JWT and join an `admins` room. `notificationService.notifyAdmins()` persists to the DB and emits `new_notification` live.
- **WhatsApp (UltraMsg)**: `services/whatsappService.js` posts to the UltraMsg REST API on every new order, to every number in `ULTRAMSG_ADMIN_NUMBERS`. Logs and no-ops cleanly if `ULTRAMSG_INSTANCE_ID`/`ULTRAMSG_TOKEN` aren't set — never blocks order creation.
- **Email**: `services/emailService.js` (nodemailer) sends an order confirmation to the customer (if they gave an email), an admin notification to `ADMIN_NOTIFICATION_EMAIL`, and a shipping-update email whenever an order moves to `shipping`/`delivered`/`cancelled`. Same no-op-if-unconfigured behavior.

All three are best-effort side effects — a failure in any of them is logged but never fails the order itself (see the `.then()` block in `orderService.createOrder`).
