import type OpenAI from "openai";
import { CHAT_MODEL } from "@/ai/client";
import { buildContextBlock } from "./context";
import type { RagContext } from "./retrieve";

type Message = { role: "user" | "assistant" | "system"; content: string };

export async function answerWithContext({
  client,
  system,
  messages,
  context,
}: {
  client: OpenAI;
  system: string;
  messages: Message[];
  context: RagContext[];
}): Promise<string> {
  const completion = await client.chat.completions.create({
    model: CHAT_MODEL,
    temperature: 0.4,
    messages: [
      { role: "system", content: system },
      { role: "system", content: buildContextBlock(context) },
      ...messages,
    ],
  });

  return completion.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
}