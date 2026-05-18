"use client"

import { use, useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Clock, ChevronLeft, ChevronRight, CheckCircle2,
  AlertTriangle, Send, BookOpen
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ASSESSMENTS, QUIZ_QUESTIONS } from "@/lib/demo-data"

interface StudentAnswer {
  selectedIndex?: number
  text?: string
}

function TimerBar({ secondsLeft, totalSeconds }: { secondsLeft: number; totalSeconds: number }) {
  const pct = Math.max(0, (secondsLeft / totalSeconds) * 100)
  const color = secondsLeft <= 60 ? "#DC2626" : secondsLeft <= 300 ? "#D97706" : "#4F46E5"
  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  return (
    <div className="flex items-center gap-3">
      <Clock className="h-4 w-4 shrink-0" style={{ color }} />
      <div className="flex-1">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
      </div>
      <span className="font-mono text-sm font-bold tabular-nums" style={{ color }}>
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </span>
    </div>
  )
}

export default function StudentQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

  const assessment = ASSESSMENTS.find((a) => a.id === id)
  const questions  = QUIZ_QUESTIONS.filter((q) => q.assessmentId === id)

  const totalSeconds = (assessment?.timeLimit ?? 20) * 60
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [current,     setCurrent]     = useState(0)
  const [answers,     setAnswers]     = useState<Record<string, StudentAnswer>>({})
  const [submitted,   setSubmitted]   = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (submitted) return
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          handleSubmit(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted])

  const handleSubmit = (auto = false) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setShowConfirm(false)
    setSubmitted(true)
    void auto
  }

  const setMcqAnswer = (qId: string, idx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: { selectedIndex: idx } }))
  }
  const setTextAnswer = (qId: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: { text } }))
  }

  // Score calculation (MCQ only — short answer is unscored in demo)
  const score = questions.reduce((acc, q) => {
    if (q.type === "mcq") {
      const ans = answers[q.id]
      if (ans?.selectedIndex === q.correctIndex) acc += q.points
    }
    return acc
  }, 0)
  const maxMcqPoints = questions.filter((q) => q.type === "mcq").reduce((a, q) => a + q.points, 0)
  const answeredCount = questions.filter((q) => answers[q.id] !== undefined).length

  if (!assessment || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center animate-fade-up">
        <BookOpen className="h-10 w-10 text-[#A1A1AA]" />
        <p className="font-semibold text-[#18181B]">Assessment not found</p>
        <button onClick={() => router.back()} className="text-sm text-[#4F46E5] hover:underline">
          Go back
        </button>
      </div>
    )
  }

  /* ── Results screen ── */
  if (submitted) {
    const pct = Math.round((score / maxMcqPoints) * 100)
    const grade = pct >= 90 ? "A" : pct >= 80 ? "B" : pct >= 70 ? "C" : pct >= 60 ? "D" : "F"
    const color = pct >= 80 ? "#059669" : pct >= 70 ? "#D97706" : "#DC2626"
    return (
      <div className="mx-auto max-w-xl space-y-6 animate-fade-up py-8">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1,    opacity: 1 }}
          className="rounded-2xl border border-[#E8E6E1] bg-white p-8 text-center shadow-sm"
        >
          <CheckCircle2 className="mx-auto h-12 w-12" style={{ color }} />
          <p className="mt-4 text-lg font-semibold text-[#18181B]">Quiz Submitted!</p>
          <p className="mt-1 text-sm text-[#A1A1AA]">{assessment.title}</p>

          <div className="mt-6 flex justify-center gap-6">
            <div>
              <p className="font-display text-5xl font-bold" style={{ color }}>{grade}</p>
              <p className="mt-1 text-xs text-[#A1A1AA]">Grade</p>
            </div>
            <div className="w-px bg-[#E8E6E1]" />
            <div>
              <p className="font-mono text-4xl font-bold" style={{ color }}>{pct}%</p>
              <p className="mt-1 text-xs text-[#A1A1AA]">{score}/{maxMcqPoints} pts (MCQ)</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-left">
            {questions.filter((q) => q.type === "mcq").map((q) => {
              const ans = answers[q.id]
              const correct = ans?.selectedIndex === q.correctIndex
              return (
                <div key={q.id} className={cn(
                  "rounded-lg border px-3 py-2",
                  correct ? "border-[#D1FAE5] bg-[#F0FDF4]" : "border-[#FEE2E2] bg-[#FFF5F5]"
                )}>
                  <p className="text-[11px] font-semibold" style={{ color: correct ? "#059669" : "#DC2626" }}>
                    Q{q.number} — {correct ? "Correct" : "Incorrect"}
                  </p>
                  {!correct && (
                    <p className="mt-0.5 text-[10px] text-[#A1A1AA]">
                      Correct: {q.options?.[q.correctIndex ?? 0]}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          <p className="mt-4 text-[11px] text-[#A1A1AA]">
            Short-answer questions will be reviewed by your instructor.
          </p>

          <button
            onClick={() => router.push("/dashboard/student/courses")}
            className="mt-6 rounded-lg bg-[#4F46E5] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
          >
            Back to My Courses
          </button>
        </motion.div>
      </div>
    )
  }

  const q = questions[current]
  const ans = answers[q.id]

  return (
    <div className="mx-auto max-w-2xl space-y-5 animate-fade-up">
      {/* Header */}
      <div>
        <h1 className="page-title">{assessment.title}</h1>
        <p className="mt-1 text-sm text-[#52525B]">
          {assessment.courseCode} · {questions.length} questions · {assessment.timeLimit} min
        </p>
      </div>

      {/* Timer */}
      <div className={cn(
        "rounded-xl border px-4 py-3",
        secondsLeft <= 60 ? "border-[#FEE2E2] bg-[#FFF5F5]" : "border-[#E8E6E1] bg-white"
      )}>
        {secondsLeft <= 60 && (
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#DC2626]">
            <AlertTriangle className="h-3.5 w-3.5" /> Less than 1 minute remaining!
          </div>
        )}
        <TimerBar secondsLeft={secondsLeft} totalSeconds={totalSeconds} />
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-6 w-6 rounded-full text-[10px] font-bold transition-all",
              i === current
                ? "bg-[#4F46E5] text-white scale-110"
                : answers[questions[i].id] !== undefined
                  ? "bg-[#D1FAE5] text-[#059669]"
                  : "bg-[#F4F4F2] text-[#A1A1AA]"
            )}
          >
            {i + 1}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#A1A1AA]">
          {answeredCount}/{questions.length} answered
        </span>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6"
        >
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#A1A1AA]">
                Question {q.number} of {questions.length}
              </span>
              <p className="mt-2 text-base font-medium text-[#18181B] leading-relaxed">
                {q.text}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[#EEF2FF] px-2 py-0.5 font-mono text-[11px] text-[#4F46E5]">
              {q.points} pts
            </span>
          </div>

          {/* MCQ options */}
          {q.type === "mcq" && q.options && (
            <div className="space-y-2.5">
              {q.options.map((opt, i) => {
                const selected = ans?.selectedIndex === i
                return (
                  <button
                    key={i}
                    onClick={() => setMcqAnswer(q.id, i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                      selected
                        ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                        : "border-[#E8E6E1] text-[#18181B] hover:border-[#D6D3CC] hover:bg-[#FAFAF9]"
                    )}
                  >
                    <span className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-all",
                      selected
                        ? "border-[#4F46E5] bg-[#4F46E5] text-white"
                        : "border-[#D6D3CC] text-[#A1A1AA]"
                    )}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>
          )}

          {/* Short answer */}
          {q.type === "short_answer" && (
            <textarea
              value={ans?.text ?? ""}
              onChange={(e) => setTextAnswer(q.id, e.target.value)}
              placeholder="Type your answer here…"
              rows={5}
              className="w-full rounded-xl border border-[#E8E6E1] bg-[#FAFAF9] p-3 text-sm text-[#18181B] outline-none placeholder:text-[#A1A1AA] focus:border-[#4F46E5] focus:bg-white focus:ring-2 focus:ring-[#4F46E5]/10 resize-none"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-4 py-2 text-sm text-[#52525B] transition-colors hover:border-[#D6D3CC] disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>

        {current < questions.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
            className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#059669] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#047857]"
          >
            <Send className="h-4 w-4" /> Submit Quiz
          </button>
        )}
      </div>

      {/* Confirm submit dialog */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl border border-[#E8E6E1] bg-white p-6 shadow-xl"
            >
              <p className="font-semibold text-[#18181B]">Submit quiz?</p>
              <p className="mt-1.5 text-sm text-[#52525B]">
                You have answered {answeredCount} of {questions.length} questions.{" "}
                {answeredCount < questions.length && (
                  <span className="text-[#D97706]">
                    {questions.length - answeredCount} unanswered.{" "}
                  </span>
                )}
                You cannot change your answers after submission.
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 rounded-lg border border-[#E8E6E1] py-2.5 text-sm text-[#52525B] hover:bg-[#FAFAF9]"
                >
                  Keep working
                </button>
                <button
                  onClick={() => handleSubmit(false)}
                  className="flex-1 rounded-lg bg-[#059669] py-2.5 text-sm font-medium text-white hover:bg-[#047857]"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
