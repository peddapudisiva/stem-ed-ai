"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen, Clock, Users, AlertTriangle, CheckCircle2,
  XCircle, Search, Filter, ArrowRight, BarChart2, CalendarDays
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { STUDENT_ENROLLMENTS, ENROLLMENT_CATALOG } from "@/lib/demo-data"
import type { CatalogCourse } from "@/lib/demo-data"

const ADD_DROP_DEADLINE = "May 23, 2026"

const DEPT_OPTIONS = ["All Departments", "Computer Science", "Mathematics", "Nursing", "Engineering", "Business"]
const LEVEL_OPTIONS = ["All Levels", "100", "200", "300", "400"]

const STATUS_STYLE: Record<string, { badge: string; btn: string; label: string }> = {
  enrolled:        { badge: "bg-[#D1FAE5] text-[#059669]", btn: "border-[#D1FAE5] text-[#059669] cursor-default", label: "Enrolled"       },
  open:            { badge: "bg-[#EEF2FF] text-[#4F46E5]", btn: "bg-[#4F46E5] text-white hover:bg-[#4338CA]",      label: "Register"       },
  waitlist:        { badge: "bg-[#FEF3C7] text-[#D97706]", btn: "bg-[#D97706] text-white hover:bg-[#B45309]",      label: "Join Waitlist"  },
  full:            { badge: "bg-[#FEE2E2] text-[#DC2626]", btn: "border-[#E8E6E1] text-[#A1A1AA] cursor-default",  label: "Full"           },
  "prereq-not-met":{ badge: "bg-[#F4F4F2] text-[#A1A1AA]", btn: "border-[#E8E6E1] text-[#A1A1AA] cursor-not-allowed", label: "Prereq not met" },
}

function SeatBar({ enrolled, capacity }: { enrolled: number; capacity: number }) {
  const pct  = Math.round((enrolled / capacity) * 100)
  const left = capacity - enrolled
  const color = left <= 3 ? "#DC2626" : left <= 8 ? "#D97706" : "#059669"
  return (
    <div>
      <div className="flex justify-between text-[10px] text-[#A1A1AA] mb-0.5">
        <span>{left > 0 ? `${left} seat${left > 1 ? "s" : ""} left` : "Full"}</span>
        <span>{enrolled}/{capacity}</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

export default function StudentCoursesPage() {
  const [dept,   setDept]   = useState("All Departments")
  const [level,  setLevel]  = useState("All Levels")
  const [search, setSearch] = useState("")
  const [registered, setRegistered] = useState<Set<string>>(new Set())

  const catalogFiltered = useMemo(() => {
    let list = [...ENROLLMENT_CATALOG]
    if (dept  !== "All Departments") list = list.filter((c) => c.department === dept)
    if (level !== "All Levels")      list = list.filter((c) => c.level === level)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((c) =>
        c.title.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
      )
    }
    return list
  }, [dept, level, search])

  const handleRegister = (course: CatalogCourse) => {
    if (course.prereqMet && course.status !== "full" && course.status !== "enrolled") {
      setRegistered((prev) => new Set([...prev, course.id]))
    }
  }

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">My Courses</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {STUDENT_ENROLLMENTS.length} enrolled · Spring 2026
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-[#FEF3C7] bg-[#FFFBEB] px-3 py-1.5 text-xs text-[#92400E]">
          <AlertTriangle className="h-3.5 w-3.5" />
          Add/Drop closes {ADD_DROP_DEADLINE}
        </div>
      </div>

      <Tabs defaultValue="enrolled">
        <TabsList className="w-full justify-start gap-0 rounded-none border-b border-[#E8E6E1] bg-transparent px-0 h-10">
          <TabsTrigger value="enrolled" className="h-10 rounded-none border-b-2 border-transparent px-4 text-sm data-[state=active]:border-[#4F46E5] data-[state=active]:text-[#4F46E5] data-[state=active]:bg-transparent">
            Enrolled ({STUDENT_ENROLLMENTS.length})
          </TabsTrigger>
          <TabsTrigger value="catalog" className="h-10 rounded-none border-b-2 border-transparent px-4 text-sm data-[state=active]:border-[#4F46E5] data-[state=active]:text-[#4F46E5] data-[state=active]:bg-transparent">
            Course Catalog ({ENROLLMENT_CATALOG.length})
          </TabsTrigger>
        </TabsList>

        {/* ── Enrolled tab ── */}
        <TabsContent value="enrolled" className="mt-5">
          <div className="grid gap-4 lg:grid-cols-2">
            {STUDENT_ENROLLMENTS.map((enr, i) => {
              const attendColor = enr.attendance >= 85 ? "#059669" : enr.attendance >= 70 ? "#D97706" : "#DC2626"
              const gradeColor  = enr.gradePoints >= 80 ? "#059669" : enr.gradePoints >= 70 ? "#D97706" : "#DC2626"
              return (
                <motion.div
                  key={enr.courseId}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="rounded-xl border border-[#E8E6E1] bg-white"
                >
                  {enr.attendance < 75 && (
                    <div className="flex items-center gap-2 border-b border-[#FEE2E2] bg-[#FFF5F5] px-4 py-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-[#DC2626]" />
                      <p className="text-[11px] font-medium text-[#DC2626]">Attendance below 75% — financial aid risk</p>
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
                          <BookOpen className="h-5 w-5 text-[#4F46E5]" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#18181B] truncate">{enr.title}</p>
                          <p className="font-mono text-xs text-[#A1A1AA]">{enr.code} · {enr.credits} cr · §{enr.section}</p>
                        </div>
                      </div>
                      <span className="shrink-0 font-display text-2xl font-bold" style={{ color: gradeColor }}>{enr.grade}</span>
                    </div>

                    {/* KPIs */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[
                        { label: "Grade",      value: `${enr.gradePoints}%`, color: gradeColor },
                        { label: "Attendance", value: `${enr.attendance}%`,  color: attendColor },
                        { label: "Progress",   value: `${enr.progress}%`,    color: "#4F46E5" },
                      ].map((k) => (
                        <div key={k.label} className="rounded-lg bg-[#FAFAF9] px-3 py-2 text-center">
                          <p className="font-mono text-sm font-bold" style={{ color: k.color }}>{k.value}</p>
                          <p className="text-[10px] text-[#A1A1AA]">{k.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                        <div className="h-full rounded-full bg-[#4F46E5]" style={{ width: `${enr.progress}%` }} />
                      </div>
                    </div>

                    <div className="mt-3 space-y-1 text-xs text-[#A1A1AA]">
                      <div className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{enr.schedule} · {enr.room}</div>
                      <div className="flex items-center gap-1.5"><CalendarDays className="h-3 w-3" />Next: {enr.nextClass}</div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <button className="rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#A1A1AA] transition-colors hover:border-[#DC2626] hover:text-[#DC2626]">
                        Request Drop
                      </button>
                      <Link href={`/dashboard/student/courses/${enr.courseId}`}
                        className="flex items-center gap-1 text-xs font-medium text-[#4F46E5] hover:underline">
                        Details <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </TabsContent>

        {/* ── Catalog tab ── */}
        <TabsContent value="catalog" className="mt-5 space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A1A1AA]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses…"
                className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
              />
            </div>
            <select value={dept} onChange={(e) => setDept(e.target.value)}
              className="h-9 rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm text-[#52525B] outline-none focus:border-[#4F46E5]">
              {DEPT_OPTIONS.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select value={level} onChange={(e) => setLevel(e.target.value)}
              className="h-9 rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm text-[#52525B] outline-none focus:border-[#4F46E5]">
              {LEVEL_OPTIONS.map((l) => <option key={l} value={l}>{l === "All Levels" ? l : `${l}-level`}</option>)}
            </select>
          </div>

          {/* Course rows */}
          <div className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white divide-y divide-[#F4F4F2]">
            {catalogFiltered.map((course, i) => {
              const s = STATUS_STYLE[course.status]
              const alreadyRegistered = registered.has(course.id)
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#4F46E5]">{course.code}</span>
                      <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-semibold", s.badge)}>
                        {alreadyRegistered ? "Registered!" : s.label}
                      </span>
                      <span className="rounded-full bg-[#F4F4F2] px-1.5 py-0.5 font-mono text-[9px] text-[#A1A1AA]">
                        {course.level}-level
                      </span>
                    </div>
                    <p className="mt-1 font-semibold text-[#18181B]">{course.title}</p>
                    <p className="mt-0.5 text-xs text-[#A1A1AA]">{course.instructor} · {course.schedule} · {course.room} · {course.credits} cr</p>
                    <p className="mt-1 text-xs text-[#52525B] line-clamp-1">{course.description}</p>

                    {/* Prereqs */}
                    {course.prereqs.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-[#A1A1AA]">Prereqs:</span>
                        {course.prereqs.map((p) => (
                          <span key={p} className={cn("flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold",
                            course.prereqMet ? "bg-[#D1FAE5] text-[#059669]" : "bg-[#FEE2E2] text-[#DC2626]"
                          )}>
                            {course.prereqMet
                              ? <CheckCircle2 className="h-2.5 w-2.5" />
                              : <XCircle className="h-2.5 w-2.5" />
                            }
                            {p}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-2 max-w-[180px]">
                      <SeatBar enrolled={course.enrolled} capacity={course.capacity} />
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={() => handleRegister(course)}
                      disabled={!course.prereqMet || course.status === "full" || course.status === "enrolled" || alreadyRegistered}
                      className={cn(
                        "rounded-lg border px-4 py-2 text-xs font-semibold transition-colors",
                        alreadyRegistered
                          ? "border-[#D1FAE5] text-[#059669] cursor-default"
                          : s.btn
                      )}
                    >
                      {alreadyRegistered ? "Registered!" : s.label}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <p className="text-[11px] text-[#A1A1AA]">
            Registration subject to advisor approval · Prereqs verified against transcript · Changes sync to Banner SIS
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
