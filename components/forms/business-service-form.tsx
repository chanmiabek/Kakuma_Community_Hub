"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/forms/image-upload";

export function BusinessServiceForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: String(form.get("title") ?? ""),
          description: String(form.get("description") ?? ""),
          category: String(form.get("category") ?? ""),
          price: String(form.get("price") ?? "") || undefined,
          imageUrl: imageUrl || undefined,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error ?? "Could not save service.");
      toast.success("Service submitted");
      event.currentTarget.reset();
      setImageUrl("");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-card p-5">
      <div>
        <h2 className="text-lg font-semibold">Add a service</h2>
        <p className="mt-1 text-sm text-muted-foreground">Share what your business offers, with or without a photo.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="service-title">Service name</Label><Input id="service-title" name="title" minLength={3} maxLength={120} required /></div>
        <div className="space-y-2"><Label htmlFor="service-category">Category</Label><Input id="service-category" name="category" minLength={2} required placeholder="e.g. Repairs, Training" /></div>
        <div className="space-y-2 sm:col-span-2"><Label htmlFor="service-price">Price (optional)</Label><Input id="service-price" name="price" placeholder="e.g. Free or KES 500" /></div>
      </div>
      <div className="space-y-2"><Label htmlFor="service-description">Description</Label><Textarea id="service-description" name="description" rows={3} minLength={10} required /></div>
      <ImageUpload label="Service image (optional)" value={imageUrl} onChange={setImageUrl} />
      <Button type="submit" disabled={loading}>{loading ? "Submitting…" : "Add service"}</Button>
    </form>
  );
}
