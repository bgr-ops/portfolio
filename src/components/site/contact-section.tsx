import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContactSettings, SocialSettings } from "@/types/database";

export function ContactSection({
  contact,
  socials,
}: {
  contact: ContactSettings;
  socials: SocialSettings;
}) {
  return (
    <section id="contact" className="relative py-28 border-t border-border/60 overflow-hidden">
      <div className="glow pointer-events-none absolute inset-x-0 bottom-0 h-96 opacity-60" />

      <div className="container-page relative z-10">
        <div className="max-w-3xl">
          <span className="eyebrow">Connect</span>
          <h2 className="display mt-3 text-4xl sm:text-5xl md:text-6xl font-normal">
            {contact.heading || "Let's build something remarkable."}
          </h2>

          {contact.message && (
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
              {contact.message}
            </p>
          )}

          {/* Quick Info Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-start gap-4 rounded-2xl border border-border/80 bg-card/60 p-6 transition-all hover:border-brand hover:bg-card"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand group-hover:scale-110 transition-transform">
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</p>
                  <p className="mt-1 text-base font-medium text-foreground group-hover:text-brand transition-colors">
                    {contact.email}
                  </p>
                </div>
              </a>
            )}

            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="group flex items-start gap-4 rounded-2xl border border-border/80 bg-card/60 p-6 transition-all hover:border-brand hover:bg-card"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand group-hover:scale-110 transition-transform">
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Phone</p>
                  <p className="mt-1 text-base font-medium text-foreground group-hover:text-brand transition-colors">
                    {contact.phone}
                  </p>
                </div>
              </a>
            )}

            {contact.location && (
              <div className="flex items-start gap-4 rounded-2xl border border-border/80 bg-card/60 p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-muted text-muted-foreground">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Location</p>
                  <p className="mt-1 text-base font-medium text-foreground">{contact.location}</p>
                </div>
              </div>
            )}

            {contact.availability && (
              <div className="flex items-start gap-4 rounded-2xl border border-border/80 bg-card/60 p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </span>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Status</p>
                  <p className="mt-1 text-base font-medium text-foreground">{contact.availability}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {contact.email && (
              <Button asChild size="lg" className="h-12 rounded-full px-8 text-sm font-medium shadow-xl shadow-brand/10 hover:scale-105">
                <a href={`mailto:${contact.email}`}>
                  Say hello <ArrowUpRight className="size-4" />
                </a>
              </Button>
            )}

            {Object.entries(socials)
              .filter(([, url]) => Boolean(url))
              .map(([network, url]) => (
                <a
                  key={network}
                  href={url!}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border/80 bg-card/60 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-muted-foreground transition-all hover:border-brand hover:text-foreground"
                >
                  {network}
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
