"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES, OPPORTUNITY_TYPES } from "@/config/categories";

export function OpportunityFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [type, setType] = useState(params.get("type") ?? "");
  const [category, setCategory] = useState(params.get("category") ?? "");

  function apply() {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (type) next.set("type", type);
    if (category) next.set("category", category);
    router.push(`/opportunities?${next.toString()}`);
  }

  function reset() {
    setQ(""); setType(""); setCategory("");
    router.push("/opportunities");
  }

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <div className="space-y-2">
        <Label>Search</Label>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Title or keyword" />
      </div>
      <div className="space-y-2">
        <Label>Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger><SelectValue placeholder="Any type" /></SelectTrigger>
          <SelectContent>
            {OPPORTUNITY_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger><SelectValue placeholder="Any category" /></SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button onClick={apply} className="flex-1">Apply</Button>
        <Button onClick={reset} variant="outline">Reset</Button>
      </div>
    </div>
  );
}