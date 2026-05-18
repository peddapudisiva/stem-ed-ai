"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Search, Filter, AlertTriangle, TrendingUp,
  ArrowUpDown, Download, Brain
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ADMIN_STUDENTS } from "@/lib/demo-data"

type StatusFilter = "all" | "at-risk" | "watch" | "good"
type AidFilter = "all" | "Hold" | "Active" | "Delayed" | "Pending"

const STATUS_BADGE: Record<string, string> = {
  "at-risk": "bg-[#FEE2E2] text-[#DC2626]",
  "watch":   "bg-[#FEF3C7] text-[#D97706]",
  "good":    "bg-[#D1FAE5] text-[#059669]",
}

const STATUS_LABEL: Record<string, string> = {
  "at-risk": "At Risk",
  "watch":   "Watch",
  "good":    "On Track",
}

function RiskBar({ score }: { score: number }) {
  const color = score >= 85 ? "#DC2626" : score >= 60 ? "#D97706" : "#059669"
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#F4F4F2]">
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="font-mono text-xs font-semibold" style={{ color }}>{score}</span>
    </div>
  )
}

export default function AdminStudentsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [aidFilter, setAidFilter] = useState<AidFilter>("all")
  const [sortByRisk, setSortByRisk] = useState(true)

  const filtered = useMemo(() => {
    let list = [...ADMIN_STUDENTS]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((s) =>
        s.name.toLowerCase().includes(q) || s.program.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== "all") list = list.filter((s) => s.status === statusFilter)
    if (aidFilter !== "all") list = list.filter((s) => s.aid === aidFilter)
    return sortByRisk
      ? list.sort((a, b) => b.riskScore - a.riskScore)
      : list.sort((a, b) => a.name.localeCompare(b.name))
  }, [search, statusFilter, aidFilter, sortByRisk])

  const atRiskCount = ADMIN_STUDENTS.filter((s) => s.status === "at-risk").length
  const watchCount  = ADMIN_STUDENTS.filter((s) => s.status === "watch").length

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Student Directory</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {ADMIN_STUDENTS.length} students · {atRiskCount} at-risk · {watchCount} watch
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] bg-white px-3 py-2 text-sm text-[#52525B] transition-colors hover:border-[#D6D3CC]">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <Link
            href="/assistant"
            className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
          >
            <Brain className="h-3.5 w-3.5" /> SKORA AI
          </Link>
        </div>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-2">
        {(["all", "at-risk", "watch", "good"] as StatusFilter[]).map((s) => {
          const count = s === "all" ? ADMIN_STUDENTS.length
            : ADMIN_STUDENTS.filter((st) => st.status === s).length
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                statusFilter === s
                  ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                  : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
              )}
            >
              {s === "all" ? "All Students" : STATUS_LABEL[s]} ({count})
            </button>
          )
        })}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A1A1AA]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or program…"
            className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-white pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-[#A1A1AA]" />
          <select
            value={aidFilter}
            onChange={(e) => setAidFilter(e.target.value as AidFilter)}
            className="h-9 rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm outline-none focus:border-[#4F46E5]"
          >
            <option value="all">All Aid Status</option>
            <option value="Hold">Aid: Hold</option>
            <option value="Delayed">Aid: Delayed</option>
            <option value="Pending">Aid: Pending</option>
            <option value="Active">Aid: Active</option>
          </select>
          <button
            onClick={() => setSortByRisk(!sortByRisk)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all",
              sortByRisk
                ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
            )}
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            {sortByRisk ? "By risk" : "A–Z"}
          </button>
        </div>
      </div>

      {/* Student table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8E6E1] bg-[#FAFAF9]">
                {["Student", "Program", "GPA", "Risk Score", "LMS Activity", "Aid", "Attend.", "Status", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F2]">
              {filtered.map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.025 }}
                  className={cn(
                    "group transition-colors hover:bg-[#FAFAF9]",
                    s.status === "at-risk" && "bg-[#FFF5F5]"
                  )}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {s.status === "at-risk" && <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#DC2626]" />}
                      <span className={cn("font-medium", s.status === "at-risk" ? "text-[#DC2626]" : "text-[#18181B]")}>
                        {s.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#52525B]">{s.program} · Yr{s.year}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "font-mono text-xs font-semibold",
                      s.gpa >= 3.5 ? "text-[#059669]" : s.gpa >= 2.5 ? "text-[#52525B]" : "text-[#DC2626]"
                    )}>
                      {s.gpa.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <RiskBar score={s.riskScore} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[#52525B]">
                    {s.lmsLogins} logins / 7d
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      s.aid === "Hold"    ? "bg-[#FEE2E2] text-[#DC2626]" :
                      s.aid === "Delayed" ? "bg-[#FEF3C7] text-[#D97706]" :
                      s.aid === "Pending" ? "bg-[#EEF2FF] text-[#4F46E5]" :
                      "bg-[#D1FAE5] text-[#059669]"
                    )}>
                      {s.aid}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "font-mono text-xs",
                      s.attendance >= 85 ? "text-[#059669]" :
                      s.attendance >= 70 ? "text-[#D97706]" : "text-[#DC2626] font-semibold"
                    )}>
                      {s.attendance}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", STATUS_BADGE[s.status])}>
                      {STATUS_LABEL[s.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {s.status !== "good" && (
                      <Link
                        href="/assistant"
                        className="rounded-lg border border-[#E8E6E1] px-2.5 py-1 text-[11px] font-medium text-[#52525B] transition-colors hover:border-[#4F46E5] hover:text-[#4F46E5]"
                      >
                        Intervene
                      </Link>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[#A1A1AA]">
            No students match your filters.
          </div>
        )}
      </motion.div>

      <p className="text-[11px] text-[#A1A1AA]">
        SKORA risk scores update every 4 hours · FERPA compliant · Data stays within ATC institution boundary
      </p>
    </div>
  )
}
