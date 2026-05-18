"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  CheckCircle2, Clock, AlertTriangle, Brain,
  BookOpen, Users, TrendingUp, ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { FACULTY, PD_MODULES, FACULTY_PD_DETAIL } from "@/lib/demo-data"

type ComplianceFilter = "all" | "compliant" | "behind"

const MODULE_ICONS: Record<string, string> = {
  "ferpa": "🔒",
  "ai-literacy": "🧠",
  "title-ix": "⚖️",
  "accessibility": "♿",
}

export default function AdminFacultyPage() {
  const [filter, setFilter] = useState<ComplianceFilter>("all")

  const compliantCount = FACULTY.filter((f) => f.pdCompliant).length
  const totalModules = FACULTY.length * 4
  const completedModules = Object.values(FACULTY_PD_DETAIL).reduce((sum, arr) => sum + arr.length, 0)

  const filtered = filter === "all"
    ? FACULTY
    : filter === "compliant"
    ? FACULTY.filter((f) => f.pdCompliant)
    : FACULTY.filter((f) => !f.pdCompliant)

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Faculty PD Compliance</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {FACULTY.length} faculty members · Spring 2026 cycle
          </p>
        </div>
        <Link
          href="/assistant"
          className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
        >
          <Brain className="h-3.5 w-3.5" /> AI Insights
        </Link>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Faculty", value: FACULTY.length, icon: Users, color: "#4F46E5", bg: "#EEF2FF" },
          { label: "Fully Compliant", value: compliantCount, icon: CheckCircle2, color: "#059669", bg: "#D1FAE5" },
          { label: "Behind Schedule", value: FACULTY.length - compliantCount, icon: AlertTriangle, color: "#DC2626", bg: "#FEE2E2" },
          { label: "Modules Done", value: `${completedModules}/${totalModules}`, icon: BookOpen, color: "#D97706", bg: "#FEF3C7" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-[#E8E6E1] bg-white p-4"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: kpi.bg }}>
                <kpi.icon className="h-4 w-4" style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="font-mono text-xl font-bold text-[#18181B]">{kpi.value}</p>
                <p className="text-[11px] text-[#A1A1AA]">{kpi.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2">
        {(["all", "compliant", "behind"] as ComplianceFilter[]).map((f) => {
          const count = f === "all" ? FACULTY.length : f === "compliant"
            ? FACULTY.filter((x) => x.pdCompliant).length
            : FACULTY.filter((x) => !x.pdCompliant).length
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                filter === f
                  ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                  : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
              )}
            >
              {f === "all" ? "All Faculty" : f === "compliant" ? "Compliant" : "Behind Schedule"} ({count})
            </button>
          )
        })}
      </div>

      {/* Faculty cards */}
      <div className="space-y-3">
        {filtered.map((faculty, i) => {
          const completedIds = FACULTY_PD_DETAIL[faculty.id] ?? []
          const pct = Math.round((completedIds.length / faculty.pdRequired) * 100)

          return (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "rounded-xl border bg-white p-5 transition-shadow hover:shadow-sm",
                faculty.pdCompliant ? "border-[#E8E6E1]" : "border-[#FEE2E2]"
              )}
            >
              <div className="flex flex-wrap items-start gap-4">
                {/* Avatar + info */}
                <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                  <div className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                    faculty.pdCompliant ? "bg-[#D1FAE5] text-[#059669]" : "bg-[#FEE2E2] text-[#DC2626]"
                  )}>
                    {faculty.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium text-[#18181B]">{faculty.name}</p>
                    <p className="text-xs text-[#52525B]">{faculty.title} · {faculty.department}</p>
                    <p className="mt-0.5 text-[11px] text-[#A1A1AA]">Last active: {faculty.lastActive}</p>
                  </div>
                </div>

                {/* Status badge + progress */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                    faculty.pdCompliant
                      ? "bg-[#D1FAE5] text-[#059669]"
                      : "bg-[#FEE2E2] text-[#DC2626]"
                  )}>
                    {faculty.pdCompliant ? "Compliant" : "Behind Schedule"}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#F4F4F2]">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          background: faculty.pdCompliant ? "#059669" : "#DC2626",
                        }}
                      />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#52525B]">
                      {completedIds.length}/{faculty.pdRequired}
                    </span>
                  </div>
                </div>
              </div>

              {/* Module breakdown */}
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PD_MODULES.map((mod) => {
                  const done = completedIds.includes(mod.id)
                  return (
                    <div
                      key={mod.id}
                      className={cn(
                        "flex items-center gap-2 rounded-lg border px-3 py-2",
                        done ? "border-[#D1FAE5] bg-[#F0FDF4]" : "border-[#FEE2E2] bg-[#FFF5F5]"
                      )}
                    >
                      <span className="text-sm">{MODULE_ICONS[mod.id]}</span>
                      <div className="min-w-0 flex-1">
                        <p className={cn(
                          "truncate text-[11px] font-medium",
                          done ? "text-[#059669]" : "text-[#DC2626]"
                        )}>
                          {mod.name}
                        </p>
                        <p className={cn("text-[10px]", done ? "text-[#059669]" : "text-[#A1A1AA]")}>
                          {done ? "Complete" : "Pending"}
                        </p>
                      </div>
                      {done
                        ? <CheckCircle2 className="ml-auto h-3.5 w-3.5 shrink-0 text-[#059669]" />
                        : <Clock className="ml-auto h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" />
                      }
                    </div>
                  )
                })}
              </div>

              {/* Action row for non-compliant */}
              {!faculty.pdCompliant && (
                <div className="mt-3 flex items-center justify-between rounded-lg bg-[#FFF5F5] px-3 py-2">
                  <p className="text-[11px] text-[#92400E]">
                    <span className="font-semibold">
                      {faculty.pdRequired - completedIds.length} module{faculty.pdRequired - completedIds.length > 1 ? "s" : ""} remaining.
                    </span>{" "}
                    Deadline: May 31, 2026
                  </p>
                  <Link
                    href="/assistant"
                    className="flex items-center gap-1 text-[11px] font-medium text-[#4F46E5] hover:underline"
                  >
                    Send reminder <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Compliance trend note */}
      <div className="flex items-start gap-2 rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] px-4 py-3">
        <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]" />
        <p className="text-xs text-[#92400E]">
          <span className="font-semibold">3 of 5 faculty are fully compliant</span> with the Spring 2026 PD cycle.
          2 faculty members must complete remaining modules before the May 31 deadline to maintain
          institutional compliance with TCSG and SACSCOC requirements.
        </p>
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        PD compliance tracks TCSG requirements · Records updated automatically upon module completion
      </p>
    </div>
  )
}
