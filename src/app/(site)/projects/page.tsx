import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { getAllPublishedProjects, getSiteSettings } from "@/lib/data/portfolio";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Projects",
    description: `All published software engineering projects and case studies by ${settings.general.site_name}.`,
  };
}

export default async function ProjectsIndexPage() {
  const projects = await getAllPublishedProjects();

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
        <span className="eyebrow block">Archive</span>
        <h1 className="display mt-3 text-5xl sm:text-6xl md:text-7xl font-normal">
          All Projects
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground font-light leading-relaxed">
          A comprehensive collection of software products, open-source work, and digital experiments.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/80 bg-card/20 p-16 text-center text-muted-foreground">
          <p className="font-display text-2xl text-foreground">Projects Archive</p>
          <p className="mt-2 text-sm">Case studies and technical writing are currently being updated.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-2xl"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                {project.cover_image ? (
                  <Image
                    src={project.cover_image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  />
                ) : (
                  <div className="grid size-full place-items-center bg-gradient-to-br from-card to-muted p-6 text-center text-muted-foreground font-display text-xl">
                    {project.title}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1">
                    {project.tech_stack.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-full px-2 py-0 text-[0.65rem]"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}

                <h2 className="font-display text-2xl font-normal group-hover:text-brand transition-colors">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h2>

                {project.summary && (
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-brand"
                  >
                    View details <ArrowRight className="size-3" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full p-1.5 text-muted-foreground hover:text-foreground"
                        aria-label="View source repository"
                      >
                        <GithubIcon className="size-3.5" />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground hover:border-brand hover:text-brand"
                      >
                        Live <ArrowUpRight className="size-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
