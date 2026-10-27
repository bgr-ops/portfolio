# Phase 2 — Supabase Schema, Security & Storage

## Prompt

> Write a single idempotent SQL migration (`supabase/migrations/0001_init.sql`) that
> can be pasted into the Supabase SQL Editor. It must create:
>
> 1. **`admin_users`** — allow-list of auth users who may write content
>    (`user_id uuid PK → auth.users`, `email`, `created_at`).
> 2. **`is_admin()`** — `security definer` SQL function returning true when
>    `auth.uid()` is in `admin_users`.
> 3. **`site_settings`** — flexible key/value store (`key text PK`, `value jsonb`,
>    `updated_at`). Seed keys: `general`, `hero`, `about`, `contact`, `socials`,
>    `sections` (visibility + order of homepage sections). New sections can be added
>    later as new keys without schema changes.
> 4. **`projects`** — title, slug (unique), summary, description, cover_image,
>    tech_stack text[], live_url, repo_url, featured, published, sort_order, timestamps.
> 5. **`books`** — title, slug (unique), subtitle, description, cover_image,
>    purchase_url, published_on date, featured, published, sort_order, timestamps.
> 6. **`experience`** — role, company, company_url, location, start_date, end_date,
>    is_current, description, highlights text[], published, sort_order, timestamps.
> 7. **`skills`** — name, category, level (0–100, optional), icon, published,
>    sort_order, timestamps.
>
> Security:
> - Enable RLS on every table.
> - Public (`anon`) may only `SELECT` rows where `published = true`
>   (site_settings fully readable).
> - Only `is_admin()` may `INSERT / UPDATE / DELETE`, and admins can read drafts.
> - `updated_at` trigger on all content tables.
>
> Storage:
> - Public bucket `media` (5 MB limit, images only).
> - Public read; only admins can upload/update/delete.
>
> Also provide TypeScript types mirroring the schema in `src/types/database.ts`.

## Acceptance criteria
- Running the migration twice does not error.
- Anonymous requests cannot write or read unpublished rows.
- An admin user (after being inserted into `admin_users`) can do full CRUD.
