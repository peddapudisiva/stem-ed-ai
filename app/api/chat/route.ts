import { NextRequest, NextResponse } from "next/server"
import { getGroqClient, DEFAULT_MODEL } from "@/lib/groq"

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
  systemPrompt?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json()
    const { messages, systemPrompt } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 })
    }

    const groq = getGroqClient()

    if (!groq) {
      // Graceful fallback when GROQ_API_KEY is not configured
      return NextResponse.json({
        content:
          "SERA AI is ready — add your GROQ_API_KEY to .env.local to enable real AI responses. For now, using demo mode.",
        demo: true,
      })
    }

    const systemMessages: ChatMessage[] = systemPrompt
      ? [{ role: "system", content: systemPrompt }]
      : []

    const completion = await groq.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [...systemMessages, ...messages],
      max_tokens: 512,
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content ?? "No response generated."

    return NextResponse.json({ content, demo: false })
  } catch (err) {
    console.error("[/api/chat] error:", err)
    return NextResponse.json(
      { error: "Failed to get AI response. Please try again." },
      { status: 500 }
    )
  }
}
