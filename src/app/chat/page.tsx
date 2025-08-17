"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hey, I'm Noor. Ask me about my projects, interests, or anything else!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: "user", content: trimmed } as const];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      const data = (await res.json()) as { reply: string };
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      const fallback =
        "I ran into an error replying. You can email me at noorali05@utexas.edu in the meantime.";
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-200">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-[-10%] h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,245,245,0.08),transparent_60%)]" />
        <div className="absolute right-[-10%] top-1/3 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,245,245,0.06),transparent_60%)]" />
      </div>

      <div className="relative mx-auto flex h-svh max-w-3xl flex-col px-6 py-6">
        {/* Header */}
        <header className="flex items-center justify-between py-2">
          <Link href="/" className="text-sm text-neutral-400 transition hover:text-neutral-200">
            ← Back
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-[10px] ring-1 ring-neutral-700">
                N
              </div>
              <h1 className="text-base font-semibold tracking-tight">Chat with Noor</h1>
            </div>
            <span className="flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/50 px-2 py-0.5 text-[10px] text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online
            </span>
          </div>
          <div className="w-10" />
        </header>

        {/* Intro blurb */}
        <div className="mt-2 text-center text-xs text-neutral-400">
          Ask me about projects, internships, what I’m building, or anything else.
        </div>

        {/* Suggestions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          {["What are you building now?", "Favorite project and why?", "Looking for internships?"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setInput(s)}
              className="rounded-full border border-neutral-800 bg-neutral-900/40 px-3 py-1 text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-200"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          className="mt-4 flex-1 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/20"
        >
          <div className="space-y-4" aria-live="polite">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex items-start gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-[10px] ring-1 ring-neutral-700">
                    N
                  </div>
                )}
                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm ring-1 ${
                    m.role === "user"
                      ? "bg-neutral-100 text-neutral-900 ring-neutral-300"
                      : "bg-neutral-900/60 text-neutral-100 ring-neutral-800"
                  }`}
                >
                  {m.content}
                </div>
                {m.role === "user" && (
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[10px] text-neutral-900 ring-1 ring-neutral-300">
                    You
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-[10px] ring-1 ring-neutral-700">N</div>
                <div className="inline-flex items-center gap-1 rounded-2xl bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 ring-1 ring-neutral-800">
                  <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-300" />
                  <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-300" style={{ animationDelay: "0.15s" }} />
                  <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-300" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Composer */}
        <form onSubmit={handleSend} className="mt-4">
          <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 p-2 ring-0 focus-within:border-neutral-600">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my projects, experience, or anything."
              className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={isLoading || input.trim().length === 0}
              className="group inline-flex items-center gap-2 rounded-lg bg-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 transition enabled:hover:bg-white disabled:opacity-40"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition group-enabled:translate-x-0.5" fill="currentColor" aria-hidden="true">
                <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2 .01 7Z" />
              </svg>
              Send
            </button>
          </div>
          <div className="mt-2 text-center text-[11px] text-neutral-500">Press Enter to send</div>
        </form>

        {/* Footer */}
        <footer className="mt-6 text-center text-xs text-neutral-500">
          Replies are generated to speak in my voice. For anything official, please email me.
        </footer>
      </div>
    </main>
  );
}


