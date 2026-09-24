"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";

export type SearchResult = { type: string; label: string; href: string };

export function useSearch(query: string) {
  const debounced = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (debounced.trim().length < 2) { setResults([]); return; }
    let cancelled = false;
    setLoading(true);

    fetch(`/api/search?q=${encodeURIComponent(debounced)}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setResults(d.results ?? []); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [debounced]);

  return { results, loading };
}