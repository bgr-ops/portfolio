# Phase 3 — Secure Admin Authentication

## Prompt

> Implement admin-only authentication with Supabase Auth and `@supabase/ssr`.
>
> - Supabase clients: `lib/supabase/client.ts` (browser), `lib/supabase/server.ts`
>   (server components / actions using async `cookies()`), `lib/supabase/middleware.ts`
>   (session refresh).
> - `src/middleware.ts` refreshes the session on every request and redirects
>   unauthenticated visitors from `/admin/**` to `/login?next=…`.
> - `/login` page: email + password form (no public sign-up), posts to a server
>   action, shows friendly errors, redirects to `/admin` on success.
> - Defence in depth: the admin layout calls `requireAdmin()` which verifies the user
>   with `supabase.auth.getUser()` **and** checks `admin_users` membership. Non-admins
>   are signed out and redirected.
> - Every admin server action calls `requireAdmin()` before mutating data
>   (RLS is the final line of defence).
> - Sign-out action in the dashboard header.

## Acceptance criteria
- Visiting `/admin` logged out → redirected to `/login`.
- Valid credentials for a user NOT in `admin_users` → rejected.
- Valid admin credentials → dashboard loads; sign-out works.
