import Link from "next/link";
import { ArrowUp, Globe } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "@/components/icons";
import type { SocialSettings } from "@/types/database";

export function SiteFooter({
  siteName,
  tagline,
  socials,
}: {
  siteName: string;
  tagline?: string;
  socials: SocialSettings;
}) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { key: "github", label: "GitHub", href: socials.github, icon: GithubIcon },
    { key: "linkedin", label: "LinkedIn", href: socials.linkedin, icon: LinkedinIcon },
    { key: "x", label: "X / Twitter", href: socials.x, icon: TwitterIcon },
    { key: "instagram", label: "Instagram", href: socials.instagram, icon: InstagramIcon },
    { key: "youtube", label: "YouTube", href: socials.youtube, icon: YoutubeIcon },
    { key: "website", label: "Website", href: socials.website, icon: Globe },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="relative border-t border-border bg-card/40 py-16 text-muted-foreground">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">
          <div>
            <Link href="/" className="font-display text-2xl font-bold tracking-tight text-foreground">
              {siteName}
            </Link>
            {tagline && <p className="mt-2 max-w-md text-sm">{tagline}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map(({ key, label, href, icon: Icon }) => (
              <a
                key={key}
                href={href!}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-brand/60 hover:text-brand hover:scale-105"
              >
                <Icon className="size-3.5" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs sm:flex-row">
          <p>© {currentYear} {siteName}. All rights reserved.</p>
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              Back to top <ArrowUp className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
