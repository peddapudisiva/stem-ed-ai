"use client"

import { use, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen, Clock, CalendarDays, Download, Play, FileText,
  Archive, FileSpreadsheet, FileVideo, ChevronLeft, Users,
  ClipboardList, AlertTriangle, ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  COURSES, STUDENT_ENROLLMENTS, COURSE_FILES, ASSESSMENTS,
} from "@/lib/demo-data"
import type { CourseFileType } from "@/lib/demo-data"

const FILE_ICON: Record<CourseFileType, { icon: React.ElementType; color: string; bg: string }> = {
  pdf:     { icon: FileText,        color: "#DC2626", bg: "#FEE2E2" },
  pptx:    { icon: FileText,        color: "#D97706", bg: "#FEF3C7" },
  docx:    { icon: FileText,        color: "#2563EB", bg: "#DBEAFE" },
  mp4:     { icon: FileVideo,       color: "#7C3AED", bg: "#EDE9FE" },
  youtube: { icon: Play,            color: "#DC2626", bg: "#FEE2E2" },
  zip:     { icon: Archive,         color: "#52525B", bg: "#F4F4F2" },
  xlsx:    { icon: FileSpreadsheet, color: "#059669", bg: "#D1FAE5" },
}

function FileRow({ file, index }: { file: (typeof COURSE_FILES)[0]; index: number }) {
  const [playing, setPlaying] = useState(false)
  const cfg = FILE_ICON[file.type]
  const Icon = cfg.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      {playing && file.youtubeId ? (
        <div className="rounded-xl overflow-hidden border border-[#E8E6E1]">
          <div className="flex items-center justify-between bg-[#18181B] px-4 py-2">
            <p className="text-sm font-medium text-white truncate">{file.name}</p>
            <button onClick={() => setPlaying(false)} className="text-xs text-[#A1A1AA] hover:text-white">
              Close
            </button>
          </div>
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${file.youtubeId}?autoplay=1`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-[#E8E6E1] bg-white px-4 py-3 transition-all hover:border-[#D6D3CC] hover:-translate-y-px">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: cfg.bg }}>
            <Icon className="h-4 w-4" style={{ color: cfg.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-[#18181B]">{file.name}</p>
            <p className="text-[11px] text-[#A1A1AA]">
              {file.size ? `${file.size} · ` : ""}Uploaded {file.uploadedAt}
              {file.week != null ? ` · Week ${file.week}` : ""}
            </p>
          </div>
          {file.type === "youtube" ? (
            <button
              onClick={() => setPlaying(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#DC2626] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#B91C1C]"
            >
              <Play className="h-3 w-3" /> Watch
            </button>
          ) : (
            <button className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] hover:border-[#D6D3CC]">
              <Download className="h-3 w-3" /> Download
            </button>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default function StudentCourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const course     = COURSES.find((c) => c.id === id)
  const enrollment = STUDENT_ENROLLMENTS.find((e) => e.courseId === id)
  const files      = COURSE_FILES.filter((f) => f.courseId === id)
  const assessments = ASSESSMENTS.filter((a) => a.courseId === id && a.status !== "draft")

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center animate-fade-up">
        <BookOpen className="h-10 w-10 text-[#A1A1AA]" />
        <p className="font-semibold text-[#18181B]">Course not found</p>
        <Link href="/dashboard/student/courses" className="text-sm text-[#4F46E5] hover:underline">
          Back to my courses
        </Link>
      </div>
    )
  }

  const gradeColor = (enrollment?.gradePoints ?? 0) >= 80 ? "#059669"
    : (enrollment?.gradePoints ?? 0) >= 70 ? "#D97706" : "#DC2626"
  const attendColor = (enrollment?.attendance ?? 0) >= 85 ? "#059669"
    : (enrollment?.attendance ?? 0) >= 70 ? "#D97706" : "#DC2626"

  // Group files by week
  const byWeek = files.reduce<Record<number, typeof files>>((acc, f) => {
    const w = f.week ?? 0
    if (!acc[w]) acc[w] = []
    acc[w].push(f)
    return acc
  }, {})
  const weeks = Object.keys(byWeek).map(Number).sort((a, b) => b - a)

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Back + header */}
      <div>
        <Link
          href="/dashboard/student/courses"
          className="mb-3 flex items-center gap-1 text-xs text-[#A1A1AA] hover:text-[#52525B]"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> My Courses
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
              <BookOpen className="h-6 w-6 text-[#4F46E5]" />
            </div>
            <div>
              <h1 className="page-title">{course.title}</h1>
              <p className="mt-0.5 font-mono text-xs text-[#A1A1AA]">
                {course.code} · {course.credits} credits · {course.instructor}
              </p>
            </div>
          </div>
          {enrollment && (
            <span className="font-display text-3xl font-bold shrink-0" style={{ color: gradeColor }}>
              {enrollment.grade}
            </span>
          )}
        </div>
      </div>

      {/* KPI strip */}
      {enrollment && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Grade",      value: `${enrollment.gradePoints}%`, color: gradeColor },
            { label: "Attendance", value: `${enrollment.attendance}%`,  color: attendColor },
            { label: "Progress",   value: `${enrollment.progress}%`,    color: "#4F46E5"  },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border border-[#E8E6E1] bg-white px-4 py-3 text-center">
              <p className="font-mono text-xl font-bold" style={{ color: k.color }}>{k.value}</p>
              <p className="text-[11px] text-[#A1A1AA]">{k.label}</p>
            </div>
          ))}
        </div>
      )}

      <Tabs defaultValue="materials">
        <TabsList className="w-full justify-start gap-0 rounded-none border-b border-[#E8E6E1] bg-transparent px-0 h-10">
          {[
            { value: "materials",   label: `Materials (${files.length})` },
            { value: "assessments", label: `Assessments (${assessments.length})` },
            { value: "overview",    label: "Overview" },
          ].map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="h-10 rounded-none border-b-2 border-transparent px-4 text-sm data-[state=active]:border-[#4F46E5] data-[state=active]:text-[#4F46E5] data-[state=active]:bg-transparent"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Materials tab ── */}
        <TabsContent value="materials" className="mt-5">
          {files.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#A1A1AA]">No materials uploaded yet.</div>
          ) : (
            <div className="space-y-6">
              {weeks.map((week) => (
                <div key={week}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">
                    {week === 0 ? "General" : `Week ${week}`}
                  </p>
                  <div className="space-y-2.5">
                    {byWeek[week].map((f, i) => <FileRow key={f.id} file={f} index={i} />)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ── Assessments tab ── */}
        <TabsContent value="assessments" className="mt-5">
          {assessments.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#A1A1AA]">No active assessments.</div>
          ) : (
            <div className="space-y-3">
              {assessments.map((a, i) => {
                const typeColor = a.type === "exam" ? "#DC2626" : a.type === "quiz" ? "#4F46E5" : "#D97706"
                const typeBg   = a.type === "exam" ? "#FEE2E2" : a.type === "quiz" ? "#EEF2FF" : "#FEF3C7"
                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 rounded-xl border border-[#E8E6E1] bg-white px-5 py-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: typeBg }}>
                      <ClipboardList className="h-4 w-4" style={{ color: typeColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#18181B]">{a.title}</p>
                      <p className="mt-0.5 text-xs text-[#A1A1AA]">
                        <span className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold mr-1.5" style={{ background: typeBg, color: typeColor }}>
                          {a.type.toUpperCase()}
                        </span>
                        {a.totalQuestions} questions · {a.maxPoints} pts
                        {a.timeLimit > 0 && ` · ${a.timeLimit} min`}
                        {" · Due "}{a.dueDate}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/student/assessment/${a.id}`}
                      className="shrink-0 rounded-lg bg-[#4F46E5] px-4 py-2 text-xs font-medium text-white hover:bg-[#4338CA]"
                    >
                      Start
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* ── Overview tab ── */}
        <TabsContent value="overview" className="mt-5">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-4 rounded-xl border border-[#E8E6E1] bg-white p-5">
              <p className="font-semibold text-[#18181B]">Course Details</p>
              <div className="space-y-3 text-sm">
                {[
                  { icon: Users,       label: "Instructor", value: course.instructor },
                  { icon: Clock,       label: "Schedule",   value: enrollment?.schedule ?? "—" },
                  { icon: BookOpen,    label: "Room",       value: enrollment?.room ?? "—" },
                  { icon: CalendarDays,label: "Next class", value: enrollment?.nextClass ?? "—" },
                  { icon: Users,       label: "Enrolled",   value: `${course.enrolled} / ${course.capacity}` },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2.5 text-[#52525B]">
                    <row.icon className="h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" />
                    <span className="text-[#A1A1AA] w-20 shrink-0">{row.label}</span>
                    <span className="font-medium text-[#18181B]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-[#E8E6E1] bg-white p-5">
              <p className="font-semibold text-[#18181B] mb-4">Course Progress</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-[#A1A1AA] mb-1">
                    <span>Progress</span>
                    <span className="font-mono">{enrollment?.progress ?? 0}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                    <div className="h-full rounded-full bg-[#4F46E5]" style={{ width: `${enrollment?.progress ?? 0}%` }} />
                  </div>
                </div>
                {enrollment?.attendance != null && enrollment.attendance < 75 && (
                  <div className="flex items-start gap-2 rounded-lg border border-[#FEE2E2] bg-[#FFF5F5] px-3 py-2">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#DC2626]" />
                    <p className="text-[11px] text-[#DC2626]">
                      Attendance below 75% — financial aid may be at risk. Contact your advisor.
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-[#F4F4F2]">
                <Link
                  href="/dashboard/student/tutor"
                  className="flex items-center gap-1.5 text-sm font-medium text-[#4F46E5] hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Open AI Tutor for this course
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
