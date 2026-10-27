import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { getAllPublishedBooks, getSiteSettings } from "@/lib/data/portfolio";
import { yearOf } from "@/lib/format";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Books",
    description: `Publications, technical guides, and books authored by ${settings.general.site_name}.`,
  };
}

export default async function BooksIndexPage() {
  const books = await getAllPublishedBooks();

  return (
    <div className="container-page py-28">
      {/* Header */}
      <div className="mb-14">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Back to Home
        </Link>
        <span className="eyebrow block">Library</span>
        <h1 className="display mt-3 text-5xl sm:text-6xl md:text-7xl font-normal">
          Published Books
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground font-light leading-relaxed">
          In-depth exploration of software craft, systems thinking, and technical writing.
        </p>
      </div>

      {books.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/80 bg-card/20 p-16 text-center text-muted-foreground">
          <p className="font-display text-2xl text-foreground">Publications Archive</p>
          <p className="mt-2 text-sm">Publications and technical guides are currently being prepared.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article
              key={book.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-2xl"
            >
              <div className="relative mx-auto mb-6 aspect-[2/3] w-full max-w-[210px] overflow-hidden rounded-2xl bg-surface shadow-2xl transition-transform duration-500 group-hover:scale-105">
                {book.cover_image ? (
                  <Image
                    src={book.cover_image}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="230px"
                  />
                ) : (
                  <div className="grid size-full place-items-center bg-gradient-to-br from-card to-muted p-4 text-center text-muted-foreground">
                    <BookOpen className="size-8" />
                    <span className="font-display text-sm font-medium">{book.title}</span>
                  </div>
                )}
                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  {book.published_on && (
                    <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider">
                      {yearOf(book.published_on)}
                    </span>
                  )}

                  <h2 className="font-display text-2xl font-normal group-hover:text-brand transition-colors mt-1">
                    <Link href={`/books/${book.slug}`}>
                      {book.title}
                    </Link>
                  </h2>

                  {book.subtitle && (
                    <p className="mt-1 text-xs text-muted-foreground font-serif italic">
                      {book.subtitle}
                    </p>
                  )}

                  {book.description && (
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed font-light">
                      {book.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                  <Link
                    href={`/books/${book.slug}`}
                    className="text-xs font-medium text-foreground hover:text-brand"
                  >
                    View synopsis
                  </Link>

                  {book.purchase_url && (
                    <a
                      href={book.purchase_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1 text-xs font-medium text-foreground transition-all hover:border-brand hover:text-brand"
                    >
                      Get copy <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
