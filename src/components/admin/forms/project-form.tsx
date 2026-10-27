"use client";

import { saveProject } from "@/app/admin/_actions/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "@/types/database";
import { Field, FormSection } from "../field";
import { FormActions } from "../form-actions";
import { ImageUpload } from "../image-upload";
import { SwitchField } from "../switch-field";
import { useFormSubmit } from "../use-form-submit";

export function ProjectForm({ project }: { project?: Project }) {
  const isNew = !project;
  const { onSubmit, pending, errors } = useFormSubmit(
    (fd) => saveProject(project?.id ?? null, fd),
    { redirectTo: "/admin/projects" },
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <FormSection title="Details">
            <Field label="Title" htmlFor="project-title" error={errors.title}>
              <Input id="project-title" name="title" defaultValue={project?.title} required />
            </Field>
            <Field
              label="Slug"
              htmlFor="project-slug"
              hint="Used in the URL: /projects/your-slug. Leave blank to generate from the title."
              error={errors.slug}
            >
              <Input id="project-slug" name="slug" defaultValue={project?.slug} placeholder="auto-generated" />
            </Field>
            <Field label="Summary" htmlFor="project-summary" hint="One or two sentences shown on cards." error={errors.summary}>
              <Textarea id="project-summary" name="summary" rows={2} defaultValue={project?.summary ?? ""} />
            </Field>
            <Field
              label="Full description"
              htmlFor="project-description"
              hint="Shown on the project page. Separate paragraphs with a blank line."
              error={errors.description}
            >
              <Textarea id="project-description" name="description" rows={10} defaultValue={project?.description ?? ""} />
            </Field>
            <Field label="Tech stack" htmlFor="project-tech" hint="Comma separated, e.g. Next.js, Supabase, Tailwind" error={errors.tech_stack}>
              <Input id="project-tech" name="tech_stack" defaultValue={project?.tech_stack.join(", ")} />
            </Field>
          </FormSection>

          <FormSection title="Links">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Live URL" htmlFor="project-live" error={errors.live_url}>
                <Input id="project-live" name="live_url" type="url" placeholder="https://" defaultValue={project?.live_url ?? ""} />
              </Field>
              <Field label="Repository URL" htmlFor="project-repo" error={errors.repo_url}>
                <Input id="project-repo" name="repo_url" type="url" placeholder="https://github.com/…" defaultValue={project?.repo_url ?? ""} />
              </Field>
            </div>
          </FormSection>
        </div>

        <div className="space-y-6">
          <FormSection title="Visibility">
            <SwitchField id="project-published" name="published" label="Published" description="Visible on the public site." defaultChecked={project?.published ?? true} />
            <SwitchField id="project-featured" name="featured" label="Featured" description="Highlighted on the homepage." defaultChecked={project?.featured ?? false} />
            <Field label="Sort order" htmlFor="project-order" hint="Lower numbers appear first.">
              <Input id="project-order" name="sort_order" type="number" defaultValue={project?.sort_order ?? 0} />
            </Field>
          </FormSection>
          <FormSection title="Cover image">
            <ImageUpload id="project-cover" name="cover_image" folder="projects" value={project?.cover_image} />
          </FormSection>
        </div>
      </div>

      <FormActions pending={pending} isNew={isNew} />
    </form>
  );
}
