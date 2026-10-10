import { NextResponse } from "next/server";
import { z } from "zod";
import { aiClient, isAiConfigured } from "@/ai/client";
import { assistantPrompt } from "@/ai/prompts/assistant.prompt";
import { retrieveContext } from "@/ai/rag/retrieve";
import { answerWithContext } from "@/ai/rag/answer";

const schema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant", "system"]),
    content: z.string(),
  })).min(1),
});

export async function POST(req: Request) {
  if (!isAiConfigured) {
    return NextResponse.json(
      { error: "AI is not configured. Set OPENAI_API_KEY in the server environment." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const lastUser = [...parsed.data.messages].reverse().find((m) => m.role === "user");
  const context = lastUser ? await retrieveContext(lastUser.content) : [];

  const reply = await answerWithContext({
    client: aiClient,
    system: assistantPrompt,
    messages: parsed.data.messages,
    context,
  });

  return NextResponse.json({ reply, contextUsed: context.length });
}
