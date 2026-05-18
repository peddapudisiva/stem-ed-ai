"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, Brain, ArrowUpDown, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { NIST_CONTROLS } from "@/lib/demo-data"

type SortKey = "family" | "score" | "controls" | "findings"

export default function CyberRiskPage() {
  const [sortKey, setSortKey] = useState<SortKey>("score")
  const [sortAsc, setSortAsc] = useState(true)

  const sorted = [...NIST_CONTROLS].sort((a, b) => {
    const aVal = sortKey === "family" ? a.family : sortKey === "score" ? a.score : sortKey === "controls" ? a.controls : (a.controls - a.passed)
    const bVal = sortKey === "family" ? b.family : sortKey === "score" ? b.score : sortKey === "controls" ? b.controls : (b.controls - b.passed)
    if (typeof aVal === "string") return sortAsc ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal)
    return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
  })

  const totalControls = NIST_CONTROLS.reduce((s, c) => s + c.controls, 0)
  const totalPassed   = NIST_CONTROLS.reduce((s, c) => s + c.passed, 0)
  const totalFindings = totalControls - totalPassed
  const avgScore      = Math.round(NIST_CONTROLS.reduce((s, c) => s + c.score, 0) / NIST_CONTROLS.length)
  const criticalFamilies = NIST_CONTROLS.filter((c) => c.score < 80).length

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(true) }
  }

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button onClick={() => toggleSort(k)} className={cn("flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.06em]", sortKey === k ? "text-[#4F46E5]" : "text-[#A1A1AA]")}>
      {label}<ArrowUpDown className="h-3 w-3" />
    </button>
  )

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Risk Register</h1>
          <p className="mt-1 text-sm text-[#52525B]">NIST 800-53 Control Families · {NIST_CONTROLS.length} families · {totalControls} controls</p>
        </div>
        <Link href="/assistant" className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]">
          <Brain className="h-3.5 w-3.5" /> Compliance Guard
        </Link>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Avg Score",        value: `${avgScore}%`, color: avgScore >= 90 ? "#059669" : "#D97706", bg: avgScore >= 90 ? "#D1FAE5" : "#FEF3C7" },
          { label: "Controls Passing", value: `${totalPassed}/${totalControls}`, color: "#4F46E5", bg: "#EEF2FF" },
          { label: "Open Findings",    value: totalFindings, color: "#DC2626",  bg: "#FEE2E2" },
          { label: "Critical Families", value: criticalFamilies, color: "#D97706", bg: "#FEF3C7" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <p className="font-mono text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
            <p className="mt-0.5 text-[11px] text-[#A1A1AA]">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Risk table */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8E6E1] bg-[#FAFAF9]">
                <th className="px-5 py-3 text-left"><SortBtn k="family" label="Control Family" /></th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Score</th>
                <th className="px-4 py-3 text-left"><SortBtn k="controls" label="Controls" /></th>
                <th className="px-4 py-3 text-left"><SortBtn k="findings" label="Findings" /></th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F2]">
              {sorted.map((ctrl, i) => {
                const findings = ctrl.controls - ctrl.passed
                const color    = ctrl.score >= 90 ? "#059669" : ctrl.score >= 75 ? "#D97706" : "#DC2626"
                return (
                  <motion.tr key={ctrl.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className={cn("group transition-colors hover:bg-[#FAFAF9]", ctrl.score < 75 && "bg-[#FFF5F5]")}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {ctrl.score < 80 && <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#D97706]" />}
                        <div>
                          <p className="font-medium text-[#18181B]">{ctrl.family}</p>
                          <p className="text-[10px] font-mono font-semibold uppercase text-[#A1A1AA]">{ctrl.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#F4F4F2]">
                          <div className="h-full rounded-full" style={{ width: `${ctrl.score}%`, background: color }} />
                        </div>
                        <span className="font-mono text-xs font-semibold" style={{ color }}>{ctrl.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-[#52525B]">{ctrl.passed}/{ctrl.controls}</td>
                    <td className="px-4 py-3.5">
                      <span className={cn("font-mono text-xs font-semibold", findings > 0 ? "text-[#DC2626]" : "text-[#059669]")}>
                        {findings > 0 ? findings : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        ctrl.score >= 90 ? "bg-[#D1FAE5] text-[#059669]" :
                        ctrl.score >= 75 ? "bg-[#FEF3C7] text-[#D97706]" :
                        "bg-[#FEE2E2] text-[#DC2626]"
                      )}>
                        {ctrl.score >= 90 ? "Strong" : ctrl.score >= 75 ? "Needs Work" : "Critical"}
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
        NIST 800-53 Rev 5 · Compliance Guard flags only — does not auto-remediate · All findings require IT team action
      </p>
    </div>
  )
}
