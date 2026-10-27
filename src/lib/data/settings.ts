import {
  DEFAULT_SETTINGS,
} from "@/lib/defaults";
import {
  SECTION_IDS,
  type SectionConfig,
  type SiteSettings,
} from "@/types/database";

type Row = { key: string; value: unknown };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Normalises section config: keeps known ids, appends any missing ones. */
function normaliseSections(value: unknown): SectionConfig[] {
  const list = Array.isArray(value) ? value : [];
  const seen = new Set<string>();
  const result: SectionConfig[] = [];

  for (const item of list) {
    if (!isObject(item)) continue;
    const id = item.id as SectionConfig["id"];
    if (!SECTION_IDS.includes(id) || seen.has(id)) continue;
    seen.add(id);
    const fallback = DEFAULT_SETTINGS.sections.find((s) => s.id === id)!;
    result.push({
      id,
      label: typeof item.label === "string" && item.label ? item.label : fallback.label,
      visible: item.visible !== false,
    });
  }
  for (const s of DEFAULT_SETTINGS.sections) {
    if (!seen.has(s.id)) result.push({ ...s });
  }
  return result;
}

/** Merges DB rows over defaults so consumers always get a complete object. */
export function mergeSettings(rows: Row[] | null | undefined): SiteSettings {
  const map = new Map((rows ?? []).map((r) => [r.key, r.value]));
  const obj = <T extends object>(key: keyof SiteSettings, fallback: T): T => {
    const v = map.get(key);
    return isObject(v) ? ({ ...fallback, ...v } as T) : fallback;
  };

  const about = obj("about", DEFAULT_SETTINGS.about);
  return {
    general: obj("general", DEFAULT_SETTINGS.general),
    hero: obj("hero", DEFAULT_SETTINGS.hero),
    about: { ...about, stats: Array.isArray(about.stats) ? about.stats : [] },
    contact: obj("contact", DEFAULT_SETTINGS.contact),
    socials: obj("socials", DEFAULT_SETTINGS.socials),
    sections: normaliseSections(map.get("sections")),
  };
}
