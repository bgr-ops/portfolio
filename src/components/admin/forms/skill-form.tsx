"use client";

import { saveSkill } from "@/app/admin/_actions/content";
import { Input } from "@/components/ui/input";
import type { Skill } from "@/types/database";
import { Field, FormSection } from "../field";
import { FormActions } from "../form-actions";
import { SwitchField } from "../switch-field";
import { useFormSubmit } from "../use-form-submit";

export function SkillForm({ skill, categories }: { skill?: Skill; categories: string[] }) {
  const isNew = !skill;
  const { onSubmit, pending, errors } = useFormSubmit(
    (fd) => saveSkill(skill?.id ?? null, fd),
    { redirectTo: "/admin/skills" },
  );

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
      <FormSection title="Skill">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="skill-name" error={errors.name}>
            <Input id="skill-name" name="name" defaultValue={skill?.name} placeholder="TypeScript" required />
          </Field>
          <Field label="Category" htmlFor="skill-category" hint="Skills are grouped by category." error={errors.category}>
            <Input
              id="skill-category"
              name="category"
              list="skill-categories"
              defaultValue={skill?.category ?? "General"}
              placeholder="Frontend"
            />
            <datalist id="skill-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
          <Field label="Proficiency (0–100)" htmlFor="skill-level" hint="Optional. Leave blank to hide." error={errors.level}>
            <Input id="skill-level" name="level" type="number" min={0} max={100} defaultValue={skill?.level ?? ""} />
          </Field>
          <Field label="Icon / emoji" htmlFor="skill-icon" hint="Optional, e.g. ⚛️" error={errors.icon}>
            <Input id="skill-icon" name="icon" defaultValue={skill?.icon ?? ""} />
          </Field>
        </div>
      </FormSection>
      <FormSection title="Visibility">
        <SwitchField id="skill-published" name="published" label="Published" defaultChecked={skill?.published ?? true} />
        <Field label="Sort order" htmlFor="skill-order" hint="Lower numbers appear first within a category.">
          <Input id="skill-order" name="sort_order" type="number" defaultValue={skill?.sort_order ?? 0} />
        </Field>
      </FormSection>
      <FormActions pending={pending} isNew={isNew} />
    </form>
  );
}
