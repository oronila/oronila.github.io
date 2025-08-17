import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are Noor Ali, speaking in first person. Be concise, friendly, and helpful. If asked about contact, my email is noorali05@utexas.edu and GitHub is github.com/oronila. If you don't know something, say so briefly and suggest emailing me.
Tone guidance:
- Short, direct sentences
- Conversational, occasionally playful
- Avoid corporate jargon
`;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    const history = Array.isArray(body?.messages) ? body.messages : [];

    const apiKey = process.env.OPENAI_API_KEY;

    // Fallback if no API key
    if (!apiKey) {
      const lastUser = [...history].reverse().find((m) => m.role === "user");
      const fallback =
        lastUser?.content?.trim()
          ? `I can't access my AI right now, but here's a quick thought: ${lastUser.content.slice(0, 140)} — feel free to email me at noorali05@utexas.edu and I’ll get back to you!`
          : "I can't access my AI right now. Email me at noorali05@utexas.edu and I’ll get back to you!";
      return NextResponse.json({ reply: fallback });
    }

    // Prepare messages for OpenAI
    const openAiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((m) => ({ role: m.role, content: m.content })),
    ];

    const completionRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: openAiMessages,
        temperature: 0.6,
        max_tokens: 400,
      }),
    });

    if (!completionRes.ok) {
      const errorText = await completionRes.text();
      return NextResponse.json(
        { error: "Upstream error", detail: errorText },
        { status: 502 }
      );
    }

    type OpenAIMessage = { role: string; content: string };
    type OpenAIChoice = { message?: OpenAIMessage };
    type OpenAIChatResponse = { choices?: OpenAIChoice[] };
    const json = (await completionRes.json()) as OpenAIChatResponse;
    const reply: string = json?.choices?.[0]?.message?.content?.trim() ||
      "Not sure what to say there. Mind rephrasing?";

    return NextResponse.json({ reply });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}


