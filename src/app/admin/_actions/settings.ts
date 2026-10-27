"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { settingsSchemas, type ActionResult } from "@/lib/validation";
import type { SettingsKey } from "@/types/database";

export async function saveSetting(key: SettingsKey, value: unknown): Promise<ActionResult> {
  if (!Object.hasOwn(settingsSchemas, key)) {
    return { ok: false, message: "Unknown settings group." };
  }

  const parsed = settingsSchemas[key].safeParse(value);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid settings." };
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value: parsed.data }, { onConflict: "key" });

  if (error) return { ok: false, message: error.message };

  revalidatePath("/", "layout");
  return { ok: true, message: "Settings saved." };
}
