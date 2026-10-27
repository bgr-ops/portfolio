"use client";

import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FormActions({ pending, isNew }: { pending: boolean; isNew: boolean }) {
  return (
    <div className="glass sticky bottom-4 z-20 flex items-center justify-end gap-3 rounded-2xl p-3 shadow-lg shadow-black/5">
      <p className="mr-auto pl-2 text-xs text-muted-foreground">
        Changes go live on the public site as soon as you save.
      </p>
      <Button id="form-save" type="submit" size="lg" className="gap-2 px-5" disabled={pending}>
        {pending ? <Loader2 className="animate-spin" /> : <Save />}
        {pending ? "Saving…" : isNew ? "Create" : "Save changes"}
      </Button>
    </div>
  );
}
