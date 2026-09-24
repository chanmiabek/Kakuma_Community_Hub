"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { profileSchema, type ProfileInput } from "@/features/users/validations";

export function ProfileForm({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name ?? "",
      phone: user.phone ?? "",
      location: user.location ?? "",
      bio: user.bio ?? "",
      headline: user.profile?.headline ?? "",
      summary: user.profile?.summary ?? "",
      yearsExperience: user.profile?.yearsExperience ?? 0,
    },
  });

  async function onSubmit(values: ProfileInput) {
    setLoading(true);
    const res = await fetch("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setLoading(false);
    if (!res.ok) { toast.error("Update failed"); return; }
    toast.success("Profile updated");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input {...form.register("name")} />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input {...form.register("phone")} />
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Input {...form.register("location")} />
        </div>
        <div className="space-y-2">
          <Label>Headline</Label>
          <Input {...form.register("headline")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Bio</Label>
        <Textarea rows={4} {...form.register("bio")} />
      </div>
      <div className="space-y-2">
        <Label>Summary</Label>
        <Textarea rows={4} {...form.register("summary")} />
      </div>
      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save changes"}</Button>
    </form>
  );
}