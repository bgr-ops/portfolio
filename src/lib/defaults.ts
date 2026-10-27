import type {
  AboutSettings,
  ContactSettings,
  GeneralSettings,
  HeroSettings,
  SectionConfig,
  SiteSettings,
  SocialSettings,
} from "@/types/database";

/** Fallbacks used when the database is empty or unreachable. */
export const DEFAULT_GENERAL: GeneralSettings = {
  site_name: "Paschal Utule",
  seo_title: "Paschal Utule — Portfolio",
  seo_description: "Projects, writing and experience of Paschal Utule.",
  og_image: null,
};

export const DEFAULT_HERO: HeroSettings = {
  eyebrow: "Hello, I'm",
  headline: "Paschal Utule",
  subheadline: "",
  primary_cta_label: "View my work",
  primary_cta_href: "#projects",
  secondary_cta_label: "Get in touch",
  secondary_cta_href: "#contact",
  image: null,
};

export const DEFAULT_ABOUT: AboutSettings = {
  heading: "About me",
  body: "",
  image: null,
  stats: [],
};

export const DEFAULT_CONTACT: ContactSettings = {
  heading: "Let's build something together",
  message: "",
  email: null,
  phone: null,
  location: null,
  availability: null,
};

export const DEFAULT_SOCIALS: SocialSettings = {};

export const DEFAULT_SECTIONS: SectionConfig[] = [
  { id: "about", label: "About", visible: true },
  { id: "projects", label: "Projects", visible: true },
  { id: "experience", label: "Experience", visible: true },
  { id: "skills", label: "Skills", visible: true },
  { id: "books", label: "Books", visible: true },
  { id: "contact", label: "Contact", visible: true },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  general: DEFAULT_GENERAL,
  hero: DEFAULT_HERO,
  about: DEFAULT_ABOUT,
  contact: DEFAULT_CONTACT,
  socials: DEFAULT_SOCIALS,
  sections: DEFAULT_SECTIONS,
};
