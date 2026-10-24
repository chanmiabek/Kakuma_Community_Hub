"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/forms/image-upload";

export function BusinessProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          description: String(form.get("description") ?? ""),
          price: price ? Number(price) : undefined,
          imageUrl: imageUrl || undefined,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error ?? "Could not save product.");
      toast.success("Product added");
      formElement.reset();
      setImageUrl("");
      setPrice("");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-card p-5">
      <div>
        <h2 className="text-lg font-semibold">Add a product</h2>
        <p className="mt-1 text-sm text-muted-foreground">Images are optional. Products can be posted with text only.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="product-name">Product name</Label><Input id="product-name" name="name" minLength={2} maxLength={120} required /></div>
        <div className="space-y-2"><Label htmlFor="product-price">Price (KES, optional)</Label><Input id="product-price" type="number" min="0" step="1" value={price} onChange={(event) => setPrice(event.target.value)} /></div>
      </div>
      <div className="space-y-2"><Label htmlFor="product-description">Description</Label><Textarea id="product-description" name="description" rows={3} maxLength={2000} /></div>
      <ImageUpload label="Product image (optional)" value={imageUrl} onChange={setImageUrl} />
      <Button type="submit" disabled={loading}>{loading ? "Publishing…" : "Add product"}</Button>
    </form>
  );
}
