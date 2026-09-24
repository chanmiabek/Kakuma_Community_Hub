"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export default function AiPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm the Kakuma Community Hub assistant. Ask me about jobs, training, services or how to apply." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;
    const next = [...messages, { role: "user" as const, content: input }];
    setMessages(next);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    });
    const data = await res.json();
    setLoading(false);
    setMessages([...next, { role: "assistant", content: data.reply ?? "Sorry, something went wrong." }]);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex max-w-3xl flex-1 flex-col px-4 py-10">
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <Sparkles className="h-7 w-7 text-primary" /> AI Assistant
        </h1>
        <p className="mt-2 text-muted-foreground">Ask anything about opportunities and services in Kakuma</p>

        <Card className="mt-6 flex flex-1 flex-col">
          <CardContent className="flex flex-1 flex-col gap-4 pt-6">
            <div className="flex-1 space-y-4 overflow-y-auto">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : ""}>
                  <div className={`inline-block max-w-[85%] rounded-lg px-4 py-2 text-sm ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about jobs, training..."
              />
              <Button onClick={send} disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}