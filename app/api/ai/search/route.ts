import { NextResponse } from "next/server";
import { semanticSearch } from "@/ai/embeddings/search";

export async function POST(req: Request) {
  const { query, limit } = (await req.json().catch(() => ({}))) as { query?: string; limit?: number };
  if (!query) return NextResponse.json({ error: "query required" }, { status: 400 });

  const results = await semanticSearch(query, limit ?? 10);
  return NextResponse.json({ results });
}