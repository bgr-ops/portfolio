import { requireAdmin } from "@/lib/auth";
import { ContentTable, EmptyState, NewButton } from "@/components/admin/content-table";
import { PageHeader } from "@/components/admin/page-header";
import type { Project } from "@/types/database";

export default async function AdminProjectsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order")
    .order("created_at", { ascending: false });
  const projects = (data ?? []) as Project[];

  return (
    <>
      <PageHeader
        title="Projects"
        description="Showcase your work. Featured projects appear on the homepage."
        action={<NewButton href="/admin/projects/new" label="New project" />}
      />
      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Add your first project to start building your portfolio."
          href="/admin/projects/new"
          cta="Add project"
        />
      ) : (
        <ContentTable
          table="projects"
          basePath="/admin/projects"
          showImage
          showFeatured
          rows={projects.map((p) => ({
            id: p.id,
            title: p.title,
            subtitle: p.summary,
            image: p.cover_image,
            published: p.published,
            featured: p.featured,
            sort_order: p.sort_order,
            updated_at: p.updated_at,
          }))}
        />
      )}
    </>
  );
}
