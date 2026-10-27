# Phase 4 — Admin Dashboard (Full Content Management)

## Prompt

> Build a clean, fast admin dashboard at `/admin` where the owner can edit
> LITERALLY EVERYTHING on the public site without touching code.
>
> Layout: sidebar navigation (Overview, Site Settings, Projects, Books, Experience,
> Skills), top bar with theme toggle, "View site" link and sign-out. Responsive
> (sidebar collapses to a sheet/drawer on mobile).
>
> Pages:
> - **Overview** — counts per content type, quick links.
> - **Site Settings** — tabs for General (site name, SEO title/description),
>   Hero (eyebrow, headline, sub-headline, CTA labels/links, portrait image),
>   About (heading, rich body text, image, highlight stats), Contact (email, phone,
>   location, availability message), Socials (GitHub, LinkedIn, X, Instagram, etc.),
>   Sections (toggle visibility + reorder homepage sections).
> - **Projects / Books** — list table with status badges, create/edit form,
>   delete with confirmation, publish toggle, featured toggle, sort order,
>   **image upload** to Supabase Storage (`media` bucket) with preview.
> - **Experience** — CRUD with dates, "current role" switch, highlights list.
> - **Skills** — CRUD with category, optional level, sort order.
>
> Implementation:
> - Server Components for data loading, Server Actions for mutations, `zod`
>   validation, `revalidatePath('/', 'layout')` after every write so the public
>   site updates instantly.
> - Reusable `ImageUpload` component (client upload to Storage → public URL).
> - Toast feedback (sonner) for success/error.

## Acceptance criteria
- Every field shown on the public site is editable from the dashboard.
- Image uploads work and appear on the public site.
- Changes are visible on the public site immediately after saving.
