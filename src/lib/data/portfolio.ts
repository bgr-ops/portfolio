import "server-only";

import { DEFAULT_SETTINGS } from "@/lib/defaults";
import { mergeSettings } from "@/lib/data/settings";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/server";
import type { Book, Experience, Project, Skill, SiteSettings } from "@/types/database";

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return DEFAULT_SETTINGS;
  try {
    const supabase = createPublicClient();
    const { data } = await supabase.from("site_settings").select("key, value");
    return mergeSettings(data);
  } catch (err) {
    console.error("Failed to load site settings:", err);
    return DEFAULT_SETTINGS;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("sort_order")
      .order("created_at", { ascending: false });
    return (data ?? []) as Project[];
  } catch (err) {
    console.error("Failed to load featured projects:", err);
    return [];
  }
}

export async function getAllPublishedProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order")
      .order("created_at", { ascending: false });
    return (data ?? []) as Project[];
  } catch (err) {
    console.error("Failed to load projects:", err);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    return (data as Project) || null;
  } catch (err) {
    console.error(`Failed to load project with slug ${slug}:`, err);
    return null;
  }
}

export async function getFeaturedBooks(): Promise<Book[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("books")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("sort_order")
      .order("published_on", { ascending: false, nullsFirst: false });
    return (data ?? []) as Book[];
  } catch (err) {
    console.error("Failed to load featured books:", err);
    return [];
  }
}

export async function getAllPublishedBooks(): Promise<Book[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("books")
      .select("*")
      .eq("published", true)
      .order("sort_order")
      .order("published_on", { ascending: false, nullsFirst: false });
    return (data ?? []) as Book[];
  } catch (err) {
    console.error("Failed to load books:", err);
    return [];
  }
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("books")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    return (data as Book) || null;
  } catch (err) {
    console.error(`Failed to load book with slug ${slug}:`, err);
    return null;
  }
}

export async function getPublishedExperience(): Promise<Experience[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("experience")
      .select("*")
      .eq("published", true)
      .order("sort_order")
      .order("start_date", { ascending: false });
    return (data ?? []) as Experience[];
  } catch (err) {
    console.error("Failed to load experience:", err);
    return [];
  }
}

export async function getPublishedSkills(): Promise<{ category: string; skills: Skill[] }[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("skills")
      .select("*")
      .eq("published", true)
      .order("category")
      .order("sort_order")
      .order("name");
    
    const rows = (data ?? []) as Skill[];
    const map = new Map<string, Skill[]>();

    for (const item of rows) {
      const cat = item.category || "General";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }

    return Array.from(map.entries()).map(([category, skills]) => ({
      category,
      skills,
    }));
  } catch (err) {
    console.error("Failed to load skills:", err);
    return [];
  }
}
