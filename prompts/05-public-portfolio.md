# Phase 5 — Public Portfolio (100% Database-Driven)

## Prompt

> Build the public portfolio. Every piece of text, link and image must come from
> Supabase — no hard-coded content (only graceful empty-state fallbacks).
>
> Design direction (inspired by honour.pxxl.pro): deep blacks, one elegant accent
> colour, generous whitespace, large editorial typography, subtle motion, light and
> dark mode.
>
> Routes:
> - `/` — Hero, About, Featured Projects, Experience timeline, Skills, Books,
>   Contact. Section order & visibility controlled by `site_settings.sections`.
> - `/projects` and `/projects/[slug]` — all published projects + detail page.
> - `/books` and `/books/[slug]` — all published books + detail page.
>
> Implementation:
> - Data layer in `src/lib/data/*` using a cookie-less anon Supabase client so pages
>   can be statically cached; revalidated on demand by admin writes
>   (plus `revalidate = 3600` safety net).
> - `generateMetadata` from DB (SEO title/description, Open Graph).
> - `next/image` with Supabase Storage remote pattern.
> - Sticky glass header with section links + theme toggle; footer with socials.

## Acceptance criteria
- With an empty database the site renders tasteful empty states (no crashes).
- Editing content in the dashboard updates the site on next request.
- Lighthouse: good performance/accessibility; fully responsive.
