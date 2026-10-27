"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import type { SectionConfig } from "@/types/database";
import { cn } from "@/lib/utils";

export function SiteHeader({
  siteName,
  sections,
  availability,
}: {
  siteName: string;
  sections: SectionConfig[];
  availability?: string | null;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleSections = sections.filter((s) => s.visible);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 py-3.5 backdrop-blur-xl shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <div className="container-page flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform hover:scale-105"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-brand font-display text-lg font-bold text-brand-foreground shadow-md shadow-brand/20 transition-all group-hover:rotate-6">
            {siteName.charAt(0)}
          </span>
          <span className="font-display text-xl tracking-tight text-foreground sm:text-2xl">
            {siteName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {visibleSections.map((sec) => (
            <Link
              key={sec.id}
              href={`/#${sec.id}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground link-underline"
            >
              {sec.label}
            </Link>
          ))}
          <Link
            href="/projects"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground link-underline"
          >
            All Projects
          </Link>
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden items-center gap-3 md:flex">
          {availability && (
            <span className="hidden items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-3 py-1 text-xs text-muted-foreground lg:inline-flex">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              {availability}
            </span>
          )}
          <Button asChild size="sm" variant="outline" className="gap-1.5 rounded-full px-4 text-xs font-medium">
            <Link href="/#contact">
              Get in touch <ArrowUpRight className="size-3" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[65px] border-b border-border bg-background/95 px-6 py-8 backdrop-blur-2xl md:hidden animate-fade-up">
          <nav className="flex flex-col gap-4">
            {visibleSections.map((sec) => (
              <Link
                key={sec.id}
                href={`/#${sec.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground hover:text-brand"
              >
                {sec.label}
              </Link>
            ))}
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-foreground hover:text-brand"
            >
              All Projects
            </Link>
            <div className="pt-4 border-t border-border">
              <Button asChild className="w-full justify-center">
                <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
                  Get in touch
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
