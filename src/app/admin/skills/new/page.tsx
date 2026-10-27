import { requireAdmin } from "@/lib/auth";
import { SkillForm } from "@/components/admin/forms/skill-form";
import { PageHeader } from "@/components/admin/page-header";

export default async function NewSkillPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("skills").select("category");
  const categories = [...new Set((data ?? []).map((r) => r.category as string))].sort();

  return (
    <>
      <PageHeader title="New skill" backHref="/admin/skills" />
      <SkillForm categories={categories} />
    </>
  );
}
