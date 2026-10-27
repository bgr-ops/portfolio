"use client";

import { useRef, useState } from "react";
import { ImagePlus, Link2, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { MEDIA_BUCKET } from "@/lib/supabase/env";
import { cn } from "@/lib/utils";

const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Uploads an image to Supabase Storage (`media` bucket) and exposes the public URL.
 * Works in FormData forms (via `name`) and controlled forms (via `onChange`).
 */
export function ImageUpload({
  id,
  name,
  value,
  onChange,
  folder,
  aspect = "aspect-video",
  label = "Upload image",
}: {
  id: string;
  name?: string;
  value?: string | null;
  onChange?: (url: string | null) => void;
  folder: string;
  aspect?: string;
  label?: string;
}) {
  const [url, setUrl] = useState<string | null>(value ?? null);
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function update(next: string | null) {
    setUrl(next);
    onChange?.(next);
  }

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return toast.error("Please choose an image file.");
    if (file.size > MAX_BYTES) return toast.error("Image must be 5 MB or smaller.");

    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(path, file, { cacheControl: "31536000", upsert: false, contentType: file.type });
      if (error) throw error;
      const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
      update(data.publicUrl);
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      {name && <input type="hidden" name={name} value={url ?? ""} />}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <div
        className={cn(
          "group relative overflow-hidden rounded-xl border border-dashed bg-muted/40 transition-colors",
          aspect,
          !url && "hover:border-brand/60 hover:bg-brand-soft",
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
      >
        {url ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 flex items-end justify-end gap-2 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <Button type="button" size="sm" variant="secondary" onClick={() => inputRef.current?.click()}>
                Replace
              </Button>
              <Button type="button" size="icon-sm" variant="secondary" aria-label="Remove image" onClick={() => update(null)}>
                <X />
              </Button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            {uploading ? <Loader2 className="size-5 animate-spin" /> : <ImagePlus className="size-5" />}
            <span>{uploading ? "Uploading…" : label}</span>
            <span className="text-xs opacity-70">Click or drop · max 5 MB</span>
          </button>
        )}
        {uploading && url && (
          <div className="absolute inset-0 grid place-items-center bg-background/60">
            <Loader2 className="size-5 animate-spin" />
          </div>
        )}
      </div>

      {showUrlInput ? (
        <Input
          placeholder="https://… (paste an image URL)"
          defaultValue={url ?? ""}
          onBlur={(e) => update(e.target.value.trim() || null)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowUrlInput(true)}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <Link2 className="size-3" /> Use an image URL instead
        </button>
      )}
    </div>
  );
}
