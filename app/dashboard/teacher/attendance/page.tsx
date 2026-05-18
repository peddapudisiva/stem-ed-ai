"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Download, Save, AlertTriangle, CheckCircle2,
  Users, ChevronDown, CalendarDays
} from "lucide-react"
import { cn } from "@/lib/utils"
import { COURSES, CLASS_ROSTER, ATTENDANCE_SESSIONS } from "@/lib/demo-data"
import type { AttendanceStatus } from "@/lib/demo-data"

type SessionKey = string

const STATUS_CONFIG: Record<AttendanceStatus, { label: string; short: string; color: string; bg: string }> = {
  present:  { label: "Present",  short: "P", color: "#059669", bg: "#D1FAE5" },
  absent:   { label: "Absent",   short: "A", color: "#DC2626", bg: "#FEE2E2" },
  tardy:    { label: "Tardy",    short: "T", color: "#D97706", bg: "#FEF3C7" },
  excused:  { label: "Excused",  short: "E", color: "#4F46E5", bg: "#EEF2FF" },
  unmarked: { label: "Unmarked", short: "—", color: "#A1A1AA", bg: "#F4F4F2" },
}

const STATUS_ORDER: AttendanceStatus[] = ["present", "absent", "tardy", "excused"]

export default function AttendancePage() {
  const [courseId,    setCourseId]    = useState(COURSES[0].id)
  const [sessionId,   setSessionId]   = useState(ATTENDANCE_SESSIONS[0].id)
  const [saved,       setSaved]       = useState(false)

  // Per-student overrides: merged on top of session records
  const session = ATTENDANCE_SESSIONS.find((s) => s.id === sessionId) ?? ATTENDANCE_SESSIONS[0]
  const [records, setRecords] = useState<Record<string, AttendanceStatus>>(
    () => ({ ...session.records } as Record<string, AttendanceStatus>)
  )

  // When session changes, reset records
  const handleSessionChange = (id: string) => {
    setSessionId(id)
    const s = ATTENDANCE_SESSIONS.find((x) => x.id === id)
    if (s) setRecords({ ...s.records } as Record<string, AttendanceStatus>)
    setSaved(false)
  }

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setRecords((prev) => ({ ...prev, [studentId]: status }))
    setSaved(false)
  }

  const markAll = (status: AttendanceStatus) => {
    const next: Record<string, AttendanceStatus> = {}
    CLASS_ROSTER.forEach((s) => { next[s.id] = status })
    setRecords(next)
    setSaved(false)
  }

  const handleSave = () => setSaved(true)

  // Stats
  const counts = useMemo(() => {
    let present = 0, absent = 0, tardy = 0, excused = 0
    CLASS_ROSTER.forEach((s) => {
      const r = records[s.id] ?? "unmarked"
      if (r === "present")  present++
      else if (r === "absent")  absent++
      else if (r === "tardy")   tardy++
      else if (r === "excused") excused++
    })
    return { present, absent, tardy, excused }
  }, [records])

  const atRiskStudents = CLASS_ROSTER.filter((s) => s.consecutiveAbsences >= 3)
  const course = COURSES.find((c) => c.id === courseId) ?? COURSES[0]

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {course.title} · {CLASS_ROSTER.length} students
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm text-[#52525B] transition-colors hover:border-[#D6D3CC]">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <button
            onClick={handleSave}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              saved
                ? "bg-[#D1FAE5] text-[#059669] cursor-default"
                : "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
            )}
          >
            {saved ? <><CheckCircle2 className="h-3.5 w-3.5" /> Saved</> : <><Save className="h-3.5 w-3.5" /> Save</>}
          </button>
        </div>
      </div>

      {/* Course + Session selectors */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select value={courseId} onChange={(e) => setCourseId(e.target.value)}
            className="h-9 appearance-none rounded-lg border border-[#E8E6E1] bg-white py-2 pl-3 pr-8 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]">
            {COURSES.map((c) => <option key={c.id} value={c.id}>{c.code} — {c.title}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A1A1AA]" />
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 text-[#A1A1AA]" />
          <div className="flex gap-1.5">
            {ATTENDANCE_SESSIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSessionChange(s.id)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                  sessionId === s.id
                    ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                    : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mark all buttons */}
        <div className="ml-auto flex items-center gap-1.5 text-xs">
          <span className="text-[#A1A1AA]">Mark all:</span>
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              onClick={() => markAll(s)}
              className="rounded border px-2 py-0.5 font-semibold transition-colors"
              style={{
                borderColor: STATUS_CONFIG[s].bg,
                color: STATUS_CONFIG[s].color,
                background: STATUS_CONFIG[s].bg,
              }}
            >
              {STATUS_CONFIG[s].short}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Present",  value: counts.present,  color: "#059669" },
          { label: "Absent",   value: counts.absent,   color: "#DC2626" },
          { label: "Tardy",    value: counts.tardy,    color: "#D97706" },
          { label: "Excused",  value: counts.excused,  color: "#4F46E5" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[#E8E6E1] bg-white px-4 py-3 text-center">
            <p className="font-mono text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="mt-0.5 text-[11px] text-[#A1A1AA]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* 3+ consecutive absence alerts */}
      {atRiskStudents.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-[#FEE2E2] bg-[#FFF5F5] px-4 py-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#DC2626]" />
          <div>
            <p className="text-sm font-semibold text-[#DC2626]">
              {atRiskStudents.length} student{atRiskStudents.length > 1 ? "s" : ""} with 3+ consecutive absences
            </p>
            <p className="mt-0.5 text-xs text-[#DC2626]">
              {atRiskStudents.map((s) => `${s.name} (${s.consecutiveAbsences} consecutive)`).join(" · ")}
              {" — "}Parent notification required per TCSG policy.
            </p>
          </div>
        </div>
      )}

      {/* Roster table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8E6E1] bg-[#FAFAF9]">
                {["Student", "Absences", "Consec.", "Today's Status"].map((h) => (
                  <th key={h} className={cn(
                    "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]",
                    h === "Today's Status" ? "text-right pr-5" : "text-left"
                  )}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F2]">
              {CLASS_ROSTER.map((student, i) => {
                const status = (records[student.id] ?? "unmarked") as AttendanceStatus
                const cfg    = STATUS_CONFIG[status]
                const isAtRisk = student.consecutiveAbsences >= 3
                return (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className={cn("transition-colors hover:bg-[#FAFAF9]", isAtRisk && "bg-[#FFF5F5]")}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        {isAtRisk && <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#DC2626]" />}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-xs font-semibold text-[#52525B]">
                          {student.initials}
                        </div>
                        <div>
                          <p className={cn("text-sm font-medium", isAtRisk ? "text-[#DC2626]" : "text-[#18181B]")}>
                            {student.name}
                          </p>
                          <p className="text-[10px] text-[#A1A1AA]">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "font-mono text-sm font-semibold",
                        student.totalAbsent >= 5 ? "text-[#DC2626]" : student.totalAbsent >= 2 ? "text-[#D97706]" : "text-[#059669]"
                      )}>
                        {student.totalAbsent}
                      </span>
                      <span className="text-xs text-[#A1A1AA]">/{student.totalPresent + student.totalAbsent + student.totalTardy}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "font-mono text-sm font-semibold",
                        student.consecutiveAbsences >= 3 ? "text-[#DC2626]" : "text-[#52525B]"
                      )}>
                        {student.consecutiveAbsences}
                      </span>
                    </td>
                    <td className="px-5 py-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {STATUS_ORDER.map((s) => (
                          <button
                            key={s}
                            onClick={() => setStatus(student.id, s)}
                            className={cn(
                              "h-8 w-8 rounded-lg text-xs font-bold transition-all",
                              status === s
                                ? "scale-110 ring-2 ring-offset-1"
                                : "opacity-40 hover:opacity-100"
                            )}
                            style={
                              status === s
                                ? { background: STATUS_CONFIG[s].bg, color: STATUS_CONFIG[s].color }
                                : { background: "#F4F4F2", color: "#52525B" }
                            }
                            title={STATUS_CONFIG[s].label}
                          >
                            {STATUS_CONFIG[s].short}
                          </button>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      <p className="text-[11px] text-[#A1A1AA]">
        Attendance records sync to Banner SIS · TCSG/SACSCOC compliant export available · Parent alerts sent for 3+ consecutive absences
      </p>
    </div>
  )
}
