"use client";

import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

type ImageUploadProps = {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
};

export function ImageUpload({
  value,
  onChange,
  label = "Image",
  description = "Optional. JPG, PNG, WebP or AVIF, up to 5 MB.",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file?: File) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) {
      toast.error("Choose a JPG, PNG, WebP or AVIF image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Images must be 5 MB or smaller.");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/uploads", { method: "POST", body });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || typeof result.url !== "string") {
        throw new Error(result.error ?? "Image upload failed.");
      }
      onChange(result.url);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      {value ? (
        <div className="relative overflow-hidden rounded-xl border bg-muted">
          <img src={value} alt={label + " preview"} className="h-44 w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-lg bg-background/95 px-3 py-2 text-xs font-semibold text-foreground shadow"
            aria-label={"Remove " + label.toLowerCase()}
          >
            <Trash2 className="h-3.5 w-3.5" /> Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex min-h-28 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/30 px-4 py-5 text-sm font-medium transition hover:border-primary/50 hover:bg-primary/5 disabled:cursor-wait disabled:opacity-60"
        >
          {uploading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5 text-primary" />}
          <span>{uploading ? "Uploading image…" : "Choose an image"}</span>
          <span className="text-xs font-normal text-muted-foreground">You can also leave this blank</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="sr-only"
        onChange={(event) => void handleFile(event.target.files?.[0])}
        aria-label={"Upload " + label.toLowerCase()}
      />
      {value && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline disabled:opacity-50"
        >
          <ImagePlus className="h-4 w-4" /> Replace image
        </button>
      )}
    </div>
  );
}
