import { BookForm } from "@/components/admin/forms/book-form";
import { PageHeader } from "@/components/admin/page-header";

export default function NewBookPage() {
  return (
    <>
      <PageHeader title="New book" backHref="/admin/books" />
      <BookForm />
    </>
  );
}
