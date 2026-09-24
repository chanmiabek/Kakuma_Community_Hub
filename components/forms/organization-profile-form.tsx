"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { organizationSchema, type OrganizationInput } from "@/features/organizations/validations";

export function OrganizationProfileForm({ organization }: { organization: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<OrganizationInput>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: organization?.name ?? "",
      description: organization?.description ?? "",
      mission: organization?.mission ?? "",
      email: organization?.email ?? "",
      phone: organization?.phone ?? "",
      address: organization?.address ?? "",
      website: organization?.website ?? "",
      focusAreas: organization?.focusAreas ?? [],
    },
  });

  async function onSubmit(values: OrganizationInput) {
    setLoading(true);
    const res = await fetch("/api/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setLoading(false);
    if (!res.ok) { toast.error("Save failed"); return; }
    toast.success("Organization saved");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2"><Label>Name</Label><Input {...form.register("name")} /></div>
      <div className="space-y-2"><Label>Description</Label><Textarea rows={4} {...form.register("description")} /></div>
      <div className="space-y-2"><Label>Mission</Label><Textarea rows={3} {...form.register("mission")} /></div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2"><Label>Email</Label><Input {...form.register("email")} /></div>
        <div className="space-y-2"><Label>Phone</Label><Input {...form.register("phone")} /></div>
        <div className="space-y-2"><Label>Address</Label><Input {...form.register("address")} /></div>
        <div className="space-y-2"><Label>Website</Label><Input {...form.register("website")} /></div>
      </div>
      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
    </form>
  );
}