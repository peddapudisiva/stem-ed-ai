"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Download, Clock, User, Brain } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AUDIT_LOG } from "@/lib/demo-data"

type Severity = "all" | "high" | "medium" | "low"

const SEV_BADGE: Record<string, string> = {
  high:   "bg-[#FEE2E2] text-[#DC2626]",
  medium: "bg-[#FEF3C7] text-[#D97706]",
  low:    "bg-[#D1FAE5] text-[#059669]",
}

const ACTION_LABEL: Record<string, string> = {
  risk_score_update: "Risk Score",
  login:             "Auth",
  proposal_analyzed: "AI Action",
  compliance_flag:   "Compliance",
  grade_update:      "Gradebook",
  session_start:     "AI Session",
  report_generated:  "Report",
  export:            "Export",
  ferpa_check:       "FERPA",
  batch_score_run:   "Batch Job",
}

export default function AuditLogPage() {
  const [search,   setSearch]   = useState("")
  const [severity, setSeverity] = useState<Severity>("all")

  const filtered = useMemo(() => {
    let list = [...AUDIT_LOG]
    if (severity !== "all") list = list.filter((e) => e.severity === severity)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((e) =>
        e.user.toLowerCase().includes(q) ||
        e.action.toLowerCase().includes(q) ||
        e.details.toLowerCase().includes(q) ||
        (e.agent?.toLowerCase().includes(q) ?? false)
      )
    }
    return list
  }, [search, severity])

  const highCount   = AUDIT_LOG.filter((e) => e.severity === "high").length
  const mediumCount = AUDIT_LOG.filter((e) => e.severity === "medium").length

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Audit Log</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {AUDIT_LOG.length} events · {highCount} high · {mediumCount} medium severity
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm text-[#52525B] transition-colors hover:border-[#D6D3CC]">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <Link href="/assistant" className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]">
            <Brain className="h-3.5 w-3.5" /> Analyze
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A1A1AA]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user, action, or details…"
            className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-[#A1A1AA]" />
          {(["all", "high", "medium", "low"] as Severity[]).map((s) => (
            <button
              key={s}
              onClick={() => setSeverity(s)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all",
                severity === s ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
              )}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Log table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8E6E1] bg-[#FAFAF9]">
                {["Timestamp", "User / Agent", "Action", "Resource", "Details", "Sev."].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F2]">
              {filtered.map((entry, i) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.025 }}
                  className={cn("transition-colors hover:bg-[#FAFAF9]", entry.severity === "high" && "bg-[#FFF5F5]")}
                >
                  <td className="px-4 py-3 font-mono text-[11px] text-[#A1A1AA] whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {entry.timestamp}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3 w-3 shrink-0 text-[#A1A1AA]" />
                      <div>
                        <p className="text-xs font-medium text-[#18181B]">{entry.user}</p>
                        {entry.agent && <p className="text-[10px] text-[#4F46E5]">{entry.agent}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#F4F4F2] px-2 py-0.5 text-[10px] font-medium text-[#52525B]">
                      {ACTION_LABEL[entry.action] ?? entry.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[#A1A1AA]">{entry.resource}</td>
                  <td className="px-4 py-3 text-xs text-[#52525B] max-w-[280px] truncate">{entry.details}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", SEV_BADGE[entry.severity])}>
                      {entry.severity}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-10 text-center text-sm text-[#A1A1AA]">No events match your filters.</div>
        )}
      </motion.div>

      <p className="text-[11px] text-[#A1A1AA]">
        All agent actions are recorded · Audit log is immutable · Retention: 7 years per FERPA requirements
      </p>
    </div>
  )
}
