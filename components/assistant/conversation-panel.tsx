"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles, Bot, User, Loader2, RotateCcw, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { AGENTS } from "@/lib/demo-data"
import { useAssistantStore } from "@/lib/assistant-store"

const SUGGESTED_PROMPTS: Record<string, string[]> = {
  tutor: ["Explain recursion with a Python example", "Help me understand integration by parts", "What is gradient descent in simple terms?"],
  teacher: ["Generate a lesson plan for recursion", "Which students are at risk this week?", "Draft an intervention email for Marcus T."],
  curriculum: ["Analyze CUR-2026-0142 for ABET alignment", "What courses are affected by this proposal?", "Generate the committee impact report"],
  assessment: ["Create 5 MCQs on recursion (CS 1010)", "Build a rubric for the lab report", "Generate a timed quiz for MATH 2010"],
  district: ["Show retention status across all institutions", "What are the top risk signals this week?", "Compare ATC vs GSU performance"],
  govcon: ["Find matching SAM.gov opportunities", "What's the win probability for ED-OII-26-001?", "Summarize the NSF opportunity due May 30"],
  rag: ["Retrieve ATC grading policy section 3.4", "Find SACSCOC faculty qualification standards", "What does the student handbook say about SAP?"],
  workflow: ["Show status of CUR-2026-0142", "Who hasn't confirmed for the committee review?", "What's the next required action in the proposal?"],
  reporting: ["Generate Q1 TCSG compliance report", "Export faculty PD completion summary", "Prepare SACSCOC accreditation data"],
  compliance: ["Run a FERPA compliance scan", "Check NIST AI RMF score", "List all open compliance flags"],
}

function TypingIndicator({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full"
          style={{ background: color }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function MessageBubble({ message, agentColor }: { message: { id: string; role: string; agentId: string; agentName?: string; content: string; streaming: boolean; timestamp: string }; agentColor: string }) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === "user"

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn("group flex gap-3", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white"
          style={{ background: agentColor }}
        >
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div className={cn("max-w-[75%] space-y-1", isUser && "items-end flex flex-col")}>
        {!isUser && message.agentName && (
          <p className="px-1 text-[10px] font-semibold text-[#A1A1AA]">{message.agentName}</p>
        )}
        <div
          className={cn(
            "relative rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-[#4F46E5] text-white"
              : "rounded-tl-sm border border-[#E8E6E1] bg-white text-[#18181B]"
          )}
        >
          {message.streaming && message.content === "" ? (
            <TypingIndicator color={agentColor} />
          ) : (
            <>
              <div className="whitespace-pre-wrap break-words">
                {message.content}
                {message.streaming && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                    className="ml-0.5 inline-block h-4 w-0.5 bg-current align-middle"
                  />
                )}
              </div>
              {!message.streaming && !isUser && (
                <button
                  onClick={handleCopy}
                  className="absolute -right-8 top-2 flex h-6 w-6 items-center justify-center rounded opacity-0 transition-all group-hover:opacity-100 hover:bg-[#F4F4F2]"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-[#059669]" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-[#A1A1AA]" />
                  )}
                </button>
              )}
            </>
          )}
        </div>
        <p className={cn("px-1 font-mono text-[10px] text-[#A1A1AA]", isUser && "text-right")}>
          {message.timestamp}
        </p>
      </div>

      {isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FF]">
          <User className="h-4 w-4 text-[#4F46E5]" />
        </div>
      )}
    </motion.div>
  )
}

export function ConversationPanel() {
  const {
    activeAgentId,
    messages,
    streamingMessageId,
    sendMessage,
    inputValue,
    setInputValue,
    clearConversation,
  } = useAssistantStore()

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isStreaming = !!streamingMessageId

  const agent = AGENTS.find((a) => a.id === activeAgentId)
  const currentMessages = messages[activeAgentId] ?? []
  const suggestions = SUGGESTED_PROMPTS[activeAgentId] ?? []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentMessages.length, streamingMessageId])

  const handleSend = () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isStreaming) return
    sendMessage(trimmed)
    setInputValue("")
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#FAFAF9]">
      {/* Topbar */}
      <div className="flex h-14 items-center justify-between border-b border-[#E8E6E1] bg-white px-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold text-white"
            style={{ background: agent?.color ?? "#4F46E5" }}
          >
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#18181B]">{agent?.name ?? "AI Agent"}</p>
            <p className="text-[11px] text-[#A1A1AA]">{agent?.role}</p>
          </div>
          {isStreaming && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#EEF2FF] px-2.5 py-1">
              <Loader2 className="h-3 w-3 animate-spin text-[#4F46E5]" />
              <span className="text-[10px] font-medium text-[#4F46E5]">Thinking…</span>
            </div>
          )}
        </div>
        {currentMessages.length > 0 && (
          <button
            onClick={() => clearConversation(activeAgentId)}
            className="flex items-center gap-1.5 text-xs text-[#A1A1AA] transition-colors hover:text-[#52525B]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        <AnimatePresence initial={false}>
          {currentMessages.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full flex-col items-center justify-center gap-6 py-16 text-center"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg"
                style={{ background: agent?.color ?? "#4F46E5" }}
              >
                <Sparkles className="h-8 w-8" />
              </div>
              <div>
                <p className="font-display text-xl text-[#18181B]">{agent?.name}</p>
                <p className="mt-1.5 max-w-xs text-sm text-[#52525B]">{agent?.role}</p>
                <p className="mt-1 text-xs text-[#A1A1AA]">
                  Boundary: {agent?.boundary}
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
                  Try asking…
                </p>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setInputValue(s); inputRef.current?.focus() }}
                    className="rounded-xl border border-[#E8E6E1] bg-white px-4 py-2.5 text-left text-sm text-[#52525B] transition-all hover:border-[#4F46E5]/30 hover:bg-[#EEF2FF] hover:text-[#4F46E5]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            currentMessages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                agentColor={agent?.color ?? "#4F46E5"}
              />
            ))
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="border-t border-[#E8E6E1] bg-white p-4">
        <div className="flex items-end gap-3 rounded-xl border border-[#E8E6E1] bg-[#FAFAF9] px-4 py-3 focus-within:border-[#4F46E5]/40 focus-within:ring-2 focus-within:ring-[#4F46E5]/10 transition-all">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${agent?.name ?? "the agent"} anything… (⏎ to send, ⇧⏎ for newline)`}
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-[#18181B] placeholder:text-[#A1A1AA] outline-none"
            style={{ maxHeight: "120px", overflowY: "auto" }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isStreaming}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all",
              inputValue.trim() && !isStreaming
                ? "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
                : "bg-[#F4F4F2] text-[#A1A1AA]"
            )}
          >
            {isStreaming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="mt-2 text-center font-mono text-[10px] text-[#A1A1AA]">
          SERA Neural Labs · Responses are AI-generated · Always verify critical information
        </p>
      </div>
    </div>
  )
}
