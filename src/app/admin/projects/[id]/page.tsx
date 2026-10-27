import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { DeleteButton } from "@/components/admin/delete-button";
import { ProjectForm } from "@/components/admin/forms/project-form";
import { PageHeader } from "@/components/admin/page-header";
import type { Project } from "@/types/database";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const project = data as Project;

  return (
    <>
      <PageHeader
        title={project.title}
        description="Edit project details."
        backHref="/admin/projects"
        action={<DeleteButton table="projects" id={project.id} label={project.title} redirectTo="/admin/projects" />}
      />
      <ProjectForm project={project} />
    </>
  );
}
