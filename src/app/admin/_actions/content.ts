"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/format";
import {
  bookSchema,
  experienceSchema,
  formDataToObject,
  projectSchema,
  skillSchema,
  type ActionResult,
} from "@/lib/validation";

const CONTENT_TABLES = ["projects", "books", "experience", "skills"] as const;
type ContentTable = (typeof CONTENT_TABLES)[number];

function assertTable(table: string): asserts table is ContentTable {
  if (!CONTENT_TABLES.includes(table as ContentTable)) {
    throw new Error(`Unknown table: ${table}`);
  }
}

function validationFailure(error: z.ZodError): ActionResult {
  return {
    ok: false,
    message: error.issues[0]?.message ?? "Please fix the highlighted fields.",
    fieldErrors: z.flattenError(error).fieldErrors as Record<string, string[]>,
  };
}

function revalidateSite() {
  revalidatePath("/", "layout");
}

async function persist(
  table: ContentTable,
  id: string | null,
  values: Record<string, unknown>,
): Promise<ActionResult> {
  const { supabase } = await requireAdmin();

  const query = id
    ? supabase.from(table).update(values).eq("id", id).select("id").single()
    : supabase.from(table).insert(values).select("id").single();

  const { data, error } = await query;

  if (error) {
    if (error.code === "23505") {
      return { ok: false, message: "That slug is already in use.", fieldErrors: { slug: ["Slug must be unique."] } };
    }
    return { ok: false, message: error.message };
  }

  revalidateSite();
  return { ok: true, message: id ? "Changes saved." : "Created successfully.", id: data?.id };
}

// ---------- entity actions ----------

export async function saveProject(id: string | null, formData: FormData): Promise<ActionResult> {
  const parsed = projectSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) return validationFailure(parsed.error);
  const values = { ...parsed.data, slug: slugify(parsed.data.slug || parsed.data.title) };
  return persist("projects", id, values);
}

export async function saveBook(id: string | null, formData: FormData): Promise<ActionResult> {
  const parsed = bookSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) return validationFailure(parsed.error);
  const values = { ...parsed.data, slug: slugify(parsed.data.slug || parsed.data.title) };
  return persist("books", id, values);
}

export async function saveExperience(id: string | null, formData: FormData): Promise<ActionResult> {
  const parsed = experienceSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) return validationFailure(parsed.error);
  return persist("experience", id, parsed.data);
}

export async function saveSkill(id: string | null, formData: FormData): Promise<ActionResult> {
  const parsed = skillSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) return validationFailure(parsed.error);
  return persist("skills", id, parsed.data);
}

// ---------- generic row actions ----------

export async function deleteRow(table: string, id: string): Promise<ActionResult> {
  assertTable(table);
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidateSite();
  return { ok: true, message: "Deleted." };
}

export async function setRowFlag(
  table: string,
  id: string,
  flag: "published" | "featured",
  value: boolean,
): Promise<ActionResult> {
  assertTable(table);
  if (flag !== "published" && flag !== "featured") throw new Error("Invalid flag");
  if (flag === "featured" && (table === "experience" || table === "skills")) {
    throw new Error("Table has no featured flag");
  }
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from(table).update({ [flag]: value }).eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidateSite();
  return {
    ok: true,
    message:
      flag === "published"
        ? value ? "Published." : "Moved to drafts."
        : value ? "Marked as featured." : "Removed from featured.",
  };
}
