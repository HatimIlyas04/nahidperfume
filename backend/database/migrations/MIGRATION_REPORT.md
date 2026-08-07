# Migration Execution Report — 2026-08-05

## Result: SUCCESS

All 19 migration files + `data-migration.sql` applied cleanly against the production database (`defaultdb` @ Aiven), in order, with zero errors. Re-running the full sequence immediately afterward confirmed idempotency (every file skipped itself via the `schema_migrations` ledger, no errors, no duplicate data).

## Safety steps taken

1. **Backup first**: no `mysqldump` binary was available in this environment, so a DIY Node-based backup (`database/scripts/backup.js`) dumped every existing table's `CREATE TABLE` + all rows as restorable `INSERT` statements to `database/backups/backup_2026-08-05T13-56-55-841Z.sql` (gitignored) before anything else ran.
2. **Migration runner** (`database/scripts/run-migrations.js`): executes each file via a throwaway `mysql2` connection, stops immediately on the first error, verifies the `schema_migrations` ledger row after each file.
3. **Post-migration verification** (`database/scripts/verify.js`): confirmed all 21 new tables exist, all 17 foreign keys are in place, all 56 non-PK indexes are in place, and row counts.

## Data preserved (nothing was lost)

| Table | Before | After |
|---|---|---|
| `products` → `perfumes` | 1 row | 1 row (same row, renamed table) |
| `orders` | 1 row | 1 row, unchanged, now with `order_number = NHD-000001` |
| `order_items` | 1 row | 1 row, `item_type` backfilled to `legacy_product`, `item_name_snapshot`/`unit_price` carried over from the old `product_name`/`price` columns |
| `admins` | 1 row | 1 row, backfilled to `role = 'super_admin'` so existing login still has full access |
| `reviews` | 0 rows | 0 rows copied into new `feedbacks` table (row-count parity check passed trivially since both were 0) |

## One data note (not an error)

The migrated order's single item (`"Golden bloom"`) has `product_id = NULL` in the new `order_items` row. This is the orphan-check in migration `006` working as designed: that order's original `product_id` didn't match any row in the current `perfumes` table (the underlying product was presumably deleted from the catalog at some point after the order was placed, before this migration ran). The order's history is fully intact regardless — `item_name_snapshot` still reads `"Golden bloom"` and the price/quantity are preserved — only the *live link* to a catalog perfume is gone, which is correct: that perfume genuinely doesn't exist anymore.

## One step deliberately left manual

The old `reviews` table (0 rows) still exists alongside the new `feedbacks` table. Per `RUNBOOK.md`, dropping it is an intentional manual-only step — I did not automate `DROP TABLE reviews` even though the row-count check passed, to keep a human decision point on removing a table outright. Since it's verified empty and its replacement is confirmed live, this is safe to run whenever you're ready:
```sql
DROP TABLE reviews;
```

## Verification: all requested endpoints return valid JSON

Tested against the live migrated database (note a couple of path corrections vs. the requested list — the actual routes, matching what's documented in `backend/README.md`):

| Requested | Actual route | Result |
|---|---|---|
| `GET /api/packs` | same | `{"success":true,"data":[]}` — correct, no packs created yet |
| `GET /api/perfumes` | same | Returns the real migrated "Velvet Rose" perfume with all fields intact |
| `GET /api/settings` | `GET /api/settings/public` | Returns the 9 seeded settings |
| `GET /api/faq` | same | `{"success":true,"data":[]}` — correct, no FAQ entries yet |
| `GET /api/homepage` | `GET /api/homepage-sections` | Returns the 9 seeded homepage sections |
| `GET /api/orders` | `POST /api/orders` is the public guest-checkout endpoint; listing is admin-only: `GET /api/admin/orders` | Returns the real migrated order (`NHD-000001`) with full item detail |

No SQL errors, no missing tables, no broken routes.

## Byproduct of testing

A test admin account (`qa-test-admin`, role `super_admin`) was created via `database/seeds/seedAdmin.js` to verify authenticated endpoints. Delete it once you've set up your real admin accounts, or keep it — your call.
