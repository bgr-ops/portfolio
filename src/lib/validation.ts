import { z } from "zod";
import { SECTION_IDS, SOCIAL_KEYS, type SettingsKey } from "@/types/database";

export type ActionResult =
  | { ok: true; message: string; id?: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[] | undefined> };

// ---------- primitives ----------

const requiredText = (label: string) =>
  z.string({ error: `${label} is required.` }).trim().min(1, `${label} is required.`);

/** "" / missing → null */
const optionalText = z
  .string()
  .optional()
  .nullable()
  .transform((v) => (v && v.trim() ? v.trim() : null));

const LINK_RE = /^(https?:\/\/|mailto:|tel:|\/|#)/i;

const optionalLink = optionalText.refine((v) => v === null || LINK_RE.test(v), {
  message: "Must start with https://, mailto:, / or #",
});

const bool = z.preprocess((v) => v === true || v === "true" || v === "on", z.boolean());

const sortOrder = z.coerce.number().int().catch(0);

/** "a, b, c" → ["a","b","c"] */
const commaList = z
  .string()
  .optional()
  .transform((v) => (v ?? "").split(",").map((s) => s.trim()).filter(Boolean));

/** one item per line → string[] */
const lineList = z
  .string()
  .optional()
  .transform((v) => (v ?? "").split(/\r?\n/).map((s) => s.replace(/^[-•*]\s*/, "").trim()).filter(Boolean));

const optionalDate = optionalText.refine((v) => v === null || /^\d{4}-\d{2}-\d{2}$/.test(v), {
  message: "Use the date picker (YYYY-MM-DD).",
});

// ---------- content tables ----------

export const projectSchema = z.object({
  title: requiredText("Title"),
  slug: z.string().optional().default(""),
  summary: optionalText,
  description: optionalText,
  cover_image: optionalText,
  tech_stack: commaList,
  live_url: optionalLink,
  repo_url: optionalLink,
  featured: bool,
  published: bool,
  sort_order: sortOrder,
});

export const bookSchema = z.object({
  title: requiredText("Title"),
  slug: z.string().optional().default(""),
  subtitle: optionalText,
  description: optionalText,
  cover_image: optionalText,
  purchase_url: optionalLink,
  published_on: optionalDate,
  featured: bool,
  published: bool,
  sort_order: sortOrder,
});

export const experienceSchema = z
  .object({
    role: requiredText("Role"),
    company: requiredText("Company"),
    company_url: optionalLink,
    location: optionalText,
    start_date: requiredText("Start date").regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date."),
    end_date: optionalDate,
    is_current: bool,
    description: optionalText,
    highlights: lineList,
    published: bool,
    sort_order: sortOrder,
  })
  .transform((v) => ({ ...v, end_date: v.is_current ? null : v.end_date }))
  .refine((v) => !v.end_date || v.end_date >= v.start_date, {
    message: "End date must be after the start date.",
    path: ["end_date"],
  });

export const skillSchema = z.object({
  name: requiredText("Name"),
  category: z.string().trim().min(1).catch("General"),
  level: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? null : Number(v)),
    z.number().int().min(0, "Min 0").max(100, "Max 100").nullable(),
  ),
  icon: optionalText,
  published: bool,
  sort_order: sortOrder,
});

export function formDataToObject(formData: FormData) {
  const obj: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === "string") obj[key] = value;
  });
  return obj;
}

// ---------- site settings ----------

const str = z.string().trim().catch("");
const nullableStr = z
  .string()
  .nullable()
  .optional()
  .transform((v) => (v && v.trim() ? v.trim() : null));

export const settingsSchemas = {
  general: z.object({
    site_name: requiredText("Site name"),
    seo_title: str,
    seo_description: str,
    og_image: nullableStr,
  }),
  hero: z.object({
    eyebrow: str,
    headline: requiredText("Headline"),
    subheadline: str,
    primary_cta_label: str,
    primary_cta_href: str,
    secondary_cta_label: str,
    secondary_cta_href: str,
    image: nullableStr,
  }),
  about: z.object({
    heading: str,
    body: str,
    image: nullableStr,
    stats: z
      .array(z.object({ label: z.string().trim(), value: z.string().trim() }))
      .transform((s) => s.filter((x) => x.label || x.value))
      .catch([]),
  }),
  contact: z.object({
    heading: str,
    message: str,
    email: nullableStr.refine((v) => v === null || z.email().safeParse(v).success, {
      message: "Enter a valid email.",
    }),
    phone: nullableStr,
    location: nullableStr,
    availability: nullableStr,
  }),
  socials: z.object(
    Object.fromEntries(SOCIAL_KEYS.map((k) => [k, nullableStr])) as Record<
      (typeof SOCIAL_KEYS)[number],
      typeof nullableStr
    >,
  ),
  sections: z
    .array(
      z.object({
        id: z.enum(SECTION_IDS),
        label: z.string().trim().min(1, "Section label is required."),
        visible: z.boolean(),
      }),
    )
    .min(1),
} satisfies Record<SettingsKey, z.ZodType>;
