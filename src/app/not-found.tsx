import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 py-28 text-center">
      <div className="space-y-6 max-w-md">
        <span className="eyebrow justify-center">Error 404</span>
        <h1 className="display text-6xl sm:text-7xl">Page not found</h1>
        <p className="text-muted-foreground font-light text-base">
          The page or case study you are looking for has been moved or does not exist.
        </p>
        <div className="pt-4">
          <Button asChild size="lg" className="rounded-full px-8 gap-2">
            <Link href="/">
              <ArrowLeft className="size-4" /> Return to homepage
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
