"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft, ArrowRight, CheckCircle2, Sparkles,
  Brain, FileText, BookOpen, Send
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CURRICULUM_STANDARDS } from "@/lib/demo-data"

const STEPS = [
  { label: "Course Info",   icon: FileText },
  { label: "Standards",    icon: BookOpen },
  { label: "AI Review",    icon: Brain },
  { label: "Submit",       icon: Send },
]

const AI_REVIEW_TEXT =
  `Analyzing proposal against ABET, ACM/IEEE, and TCSG standards...\n\n` +
  `**Standards Alignment** — 91/100\n` +
  `The proposed course maps strongly to ABET Outcome 1 (Problem Analysis) and Outcome 2 (Design Solutions). ` +
  `ACM/IEEE CS2023 coverage for Intelligent Systems is thorough. TCSG Standard 6.3 (Workforce Alignment) is ` +
  `well-addressed through the practical lab components.\n\n` +
  `**Strengths**\n` +
  `• Clear, measurable learning outcomes\n` +
  `• Strong industry alignment and workforce relevance\n` +
  `• Assessment rubrics cover formative and summative evaluation\n\n` +
  `**Recommendations**\n` +
  `• Expand ethics/responsible AI content to fully satisfy ABET Outcome 4\n` +
  `• Add explicit prerequisite chain for equitable access\n\n` +
  `**AI Score: 91/100** — Ready for departmental review.`

const DEPARTMENTS = ["Computer Science", "Engineering", "Mathematics", "Nursing", "Business"]

export default function NewProposalPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  // Form state
  const [form, setForm] = useState({
    title: "", code: "", credits: "3", department: "Computer Science", description: "",
  })
  const [selectedStandards, setSelectedStandards] = useState<string[]>([])

  // AI review streaming
  const [reviewText, setReviewText]       = useState("")
  const [reviewComplete, setReviewComplete] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (step === 2 && !reviewComplete) {
      let idx = 0
      intervalRef.current = setInterval(() => {
        idx += 6
        setReviewText(AI_REVIEW_TEXT.slice(0, idx))
        if (idx >= AI_REVIEW_TEXT.length) {
          clearInterval(intervalRef.current!)
          setReviewComplete(true)
        }
      }, 14)
      return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }
  }, [step, reviewComplete])

  function toggleStandard(id: string) {
    setSelectedStandards((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  const canAdvance = step === 0
    ? form.title.trim() && form.code.trim() && form.description.trim()
    : step === 1
    ? selectedStandards.length >= 2
    : step === 2
    ? reviewComplete
    : true

  const byCategory = CURRICULUM_STANDARDS.reduce<Record<string, typeof CURRICULUM_STANDARDS>>((acc, s) => {
    ;(acc[s.category] ??= []).push(s)
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-up">
      {/* Back */}
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-[#52525B] transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to proposals
      </button>

      <div>
        <h1 className="page-title">New Proposal</h1>
        <p className="mt-1 text-sm text-[#52525B]">Submit a new course proposal for committee review</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex flex-1 items-center">
            <div className="flex flex-1 flex-col items-center">
              <div className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all",
                i < step  ? "border-[#4F46E5] bg-[#4F46E5] text-white" :
                i === step ? "border-[#4F46E5] bg-white text-[#4F46E5]" :
                "border-[#E8E6E1] bg-[#FAFAF9] text-[#A1A1AA]"
              )}>
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
              </div>
              <p className={cn("mt-1 text-[10px]", i === step ? "font-semibold text-[#4F46E5]" : i < step ? "text-[#52525B]" : "text-[#A1A1AA]")}>
                {s.label}
              </p>
            </div>
            {i < STEPS.length - 1 && <div className={cn("mb-4 h-px flex-1", i < step ? "bg-[#4F46E5]" : "bg-[#E8E6E1]")} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6"
        >
          {/* Step 0: Course Info */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-[#18181B]">Course Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#52525B]">Course Title *</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. AI Systems Engineering"
                    className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#52525B]">Course Code *</label>
                  <input
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    placeholder="e.g. ENGR 4850"
                    className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#52525B]">Credit Hours</label>
                  <select
                    value={form.credits}
                    onChange={(e) => setForm({ ...form, credits: e.target.value })}
                    className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm outline-none focus:border-[#4F46E5]"
                  >
                    {["1","2","3","4","5"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#52525B]">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm outline-none focus:border-[#4F46E5]"
                  >
                    {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#52525B]">Description & Objectives *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  placeholder="Describe the course content, objectives, and how it fits the program of study…"
                  className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm outline-none resize-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
                />
              </div>
            </div>
          )}

          {/* Step 1: Standards */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-semibold text-[#18181B]">Standards Alignment</h2>
                <p className="mt-0.5 text-xs text-[#52525B]">Select at least 2 standards this course addresses.</p>
              </div>
              {Object.entries(byCategory).map(([category, standards]) => (
                <div key={category}>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">{category}</p>
                  <div className="space-y-1.5">
                    {standards.map((std) => (
                      <button
                        key={std.id}
                        onClick={() => toggleStandard(std.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-xs transition-all",
                          selectedStandards.includes(std.id)
                            ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                            : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
                        )}
                      >
                        <div className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                          selectedStandards.includes(std.id) ? "border-[#4F46E5] bg-[#4F46E5]" : "border-[#D6D3CC]"
                        )}>
                          {selectedStandards.includes(std.id) && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
                        </div>
                        {std.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-[11px] text-[#A1A1AA]">{selectedStandards.length} selected · minimum 2 required</p>
            </div>
          )}

          {/* Step 2: AI Review */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2FF]">
                  <Sparkles className="h-4 w-4 text-[#4F46E5]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#18181B]">Curriculum Architect AI Review</h2>
                  <p className="text-xs text-[#A1A1AA]">Analyzing against ABET, ACM/IEEE, and TCSG standards</p>
                </div>
              </div>
              <div className="rounded-lg border border-[#E8E6E1] bg-[#FAFAF9] p-4 font-mono text-xs text-[#52525B] leading-relaxed whitespace-pre-wrap min-h-[180px]">
                {reviewText}
                {!reviewComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.7 }}
                    className="inline-block w-0.5 h-3.5 bg-[#4F46E5] ml-0.5 align-middle"
                  />
                )}
              </div>
              {reviewComplete && (
                <div className="flex items-center gap-2 rounded-lg bg-[#D1FAE5] px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-[#059669]" />
                  <p className="text-xs font-medium text-[#059669]">AI review complete — proposal is ready for submission</p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Submit */}
          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D1FAE5]">
                  <CheckCircle2 className="h-8 w-8 text-[#059669]" />
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-[#18181B]">Ready to Submit</h2>
                <p className="mt-1 text-sm text-[#52525B]">
                  Your proposal <span className="font-medium">&ldquo;{form.title || "Untitled Course"}&rdquo;</span> will
                  enter the departmental review workflow. You will receive notifications at each approval stage.
                </p>
              </div>
              <div className="rounded-lg border border-[#E8E6E1] bg-[#FAFAF9] p-4 text-left text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div><span className="text-[#A1A1AA]">Title:</span> <span className="font-medium text-[#18181B]">{form.title}</span></div>
                  <div><span className="text-[#A1A1AA]">Code:</span> <span className="font-medium text-[#18181B]">{form.code}</span></div>
                  <div><span className="text-[#A1A1AA]">Credits:</span> <span className="font-medium text-[#18181B]">{form.credits}</span></div>
                  <div><span className="text-[#A1A1AA]">Department:</span> <span className="font-medium text-[#18181B]">{form.department}</span></div>
                  <div><span className="text-[#A1A1AA]">Standards:</span> <span className="font-medium text-[#18181B]">{selectedStandards.length} selected</span></div>
                  <div><span className="text-[#A1A1AA]">AI Score:</span> <span className="font-semibold text-[#059669]">91/100</span></div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-4 py-2 text-sm text-[#52525B] transition-colors hover:border-[#D6D3CC] disabled:opacity-40"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance}
            className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA] disabled:opacity-40"
          >
            Continue <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            onClick={() => router.push("/dashboard/curriculum/proposals")}
            className="flex items-center gap-1.5 rounded-lg bg-[#059669] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#047857]"
          >
            <Send className="h-3.5 w-3.5" /> Submit Proposal
          </button>
        )}
      </div>

      <p className="text-center text-[11px] text-[#A1A1AA]">
        AI analysis is advisory · Final submission requires human review and approval
      </p>
    </div>
  )
}
