import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/database";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative py-28 border-t border-border/60">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Portfolio</span>
            <h2 className="display mt-3 text-4xl sm:text-5xl md:text-6xl font-normal">
              Featured Projects
            </h2>
          </div>
          <Button asChild variant="ghost" className="group gap-2 text-sm">
            <Link href="/projects">
              View all projects <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/80 bg-card/20 p-12 text-center text-muted-foreground">
            <p className="font-display text-2xl text-foreground">Featured Projects</p>
            <p className="mt-2 text-sm">
              Selected case studies and engineering projects are currently being documented.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/5"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                  {project.cover_image ? (
                    <Image
                      src={project.cover_image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 550px"
                    />
                  ) : (
                    <div className="grid size-full place-items-center bg-gradient-to-br from-card to-muted p-8 text-center text-muted-foreground">
                      <span className="font-display text-2xl">{project.title}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-7">
                  {/* Tech stack tags */}
                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.tech_stack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="rounded-full px-2.5 py-0.5 text-[0.7rem] font-normal"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <h3 className="font-display text-2xl sm:text-3xl font-normal group-hover:text-brand transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  {project.summary && (
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  )}

                  {/* Links footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-5">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-brand"
                    >
                      Case study <ArrowRight className="size-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.repo_url && (
                        <a
                          href={project.repo_url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          aria-label="View source repository"
                        >
                          <GithubIcon className="size-4" />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground transition-all hover:border-brand hover:text-brand"
                          aria-label="Visit live website"
                        >
                          Live preview <ArrowUpRight className="size-3" />
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
    </section>
  );
}
