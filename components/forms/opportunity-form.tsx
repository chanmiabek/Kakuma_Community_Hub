"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { opportunitySchema, type OpportunityInput } from "@/features/opportunities/validations";
import { OPPORTUNITY_TYPES } from "@/config/categories";

export function OpportunityForm({ opportunity }: { opportunity?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<OpportunityInput>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      title: opportunity?.title ?? "",
      description: opportunity?.description ?? "",
      requirements: opportunity?.requirements ?? "",
      responsibilities: opportunity?.responsibilities ?? "",
      type: opportunity?.type ?? "JOB",
      category: opportunity?.category ?? "Technology",
      location: opportunity?.location ?? "Kakuma",
      isRemote: opportunity?.isRemote ?? false,
      salaryMin: opportunity?.salaryMin ?? undefined,
      salaryMax: opportunity?.salaryMax ?? undefined,
      positions: opportunity?.positions ?? 1,
      contactEmail: opportunity?.contactEmail ?? "",
    },
  });

  async function onSubmit(values: OpportunityInput) {
    setLoading(true);
    const res = await fetch(
      opportunity ? `/api/opportunities/${opportunity.id}` : "/api/opportunities",
      {
        method: opportunity ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      },
    );
    setLoading(false);
    if (!res.ok) { toast.error("Save failed"); return; }
    toast.success(opportunity ? "Updated" : "Created");
    router.push("/organization/opportunities");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2"><Label>Title</Label><Input {...form.register("title")} /></div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={form.watch("type")} onValueChange={(v) => form.setValue("type", v as any)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{OPPORTUNITY_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-2"><Label>Category</Label><Input {...form.register("category")} /></div>
      </div>
      <div className="space-y-2"><Label>Description</Label><Textarea rows={6} {...form.register("description")} /></div>
      <div className="space-y-2"><Label>Requirements</Label><Textarea rows={4} {...form.register("requirements")} /></div>
      <div className="space-y-2"><Label>Responsibilities</Label><Textarea rows={4} {...form.register("responsibilities")} /></div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2"><Label>Location</Label><Input {...form.register("location")} /></div>
        <div className="space-y-2"><Label>Positions</Label><Input type="number" {...form.register("positions")} /></div>
        <div className="space-y-2"><Label>Salary min</Label><Input type="number" {...form.register("salaryMin")} /></div>
        <div className="space-y-2"><Label>Salary max</Label><Input type="number" {...form.register("salaryMax")} /></div>
      </div>
      <div className="space-y-2"><Label>Contact email</Label><Input {...form.register("contactEmail")} /></div>
      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
    </form>
  );
}