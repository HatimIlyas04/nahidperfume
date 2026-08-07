# Migration Runbook — Packs-Only Transformation (Phase 1)

**Read this fully before running anything. These migrations restructure your live production tables.**

## Before you start

1. **Take a full backup.** For example:
   ```
   mysqldump -h <host> -u <user> -p <database> > backup_before_packs_migration.sql
   ```
2. Ideally, restore that backup into a separate staging database and run this entire runbook there first. Only run against production once staging looks correct.
3. Confirm you're on MySQL 5.7+ / 8.x (stored procedures + `SIGNAL` are used; both are supported since MySQL 5.5+, so any modern MySQL/MariaDB works).

## Running the migrations

Every file is **safe to re-run** — each one checks the `schema_migrations` ledger table and skips itself if already applied. If a run fails partway through, fix the underlying issue and just re-run the same file.

Run in exact numeric order, via the `mysql` CLI or any SQL client (phpMyAdmin, TablePlus, MySQL Workbench, etc.):

```
mysql -h <host> -u <user> -p <database> < 000_create_schema_migrations_table.sql
mysql -h <host> -u <user> -p <database> < 001_rename_products_to_perfumes.sql
mysql -h <host> -u <user> -p <database> < 002_admins_roles.sql
mysql -h <host> -u <user> -p <database> < 003_customers.sql
mysql -h <host> -u <user> -p <database> < 004_packs_and_pack_perfumes.sql
mysql -h <host> -u <user> -p <database> < 005_custom_pack_settings.sql
mysql -h <host> -u <user> -p <database> < 006_orders_orderitems_restructure.sql
mysql -h <host> -u <user> -p <database> < 007_feedbacks.sql
mysql -h <host> -u <user> -p <database> < 008_testimonials.sql
mysql -h <host> -u <user> -p <database> < 009_wishlist.sql
mysql -h <host> -u <user> -p <database> < 010_notifications.sql
mysql -h <host> -u <user> -p <database> < 011_settings.sql
mysql -h <host> -u <user> -p <database> < 012_banners.sql
mysql -h <host> -u <user> -p <database> < 013_homepage_sections.sql
mysql -h <host> -u <user> -p <database> < 014_faq.sql
mysql -h <host> -u <user> -p <database> < 015_contact_messages.sql
mysql -h <host> -u <user> -p <database> < 016_coupon_codes.sql
mysql -h <host> -u <user> -p <database> < 017_activity_logs.sql
mysql -h <host> -u <user> -p <database> < 018_indexes_cleanup.sql
mysql -h <host> -u <user> -p <database> < data-migration.sql
```

**File 006 is the highest-risk one** — it's the only file that alters tables holding real order data. Read it before running it. Nothing in it deletes rows; it only adds columns, backfills sane defaults, and adds foreign keys (after nulling out any orphaned references so the constraint can't fail).

## After running

1. Sanity-check row counts:
   ```sql
   SELECT COUNT(*) FROM perfumes;   -- should equal old `products` count
   SELECT COUNT(*) FROM orders;     -- unchanged
   SELECT COUNT(*) FROM order_items;-- unchanged
   SELECT COUNT(*) FROM feedbacks;  -- should equal old `reviews` count
   ```
2. Spot check a few `feedbacks` rows against the original `reviews` table.
3. Only then, manually run the final line at the bottom of `data-migration.sql`:
   ```sql
   DROP TABLE reviews;
   ```
   This is intentionally **not automated** — you decide when you're confident enough to drop the old table.

## What NOT to do yet

Do not deploy the new backend (from this same Phase 1 delivery) to production until you're ready — the new backend expects the new schema and the **current live frontend still expects the old API shapes** (`/api/products`, old `order_items` columns, etc.). Deploying the new backend before the new (Phase 2) frontend exists will break the live site's checkout and product pages. Keep the current backend running against the current schema until Phase 2 ships, or take the site into maintenance mode for the cutover window.
