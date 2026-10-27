"use client";

import { useState } from "react";
import { saveExperience } from "@/app/admin/_actions/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Experience } from "@/types/database";
import { Field, FormSection } from "../field";
import { FormActions } from "../form-actions";
import { SwitchField } from "../switch-field";
import { useFormSubmit } from "../use-form-submit";

export function ExperienceForm({ item }: { item?: Experience }) {
  const isNew = !item;
  const [isCurrent, setIsCurrent] = useState(item?.is_current ?? false);
  const { onSubmit, pending, errors } = useFormSubmit(
    (fd) => saveExperience(item?.id ?? null, fd),
    { redirectTo: "/admin/experience" },
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <FormSection title="Role">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Role / title" htmlFor="exp-role" error={errors.role}>
                <Input id="exp-role" name="role" defaultValue={item?.role} required />
              </Field>
              <Field label="Company" htmlFor="exp-company" error={errors.company}>
                <Input id="exp-company" name="company" defaultValue={item?.company} required />
              </Field>
              <Field label="Company URL" htmlFor="exp-url" error={errors.company_url}>
                <Input id="exp-url" name="company_url" type="url" placeholder="https://" defaultValue={item?.company_url ?? ""} />
              </Field>
              <Field label="Location" htmlFor="exp-location" error={errors.location}>
                <Input id="exp-location" name="location" placeholder="Remote · Lagos, NG" defaultValue={item?.location ?? ""} />
              </Field>
            </div>
            <Field label="Description" htmlFor="exp-description" error={errors.description}>
              <Textarea id="exp-description" name="description" rows={4} defaultValue={item?.description ?? ""} />
            </Field>
            <Field label="Highlights" htmlFor="exp-highlights" hint="One achievement per line." error={errors.highlights}>
              <Textarea id="exp-highlights" name="highlights" rows={5} defaultValue={item?.highlights.join("\n")} />
            </Field>
          </FormSection>
        </div>

        <div className="space-y-6">
          <FormSection title="Dates">
            <Field label="Start date" htmlFor="exp-start" error={errors.start_date}>
              <Input id="exp-start" name="start_date" type="date" defaultValue={item?.start_date ?? ""} required />
            </Field>
            <SwitchField id="exp-current" name="is_current" label="I currently work here" defaultChecked={isCurrent} onChange={setIsCurrent} />
            {!isCurrent && (
              <Field label="End date" htmlFor="exp-end" error={errors.end_date}>
                <Input id="exp-end" name="end_date" type="date" defaultValue={item?.end_date ?? ""} />
              </Field>
            )}
          </FormSection>
          <FormSection title="Visibility">
            <SwitchField id="exp-published" name="published" label="Published" defaultChecked={item?.published ?? true} />
            <Field label="Sort order" htmlFor="exp-order" hint="Lower numbers appear first.">
              <Input id="exp-order" name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} />
            </Field>
          </FormSection>
        </div>
      </div>

      <FormActions pending={pending} isNew={isNew} />
    </form>
  );
}
