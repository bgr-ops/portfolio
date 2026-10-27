"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Briefcase,
  ExternalLink,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings2,
  Sparkles,
} from "lucide-react";
import { signOut } from "@/app/login/actions";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/settings", label: "Site settings", icon: Settings2 },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/books", label: "Books", icon: BookOpen },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            id={`admin-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
            )}
          >
            <Icon className={cn("size-4", active && "text-brand")} />
            {label}
            {active && <span className="ml-auto size-1.5 rounded-full bg-brand" />}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand({ siteName }: { siteName: string }) {
  return (
    <Link href="/admin" className="flex items-center gap-3 px-3">
      <span className="grid size-8 place-items-center rounded-lg bg-brand font-display text-lg text-brand-foreground">
        {siteName.charAt(0)}
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-medium">{siteName}</span>
        <span className="block text-xs text-muted-foreground">Content studio</span>
      </span>
    </Link>
  );
}

export function AdminShell({
  children,
  email,
  siteName,
}: {
  children: React.ReactNode;
  email: string;
  siteName: string;
}) {
  const [open, setOpen] = useState(false);

  const footer = (
    <div className="mt-auto space-y-3 border-t border-sidebar-border pt-4">
      <p className="truncate px-3 text-xs text-muted-foreground" title={email}>
        {email}
      </p>
      <form action={signOut}>
        <Button id="admin-sign-out" type="submit" variant="ghost" className="w-full justify-start gap-3 px-3">
          <LogOut className="size-4" /> Sign out
        </Button>
      </form>
    </div>
  );

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[264px_1fr]">
      <aside className="sticky top-0 hidden h-dvh flex-col gap-8 border-r border-sidebar-border bg-sidebar p-4 lg:flex">
        <Brand siteName={siteName} />
        <NavLinks />
        {footer}
      </aside>

      <div className="flex min-h-dvh min-w-0 flex-col">
        <header className="glass sticky top-0 z-30 flex h-14 items-center gap-2 border-x-0 border-t-0 px-4 lg:px-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button id="admin-menu" variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-72 flex-col gap-8 bg-sidebar p-4">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="pt-2">
                <Brand siteName={siteName} />
              </div>
              <NavLinks onNavigate={() => setOpen(false)} />
              {footer}
            </SheetContent>
          </Sheet>

          <div className="ml-auto flex items-center gap-1">
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link id="admin-view-site" href="/" target="_blank">
                View site <ExternalLink className="size-3.5" />
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
