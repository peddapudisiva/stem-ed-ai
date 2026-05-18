"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Brain, ArrowRight, Sparkles, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const QUICK_PROMPTS = [
  "Explain recursion with a real example",
  "Help me understand integration by parts",
  "What is gradient descent?",
  "Review my CS 1010 assignment approach",
]

export function AiTutorWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="relative overflow-hidden rounded-xl border border-[#4F46E5]/20 bg-gradient-to-br from-[#EEF2FF] via-white to-white p-6 transition-all hover:border-[#4F46E5]/40 hover:-translate-y-px"
    >
      {/* Subtle orb */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #4F46E5, transparent)", filter: "blur(40px)" }}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4F46E5]">
              <Brain className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#18181B]">AI Tutor</p>
              <p className="flex items-center gap-1 text-[11px] text-[#059669]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
                Online · Ready to help
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/student/tutor"
            className="flex items-center gap-1 text-xs font-medium text-[#4F46E5] hover:underline"
          >
            Open chat <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <p className="mt-4 text-sm text-[#52525B]">
          Your personal AI tutor is ready. Ask anything about your courses.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {QUICK_PROMPTS.map((prompt) => (
            <Link
              key={prompt}
              href={`/dashboard/student/tutor?q=${encodeURIComponent(prompt)}`}
              className={cn(
                "flex items-start gap-2 rounded-lg border border-[#E8E6E1] bg-white px-3 py-2.5 text-left transition-all",
                "text-xs text-[#52525B] hover:border-[#4F46E5]/30 hover:bg-[#EEF2FF] hover:text-[#4F46E5]"
              )}
            >
              <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {prompt}
            </Link>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-[#A1A1AA]">
          <Sparkles className="h-3 w-3" />
          Powered by SERA Tutor Agent · FERPA compliant · Does NOT grade work
        </div>
      </div>
    </motion.div>
  )
}
