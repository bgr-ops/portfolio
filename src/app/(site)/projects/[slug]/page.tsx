import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { paragraphs } from "@/lib/format";
import { getProjectBySlug } from "@/lib/data/portfolio";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.summary || project.title,
    openGraph: {
      title: project.title,
      description: project.summary || project.title,
      images: project.cover_image ? [{ url: project.cover_image }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const descriptionParagraphs = paragraphs(project.description);

  return (
    <article className="container-page py-28">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to all projects
        </Link>
      </div>

      {/* Header Info */}
      <div className="max-w-3xl space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.tech_stack.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {tech}
            </Badge>
          ))}
          {project.featured && (
            <Badge className="rounded-full bg-brand text-brand-foreground px-3 py-1 text-xs">
              Featured Case Study
            </Badge>
          )}
        </div>

        <h1 className="display text-5xl sm:text-6xl md:text-7xl font-normal leading-tight">
          {project.title}
        </h1>

        {project.summary && (
          <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed">
            {project.summary}
          </p>
        )}

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.live_url && (
            <Button asChild size="lg" className="h-12 rounded-full px-7 gap-2 shadow-xl shadow-brand/10">
              <a href={project.live_url} target="_blank" rel="noreferrer">
                Visit live product <ArrowUpRight className="size-4" />
              </a>
            </Button>
          )}
          {project.repo_url && (
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-7 gap-2">
              <a href={project.repo_url} target="_blank" rel="noreferrer">
                <GithubIcon className="size-4" /> Source code
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Hero Cover Image */}
      {project.cover_image && (
        <div className="my-14 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-2xl">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1100px"
            />
          </div>
        </div>
      )}

      {/* Main Narrative / Case Study */}
      <div className="mx-auto max-w-3xl pt-8">
        {descriptionParagraphs.length > 0 ? (
          <div className="prose-body space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
            {descriptionParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground italic">
            Additional case study details will be updated shortly.
          </p>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl border border-border/80 bg-card/60 p-8 sm:p-12 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">Have a similar project in mind?</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Let&apos;s discuss architecture, scope, and technical design for your next initiative.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full px-8">
            <Link href="/#contact">Start a conversation</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
