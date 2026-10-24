"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { businessSchema, type BusinessInput } from "@/features/businesses/validations";
import { ImageUpload } from "@/components/forms/image-upload";

export function BusinessProfileForm({ business }: { business: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<BusinessInput>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: business?.name ?? "",
      description: business?.description ?? "",
      logoUrl: business?.logoUrl ?? "",
      coverUrl: business?.coverUrl ?? "",
      category: business?.category ?? "",
      email: business?.email ?? "",
      phone: business?.phone ?? "",
      address: business?.address ?? "",
    },
  });

  async function onSubmit(values: BusinessInput) {
    setLoading(true);
    const res = await fetch("/api/businesses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setLoading(false);
    if (!res.ok) { toast.error("Save failed"); return; }
    toast.success("Business saved");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2"><Label>Name</Label><Input {...form.register("name")} /></div>
      <div className="space-y-2"><Label>Category</Label><Input {...form.register("category")} /></div>
      <div className="space-y-2"><Label>Description</Label><Textarea rows={4} {...form.register("description")} /></div>
      <div className="grid gap-5 md:grid-cols-2">
        <ImageUpload label="Business logo" value={form.watch("logoUrl")} onChange={(url) => form.setValue("logoUrl", url, { shouldDirty: true })} description="Optional business logo." />
        <ImageUpload label="Business cover image" value={form.watch("coverUrl")} onChange={(url) => form.setValue("coverUrl", url, { shouldDirty: true })} description="Optional hero/banner image shown on your public profile." />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2"><Label>Email</Label><Input {...form.register("email")} /></div>
        <div className="space-y-2"><Label>Phone</Label><Input {...form.register("phone")} /></div>
      </div>
      <div className="space-y-2"><Label>Address</Label><Input {...form.register("address")} /></div>
      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
    </form>
  );
}