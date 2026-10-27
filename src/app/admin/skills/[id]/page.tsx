import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { DeleteButton } from "@/components/admin/delete-button";
import { SkillForm } from "@/components/admin/forms/skill-form";
import { PageHeader } from "@/components/admin/page-header";
import type { Skill } from "@/types/database";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const [{ data }, { data: cats }] = await Promise.all([
    supabase.from("skills").select("*").eq("id", id).maybeSingle(),
    supabase.from("skills").select("category"),
  ]);
  if (!data) notFound();
  const skill = data as Skill;
  const categories = [...new Set((cats ?? []).map((r) => r.category as string))].sort();

  return (
    <>
      <PageHeader
        title={skill.name}
        description={skill.category}
        backHref="/admin/skills"
        action={<DeleteButton table="skills" id={skill.id} label={skill.name} redirectTo="/admin/skills" />}
      />
      <SkillForm skill={skill} categories={categories} />
    </>
  );
}
