import Link from "next/link";
import { ArrowUpRight, BookOpen, Briefcase, FolderKanban, Settings2, Sparkles } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { PageHeader } from "@/components/admin/page-header";

const CARDS = [
  { table: "projects", label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { table: "books", label: "Books", href: "/admin/books", icon: BookOpen },
  { table: "experience", label: "Experience", href: "/admin/experience", icon: Briefcase },
  { table: "skills", label: "Skills", href: "/admin/skills", icon: Sparkles },
] as const;

export default async function AdminOverviewPage() {
  const { supabase, user } = await requireAdmin();

  const counts = await Promise.all(
    CARDS.map(async ({ table }) => {
      const [total, live] = await Promise.all([
        supabase.from(table).select("id", { count: "exact", head: true }),
        supabase.from(table).select("id", { count: "exact", head: true }).eq("published", true),
      ]);
      return { total: total.count ?? 0, live: live.count ?? 0 };
    }),
  );

  const firstName = user.email?.split("@")[0] ?? "there";

  return (
    <>
      <PageHeader
        title={`Hello, ${firstName}`}
        description="Everything on your public portfolio is managed from here. Pick a section to start editing."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CARDS.map(({ label, href, icon: Icon }, i) => (
          <Link
            key={href}
            href={href}
            className="group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand">
                <Icon className="size-4" />
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
            <p className="mt-6 font-display text-5xl leading-none">{counts[i].total}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {label} · <span className="text-foreground">{counts[i].live} live</span>
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/admin/settings"
        className="group mt-4 flex items-center gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-brand/40"
      >
        <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand">
          <Settings2 className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="font-medium">Site settings</p>
          <p className="text-sm text-muted-foreground">
            Hero, about, contact details, social links, SEO and homepage section order.
          </p>
        </div>
        <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
      </Link>
    </>
  );
}
