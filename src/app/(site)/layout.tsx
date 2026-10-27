import { getSiteSettings } from "@/lib/data/portfolio";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground selection:bg-brand selection:text-brand-foreground">
      <SiteHeader
        siteName={settings.general.site_name}
        sections={settings.sections}
        availability={settings.contact.availability}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter
        siteName={settings.general.site_name}
        tagline={settings.hero.subheadline}
        socials={settings.socials}
      />
    </div>
  );
}
