"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { communityReportSchema, type CommunityReportInput } from "@/features/community-reports/validations";

const CATEGORIES = ["SAFETY", "INFRASTRUCTURE", "HEALTH", "WATER", "EDUCATION", "SECURITY", "OTHER"] as const;

export default function CreateReportPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<CommunityReportInput>({
    resolver: zodResolver(communityReportSchema),
    defaultValues: { title: "", description: "", category: "OTHER", location: "" },
  });

  async function onSubmit(values: CommunityReportInput) {
    setLoading(true);
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setLoading(false);
    if (!res.ok) { toast.error("Failed to submit report"); return; }
    toast.success("Report submitted");
    router.push("/community");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-10">
        <Card className="mx-auto max-w-2xl">
          <CardHeader><CardTitle>Submit a community report</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...form.register("title")} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={form.watch("category")}
                  onValueChange={(v) => form.setValue("category", v as CommunityReportInput["category"])}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g. Kakuma 1, Block 3" {...form.register("location")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={6} {...form.register("description")} />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Submitting..." : "Submit report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}