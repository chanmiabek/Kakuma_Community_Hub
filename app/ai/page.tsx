"use client";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BriefcaseBusiness, GraduationCap, HeartHandshake, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };
const prompts = ["Find jobs and training opportunities", "What services are available in Kakuma?", "How do I apply for an opportunity?"];

export default function AiPage() {
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: "Hi! I am your Kakuma Community Hub assistant. I can help you find jobs, training, services and ways to apply." }]);
  const [input, setInput] = useState(""); const [loading, setLoading] = useState(false);
  async function send(value = input) {
    if (!value.trim() || loading) return; const next = [...messages, { role: "user" as const, content: value }]; setMessages(next); setInput(""); setLoading(true);
    try { const res = await fetch("/api/ai/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next }) }); const data = await res.json(); setMessages([...next, { role: "assistant", content: data.reply ?? "I cannot connect to the AI service right now. Try browsing opportunities or services directly." }]); } catch { setMessages([...next, { role: "assistant", content: "The assistant is temporarily unavailable. You can still explore opportunities, services and organizations from the navigation." }]); } finally { setLoading(false); }
  }
  return <div className="flex min-h-screen flex-col bg-background"><SiteHeader /><main className="container flex-1 py-10"><div className="mx-auto max-w-4xl"><div className="rounded-3xl bg-gradient-to-br from-violet-100 via-white to-emerald-50 p-8"><p className="flex items-center gap-2 font-semibold text-violet-700"><Sparkles className="h-5 w-5" /> Kakuma Hub AI</p><h1 className="mt-3 text-4xl font-extrabold text-[#073b36]">Find your next opportunity with confidence.</h1><p className="mt-3 max-w-2xl text-muted-foreground">Ask a question and get practical guidance about jobs, training, scholarships, services and community resources.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{[{icon: BriefcaseBusiness, label: "Jobs & opportunities"},{icon: GraduationCap, label: "Training & scholarships"},{icon: HeartHandshake, label: "Community services"}].map(({icon: Icon, label}) => <div key={label} className="rounded-xl bg-white/80 p-4 shadow-sm"><Icon className="h-5 w-5 text-primary" /><p className="mt-2 text-sm font-semibold">{label}</p></div>)}</div></div>
      <Card className="mt-6"><CardContent className="p-6"><div className="min-h-48 space-y-4">{messages.map((m, i) => <div key={i} className={m.role === "user" ? "text-right" : ""}><span className={`inline-block max-w-[85%] rounded-2xl px-4 py-3 text-left text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>{m.content}</span></div>)}{loading && <div className="text-sm text-muted-foreground">Thinking…</div>}</div><div className="mt-6 flex flex-wrap gap-2">{prompts.map((prompt) => <button key={prompt} onClick={() => send(prompt)} className="rounded-full border px-3 py-2 text-xs font-medium transition hover:border-primary hover:text-primary">{prompt}<ArrowRight className="ml-1 inline h-3 w-3" /></button>)}</div><div className="mt-4 flex gap-2"><Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask about jobs, training or services..." /><Button onClick={() => send()} disabled={loading || !input.trim()}><Send className="h-4 w-4" /></Button></div></CardContent></Card></div></main><SiteFooter /></div>;
}

