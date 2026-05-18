"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ClipboardList, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { STUDENT_ASSIGNMENTS } from "@/lib/demo-data"

export function AssignmentFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      className="flex flex-col rounded-xl border border-[#E8E6E1] bg-white p-6 transition-all hover:border-[#D6D3CC] hover:-translate-y-px"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="section-header">Upcoming</p>
        <Link
          href="/dashboard/student/courses"
          className="flex items-center gap-1 text-xs font-medium text-[#4F46E5] hover:underline"
        >
          All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="space-y-2.5">
        {STUDENT_ASSIGNMENTS.slice(0, 4).map((a, i) => {
          const inner = (
            <>
              {a.status === "submitted" ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]" />
              ) : (
                <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-[#A1A1AA]" />
              )}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm leading-snug",
                  a.status === "submitted" ? "text-[#059669]" : "text-[#18181B] font-medium"
                )}>
                  {a.title}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-[#A1A1AA]">
                  {a.course} · {a.dueLabel}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="font-mono text-[10px] text-[#A1A1AA]">{a.points}pt</span>
                {"assessmentId" in a && a.status !== "submitted" && (
                  <span className="rounded-full bg-[#EEF2FF] px-1.5 py-0.5 text-[9px] font-semibold text-[#4F46E5]">
                    Start →
                  </span>
                )}
              </div>
            </>
          )
          const className = cn(
            "flex items-start gap-2.5 rounded-lg border px-3 py-2.5 transition-colors",
            a.status === "submitted"
              ? "border-[#D1FAE5] bg-[#F0FDF4]"
              : "border-[#E8E6E1] hover:border-[#D6D3CC]",
            "assessmentId" in a && a.status !== "submitted" && "hover:bg-[#FAFAF9] cursor-pointer"
          )
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
            >
              {"assessmentId" in a && a.status !== "submitted" ? (
                <Link href={`/dashboard/student/assessment/${a.assessmentId}`} className={className}>
                  {inner}
                </Link>
              ) : (
                <div className={className}>{inner}</div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#FEF3C7] px-3 py-2">
        <AlertCircle className="h-3.5 w-3.5 shrink-0 text-[#D97706]" />
        <p className="text-[11px] text-[#92400E]">
          <span className="font-medium">3 assignments</span> due this week
        </p>
      </div>
    </motion.div>
  )
}
