import Image from "next/image";
import { paragraphs } from "@/lib/format";
import type { AboutSettings } from "@/types/database";

export function AboutSection({ about }: { about: AboutSettings }) {
  const storyParagraphs = paragraphs(about.body);
  const hasImage = Boolean(about.image);

  return (
    <section id="about" className="relative py-28 border-t border-border/60">
      <div className="container-page">
        <div className="mb-14">
          <span className="eyebrow">Biography</span>
          <h2 className="display mt-3 text-4xl sm:text-5xl md:text-6xl font-normal">
            {about.heading || "About Me"}
          </h2>
        </div>

        {hasImage ? (
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="space-y-8">
              <div className="prose-body space-y-5 text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                {storyParagraphs.length > 0 ? (
                  storyParagraphs.map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  <p>
                    Paschal Utule is a software engineer, systems designer, and author specializing in building high-performance digital products, scalable web infrastructure, and intuitive user experiences.
                  </p>
                )}
              </div>

              {about.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 pt-6 border-t border-border/60">
                  {about.stats.map((stat, i) => (
                    <div key={i} className="rounded-2xl border border-border/70 bg-card/60 p-5">
                      <p className="font-display text-4xl sm:text-5xl font-light text-foreground text-gradient">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-2xl">
              <Image
                src={about.image!}
                alt={about.heading}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
        ) : (
          /* Clean Minimalist Editorial About Layout */
          <div className="max-w-3xl space-y-10">
            <div className="prose-body space-y-6 text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
              {storyParagraphs.length > 0 ? (
                storyParagraphs.map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>
                  Paschal Utule is a software engineer, systems designer, and author specializing in building high-performance digital products, scalable web infrastructure, and intuitive user experiences.
                </p>
              )}
            </div>

            {about.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 pt-8 border-t border-border/60">
                {about.stats.map((stat, i) => (
                  <div key={i} className="rounded-2xl border border-border/70 bg-card/60 p-6">
                    <p className="font-display text-4xl sm:text-5xl font-light text-foreground text-gradient">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
