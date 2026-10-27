import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAdmin } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

const MESSAGES: Record<string, string> = {
  unauthorized: "Please sign in with an admin account to continue.",
  config: "Supabase is not configured yet. Add your keys to .env.local.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  if (await getAdmin()) redirect("/admin");

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-6">
      <div className="glow pointer-events-none absolute inset-0" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to site
        </Link>
        <ThemeToggle />
      </div>

      <div className="relative w-full max-w-sm animate-fade-up">
        <div className="mb-8 text-center">
          <p className="eyebrow justify-center">Admin</p>
          <h1 className="display mt-4 text-5xl">Welcome back</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Sign in to manage your portfolio content.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 shadow-2xl shadow-black/10">
          {error && MESSAGES[error] && (
            <p className="mb-4 rounded-lg border border-brand/30 bg-brand-soft px-3 py-2 text-sm">
              {MESSAGES[error]}
            </p>
          )}
          <LoginForm next={next} />
        </div>
      </div>
    </main>
  );
}
