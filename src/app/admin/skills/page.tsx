import { requireAdmin } from "@/lib/auth";
import { ContentTable, EmptyState, NewButton } from "@/components/admin/content-table";
import { PageHeader } from "@/components/admin/page-header";
import type { Skill } from "@/types/database";

export default async function AdminSkillsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("skills")
    .select("*")
    .order("category")
    .order("sort_order")
    .order("name");
  const skills = (data ?? []) as Skill[];

  return (
    <>
      <PageHeader
        title="Skills"
        description="Grouped by category on the public site."
        action={<NewButton href="/admin/skills/new" label="New skill" />}
      />
      {skills.length === 0 ? (
        <EmptyState
          title="No skills yet"
          description="Add the tools, languages and disciplines you work with."
          href="/admin/skills/new"
          cta="Add skill"
        />
      ) : (
        <ContentTable
          table="skills"
          basePath="/admin/skills"
          rows={skills.map((s) => ({
            id: s.id,
            title: `${s.icon ? `${s.icon} ` : ""}${s.name}`,
            subtitle: s.level !== null ? `${s.category} · ${s.level}%` : s.category,
            published: s.published,
            sort_order: s.sort_order,
            updated_at: s.updated_at,
          }))}
        />
      )}
    </>
  );
}
