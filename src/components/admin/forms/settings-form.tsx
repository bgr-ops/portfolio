"use client";

import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { saveSetting } from "@/app/admin/_actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type {
  AboutSettings,
  ContactSettings,
  GeneralSettings,
  HeroSettings,
  SectionConfig,
  SiteSettings,
  SocialSettings,
} from "@/types/database";
import { Field, FormSection } from "../field";
import { ImageUpload } from "../image-upload";

export function SettingsForm({ initialSettings }: { initialSettings: SiteSettings }) {
  const [general, setGeneral] = useState<GeneralSettings>(initialSettings.general);
  const [hero, setHero] = useState<HeroSettings>(initialSettings.hero);
  const [about, setAbout] = useState<AboutSettings>(initialSettings.about);
  const [contact, setContact] = useState<ContactSettings>(initialSettings.contact);
  const [socials, setSocials] = useState<SocialSettings>(initialSettings.socials);
  const [sections, setSections] = useState<SectionConfig[]>(initialSettings.sections);

  const [pendingGeneral, startGeneral] = useTransition();
  const [pendingHero, startHero] = useTransition();
  const [pendingAbout, startAbout] = useTransition();
  const [pendingContact, startContact] = useTransition();
  const [pendingSocials, startSocials] = useTransition();
  const [pendingSections, startSections] = useTransition();

  // Save helpers
  async function handleSaveGeneral(e: React.FormEvent) {
    e.preventDefault();
    startGeneral(async () => {
      const res = await saveSetting("general", general);
      if (res.ok) toast.success(res.message);
      else toast.error(res.message);
    });
  }

  async function handleSaveHero(e: React.FormEvent) {
    e.preventDefault();
    startHero(async () => {
      const res = await saveSetting("hero", hero);
      if (res.ok) toast.success(res.message);
      else toast.error(res.message);
    });
  }

  async function handleSaveAbout(e: React.FormEvent) {
    e.preventDefault();
    startAbout(async () => {
      const res = await saveSetting("about", about);
      if (res.ok) toast.success(res.message);
      else toast.error(res.message);
    });
  }

  async function handleSaveContact(e: React.FormEvent) {
    e.preventDefault();
    startContact(async () => {
      const res = await saveSetting("contact", contact);
      if (res.ok) toast.success(res.message);
      else toast.error(res.message);
    });
  }

  async function handleSaveSocials(e: React.FormEvent) {
    e.preventDefault();
    startSocials(async () => {
      const res = await saveSetting("socials", socials);
      if (res.ok) toast.success(res.message);
      else toast.error(res.message);
    });
  }

  async function handleSaveSections(e: React.FormEvent) {
    e.preventDefault();
    startSections(async () => {
      const res = await saveSetting("sections", sections);
      if (res.ok) toast.success(res.message);
      else toast.error(res.message);
    });
  }

  // Section reordering helpers
  function moveSection(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const updated = [...sections];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setSections(updated);
  }

  function toggleSectionVisibility(index: number) {
    const updated = [...sections];
    updated[index] = { ...updated[index], visible: !updated[index].visible };
    setSections(updated);
  }

  function updateSectionLabel(index: number, label: string) {
    const updated = [...sections];
    updated[index] = { ...updated[index], label };
    setSections(updated);
  }

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="mb-6 flex h-auto flex-wrap gap-1 bg-muted/60 p-1">
        <TabsTrigger value="general" className="px-4 py-2 text-sm">General & SEO</TabsTrigger>
        <TabsTrigger value="hero" className="px-4 py-2 text-sm">Hero Section</TabsTrigger>
        <TabsTrigger value="about" className="px-4 py-2 text-sm">About Section</TabsTrigger>
        <TabsTrigger value="contact" className="px-4 py-2 text-sm">Contact Info</TabsTrigger>
        <TabsTrigger value="socials" className="px-4 py-2 text-sm">Social Profiles</TabsTrigger>
        <TabsTrigger value="sections" className="px-4 py-2 text-sm">Section Ordering</TabsTrigger>
      </TabsList>

      {/* 1. GENERAL */}
      <TabsContent value="general">
        <form onSubmit={handleSaveGeneral} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <FormSection title="Site & SEO Defaults">
              <Field label="Site Name" htmlFor="site-name">
                <Input
                  id="site-name"
                  value={general.site_name}
                  onChange={(e) => setGeneral({ ...general, site_name: e.target.value })}
                  required
                />
              </Field>
              <Field label="SEO Title Tag" htmlFor="seo-title" hint="Default title format: Title · Paschal Utule">
                <Input
                  id="seo-title"
                  value={general.seo_title}
                  onChange={(e) => setGeneral({ ...general, seo_title: e.target.value })}
                />
              </Field>
              <Field label="SEO Meta Description" htmlFor="seo-desc">
                <Textarea
                  id="seo-desc"
                  rows={3}
                  value={general.seo_description}
                  onChange={(e) => setGeneral({ ...general, seo_description: e.target.value })}
                />
              </Field>
            </FormSection>

            <FormSection title="Social Share (OG Image)">
              <ImageUpload
                id="og-image"
                folder="og"
                value={general.og_image}
                onChange={(url) => setGeneral({ ...general, og_image: url })}
                label="Upload OG Image"
              />
            </FormSection>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={pendingGeneral} className="gap-2">
              {pendingGeneral ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save General Settings
            </Button>
          </div>
        </form>
      </TabsContent>

      {/* 2. HERO */}
      <TabsContent value="hero">
        <form onSubmit={handleSaveHero} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <FormSection title="Hero Content">
              <Field label="Eyebrow Prefix" htmlFor="hero-eyebrow" hint="Small tagline above main headline.">
                <Input
                  id="hero-eyebrow"
                  value={hero.eyebrow}
                  onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
                />
              </Field>
              <Field label="Main Headline" htmlFor="hero-headline">
                <Input
                  id="hero-headline"
                  value={hero.headline}
                  onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                  required
                />
              </Field>
              <Field label="Subheadline / Bio Summary" htmlFor="hero-subheadline">
                <Textarea
                  id="hero-subheadline"
                  rows={3}
                  value={hero.subheadline}
                  onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Primary CTA Label" htmlFor="hero-cta-1-label">
                  <Input
                    id="hero-cta-1-label"
                    value={hero.primary_cta_label}
                    onChange={(e) => setHero({ ...hero, primary_cta_label: e.target.value })}
                  />
                </Field>
                <Field label="Primary CTA Link" htmlFor="hero-cta-1-href">
                  <Input
                    id="hero-cta-1-href"
                    value={hero.primary_cta_href}
                    onChange={(e) => setHero({ ...hero, primary_cta_href: e.target.value })}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Secondary CTA Label" htmlFor="hero-cta-2-label">
                  <Input
                    id="hero-cta-2-label"
                    value={hero.secondary_cta_label}
                    onChange={(e) => setHero({ ...hero, secondary_cta_label: e.target.value })}
                  />
                </Field>
                <Field label="Secondary CTA Link" htmlFor="hero-cta-2-href">
                  <Input
                    id="hero-cta-2-href"
                    value={hero.secondary_cta_href}
                    onChange={(e) => setHero({ ...hero, secondary_cta_href: e.target.value })}
                  />
                </Field>
              </div>
            </FormSection>

            <FormSection title="Hero Portrait / Image">
              <ImageUpload
                id="hero-image"
                folder="hero"
                aspect="aspect-square"
                value={hero.image}
                onChange={(url) => setHero({ ...hero, image: url })}
                label="Upload Portrait"
              />
            </FormSection>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={pendingHero} className="gap-2">
              {pendingHero ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save Hero Section
            </Button>
          </div>
        </form>
      </TabsContent>

      {/* 3. ABOUT */}
      <TabsContent value="about">
        <form onSubmit={handleSaveAbout} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <FormSection title="About Story">
              <Field label="Section Heading" htmlFor="about-heading">
                <Input
                  id="about-heading"
                  value={about.heading}
                  onChange={(e) => setAbout({ ...about, heading: e.target.value })}
                />
              </Field>
              <Field label="Narrative / Story" htmlFor="about-body" hint="Paragraphs are separated by double linebreaks.">
                <Textarea
                  id="about-body"
                  rows={8}
                  value={about.body}
                  onChange={(e) => setAbout({ ...about, body: e.target.value })}
                />
              </Field>

              <div className="pt-2">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium">Highlight Statistics / Counters</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => setAbout({ ...about, stats: [...about.stats, { label: "", value: "" }] })}
                  >
                    <Plus className="size-3.5" /> Add Stat
                  </Button>
                </div>

                <div className="space-y-3">
                  {about.stats.map((st, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        placeholder="Value (e.g. 5+)"
                        value={st.value}
                        onChange={(e) => {
                          const updated = [...about.stats];
                          updated[i] = { ...updated[i], value: e.target.value };
                          setAbout({ ...about, stats: updated });
                        }}
                        className="w-1/3"
                      />
                      <Input
                        placeholder="Label (e.g. Years experience)"
                        value={st.label}
                        onChange={(e) => {
                          const updated = [...about.stats];
                          updated[i] = { ...updated[i], label: e.target.value };
                          setAbout({ ...about, stats: updated });
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => {
                          const updated = about.stats.filter((_, idx) => idx !== i);
                          setAbout({ ...about, stats: updated });
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </FormSection>

            <FormSection title="About Portrait / Secondary Photo">
              <ImageUpload
                id="about-image"
                folder="about"
                aspect="aspect-square"
                value={about.image}
                onChange={(url) => setAbout({ ...about, image: url })}
                label="Upload Photo"
              />
            </FormSection>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={pendingAbout} className="gap-2">
              {pendingAbout ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save About Section
            </Button>
          </div>
        </form>
      </TabsContent>

      {/* 4. CONTACT */}
      <TabsContent value="contact">
        <form onSubmit={handleSaveContact} className="max-w-3xl space-y-6">
          <FormSection title="Contact Information & Message">
            <Field label="Section Heading" htmlFor="contact-heading">
              <Input
                id="contact-heading"
                value={contact.heading}
                onChange={(e) => setContact({ ...contact, heading: e.target.value })}
              />
            </Field>
            <Field label="Introduction Message" htmlFor="contact-msg">
              <Textarea
                id="contact-msg"
                rows={3}
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email Address" htmlFor="contact-email">
                <Input
                  id="contact-email"
                  type="email"
                  value={contact.email ?? ""}
                  onChange={(e) => setContact({ ...contact, email: e.target.value || null })}
                />
              </Field>
              <Field label="Phone / WhatsApp" htmlFor="contact-phone">
                <Input
                  id="contact-phone"
                  value={contact.phone ?? ""}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value || null })}
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Location" htmlFor="contact-location">
                <Input
                  id="contact-location"
                  placeholder="Lagos, Nigeria · GMT+1"
                  value={contact.location ?? ""}
                  onChange={(e) => setContact({ ...contact, location: e.target.value || null })}
                />
              </Field>
              <Field label="Current Availability" htmlFor="contact-avail">
                <Input
                  id="contact-avail"
                  placeholder="Available for contract & full-time roles"
                  value={contact.availability ?? ""}
                  onChange={(e) => setContact({ ...contact, availability: e.target.value || null })}
                />
              </Field>
            </div>
          </FormSection>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={pendingContact} className="gap-2">
              {pendingContact ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save Contact Info
            </Button>
          </div>
        </form>
      </TabsContent>

      {/* 5. SOCIALS */}
      <TabsContent value="socials">
        <form onSubmit={handleSaveSocials} className="max-w-3xl space-y-6">
          <FormSection title="Social Media & Portfolio Links" description="Leave blank to hide that platform from the website.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="GitHub URL" htmlFor="social-github">
                <Input
                  id="social-github"
                  placeholder="https://github.com/..."
                  value={socials.github ?? ""}
                  onChange={(e) => setSocials({ ...socials, github: e.target.value || null })}
                />
              </Field>
              <Field label="LinkedIn URL" htmlFor="social-linkedin">
                <Input
                  id="social-linkedin"
                  placeholder="https://linkedin.com/in/..."
                  value={socials.linkedin ?? ""}
                  onChange={(e) => setSocials({ ...socials, linkedin: e.target.value || null })}
                />
              </Field>
              <Field label="X (formerly Twitter) URL" htmlFor="social-x">
                <Input
                  id="social-x"
                  placeholder="https://x.com/..."
                  value={socials.x ?? ""}
                  onChange={(e) => setSocials({ ...socials, x: e.target.value || null })}
                />
              </Field>
              <Field label="Instagram URL" htmlFor="social-instagram">
                <Input
                  id="social-instagram"
                  placeholder="https://instagram.com/..."
                  value={socials.instagram ?? ""}
                  onChange={(e) => setSocials({ ...socials, instagram: e.target.value || null })}
                />
              </Field>
              <Field label="YouTube URL" htmlFor="social-youtube">
                <Input
                  id="social-youtube"
                  placeholder="https://youtube.com/@..."
                  value={socials.youtube ?? ""}
                  onChange={(e) => setSocials({ ...socials, youtube: e.target.value || null })}
                />
              </Field>
              <Field label="Personal Blog / Custom Link" htmlFor="social-website">
                <Input
                  id="social-website"
                  placeholder="https://..."
                  value={socials.website ?? ""}
                  onChange={(e) => setSocials({ ...socials, website: e.target.value || null })}
                />
              </Field>
            </div>
          </FormSection>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={pendingSocials} className="gap-2">
              {pendingSocials ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save Social Links
            </Button>
          </div>
        </form>
      </TabsContent>

      {/* 6. SECTIONS */}
      <TabsContent value="sections">
        <form onSubmit={handleSaveSections} className="max-w-3xl space-y-6">
          <FormSection
            title="Homepage Section Visibility & Order"
            description="Reorder how sections appear down the page, change their navigation titles, or toggle their visibility."
          >
            <div className="space-y-3">
              {sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  className="flex items-center gap-3 rounded-xl border bg-card/60 p-3.5 transition-colors"
                >
                  <span className="font-mono text-xs text-muted-foreground w-6 text-center">
                    0{idx + 1}
                  </span>

                  <div className="flex-1">
                    <Input
                      value={sec.label}
                      onChange={(e) => updateSectionLabel(idx, e.target.value)}
                      className="h-8 max-w-xs text-sm"
                    />
                    <span className="mt-0.5 block text-xs text-muted-foreground font-mono">
                      #{sec.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={idx === 0}
                      onClick={() => moveSection(idx, "up")}
                      aria-label="Move section up"
                    >
                      <ArrowUp className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={idx === sections.length - 1}
                      onClick={() => moveSection(idx, "down")}
                      aria-label="Move section down"
                    >
                      <ArrowDown className="size-4" />
                    </Button>
                    <div className="h-4 w-px bg-border mx-1" />
                    <Button
                      type="button"
                      variant={sec.visible ? "secondary" : "outline"}
                      size="sm"
                      className="gap-1.5 text-xs"
                      onClick={() => toggleSectionVisibility(idx)}
                    >
                      {sec.visible ? <Eye className="size-3.5 text-brand" /> : <EyeOff className="size-3.5" />}
                      {sec.visible ? "Visible" : "Hidden"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </FormSection>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={pendingSections} className="gap-2">
              {pendingSections ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save Section Arrangement
            </Button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  );
}
