"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus, Trash2, GripVertical, CheckCircle2, AlignLeft,
  ChevronDown, Clock, Calendar, BookOpen, Save, Eye
} from "lucide-react"
import { cn } from "@/lib/utils"
import { COURSES, ASSESSMENTS } from "@/lib/demo-data"

type QType = "mcq" | "short_answer"

interface BuilderQuestion {
  id:            string
  type:          QType
  text:          string
  options:       string[]
  correctIndex:  number
  points:        number
  rubric:        string
}

const DEFAULT_MCQ: BuilderQuestion = {
  id: "", type: "mcq", text: "", options: ["", "", "", ""], correctIndex: 0, points: 5, rubric: "",
}
const DEFAULT_SA: BuilderQuestion = {
  id: "", type: "short_answer", text: "", options: [], correctIndex: -1, points: 10, rubric: "",
}

let qCounter = 1
function newQ(type: QType): BuilderQuestion {
  return { ...(type === "mcq" ? DEFAULT_MCQ : DEFAULT_SA), id: `q-new-${qCounter++}`, options: type === "mcq" ? ["", "", "", ""] : [] }
}

function QuestionEditor({
  q, index, onChange, onDelete,
}: {
  q: BuilderQuestion
  index: number
  onChange: (updated: BuilderQuestion) => void
  onDelete: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="rounded-xl border border-[#E8E6E1] bg-white"
    >
      {/* Question header */}
      <div className="flex items-center gap-3 border-b border-[#E8E6E1] px-4 py-3">
        <GripVertical className="h-4 w-4 shrink-0 text-[#D6D3CC] cursor-grab" />
        <span className="font-mono text-xs font-semibold text-[#A1A1AA]">Q{index + 1}</span>
        <div className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] bg-[#FAFAF9] px-2 py-1">
          {q.type === "mcq"
            ? <><CheckCircle2 className="h-3 w-3 text-[#4F46E5]" /><span className="text-[10px] font-medium text-[#52525B]">Multiple Choice</span></>
            : <><AlignLeft    className="h-3 w-3 text-[#B8860B]" /><span className="text-[10px] font-medium text-[#52525B]">Short Answer</span></>
          }
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#A1A1AA]">Points:</span>
            <input
              type="number"
              value={q.points}
              onChange={(e) => onChange({ ...q, points: Number(e.target.value) })}
              className="w-14 rounded border border-[#E8E6E1] bg-white px-2 py-1 text-center font-mono text-xs outline-none focus:border-[#4F46E5]"
            />
          </div>
          <button onClick={onDelete} className="text-[#A1A1AA] hover:text-[#DC2626] transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Question text */}
        <textarea
          value={q.text}
          onChange={(e) => onChange({ ...q, text: e.target.value })}
          placeholder="Enter question text…"
          rows={2}
          className="w-full resize-none rounded-lg border border-[#E8E6E1] bg-[#FAFAF9] px-3 py-2 text-sm text-[#18181B] placeholder:text-[#A1A1AA] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
        />

        {/* MCQ options */}
        {q.type === "mcq" && (
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Options (click radio = correct)</p>
            {q.options.map((opt, oi) => (
              <div key={oi} className="flex items-center gap-2">
                <button
                  onClick={() => onChange({ ...q, correctIndex: oi })}
                  className={cn(
                    "h-4 w-4 shrink-0 rounded-full border-2 transition-colors",
                    q.correctIndex === oi
                      ? "border-[#059669] bg-[#059669]"
                      : "border-[#D6D3CC] bg-white"
                  )}
                />
                <input
                  value={opt}
                  onChange={(e) => {
                    const opts = [...q.options]
                    opts[oi] = e.target.value
                    onChange({ ...q, options: opts })
                  }}
                  placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                  className={cn(
                    "flex-1 rounded-lg border px-3 py-1.5 text-sm outline-none transition-colors focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10",
                    q.correctIndex === oi
                      ? "border-[#059669] bg-[#F0FDF4] text-[#059669]"
                      : "border-[#E8E6E1] bg-white text-[#18181B]"
                  )}
                />
              </div>
            ))}
          </div>
        )}

        {/* Short answer rubric */}
        {q.type === "short_answer" && (
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Grading rubric</p>
            <textarea
              value={q.rubric}
              onChange={(e) => onChange({ ...q, rubric: e.target.value })}
              placeholder="Describe what earns full/partial credit…"
              rows={2}
              className="w-full resize-none rounded-lg border border-[#E8E6E1] bg-[#FAFAF9] px-3 py-2 text-sm text-[#18181B] placeholder:text-[#A1A1AA] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function AssessmentBuilderPage() {
  const [title,      setTitle]      = useState("")
  const [courseId,   setCourseId]   = useState(COURSES[0].id)
  const [type,       setType]       = useState<"quiz" | "exam" | "homework">("quiz")
  const [timeLimit,  setTimeLimit]  = useState(20)
  const [dueDate,    setDueDate]    = useState("2026-05-28")
  const [questions,  setQuestions]  = useState<BuilderQuestion[]>([newQ("mcq")])
  const [published,  setPublished]  = useState(false)

  const totalPoints = questions.reduce((s, q) => s + q.points, 0)
  const mcqCount    = questions.filter((q) => q.type === "mcq").length
  const saCount     = questions.filter((q) => q.type === "short_answer").length

  const addQuestion = (t: QType) => setQuestions((prev) => [...prev, newQ(t)])
  const updateQ     = (id: string, updated: BuilderQuestion) =>
    setQuestions((prev) => prev.map((q) => (q.id === id ? updated : q)))
  const deleteQ     = (id: string) =>
    setQuestions((prev) => prev.filter((q) => q.id !== id))

  const handlePublish = () => {
    if (!title.trim() || questions.length === 0) return
    setPublished(true)
    setTimeout(() => setPublished(false), 3000)
  }

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Assessment Builder</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {questions.length} question{questions.length !== 1 ? "s" : ""} · {totalPoints} pts total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm text-[#52525B] transition-colors hover:border-[#D6D3CC]">
            <Eye className="h-3.5 w-3.5" /> Preview
          </button>
          <button
            onClick={handlePublish}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              published
                ? "bg-[#D1FAE5] text-[#059669]"
                : "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
            )}
          >
            {published ? <><CheckCircle2 className="h-3.5 w-3.5" /> Published</> : <><Save className="h-3.5 w-3.5" /> Publish</>}
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        {/* ── Questions column ── */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {questions.map((q, i) => (
              <QuestionEditor
                key={q.id}
                q={q}
                index={i}
                onChange={(updated) => updateQ(q.id, updated)}
                onDelete={() => deleteQ(q.id)}
              />
            ))}
          </AnimatePresence>

          {/* Add question buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => addQuestion("mcq")}
              className="flex items-center gap-1.5 rounded-xl border border-dashed border-[#D6D3CC] px-4 py-2.5 text-sm font-medium text-[#52525B] transition-colors hover:border-[#4F46E5] hover:text-[#4F46E5]"
            >
              <Plus className="h-4 w-4" /> Multiple Choice
            </button>
            <button
              onClick={() => addQuestion("short_answer")}
              className="flex items-center gap-1.5 rounded-xl border border-dashed border-[#D6D3CC] px-4 py-2.5 text-sm font-medium text-[#52525B] transition-colors hover:border-[#B8860B] hover:text-[#B8860B]"
            >
              <Plus className="h-4 w-4" /> Short Answer
            </button>
          </div>
        </div>

        {/* ── Settings sidebar ── */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Assessment Settings</p>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#18181B]">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Quiz 4 — Recursion"
                className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#18181B]">Course</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A1A1AA]" />
                <select value={courseId} onChange={(e) => setCourseId(e.target.value)}
                  className="h-9 w-full appearance-none rounded-lg border border-[#E8E6E1] bg-white pl-9 pr-8 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]">
                  {COURSES.map((c) => <option key={c.id} value={c.id}>{c.code}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A1A1AA]" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#18181B]">Type</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(["quiz", "exam", "homework"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={cn(
                      "rounded-lg border py-1.5 text-xs font-medium capitalize transition-all",
                      type === t
                        ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                        : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#18181B]">
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Time limit (minutes)</span>
              </label>
              <input
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                min={0}
                className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm outline-none focus:border-[#4F46E5]"
              />
              <p className="mt-1 text-[10px] text-[#A1A1AA]">Set 0 for no time limit</p>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#18181B]">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Due date</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm outline-none focus:border-[#4F46E5]"
              />
            </div>
          </div>

          {/* Summary card */}
          <div className="rounded-xl border border-[#E8E6E1] bg-[#FAFAF9] p-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Summary</p>
            {[
              { label: "Questions",   value: questions.length.toString() },
              { label: "MCQ",         value: mcqCount.toString() },
              { label: "Short Answer",value: saCount.toString() },
              { label: "Total Points",value: totalPoints.toString() },
              { label: "Est. Time",   value: type === "quiz" ? `${Math.ceil(questions.length * 1.5)} min` : `${timeLimit} min` },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span className="text-[#A1A1AA]">{label}</span>
                <span className="font-mono font-semibold text-[#18181B]">{value}</span>
              </div>
            ))}
          </div>

          {/* Existing assessments */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Published</p>
            <div className="space-y-2">
              {ASSESSMENTS.filter((a) => a.status !== "draft").map((a) => (
                <div key={a.id} className="flex items-start justify-between gap-2 rounded-lg border border-[#F4F4F2] px-3 py-2">
                  <div>
                    <p className="text-xs font-medium text-[#18181B] leading-snug">{a.title}</p>
                    <p className="text-[10px] text-[#A1A1AA]">{a.courseCode} · {a.submissions} submitted</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#D1FAE5] px-1.5 py-0.5 text-[9px] font-semibold text-[#059669]">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        Published assessments are locked · Grade passback to Banner SIS on close · Submissions use ATC plagiarism detection
      </p>
    </div>
  )
}
