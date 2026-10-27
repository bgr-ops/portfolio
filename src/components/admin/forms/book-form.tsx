"use client";

import { saveBook } from "@/app/admin/_actions/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Book } from "@/types/database";
import { Field, FormSection } from "../field";
import { FormActions } from "../form-actions";
import { ImageUpload } from "../image-upload";
import { SwitchField } from "../switch-field";
import { useFormSubmit } from "../use-form-submit";

export function BookForm({ book }: { book?: Book }) {
  const isNew = !book;
  const { onSubmit, pending, errors } = useFormSubmit(
    (fd) => saveBook(book?.id ?? null, fd),
    { redirectTo: "/admin/books" },
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <FormSection title="Details">
            <Field label="Title" htmlFor="book-title" error={errors.title}>
              <Input id="book-title" name="title" defaultValue={book?.title} required />
            </Field>
            <Field label="Subtitle" htmlFor="book-subtitle" error={errors.subtitle}>
              <Input id="book-subtitle" name="subtitle" defaultValue={book?.subtitle ?? ""} />
            </Field>
            <Field label="Slug" htmlFor="book-slug" hint="Used in the URL: /books/your-slug. Leave blank to auto-generate." error={errors.slug}>
              <Input id="book-slug" name="slug" defaultValue={book?.slug} placeholder="auto-generated" />
            </Field>
            <Field label="Description" htmlFor="book-description" hint="Separate paragraphs with a blank line." error={errors.description}>
              <Textarea id="book-description" name="description" rows={10} defaultValue={book?.description ?? ""} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Purchase / read URL" htmlFor="book-url" error={errors.purchase_url}>
                <Input id="book-url" name="purchase_url" type="url" placeholder="https://" defaultValue={book?.purchase_url ?? ""} />
              </Field>
              <Field label="Publication date" htmlFor="book-date" error={errors.published_on}>
                <Input id="book-date" name="published_on" type="date" defaultValue={book?.published_on ?? ""} />
              </Field>
            </div>
          </FormSection>
        </div>

        <div className="space-y-6">
          <FormSection title="Visibility">
            <SwitchField id="book-published" name="published" label="Published" description="Visible on the public site." defaultChecked={book?.published ?? true} />
            <SwitchField id="book-featured" name="featured" label="Featured" description="Highlighted on the homepage." defaultChecked={book?.featured ?? false} />
            <Field label="Sort order" htmlFor="book-order" hint="Lower numbers appear first.">
              <Input id="book-order" name="sort_order" type="number" defaultValue={book?.sort_order ?? 0} />
            </Field>
          </FormSection>
          <FormSection title="Cover">
            <ImageUpload id="book-cover" name="cover_image" folder="books" aspect="aspect-[2/3]" label="Upload cover" value={book?.cover_image} />
          </FormSection>
        </div>
      </div>

      <FormActions pending={pending} isNew={isNew} />
    </form>
  );
}
