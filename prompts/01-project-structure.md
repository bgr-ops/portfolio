# Phase 1 — Project Structure & Foundation

## Prompt

> Scaffold a production-ready Next.js 15 (App Router) + TypeScript project for
> **Paschal Utule's** portfolio. Use Tailwind CSS (v4) + shadcn/ui for styling and
> components, and prepare it for Supabase (Auth + Database + Storage) and Vercel.
>
> Requirements:
> - `src/` directory, `@/*` import alias, ESLint, Turbopack dev server.
> - Install `@supabase/supabase-js`, `@supabase/ssr`, `next-themes`, `lucide-react`,
>   `zod`, `sonner` (toasts).
> - Initialise shadcn/ui and add: button, input, textarea, label, card, switch,
>   badge, separator, dialog, alert-dialog, dropdown-menu, select, tabs, sonner,
>   skeleton, table.
> - Create a design system in `globals.css`: deep near-black dark theme, warm off-white
>   light theme, a single elegant accent colour (amber/gold), generous whitespace,
>   modern type (Geist Sans + an editorial serif for display headings).
> - Light/Dark mode via `next-themes` (class strategy) with a theme toggle.
> - Folder layout:
>   ```
>   src/app/(site)        public portfolio routes
>   src/app/admin         admin dashboard (protected)
>   src/app/login         admin login
>   src/components/site   public UI sections
>   src/components/admin  dashboard UI
>   src/components/ui     shadcn primitives
>   src/lib/supabase      browser/server/middleware clients
>   src/lib/data          typed data-access functions
>   src/types             shared TypeScript types
>   supabase/migrations   SQL schema
>   ```
> - Add `.env.example` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
>   `NEXT_PUBLIC_SITE_URL`.

## Acceptance criteria
- `npm run dev` starts without errors.
- `npm run build` succeeds.
- Theme toggle switches light/dark and persists.
