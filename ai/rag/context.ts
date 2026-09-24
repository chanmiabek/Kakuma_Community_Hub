import type { RagContext } from "./retrieve";

export function buildContextBlock(context: RagContext[]): string {
  if (context.length === 0) return "CONTEXT: (none)";
  return (
    "CONTEXT:\n" +
    context
      .map((c, i) => `[${i + 1}] ${c.title}: ${c.snippet}`)
      .join("\n")
  );
}