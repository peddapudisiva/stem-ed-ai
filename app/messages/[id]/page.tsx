"use client"

import { use, useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Send, CheckCheck, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { CONVERSATIONS, MESSAGES_BY_THREAD, AUTO_REPLIES } from "@/lib/demo-data"
import type { DmMessage } from "@/lib/demo-data"
import { useAuthStore } from "@/lib/auth-store"

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-[#F4F4F2] px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-2 w-2 rounded-full bg-[#A1A1AA]"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

export default function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const user     = useAuthStore((s) => s.user)
  const conv     = CONVERSATIONS.find((c) => c.id === id)

  const [messages, setMessages] = useState<DmMessage[]>(MESSAGES_BY_THREAD[id] ?? [])
  const [input,    setInput]    = useState("")
  const [typing,   setTyping]   = useState(false)
  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return

    const outgoing: DmMessage = {
      id:              `m-out-${Date.now()}`,
      senderName:      user?.name ?? "You",
      senderInitials:  user?.avatarInitials ?? "?",
      content:         text,
      timestamp:       "Just now",
      read:            false,
      fromMe:          true,
    }
    setMessages((prev) => [...prev, outgoing])
    setInput("")
    inputRef.current?.focus()

    // Simulate the other person typing then replying
    setTyping(true)
    const delay = 1500 + Math.random() * 1000
    setTimeout(() => {
      setTyping(false)
      const reply: DmMessage = {
        id:              `m-rep-${Date.now()}`,
        senderName:      conv?.with.name ?? "Unknown",
        senderInitials:  conv?.with.initials ?? "?",
        content:         AUTO_REPLIES[id] ?? AUTO_REPLIES["default"],
        timestamp:       "Just now",
        read:            false,
        fromMe:          false,
      }
      setMessages((prev) => [...prev, reply])
    }, delay)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!conv) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 animate-fade-up">
        <Link href="/messages" className="flex items-center gap-1.5 text-sm text-[#A1A1AA] hover:text-[#52525B]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Messages
        </Link>
        <div className="rounded-xl border border-[#E8E6E1] bg-white py-16 text-center text-sm text-[#A1A1AA]">
          Conversation not found.
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col" style={{ height: "calc(100vh - 112px)" }}>
      {/* Thread header */}
      <div className="flex items-center gap-3 border-b border-[#E8E6E1] bg-white pb-3">
        <Link href="/messages" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#52525B] hover:bg-[#F4F4F2] transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-sm font-semibold text-[#4F46E5]">
          {conv.with.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#18181B]">{conv.with.name}</p>
          <p className="text-[11px] text-[#A1A1AA]">{conv.with.role} · {conv.subject}</p>
        </div>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i < 10 ? i * 0.04 : 0 }}
            className={cn("flex items-end gap-2", msg.fromMe ? "flex-row-reverse" : "flex-row")}
          >
            {/* Avatar — only show on first of consecutive messages from same sender */}
            {!msg.fromMe && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-semibold text-[#4F46E5]">
                {msg.senderInitials}
              </div>
            )}

            <div className={cn("max-w-[72%] space-y-1", msg.fromMe && "items-end flex flex-col")}>
              <div className={cn(
                "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                msg.fromMe
                  ? "rounded-br-sm bg-[#4F46E5] text-white"
                  : "rounded-bl-sm bg-[#F4F4F2] text-[#18181B]"
              )}>
                {msg.content}
              </div>
              <div className={cn("flex items-center gap-1", msg.fromMe ? "flex-row-reverse" : "flex-row")}>
                <span className="text-[10px] text-[#A1A1AA]">{msg.timestamp}</span>
                {msg.fromMe && (
                  msg.read
                    ? <CheckCheck className="h-3 w-3 text-[#4F46E5]" />
                    : <Check className="h-3 w-3 text-[#A1A1AA]" />
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="flex items-end gap-2"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-semibold text-[#4F46E5]">
                {conv.with.initials}
              </div>
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Reply input */}
      <div className="border-t border-[#E8E6E1] bg-white pt-3">
        <div className="flex items-end gap-2 rounded-xl border border-[#E8E6E1] bg-[#FAFAF9] px-3 py-2 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/10 transition-all">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message…  (Enter to send, Shift+Enter for newline)"
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-[#18181B] placeholder:text-[#A1A1AA] outline-none"
            style={{ maxHeight: "120px" }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#4F46E5] text-white transition-colors hover:bg-[#4338CA] disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-[#A1A1AA]">
          Messages are logged per FERPA policy
        </p>
      </div>
    </div>
  )
}
