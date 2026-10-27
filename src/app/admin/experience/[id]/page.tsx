import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { DeleteButton } from "@/components/admin/delete-button";
import { ExperienceForm } from "@/components/admin/forms/experience-form";
import { PageHeader } from "@/components/admin/page-header";
import type { Experience } from "@/types/database";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("experience").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const item = data as Experience;
  const label = `${item.role} · ${item.company}`;

  return (
    <>
      <PageHeader
        title={item.role}
        description={item.company}
        backHref="/admin/experience"
        action={<DeleteButton table="experience" id={item.id} label={label} redirectTo="/admin/experience" />}
      />
      <ExperienceForm item={item} />
    </>
  );
}
