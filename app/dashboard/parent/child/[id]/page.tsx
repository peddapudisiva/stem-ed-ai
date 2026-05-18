"use client"

import { use } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft, AlertTriangle, CheckCircle2, GraduationCap,
  CalendarDays, MessageSquare, DollarSign, User, Brain
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PARENT_CHILDREN, PARENT_MESSAGES } from "@/lib/demo-data"

const MOCK_GRADES = [
  { course: "Clinical Fundamentals", grade: "C+", pct: 74, status: "warning" as const },
  { course: "Anatomy & Physiology",  grade: "D",  pct: 62, status: "danger"  as const },
  { course: "Medical Terminology",   grade: "B-", pct: 80, status: "ok"      as const },
]

const MOCK_GRADES_GOOD = [
  { course: "Introduction to Programming", grade: "A",  pct: 97, status: "ok"      as const },
  { course: "Data Structures",            grade: "A-", pct: 92, status: "ok"      as const },
  { course: "Calculus I",                 grade: "B+", pct: 87, status: "ok"      as const },
]

export default function ChildDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const child    = PARENT_CHILDREN.find((c) => c.id === id)
  const messages = PARENT_MESSAGES.filter((m) => m.childId === id)

  if (!child) {
    return (
      <div className="space-y-4 animate-fade-up">
        <Link href="/dashboard/parent" className="flex items-center gap-1.5 text-sm text-[#A1A1AA] hover:text-[#52525B]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
        <div className="rounded-xl border border-[#E8E6E1] bg-white py-16 text-center text-sm text-[#A1A1AA]">
          Student not found.
        </div>
      </div>
    )
  }

  const grades    = child.status === "at-risk" ? MOCK_GRADES : MOCK_GRADES_GOOD
  const isAtRisk  = child.status === "at-risk"

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Back + header */}
      <div>
        <Link href="/dashboard/parent" className="flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-[#52525B] transition-colors mb-3">
          <ArrowLeft className="h-3.5 w-3.5" /> All students
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-bold text-xl",
              isAtRisk ? "bg-[#FEE2E2] text-[#DC2626]" : "bg-[#D1FAE5] text-[#059669]"
            )}>
              {child.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#18181B]">{child.name}</h1>
              <p className="text-sm text-[#52525B]">{child.program} · {child.grade} · {child.school}</p>
              <p className="mt-0.5 text-xs text-[#A1A1AA]">Advisor: {child.advisor}</p>
            </div>
          </div>
          <Link href="/assistant" className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]">
            <Brain className="h-3.5 w-3.5" /> Ask AI Advisor
          </Link>
        </div>
      </div>

      {/* At-risk banner */}
      {isAtRisk && (
        <div className="flex items-start gap-3 rounded-xl border border-[#FEE2E2] bg-[#FFF5F5] px-4 py-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#DC2626]" />
          <div>
            <p className="text-sm font-semibold text-[#DC2626]">Action Required</p>
            <p className="mt-0.5 text-xs text-[#DC2626]">
              {child.name.split(" ")[0]}&apos;s attendance is {child.attendance}% (below the 75% threshold) and financial aid is on hold.
              Contact the Financial Aid office and {child.advisor} immediately.
            </p>
          </div>
        </div>
      )}

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "GPA",        value: child.gpa.toFixed(1),    color: child.gpa >= 3.0 ? "#059669" : "#DC2626" },
          { label: "Attendance", value: `${child.attendance}%`,  color: child.attendance >= 75 ? "#059669" : "#DC2626" },
          { label: "Risk Score", value: child.riskScore,          color: child.riskScore >= 70 ? "#DC2626" : child.riskScore >= 40 ? "#D97706" : "#059669" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-[#E8E6E1] bg-white p-4 text-center">
            <p className="font-mono text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
            <p className="mt-0.5 text-[11px] text-[#A1A1AA]">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Grades + attendance */}
        <div className="lg:col-span-2 space-y-5">

          {/* Current grades */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="flex items-center gap-2 border-b border-[#E8E6E1] px-5 py-3.5">
              <GraduationCap className="h-4 w-4 text-[#52525B]" />
              <p className="text-sm font-semibold text-[#18181B]">Current Grades</p>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {grades.map((g, i) => (
                <motion.div key={g.course} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-5 py-3.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#18181B]">{g.course}</p>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                      <div className="h-full rounded-full" style={{
                        width: `${g.pct}%`,
                        background: g.status === "ok" ? "#059669" : g.status === "warning" ? "#D97706" : "#DC2626"
                      }} />
                    </div>
                  </div>
                  <span className={cn("shrink-0 font-mono text-sm font-bold",
                    g.status === "ok" ? "text-[#059669]" : g.status === "warning" ? "text-[#D97706]" : "text-[#DC2626]"
                  )}>
                    {g.grade}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-[#A1A1AA]">{g.pct}%</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Messages for this child */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="flex items-center gap-2 border-b border-[#E8E6E1] px-5 py-3.5">
              <MessageSquare className="h-4 w-4 text-[#52525B]" />
              <p className="text-sm font-semibold text-[#18181B]">Messages</p>
              {messages.filter((m) => !m.read).length > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#DC2626] px-1 text-[10px] font-bold text-white">
                  {messages.filter((m) => !m.read).length}
                </span>
              )}
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {messages.length === 0 && (
                <p className="px-5 py-8 text-center text-sm text-[#A1A1AA]">No messages.</p>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={cn("px-5 py-4 transition-colors hover:bg-[#FAFAF9]", !msg.read && "bg-[#FAFAF9]")}>
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm", !msg.read ? "font-semibold text-[#18181B]" : "text-[#52525B]")}>{msg.subject}</p>
                    <span className="shrink-0 text-[11px] text-[#A1A1AA]">{msg.time}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-[#A1A1AA]">{msg.from}</p>
                  <p className="mt-1 text-xs text-[#52525B]">{msg.preview}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Info + Financial Aid */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Student Info</p>
            <div className="space-y-2.5">
              {[
                { label: "School",    value: child.school,   icon: GraduationCap },
                { label: "Program",   value: child.program,  icon: GraduationCap },
                { label: "Advisor",   value: child.advisor,  icon: User },
                { label: "Next Class",value: child.nextClass, icon: CalendarDays },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-start gap-2 text-xs">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" />
                  <div>
                    <p className="text-[10px] text-[#A1A1AA]">{label}</p>
                    <p className="font-medium text-[#52525B]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-4 w-4 text-[#B8860B]" />
              <p className="text-sm font-semibold text-[#18181B]">Financial Aid</p>
            </div>
            <div className={cn("rounded-lg border px-3 py-2.5",
              child.aid === "Hold" ? "border-[#FEE2E2] bg-[#FFF5F5]" : "border-[#D1FAE5] bg-[#F0FDF4]"
            )}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#18181B]">Spring 2026 Aid</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  child.aid === "Hold" ? "bg-[#FEE2E2] text-[#DC2626]" : "bg-[#D1FAE5] text-[#059669]"
                )}>{child.aid}</span>
              </div>
              {child.aid === "Hold" && (
                <p className="mt-1.5 text-[11px] text-[#DC2626]">
                  Submit Form FA-20 by May 25 to restore aid. Contact the Financial Aid office at ext. 4102.
                </p>
              )}
            </div>
            {child.aid === "Hold" && (
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#A1A1AA]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#A1A1AA]" />
                <span>Previous semesters: Aid Active</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
