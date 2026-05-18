"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpen, Clock, CheckCircle2, Circle, Download,
  Award, Users, Filter, Building
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PD_CATALOG, FACULTY } from "@/lib/demo-data"

type FormatFilter = "all" | "online" | "in-person" | "hybrid"
type RequiredFilter = "all" | "required" | "optional"

const FORMAT_CONFIG = {
  online:     { color: "#4F46E5", bg: "#EEF2FF" },
  "in-person":{ color: "#059669", bg: "#D1FAE5" },
  hybrid:     { color: "#D97706", bg: "#FEF3C7" },
}

export default function PdCatalogPage() {
  const [formatFilter,   setFormatFilter]   = useState<FormatFilter>("all")
  const [requiredFilter, setRequiredFilter] = useState<RequiredFilter>("all")
  const [expanded,       setExpanded]       = useState<string | null>(null)

  const filtered = PD_CATALOG.filter((item) => {
    if (formatFilter   !== "all" && item.format  !== formatFilter)   return false
    if (requiredFilter !== "all" && (requiredFilter === "required") !== item.required) return false
    return true
  })

  const totalRequired  = PD_CATALOG.filter((p) => p.required).length
  const totalOptional  = PD_CATALOG.filter((p) => !p.required).length
  const totalCredits   = PD_CATALOG.reduce((s, p) => s + p.credits, 0)

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">PD Course Catalog</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {PD_CATALOG.length} courses · Spring 2026 cycle · Deadline May 31
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm text-[#52525B] hover:border-[#D6D3CC]">
          <Download className="h-3.5 w-3.5" /> Export Report
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Required",    value: totalRequired,  color: "#DC2626", bg: "#FEE2E2", icon: Circle },
          { label: "Optional",    value: totalOptional,  color: "#4F46E5", bg: "#EEF2FF", icon: BookOpen },
          { label: "Total PD Hrs",value: `${totalCredits}h`, color: "#D97706", bg: "#FEF3C7", icon: Clock },
          { label: "Faculty",     value: FACULTY.length, color: "#059669", bg: "#D1FAE5", icon: Users },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
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

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Filter className="h-3.5 w-3.5 text-[#A1A1AA]" />
        <div className="flex gap-1.5">
          {(["all", "required", "optional"] as RequiredFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setRequiredFilter(f)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all",
                requiredFilter === f
                  ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                  : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
              )}
            >
              {f === "all" ? "All" : f === "required" ? "Required" : "Optional"}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {(["all", "online", "in-person", "hybrid"] as FormatFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormatFilter(f)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all",
                formatFilter === f
                  ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                  : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
              )}
            >
              {f === "all" ? "All formats" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog list */}
      <div className="space-y-3">
        {filtered.map((item, i) => {
          const fmtCfg     = FORMAT_CONFIG[item.format]
          const isExpanded = expanded === item.id
          const completedCount = item.completedBy.length

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white"
            >
              {/* Row */}
              <div
                className="flex cursor-pointer flex-wrap items-start gap-4 px-5 py-4 hover:bg-[#FAFAF9]"
                onClick={() => setExpanded(isExpanded ? null : item.id)}
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
                  <BookOpen className="h-5 w-5 text-[#4F46E5]" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-[#18181B]">{item.title}</p>
                    {item.required && (
                      <span className="rounded-full bg-[#FEE2E2] px-1.5 py-0.5 text-[9px] font-semibold text-[#DC2626]">
                        REQUIRED
                      </span>
                    )}
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold capitalize"
                      style={{ background: fmtCfg.bg, color: fmtCfg.color }}
                    >
                      {item.format}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#A1A1AA] line-clamp-1">{item.description}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-[#A1A1AA]">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{item.duration}</span>
                    <span className="flex items-center gap-1"><Building className="h-3 w-3" />{item.provider}</span>
                    <span className="flex items-center gap-1"><Award className="h-3 w-3" />{item.credits} PD credit{item.credits !== 1 ? "s" : ""}</span>
                    {item.dueDate && <span className="text-[#D97706]">Due {item.dueDate}</span>}
                  </div>
                </div>

                {/* Completion count */}
                <div className="shrink-0 text-right">
                  <p className="font-mono text-lg font-bold" style={{ color: completedCount === FACULTY.length ? "#059669" : completedCount > 0 ? "#D97706" : "#A1A1AA" }}>
                    {completedCount}/{FACULTY.length}
                  </p>
                  <p className="text-[10px] text-[#A1A1AA]">completed</p>
                </div>
              </div>

              {/* Expanded: per-faculty completion */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="border-t border-[#F4F4F2] px-5 py-4"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">
                    Faculty Completion
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {FACULTY.map((f) => {
                      const done = item.completedBy.includes(f.id)
                      return (
                        <div key={f.id} className={cn(
                          "flex items-center justify-between rounded-lg border px-3 py-2",
                          done ? "border-[#D1FAE5] bg-[#F0FDF4]" : "border-[#FEE2E2] bg-[#FFF5F5]"
                        )}>
                          <div>
                            <p className={cn("text-xs font-medium", done ? "text-[#059669]" : "text-[#DC2626]")}>
                              {f.name}
                            </p>
                            <p className="text-[10px] text-[#A1A1AA]">{f.department}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {done
                              ? <><CheckCircle2 className="h-3.5 w-3.5 text-[#059669]" /><button className="rounded border border-[#D1FAE5] px-1.5 py-0.5 text-[9px] font-semibold text-[#059669] hover:bg-[#D1FAE5]"><Award className="inline h-2.5 w-2.5" /> Cert</button></>
                              : <span className="text-[10px] text-[#DC2626]">Pending</span>
                            }
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        PD completion syncs to Banner SIS · Certificates generated upon module completion · TCSG & SACSCOC compliant
      </p>
    </div>
  )
}
