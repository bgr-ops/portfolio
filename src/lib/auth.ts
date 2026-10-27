import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Returns the current admin (verified user + allow-list membership) or null.
 * Cached per request so layouts/pages/actions can call it freely.
 */
export const getAdmin = cache(async () => {
  if (!isSupabaseConfigured) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) return null;
  return { user, supabase };
});

/** Guard for admin layouts, pages and server actions. */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/login?error=unauthorized");
  return admin;
}
