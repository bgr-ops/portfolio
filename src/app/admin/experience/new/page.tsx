import { ExperienceForm } from "@/components/admin/forms/experience-form";
import { PageHeader } from "@/components/admin/page-header";

export default function NewExperiencePage() {
  return (
    <>
      <PageHeader title="New role" backHref="/admin/experience" />
      <ExperienceForm />
    </>
  );
}
