import { requireAdmin } from "@/lib/auth";
import { mergeSettings } from "@/lib/data/settings";
import { PageHeader } from "@/components/admin/page-header";
import { SettingsForm } from "@/components/admin/forms/settings-form";

export default async function AdminSettingsPage() {
  const { supabase } = await requireAdmin();

  const { data: rows } = await supabase.from("site_settings").select("key, value");
  const settings = mergeSettings(rows);

  return (
    <>
      <PageHeader
        title="Site Settings"
        description="Configure your branding, hero section, bio, contact details, social accounts and section visibility."
      />
      <SettingsForm initialSettings={settings} />
    </>
  );
}
