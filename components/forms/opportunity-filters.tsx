"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, OPPORTUNITY_TYPES } from "@/config/categories";

export function OpportunityFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [type, setType] = useState(params.get("type") ?? "");
  const [category, setCategory] = useState(params.get("category") ?? "");
  const [location, setLocation] = useState(params.get("location") ?? "");

  function apply() {
    const next = new URLSearchParams();
    const search = q.trim();
    const place = location.trim();

    if (search) next.set("q", search);
    if (type) next.set("type", type);
    if (category) next.set("category", category);
    if (place) next.set("location", place);

    // Keep the user's page-size preference while resetting to page one.
    const perPage = params.get("perPage");
    if (perPage) next.set("perPage", perPage);

    const query = next.toString();
    router.push(query ? `/opportunities?${query}` : "/opportunities");
  }

  function reset() {
    setQ("");
    setType("");
    setCategory("");
    setLocation("");
    router.push("/opportunities");
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        apply();
      }}
      className="space-y-5 rounded-2xl border border-slate-200/80 bg-card p-5 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary">
          <Search className="h-4 w-4" />
        </span>
        <div>
          <h2 className="font-bold text-foreground">Filter opportunities</h2>
          <p className="text-xs text-muted-foreground">Narrow down your search</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="opportunity-search">Keyword</Label>
        <Input
          id="opportunity-search"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Title or keyword"
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="opportunity-type">Opportunity type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger id="opportunity-type">
            <SelectValue placeholder="Any type" />
          </SelectTrigger>
          <SelectContent>
            {OPPORTUNITY_TYPES.map((item) => (
              <SelectItem key={item} value={item}>
                {item.charAt(0) + item.slice(1).toLowerCase().replaceAll("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="opportunity-category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="opportunity-category">
            <SelectValue placeholder="Any category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((item) => (
              <SelectItem key={item.slug} value={item.slug}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="opportunity-location">Location</Label>
        <Input
          id="opportunity-location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="e.g. Kakuma, Nairobi, Remote"
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-2 pt-1">
        <Button type="submit" className="w-full">
          Apply filters
        </Button>
        <Button type="button" variant="outline" onClick={reset} aria-label="Reset all filters">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </form>
  );
}
