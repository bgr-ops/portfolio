import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, paragraphs } from "@/lib/format";
import { getBookBySlug } from "@/lib/data/portfolio";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return { title: "Book Not Found" };

  return {
    title: book.title,
    description: book.subtitle || book.description || book.title,
    openGraph: {
      title: book.title,
      description: book.subtitle || book.description || book.title,
      images: book.cover_image ? [{ url: book.cover_image }] : undefined,
    },
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  const descriptionParagraphs = paragraphs(book.description);

  return (
    <article className="container-page py-28">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to library
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
        {/* Left Book Cover Column */}
        <div>
          <div className="sticky top-28 space-y-6">
            <div className="relative mx-auto aspect-[2/3] w-full max-w-[280px] overflow-hidden rounded-2xl bg-surface shadow-2xl">
              {book.cover_image ? (
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="300px"
                />
              ) : (
                <div className="grid size-full place-items-center bg-gradient-to-br from-card to-muted p-6 text-center text-muted-foreground">
                  <BookOpen className="size-12" />
                  <span className="font-display text-xl font-medium">{book.title}</span>
                </div>
              )}
              <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 to-transparent" />
            </div>

            {book.purchase_url && (
              <div className="pt-2 text-center">
                <Button asChild size="lg" className="h-12 w-full rounded-full gap-2 shadow-xl shadow-brand/10">
                  <a href={book.purchase_url} target="_blank" rel="noreferrer">
                    Get your copy <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Content Column */}
        <div className="space-y-6">
          {book.published_on && (
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Published on {formatDate(book.published_on)}
            </span>
          )}

          <h1 className="display text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
            {book.title}
          </h1>

          {book.subtitle && (
            <p className="font-serif italic text-xl sm:text-2xl text-muted-foreground">
              {book.subtitle}
            </p>
          )}

          <div className="border-t border-border/60 pt-6">
            <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Synopsis & Overview
            </h2>

            {descriptionParagraphs.length > 0 ? (
              <div className="prose-body space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
                {descriptionParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">
                Full description and reading notes will be available soon.
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
