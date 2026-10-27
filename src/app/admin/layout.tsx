import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Admin pages depend on the session cookie — never cache them.
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, supabase } = await requireAdmin();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "general").maybeSingle();
  const siteName = (data?.value as { site_name?: string } | null)?.site_name || "Portfolio";

  return (
    <AdminShell email={user.email ?? ""} siteName={siteName}>
      {children}
    </AdminShell>
  );
}
