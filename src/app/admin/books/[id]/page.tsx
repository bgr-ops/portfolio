import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { DeleteButton } from "@/components/admin/delete-button";
import { BookForm } from "@/components/admin/forms/book-form";
import { PageHeader } from "@/components/admin/page-header";
import type { Book } from "@/types/database";

export default async function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("books").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const book = data as Book;

  return (
    <>
      <PageHeader
        title={book.title}
        description="Edit book details."
        backHref="/admin/books"
        action={<DeleteButton table="books" id={book.id} label={book.title} redirectTo="/admin/books" />}
      />
      <BookForm book={book} />
    </>
  );
}
