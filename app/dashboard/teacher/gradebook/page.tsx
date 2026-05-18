"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  AlertTriangle, Download, Users, TrendingDown,
  ChevronDown, CheckCircle2, Minus
} from "lucide-react"
import { cn } from "@/lib/utils"
import { COURSES, GRADEBOOK_STUDENTS, GRADEBOOK_ASSIGNMENTS } from "@/lib/demo-data"

type GradeKey = "hw1" | "hw2" | "hw3" | "midterm"

function pct(earned: number | null, total: number) {
  if (earned === null) return null
  return Math.round((earned / total) * 100)
}

function studentAvg(s: typeof GRADEBOOK_STUDENTS[0]) {
  const keys: GradeKey[] = ["hw1", "hw2", "hw3", "midterm"]
  const pts = GRADEBOOK_ASSIGNMENTS
  let earned = 0, total = 0
  for (const a of pts) {
    const v = s[a.id as GradeKey]
    if (v !== null && v !== undefined) {
      earned += v as number
      total += a.points
    }
  }
  if (total === 0) return null
  return Math.round((earned / total) * 100)
}

function GradeCell({ value, total }: { value: number | null | undefined; total: number }) {
  if (value === null || value === undefined) {
    return <span className="text-[#A1A1AA]">—</span>
  }
  const p = pct(value, total)!
  return (
    <span className={cn(
      "font-mono text-xs font-semibold",
      p >= 80 ? "text-[#059669]" : p >= 60 ? "text-[#D97706]" : "text-[#DC2626]"
    )}>
      {value}/{total}
    </span>
  )
}

export default function GradebookPage() {
  const [selectedCourse, setSelectedCourse] = useState("cs101")
  const course = COURSES.find((c) => c.id === selectedCourse) ?? COURSES[0]

  const classAvg = Math.round(
    GRADEBOOK_STUDENTS.reduce((sum, s) => sum + (studentAvg(s) ?? 0), 0) /
    GRADEBOOK_STUDENTS.filter((s) => studentAvg(s) !== null).length
  )

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Gradebook</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {course.title} · {GRADEBOOK_STUDENTS.length} students · Class avg {classAvg}%
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Course picker */}
          <div className="relative">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="appearance-none rounded-lg border border-[#E8E6E1] bg-white py-2 pl-3 pr-8 text-sm text-[#18181B] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
            >
              {COURSES.map((c) => (
                <option key={c.id} value={c.id}>{c.code} — {c.title}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A1A1AA]" />
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] bg-white px-3 py-2 text-sm text-[#52525B] transition-colors hover:border-[#D6D3CC]">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Class average", value: `${classAvg}%`, color: classAvg >= 80 ? "#059669" : "#D97706" },
          { label: "Students enrolled", value: GRADEBOOK_STUDENTS.length.toString(), color: "#4F46E5" },
          { label: "At-risk", value: GRADEBOOK_STUDENTS.filter((s) => s.atRisk).length.toString(), color: "#DC2626" },
          { label: "Assignments", value: GRADEBOOK_ASSIGNMENTS.length.toString(), color: "#52525B" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-[#E8E6E1] bg-white px-4 py-3">
            <p className="font-display text-2xl font-semibold" style={{ color: item.color }}>{item.value}</p>
            <p className="mt-0.5 text-xs text-[#A1A1AA]">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Grade table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8E6E1] bg-[#FAFAF9]">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">
                  Student
                </th>
                {GRADEBOOK_ASSIGNMENTS.map((a) => (
                  <th key={a.id} className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">
                    <div>{a.title.replace("Midterm Exam", "Midterm").split("—")[0].trim()}</div>
                    <div className="font-mono text-[9px] text-[#D6D3CC]">/{a.points}pts · {a.dueDate}</div>
                  </th>
                ))}
                <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">
                  Overall
                </th>
                <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">
                  Attend.
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F2]">
              {GRADEBOOK_STUDENTS.map((student, i) => {
                const avg = studentAvg(student)
                return (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn(
                      "group transition-colors hover:bg-[#FAFAF9]",
                      student.atRisk && "bg-[#FFF5F5]"
                    )}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        {student.atRisk && (
                          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#DC2626]" />
                        )}
                        <div>
                          <p className={cn("font-medium", student.atRisk ? "text-[#DC2626]" : "text-[#18181B]")}>
                            {student.name}
                          </p>
                          {student.atRisk && (
                            <p className="text-[10px] text-[#DC2626]">At risk</p>
                          )}
                        </div>
                      </div>
                    </td>
                    {GRADEBOOK_ASSIGNMENTS.map((a) => (
                      <td key={a.id} className="px-4 py-3 text-center">
                        <GradeCell value={student[a.id as GradeKey] as number | null} total={a.points} />
                      </td>
                    ))}
                    <td className="px-5 py-3 text-center">
                      {avg !== null ? (
                        <span className={cn(
                          "rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold",
                          avg >= 80 ? "bg-[#D1FAE5] text-[#059669]" :
                          avg >= 60 ? "bg-[#FEF3C7] text-[#D97706]" :
                          "bg-[#FEE2E2] text-[#DC2626]"
                        )}>
                          {avg}%
                        </span>
                      ) : (
                        <span className="text-[#A1A1AA]">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className={cn(
                        "font-mono text-xs",
                        student.attendance >= 85 ? "text-[#059669]" :
                        student.attendance >= 70 ? "text-[#D97706]" :
                        "text-[#DC2626] font-semibold"
                      )}>
                        {student.attendance}%
                      </span>
                    </td>
                  </motion.tr>
                )
              })}

              {/* Class average row */}
              <tr className="border-t-2 border-[#E8E6E1] bg-[#FAFAF9] font-semibold">
                <td className="px-5 py-3 text-xs text-[#A1A1AA] uppercase tracking-widest">
                  Class Average
                </td>
                {GRADEBOOK_ASSIGNMENTS.map((a) => {
                  const vals = GRADEBOOK_STUDENTS
                    .map((s) => s[a.id as GradeKey] as number | null)
                    .filter((v) => v !== null) as number[]
                  const avg = vals.length ? Math.round(vals.reduce((s, v) => s + v, 0) / vals.length) : null
                  return (
                    <td key={a.id} className="px-4 py-3 text-center">
                      {avg !== null ? (
                        <span className="font-mono text-xs text-[#52525B]">{avg}/{a.points}</span>
                      ) : (
                        <span className="text-[#D6D3CC]">—</span>
                      )}
                    </td>
                  )
                })}
                <td className="px-5 py-3 text-center">
                  <span className="font-mono text-sm font-bold text-[#18181B]">{classAvg}%</span>
                </td>
                <td className="px-5 py-3 text-center">
                  <span className="font-mono text-xs text-[#52525B]">
                    {Math.round(GRADEBOOK_STUDENTS.reduce((s, st) => s + st.attendance, 0) / GRADEBOOK_STUDENTS.length)}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="flex items-center gap-4 text-[11px] text-[#A1A1AA]">
        <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#059669]" /> 80%+ passing</div>
        <div className="flex items-center gap-1.5"><Minus className="h-3.5 w-3.5 text-[#D97706]" /> 60–79% needs attention</div>
        <div className="flex items-center gap-1.5"><TrendingDown className="h-3.5 w-3.5 text-[#DC2626]" /> Below 60% at risk</div>
        <span>· Grades sync to Banner SIS on publish</span>
      </div>
    </div>
  )
}
