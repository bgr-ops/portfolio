import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { yearOf } from "@/lib/format";
import type { Book } from "@/types/database";

export function BooksSection({ books }: { books: Book[] }) {
  return (
    <section id="books" className="relative py-28 border-t border-border/60">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Publications</span>
            <h2 className="display mt-3 text-4xl sm:text-5xl md:text-6xl font-normal">
              Books & Writing
            </h2>
          </div>
          <Button asChild variant="ghost" className="group gap-2 text-sm">
            <Link href="/books">
              All books <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {books.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/80 bg-card/20 p-12 text-center text-muted-foreground">
            <p className="font-display text-2xl text-foreground">Publications</p>
            <p className="mt-2 text-sm">
              New books, reading notes, and technical publications are currently in progress.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <article
                key={book.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-2xl"
              >
                {/* Book Cover Container with 3D/shadow effect */}
                <div className="relative mx-auto mb-6 aspect-[2/3] w-full max-w-[200px] overflow-hidden rounded-2xl bg-surface shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  {book.cover_image ? (
                    <Image
                      src={book.cover_image}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  ) : (
                    <div className="grid size-full place-items-center bg-gradient-to-br from-card to-muted p-4 text-center text-muted-foreground">
                      <BookOpen className="size-8" />
                      <span className="font-display text-sm font-medium">{book.title}</span>
                    </div>
                  )}
                  {/* Subtle spine line */}
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 to-transparent" />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    {book.published_on && (
                      <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider">
                        {yearOf(book.published_on)}
                      </span>
                    )}

                    <h3 className="font-display text-2xl font-normal group-hover:text-brand transition-colors mt-1">
                      <Link href={`/books/${book.slug}`}>
                        {book.title}
                      </Link>
                    </h3>

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

                  {/* Actions */}
                  <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                    <Link
                      href={`/books/${book.slug}`}
                      className="text-xs font-medium text-foreground hover:text-brand"
                    >
                      Read synopsis
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
    </section>
  );
}
