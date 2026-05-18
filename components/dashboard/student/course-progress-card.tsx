"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, ArrowRight, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { COURSES } from "@/lib/demo-data"

const STUDENT_COURSES = COURSES.slice(0, 4)

const PROGRESS_COLOR = (pct: number) => {
  if (pct >= 70) return "from-[#059669] to-[#10B981]"
  if (pct >= 40) return "from-[#4F46E5] to-[#6366F1]"
  return "from-[#D97706] to-[#F59E0B]"
}

export function CourseProgressCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="rounded-xl border border-[#E8E6E1] bg-white p-6 transition-all hover:border-[#D6D3CC] hover:-translate-y-px"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="section-header">Active Courses</p>
        <Link
          href="/dashboard/student/courses"
          className="flex items-center gap-1 text-xs font-medium text-[#4F46E5] hover:underline"
        >
          All courses <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="space-y-4">
        {STUDENT_COURSES.map((course, i) => (
          <Link
            key={course.id}
            href={`/dashboard/student/courses/${course.id}`}
            className="group block"
          >
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
              className="flex items-start gap-3"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F2] group-hover:bg-[#EEF2FF] transition-colors">
                <BookOpen className="h-4 w-4 text-[#52525B] group-hover:text-[#4F46E5] transition-colors" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-[#18181B] group-hover:text-[#4F46E5] transition-colors">
                    {course.title}
                  </p>
                  <span className="shrink-0 font-mono text-xs text-[#A1A1AA]">{course.progress}%</span>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[#A1A1AA]">{course.code}</span>
                  <span className="text-[#D6D3CC]">·</span>
                  <span className="flex items-center gap-0.5 text-[11px] text-[#A1A1AA]">
                    <Users className="h-3 w-3" />
                    {course.enrolled}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.05 }}
                    className={cn("h-full rounded-full bg-gradient-to-r", PROGRESS_COLOR(course.progress))}
                  />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
