import { requireAdmin } from "@/lib/auth";
import { ContentTable, EmptyState, NewButton } from "@/components/admin/content-table";
import { PageHeader } from "@/components/admin/page-header";
import type { Book } from "@/types/database";

export default async function AdminBooksPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("books")
    .select("*")
    .order("sort_order")
    .order("published_on", { ascending: false, nullsFirst: false });
  const books = (data ?? []) as Book[];

  return (
    <>
      <PageHeader
        title="Books"
        description="Books you've written or contributed to."
        action={<NewButton href="/admin/books/new" label="New book" />}
      />
      {books.length === 0 ? (
        <EmptyState
          title="No books yet"
          description="Add a book with its cover, description and a link to buy or read it."
          href="/admin/books/new"
          cta="Add book"
        />
      ) : (
        <ContentTable
          table="books"
          basePath="/admin/books"
          showImage
          showFeatured
          rows={books.map((b) => ({
            id: b.id,
            title: b.title,
            subtitle: b.subtitle,
            image: b.cover_image,
            published: b.published,
            featured: b.featured,
            sort_order: b.sort_order,
            updated_at: b.updated_at,
          }))}
        />
      )}
    </>
  );
}
