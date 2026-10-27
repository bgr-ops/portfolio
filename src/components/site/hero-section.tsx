import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroSettings } from "@/types/database";

export function HeroSection({
  hero,
  availability,
}: {
  hero: HeroSettings;
  availability?: string | null;
}) {
  return (
    <section id="top" className="relative min-h-[85dvh] flex items-center pt-32 pb-20 overflow-hidden">
      {/* Ambient background glow & grid lines */}
      <div className="glow pointer-events-none absolute inset-0 -top-36 opacity-50" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />

      <div className="container-page relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* Left: Typographic introduction */}
          <div className="space-y-7 max-w-2xl">
            {/* Status / Eyebrow */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">{hero.eyebrow || "Hello, I'm"}</span>
              {availability && (
                <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3.5 py-1 text-xs text-muted-foreground backdrop-blur-md">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{availability}</span>
                </span>
              )}
            </div>

            {/* Headline */}
            <h1 className="display text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[5.8rem] text-gradient font-normal leading-[0.95]">
              {hero.headline}
            </h1>

            {/* Subheadline */}
            {hero.subheadline && (
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-light">
                {hero.subheadline}
              </p>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {hero.primary_cta_label && (
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-full px-7 text-sm font-medium shadow-xl shadow-brand/10 transition-all hover:scale-105"
                >
                  <Link href={hero.primary_cta_href || "#projects"}>
                    {hero.primary_cta_label}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}

              {hero.secondary_cta_label && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full px-7 text-sm font-medium hover:bg-muted/80"
                >
                  <Link href={hero.secondary_cta_href || "#contact"}>
                    {hero.secondary_cta_label}
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Right: Compact, Refined Minimalist Portrait Card */}
          <div className="relative mx-auto lg:mx-0">
            <div className="relative aspect-[3/4] w-52 sm:w-60 lg:w-64 overflow-hidden rounded-2xl border border-border/70 bg-card/50 shadow-xl backdrop-blur-sm transition-all duration-500 hover:border-brand/40">
              {hero.image ? (
                /* When photo is added: neatly framed, focused portrait */
                <Image
                  src={hero.image}
                  alt={hero.headline}
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  sizes="260px"
                />
              ) : (
                /* Minimal placeholder: subtle, small, not overwhelming */
                <div className="flex size-full flex-col items-center justify-center p-6 text-center text-muted-foreground/50">
                  <div className="grid size-16 place-items-center rounded-full border border-border/70 bg-background/40">
                    <User className="size-8 stroke-[1.25]" />
                  </div>
                  <span className="mt-3 text-xs font-mono uppercase tracking-widest text-muted-foreground/60">
                    Portrait
                  </span>
                </div>
              )}

              {/* Subtle glass rim overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>

            {/* Minimalist focus tag under photo */}
            <div className="mt-3 text-center">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/50">
                Software & Craft
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
