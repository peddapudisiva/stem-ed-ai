"use client"

import { motion } from "framer-motion"
import { Shield, Cpu, BookOpen, AlertTriangle, Clock, Hash } from "lucide-react"
import { cn } from "@/lib/utils"
import { AGENTS } from "@/lib/demo-data"
import { useAssistantStore } from "@/lib/assistant-store"

const MEMORY_SLOTS = [
  { label: "Student context", value: "Alex Chen · CS Yr2 · GPA 3.7" },
  { label: "Active course", value: "CS 1010 — Introduction to Programming" },
  { label: "Recent topic", value: "Recursion & Stack frames" },
  { label: "Institution", value: "Atlanta Technical College" },
]

export function ContextPanel() {
  const { activeAgentId, messages, multiAgentMode, selectedAgentIds } = useAssistantStore()

  const agent = AGENTS.find((a) => a.id === activeAgentId)
  const currentMessages = messages[activeAgentId] ?? []
  const tokenEstimate = currentMessages.reduce((sum, m) => sum + Math.ceil(m.content.length / 4), 0)

  const activeAgents = multiAgentMode
    ? AGENTS.filter((a) => selectedAgentIds.includes(a.id))
    : agent ? [agent] : []

  return (
    <aside className="flex h-full w-[280px] shrink-0 flex-col border-l border-[#E8E6E1] bg-[#FAFAF9]">
      {/* Header */}
      <div className="border-b border-[#E8E6E1] bg-white px-4 py-3.5">
        <p className="text-sm font-semibold text-[#18181B]">Context</p>
        <p className="mt-0.5 text-[11px] text-[#A1A1AA]">Active session information</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {/* Active agent(s) card */}
        {activeAgents.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-[#E8E6E1] bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white text-[11px] font-bold"
                style={{ background: a.color }}
              >
                {a.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#18181B]">{a.name}</p>
                <p className="mt-0.5 text-[11px] text-[#52525B]">{a.role}</p>
                <div className="mt-1 flex items-center gap-1">
                  <span className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    a.status === "online" ? "bg-[#059669]" : "bg-[#B8860B]"
                  )} />
                  <span className="text-[10px] text-[#A1A1AA]">
                    {a.status === "online" ? "Online" : "Beta"}
                  </span>
                </div>
              </div>
            </div>

            {/* Boundary warning */}
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-[#FEF3C7] bg-[#FFFBEB] px-2.5 py-2">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D97706]" />
              <p className="text-[10px] leading-snug text-[#92400E]">
                <span className="font-semibold">Boundary:</span> {a.boundary}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Session stats */}
        <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
            Session
          </p>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <Hash className="h-3.5 w-3.5 text-[#A1A1AA]" />
              <span className="text-[11px] text-[#52525B]">Messages</span>
              <span className="ml-auto font-mono text-[11px] text-[#18181B]">
                {currentMessages.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-[#A1A1AA]" />
              <span className="text-[11px] text-[#52525B]">~Tokens used</span>
              <span className="ml-auto font-mono text-[11px] text-[#18181B]">
                {tokenEstimate.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-[#A1A1AA]" />
              <span className="text-[11px] text-[#52525B]">Model</span>
              <span className="ml-auto font-mono text-[11px] text-[#18181B]">Llama 3.1 8B</span>
            </div>
          </div>
        </div>

        {/* Memory slots */}
        <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
            Injected Context
          </p>
          <div className="space-y-2">
            {MEMORY_SLOTS.map((slot) => (
              <div key={slot.label} className="rounded-lg bg-[#FAFAF9] px-2.5 py-2">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-[#A1A1AA]">
                  {slot.label}
                </p>
                <p className="mt-0.5 text-[11px] text-[#52525B]">{slot.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-[10px] text-[#A1A1AA]">
            Memory pipeline: user context → RAG → merge → LLM → audit log
          </p>
        </div>

        {/* Compliance */}
        <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-3.5 w-3.5 text-[#059669]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
              Compliance
            </p>
          </div>
          <div className="space-y-1.5">
            {["FERPA compliant", "Data stays in institution", "Every action audit-logged", "No PII sent to external LLMs"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
                <span className="text-[11px] text-[#52525B]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audit log preview */}
        <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
            Recent Audit Log
          </p>
          <div className="space-y-1.5">
            {[
              { time: "09:42", event: "Tutor session started" },
              { time: "09:43", event: "Context injected: student record" },
              { time: "09:43", event: "LLM call initiated (Groq)" },
            ].map((entry) => (
              <div key={entry.event} className="flex items-start gap-2">
                <span className="shrink-0 font-mono text-[10px] text-[#A1A1AA]">{entry.time}</span>
                <span className="text-[10px] text-[#52525B]">{entry.event}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-[#4F46E5] hover:underline cursor-pointer">
            View full audit log →
          </p>
        </div>
      </div>
    </aside>
  )
}
