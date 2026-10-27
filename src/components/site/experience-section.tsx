import { ExternalLink, MapPin } from "lucide-react";
import { formatDateRange, paragraphs } from "@/lib/format";
import type { Experience } from "@/types/database";

export function ExperienceSection({ items }: { items: Experience[] }) {
  return (
    <section id="experience" className="relative py-28 border-t border-border/60">
      <div className="container-page">
        <div className="mb-14">
          <span className="eyebrow">Career</span>
          <h2 className="display mt-3 text-4xl sm:text-5xl md:text-6xl font-normal">
            Experience & History
          </h2>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/80 bg-card/20 p-12 text-center text-muted-foreground">
            <p className="font-display text-2xl text-foreground">Career Timeline</p>
            <p className="mt-2 text-sm">
              Professional history and past roles are currently being updated.
            </p>
          </div>
        ) : (
          <div className="relative border-l border-border/80 ml-3 sm:ml-6 space-y-12">
            {items.map((exp) => (
              <div key={exp.id} className="relative pl-6 sm:pl-10">
                {/* Timeline node */}
                <div className="absolute -left-[5px] top-2 size-2.5 rounded-full border-2 border-background bg-brand shadow-sm shadow-brand/40" />

                <div className="rounded-3xl border border-border/70 bg-card/60 p-6 sm:p-8 transition-all hover:border-brand/40 hover:bg-card">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground">
                        {exp.role}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        {exp.company_url ? (
                          <a
                            href={exp.company_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-foreground hover:text-brand"
                          >
                            {exp.company} <ExternalLink className="size-3" />
                          </a>
                        ) : (
                          <span className="font-medium text-foreground">{exp.company}</span>
                        )}

                        {exp.location && (
                          <span className="inline-flex items-center gap-1 text-xs">
                            · <MapPin className="size-3" /> {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="inline-block rounded-full border border-border/80 bg-muted/60 px-3 py-1 font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                    </span>
                  </div>

                  {exp.description && (
                    <div className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
                      {paragraphs(exp.description).map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="mt-5 space-y-2 border-t border-border/50 pt-4">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
