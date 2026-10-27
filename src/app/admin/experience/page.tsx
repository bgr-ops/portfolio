import { requireAdmin } from "@/lib/auth";
import { ContentTable, EmptyState, NewButton } from "@/components/admin/content-table";
import { PageHeader } from "@/components/admin/page-header";
import { formatDateRange } from "@/lib/format";
import type { Experience } from "@/types/database";

export default async function AdminExperiencePage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order")
    .order("start_date", { ascending: false });
  const items = (data ?? []) as Experience[];

  return (
    <>
      <PageHeader
        title="Experience"
        description="Your career timeline. Shown newest first unless you set a sort order."
        action={<NewButton href="/admin/experience/new" label="New role" />}
      />
      {items.length === 0 ? (
        <EmptyState
          title="No experience yet"
          description="Add your roles to build your career timeline."
          href="/admin/experience/new"
          cta="Add role"
        />
      ) : (
        <ContentTable
          table="experience"
          basePath="/admin/experience"
          rows={items.map((e) => ({
            id: e.id,
            title: `${e.role} · ${e.company}`,
            subtitle: formatDateRange(e.start_date, e.end_date, e.is_current),
            published: e.published,
            sort_order: e.sort_order,
            updated_at: e.updated_at,
          }))}
        />
      )}
    </>
  );
}
