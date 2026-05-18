import type { Metadata } from "next"
import Link from "next/link"
import {
  BookOpen, Users, ArrowRight, ClipboardList,
  MessageSquare, TrendingUp, Clock, CalendarCheck
} from "lucide-react"
import { COURSES } from "@/lib/demo-data"

export const metadata: Metadata = { title: "My Classes — Teacher" }

const COURSE_STATS: Record<string, { avg: number; atRisk: number; pending: number }> = {
  cs101:   { avg: 76, atRisk: 2, pending: 5 },
  math201: { avg: 71, atRisk: 1, pending: 4 },
  engr480: { avg: 83, atRisk: 0, pending: 2 },
  nurs210: { avg: 79, atRisk: 1, pending: 1 },
}

export default function TeacherClassesPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="page-title">My Classes</h1>
        <p className="mt-1 text-sm text-[#52525B]">4 active courses · Spring 2026</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {COURSES.map((course) => {
          const stats = COURSE_STATS[course.id] ?? { avg: 0, atRisk: 0, pending: 0 }
          return (
            <div
              key={course.id}
              className="rounded-xl border border-[#E8E6E1] bg-white transition-all hover:border-[#D6D3CC] hover:-translate-y-px"
            >
              {/* Header */}
              <div className="border-b border-[#E8E6E1] px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
                      <BookOpen className="h-5 w-5 text-[#4F46E5]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#18181B]">{course.title}</p>
                      <p className="font-mono text-xs text-[#A1A1AA]">{course.code} · {course.credits} credits</p>
                    </div>
                  </div>
                  <span className={`mt-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${
                    stats.avg >= 80 ? "bg-[#D1FAE5] text-[#059669]" :
                    stats.avg >= 70 ? "bg-[#FEF3C7] text-[#D97706]" :
                    "bg-[#FEE2E2] text-[#DC2626]"
                  }`}>
                    Avg {stats.avg}%
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 divide-x divide-[#F4F4F2] border-b border-[#E8E6E1]">
                <div className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-[#A1A1AA]" />
                    <p className="font-mono text-lg font-semibold text-[#18181B]">{course.enrolled}</p>
                  </div>
                  <p className="mt-0.5 text-[10px] text-[#A1A1AA]">Students</p>
                </div>
                <div className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <ClipboardList className="h-3.5 w-3.5 text-[#A1A1AA]" />
                    <p className={`font-mono text-lg font-semibold ${stats.pending > 0 ? "text-[#D97706]" : "text-[#059669]"}`}>
                      {stats.pending}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[10px] text-[#A1A1AA]">To grade</p>
                </div>
                <div className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-[#A1A1AA]" />
                    <p className={`font-mono text-lg font-semibold ${stats.atRisk > 0 ? "text-[#DC2626]" : "text-[#059669]"}`}>
                      {stats.atRisk}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[10px] text-[#A1A1AA]">At risk</p>
                </div>
              </div>

              {/* Progress */}
              <div className="px-5 py-3">
                <div className="flex items-center justify-between text-[11px] text-[#A1A1AA] mb-1.5">
                  <span>Course progress</span>
                  <span className="font-mono">{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                  <div
                    className="h-full rounded-full bg-[#4F46E5]"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#A1A1AA]">
                  <Clock className="h-3 w-3" />
                  <span>{course.instructor}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 border-t border-[#E8E6E1] px-4 py-2.5">
                <Link
                  href="/dashboard/teacher/gradebook"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#52525B] transition-colors hover:bg-[#F4F4F2]"
                >
                  <ClipboardList className="h-3.5 w-3.5" /> Gradebook
                </Link>
                <Link
                  href="/dashboard/teacher/attendance"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#52525B] transition-colors hover:bg-[#F4F4F2]"
                >
                  <CalendarCheck className="h-3.5 w-3.5" /> Attendance
                </Link>
                <Link
                  href="/assistant"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#52525B] transition-colors hover:bg-[#F4F4F2]"
                >
                  <MessageSquare className="h-3.5 w-3.5" /> Message
                </Link>
                <Link
                  href={`/dashboard/student/courses/${course.id}`}
                  className="ml-auto flex items-center gap-1 text-xs text-[#4F46E5] hover:underline"
                >
                  Details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
