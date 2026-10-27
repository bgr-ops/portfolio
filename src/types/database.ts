// Mirrors supabase/migrations/0001_init.sql

export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  cover_image: string | null;
  tech_stack: string[];
  live_url: string | null;
  repo_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Book = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  cover_image: string | null;
  purchase_url: string | null;
  published_on: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  company_url: string | null;
  location: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  highlights: string[];
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number | null;
  icon: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

// ---------- site_settings values (key → jsonb) ----------

export type GeneralSettings = {
  site_name: string;
  seo_title: string;
  seo_description: string;
  og_image: string | null;
};

export type HeroSettings = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primary_cta_label: string;
  primary_cta_href: string;
  secondary_cta_label: string;
  secondary_cta_href: string;
  image: string | null;
};

export type AboutStat = { label: string; value: string };

export type AboutSettings = {
  heading: string;
  body: string;
  image: string | null;
  stats: AboutStat[];
};

export type ContactSettings = {
  heading: string;
  message: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  availability: string | null;
};

export const SOCIAL_KEYS = [
  "github",
  "linkedin",
  "x",
  "instagram",
  "youtube",
  "website",
] as const;
export type SocialKey = (typeof SOCIAL_KEYS)[number];
export type SocialSettings = Partial<Record<SocialKey, string | null>>;

export const SECTION_IDS = [
  "about",
  "projects",
  "experience",
  "skills",
  "books",
  "contact",
] as const;
export type SectionId = (typeof SECTION_IDS)[number];
export type SectionConfig = { id: SectionId; label: string; visible: boolean };

export type SiteSettings = {
  general: GeneralSettings;
  hero: HeroSettings;
  about: AboutSettings;
  contact: ContactSettings;
  socials: SocialSettings;
  sections: SectionConfig[];
};

export type SettingsKey = keyof SiteSettings;
