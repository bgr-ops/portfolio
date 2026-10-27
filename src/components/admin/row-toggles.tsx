"use client";

import { useOptimistic, useTransition } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { setRowFlag } from "@/app/admin/_actions/content";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function PublishToggle({ table, id, published }: { table: string; id: string; published: boolean }) {
  const [, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(published);

  return (
    <div className="flex items-center gap-2">
      <Switch
        id={`publish-${table}-${id}`}
        size="sm"
        checked={optimistic}
        aria-label={optimistic ? "Unpublish" : "Publish"}
        onCheckedChange={(value) =>
          startTransition(async () => {
            setOptimistic(value);
            const res = await setRowFlag(table, id, "published", value);
            if (res.ok) {
              toast.success(res.message);
            } else {
              toast.error(res.message);
            }
          })
        }
      />
      <span className={cn("text-xs", optimistic ? "text-foreground" : "text-muted-foreground")}>
        {optimistic ? "Live" : "Draft"}
      </span>
    </div>
  );
}

export function FeaturedToggle({ table, id, featured }: { table: string; id: string; featured: boolean }) {
  const [, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(featured);

  return (
    <button
      id={`feature-${table}-${id}`}
      type="button"
      aria-label={optimistic ? "Remove from featured" : "Mark as featured"}
      aria-pressed={optimistic}
      className="rounded-md p-1 transition-colors hover:bg-muted"
      onClick={() =>
        startTransition(async () => {
          setOptimistic(!optimistic);
          const res = await setRowFlag(table, id, "featured", !optimistic);
          if (res.ok) {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        })
      }
    >
      <Star className={cn("size-4", optimistic ? "fill-brand text-brand" : "text-muted-foreground")} />
    </button>
  );
}
