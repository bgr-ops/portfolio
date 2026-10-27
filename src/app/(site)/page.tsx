import type { Metadata } from "next";
import {
  getFeaturedBooks,
  getFeaturedProjects,
  getPublishedExperience,
  getPublishedSkills,
  getSiteSettings,
} from "@/lib/data/portfolio";
import { AboutSection } from "@/components/site/about-section";
import { BooksSection } from "@/components/site/books-section";
import { ContactSection } from "@/components/site/contact-section";
import { ExperienceSection } from "@/components/site/experience-section";
import { HeroSection } from "@/components/site/hero-section";
import { ProjectsSection } from "@/components/site/projects-section";
import { SkillsSection } from "@/components/site/skills-section";

// Revalidate public homepage every hour or on-demand via server actions
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const { site_name, seo_title, seo_description, og_image } = settings.general;

  return {
    title: seo_title || `${site_name} — Portfolio`,
    description: seo_description || `Digital portfolio and publications of ${site_name}.`,
    openGraph: {
      title: seo_title || `${site_name} — Portfolio`,
      description: seo_description || `Digital portfolio and publications of ${site_name}.`,
      images: og_image ? [{ url: og_image }] : undefined,
    },
  };
}

export default async function HomePage() {
  const [settings, featuredProjects, featuredBooks, experience, skillGroups] =
    await Promise.all([
      getSiteSettings(),
      getFeaturedProjects(),
      getFeaturedBooks(),
      getPublishedExperience(),
      getPublishedSkills(),
    ]);

  return (
    <>
      {/* 1. Hero is always the prominent entrance */}
      <HeroSection
        hero={settings.hero}
        availability={settings.contact.availability}
      />

      {/* 2. Dynamically rendered sections strictly following admin configured order & visibility */}
      {settings.sections.map((section) => {
        if (!section.visible) return null;

        switch (section.id) {
          case "about":
            return <AboutSection key="about" about={settings.about} />;
          case "projects":
            return <ProjectsSection key="projects" projects={featuredProjects} />;
          case "experience":
            return <ExperienceSection key="experience" items={experience} />;
          case "skills":
            return <SkillsSection key="skills" groups={skillGroups} />;
          case "books":
            return <BooksSection key="books" books={featuredBooks} />;
          case "contact":
            return (
              <ContactSection
                key="contact"
                contact={settings.contact}
                socials={settings.socials}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
