-- =============================================================================
-- Paschal Utule Portfolio — Initial schema
-- Paste into Supabase Dashboard → SQL Editor → Run. Safe to run multiple times.
-- =============================================================================

create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. Admin allow-list
-- -----------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- security definer so RLS policies can call it without recursion
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admins can read admin list" on public.admin_users;
create policy "admins can read admin list" on public.admin_users
  for select to authenticated using (user_id = auth.uid() or public.is_admin());

-- -----------------------------------------------------------------------------
-- 2. updated_at helper
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- 3. Tables
-- -----------------------------------------------------------------------------
create table if not exists public.site_settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  summary     text,
  description text,
  cover_image text,
  tech_stack  text[] not null default '{}',
  live_url    text,
  repo_url    text,
  featured    boolean not null default false,
  published   boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.books (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  subtitle     text,
  description  text,
  cover_image  text,
  purchase_url text,
  published_on date,
  featured     boolean not null default false,
  published    boolean not null default false,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.experience (
  id          uuid primary key default gen_random_uuid(),
  role        text not null,
  company     text not null,
  company_url text,
  location    text,
  start_date  date not null,
  end_date    date,
  is_current  boolean not null default false,
  description text,
  highlights  text[] not null default '{}',
  published   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.skills (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  category   text not null default 'General',
  level      smallint check (level is null or (level between 0 and 100)),
  icon       text,
  published  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_published_idx   on public.projects   (published, sort_order);
create index if not exists books_published_idx      on public.books      (published, sort_order);
create index if not exists experience_published_idx on public.experience (published, sort_order);
create index if not exists skills_published_idx     on public.skills     (published, category, sort_order);

-- updated_at triggers
do $$
declare t text;
begin
  foreach t in array array['site_settings','projects','books','experience','skills'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format(
      'create trigger set_updated_at before update on public.%I
         for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- -----------------------------------------------------------------------------
-- 4. Row Level Security
-- -----------------------------------------------------------------------------
alter table public.site_settings enable row level security;
alter table public.projects      enable row level security;
alter table public.books         enable row level security;
alter table public.experience    enable row level security;
alter table public.skills        enable row level security;

-- site_settings: world readable, admin writable
drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings
  for select to anon, authenticated using (true);

drop policy if exists "admin write settings" on public.site_settings;
create policy "admin write settings" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- content tables: public reads published rows, admins read & write everything
do $$
declare t text;
begin
  foreach t in array array['projects','books','experience','skills'] loop
    execute format('drop policy if exists "public read published" on public.%I', t);
    execute format(
      'create policy "public read published" on public.%I
         for select to anon, authenticated using (published = true or public.is_admin())', t);

    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format(
      'create policy "admin write" on public.%I
         for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- -----------------------------------------------------------------------------
-- 5. Storage bucket for images
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880,
        array['image/png','image/jpeg','image/webp','image/gif','image/svg+xml','image/avif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "media public read"  on storage.objects;
create policy "media public read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');

drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());

-- -----------------------------------------------------------------------------
-- 6. Seed default site settings (only inserted if missing)
-- -----------------------------------------------------------------------------
insert into public.site_settings (key, value) values
  ('general', jsonb_build_object(
      'site_name', 'Paschal Utule',
      'seo_title', 'Paschal Utule — Portfolio',
      'seo_description', 'Projects, writing and experience of Paschal Utule.',
      'og_image', null)),
  ('hero', jsonb_build_object(
      'eyebrow', 'Hello, I''m',
      'headline', 'Paschal Utule',
      'subheadline', 'I build thoughtful digital products and write about the ideas behind them.',
      'primary_cta_label', 'View my work',
      'primary_cta_href', '#projects',
      'secondary_cta_label', 'Get in touch',
      'secondary_cta_href', '#contact',
      'image', null)),
  ('about', jsonb_build_object(
      'heading', 'About me',
      'body', 'Paschal Utule is a software engineer, systems designer, and author specializing in building high-performance digital products, scalable web infrastructure, and intuitive user experiences.',
      'image', null,
      'stats', jsonb_build_array(
        jsonb_build_object('label', 'Years experience', 'value', '5+'),
        jsonb_build_object('label', 'Projects shipped', 'value', '20+'),
        jsonb_build_object('label', 'Books written', 'value', '1')))),
  ('contact', jsonb_build_object(
      'heading', 'Let''s build something together',
      'message', 'Have a project in mind or just want to say hi? My inbox is always open.',
      'email', 'hello@example.com',
      'phone', null,
      'location', null,
      'availability', 'Available for new opportunities')),
  ('socials', jsonb_build_object(
      'github', null, 'linkedin', null, 'x', null,
      'instagram', null, 'youtube', null, 'website', null)),
  ('sections', jsonb_build_array(
      jsonb_build_object('id', 'about',      'label', 'About',      'visible', true),
      jsonb_build_object('id', 'projects',   'label', 'Projects',   'visible', true),
      jsonb_build_object('id', 'experience', 'label', 'Experience', 'visible', true),
      jsonb_build_object('id', 'skills',     'label', 'Skills',     'visible', true),
      jsonb_build_object('id', 'books',      'label', 'Books',      'visible', true),
      jsonb_build_object('id', 'contact',    'label', 'Contact',    'visible', true)))
on conflict (key) do nothing;

-- -----------------------------------------------------------------------------
-- 7. Make yourself an admin (run AFTER creating your user in Auth → Users):
--
--   insert into public.admin_users (user_id, email)
--   select id, email from auth.users where email = 'you@example.com'
--   on conflict do nothing;
-- -----------------------------------------------------------------------------
