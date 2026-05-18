"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpDown, TrendingUp, TrendingDown, Brain, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { INSTITUTIONS, INSTITUTION_DETAILS } from "@/lib/demo-data"

type SortKey = "name" | "students" | "retention" | "gap" | "atRisk"

const SCHOOL_COLORS: Record<string, { accent: string; bg: string }> = {
  atc:      { accent: "#4F46E5", bg: "#EEF2FF" },
  gsu:      { accent: "#059669", bg: "#D1FAE5" },
  kennesaw: { accent: "#D97706", bg: "#FEF3C7" },
}

export default function DistrictSchoolsPage() {
  const [sortKey, setSortKey] = useState<SortKey>("retention")
  const [sortAsc, setSortAsc] = useState(true)

  const schools = useMemo(() => {
    const merged = INSTITUTIONS.map((inst) => ({
      ...inst,
      ...INSTITUTION_DETAILS.find((d) => d.id === inst.id)!,
      gap: inst.target - inst.retention,
    }))
    return [...merged].sort((a, b) => {
      const aVal = sortKey === "name" ? a.name : sortKey === "students" ? a.students : sortKey === "retention" ? a.retention : sortKey === "atRisk" ? a.atRisk : a.gap
      const bVal = sortKey === "name" ? b.name : sortKey === "students" ? b.students : sortKey === "retention" ? b.retention : sortKey === "atRisk" ? b.atRisk : b.gap
      if (typeof aVal === "string") return sortAsc ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal)
      return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
    })
  }, [sortKey, sortAsc])

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(true) }
  }

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button
      onClick={() => toggleSort(k)}
      className={cn(
        "flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.06em]",
        sortKey === k ? "text-[#4F46E5]" : "text-[#A1A1AA]"
      )}
    >
      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  )

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">School Comparison</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {INSTITUTIONS.length} institutions · Georgia District · Spring 2026
          </p>
        </div>
        <Link
          href="/assistant"
          className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
        >
          <Brain className="h-3.5 w-3.5" /> AI Analysis
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {INSTITUTIONS.map((inst, i) => {
          const detail = INSTITUTION_DETAILS.find((d) => d.id === inst.id)!
          const gap = inst.target - inst.retention
          const { accent, bg } = SCHOOL_COLORS[inst.id]
          const onTrack = gap <= 5

          return (
            <motion.div
              key={inst.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl border border-[#E8E6E1] bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm" style={{ background: bg, color: accent }}>
                    {inst.shortName}
                  </div>
                  <div>
                    <p className="font-semibold text-[#18181B] text-sm">{inst.shortName}</p>
                    <p className="text-[10px] text-[#A1A1AA]">{inst.state}</p>
                  </div>
                </div>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  onTrack ? "bg-[#D1FAE5] text-[#059669]" : "bg-[#FEE2E2] text-[#DC2626]"
                )}>
                  {onTrack ? "On Track" : `${gap}pp behind`}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
                {[
                  { label: "Enrollment",   value: inst.students.toLocaleString() },
                  { label: "Retention",    value: `${inst.retention}%`, highlight: true, color: accent },
                  { label: "At-Risk",      value: detail.atRisk.toString(), warnColor: "#DC2626" },
                  { label: "Programs",     value: detail.programs.toString() },
                  { label: "PD Compliant", value: `${detail.facultyCompliant}/${detail.facultyTotal}` },
                  { label: "Target",       value: `${inst.target}%` },
                ].map(({ label, value, color, warnColor }) => (
                  <div key={label}>
                    <p className="text-[10px] text-[#A1A1AA]">{label}</p>
                    <p className="font-mono text-sm font-semibold" style={{ color: color ?? warnColor ?? "#18181B" }}>{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-[10px] text-[#A1A1AA]">
                  <span>Retention</span>
                  <span>{inst.retention}% / {inst.target}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(inst.retention / inst.target) * 100}%`, background: accent }} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Comparison table */}
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
                <th className="px-5 py-3 text-left"><SortBtn k="name" label="Institution" /></th>
                <th className="px-4 py-3 text-left"><SortBtn k="students" label="Enrolled" /></th>
                <th className="px-4 py-3 text-left"><SortBtn k="retention" label="Retention" /></th>
                <th className="px-4 py-3 text-left"><SortBtn k="gap" label="Gap" /></th>
                <th className="px-4 py-3 text-left"><SortBtn k="atRisk" label="At-Risk" /></th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">PD</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F2]">
              {schools.map((school, i) => {
                const { accent, bg } = SCHOOL_COLORS[school.id]
                const onTrack = school.gap <= 5
                return (
                  <motion.tr
                    key={school.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="group transition-colors hover:bg-[#FAFAF9]"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold" style={{ background: bg, color: accent }}>
                          {school.shortName}
                        </div>
                        <div>
                          <p className="font-medium text-[#18181B]">{school.name}</p>
                          <p className="text-[11px] text-[#A1A1AA]">{school.programs} programs · {school.courses.toLocaleString()} courses</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-sm text-[#52525B]">{school.students.toLocaleString()}</td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-sm font-semibold" style={{ color: accent }}>{school.retention}%</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        {onTrack
                          ? <TrendingUp className="h-3.5 w-3.5 text-[#059669]" />
                          : <TrendingDown className="h-3.5 w-3.5 text-[#DC2626]" />
                        }
                        <span className={cn("font-mono text-xs font-semibold", onTrack ? "text-[#059669]" : "text-[#DC2626]")}>
                          {school.gap}pp
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn("font-mono text-xs font-semibold", school.atRisk > 100 ? "text-[#DC2626]" : "text-[#D97706]")}>
                        {school.atRisk}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-[#52525B]">{school.facultyCompliant}/{school.facultyTotal}</td>
                    <td className="px-4 py-3.5">
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        onTrack ? "bg-[#D1FAE5] text-[#059669]" : "bg-[#FEE2E2] text-[#DC2626]"
                      )}>
                        {onTrack ? "On Track" : "Behind"}
                      </span>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      <p className="text-[11px] text-[#A1A1AA]">
        Data is read-only at district level · Student-level data requires institution-level access · FERPA compliant
      </p>
    </div>
  )
}
