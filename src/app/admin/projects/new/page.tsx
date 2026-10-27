import { ProjectForm } from "@/components/admin/forms/project-form";
import { PageHeader } from "@/components/admin/page-header";

export default function NewProjectPage() {
  return (
    <>
      <PageHeader title="New project" backHref="/admin/projects" />
      <ProjectForm />
    </>
  );
}
