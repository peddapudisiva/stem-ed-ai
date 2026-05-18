"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  DollarSign, Brain, AlertTriangle, Clock, CheckCircle2,
  Building2, CalendarDays, TrendingUp, FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import { GOVCON_OPPORTUNITIES } from "@/lib/demo-data"

const STATUS_STYLE: Record<string, { badge: string; icon: React.ElementType }> = {
  "Active": { badge: "bg-[#D1FAE5] text-[#059669]", icon: CheckCircle2 },
  "Urgent": { badge: "bg-[#FEE2E2] text-[#DC2626]",  icon: AlertTriangle },
}

function winColor(p: number): string {
  return p >= 75 ? "#059669" : p >= 50 ? "#D97706" : "#DC2626"
}

export default function DistrictGovConPage() {
  const totalValue   = GOVCON_OPPORTUNITIES.reduce((s, o) => s + o.value, 0)
  const avgWin       = Math.round(GOVCON_OPPORTUNITIES.reduce((s, o) => s + o.winProbability, 0) / GOVCON_OPPORTUNITIES.length)
  const urgentCount  = GOVCON_OPPORTUNITIES.filter((o) => o.status === "Urgent").length

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">GovCon Pipeline</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            Federal opportunities · {GOVCON_OPPORTUNITIES.length} active · Read-only view
          </p>
        </div>
        <Link
          href="/assistant"
          className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
        >
          <Brain className="h-3.5 w-3.5" /> GovCon Intel
        </Link>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pipeline Value",   value: `$${(totalValue / 1_000_000).toFixed(2)}M`, icon: DollarSign,  color: "#B8860B", bg: "#FEF3C7" },
          { label: "Avg Win Prob.",    value: `${avgWin}%`,                               icon: TrendingUp,  color: "#059669", bg: "#D1FAE5" },
          { label: "Urgent / Due Soon", value: urgentCount,                               icon: AlertTriangle, color: "#DC2626", bg: "#FEE2E2" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-[#E8E6E1] bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: kpi.bg }}>
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

      {/* Opportunity cards */}
      <div className="space-y-4">
        {GOVCON_OPPORTUNITIES.map((opp, i) => {
          const { badge, icon: StatusIcon } = STATUS_STYLE[opp.status] ?? STATUS_STYLE["Active"]
          const color = winColor(opp.winProbability)

          return (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={cn(
                "rounded-xl border bg-white p-5 transition-shadow hover:shadow-sm",
                opp.status === "Urgent" ? "border-[#FEE2E2]" : "border-[#E8E6E1]"
              )}
            >
              <div className="flex flex-wrap items-start gap-3">
                {/* Icon + title */}
                <div className="flex items-start gap-3 flex-1 min-w-[260px]">
                  <div className={cn(
                    "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    opp.status === "Urgent" ? "bg-[#FEE2E2]" : "bg-[#FEF3C7]"
                  )}>
                    <DollarSign className={cn("h-5 w-5", opp.status === "Urgent" ? "text-[#DC2626]" : "text-[#B8860B]")} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#18181B] leading-snug">{opp.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-[#A1A1AA]">
                      <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{opp.agency}</span>
                      <span className="flex items-center gap-1"><FileText className="h-3 w-3" />{opp.solicitation}</span>
                    </div>
                  </div>
                </div>

                {/* Status + value */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={cn("flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold", badge)}>
                    <StatusIcon className="h-2.5 w-2.5" />
                    {opp.status}
                  </span>
                  <p className="font-mono text-lg font-bold text-[#B8860B]">
                    ${(opp.value / 1_000_000).toFixed(1)}M
                  </p>
                </div>
              </div>

              {/* Due date + win probability */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-[#A1A1AA]">Due Date</p>
                  <div className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-[#18181B]">
                    <CalendarDays className="h-3.5 w-3.5 text-[#A1A1AA]" />
                    {new Date(opp.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-[#A1A1AA]">Win Probability</p>
                    <span className="font-mono text-sm font-bold" style={{ color }}>{opp.winProbability}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#F4F4F2]">
                    <div className="h-full rounded-full transition-all" style={{ width: `${opp.winProbability}%`, background: color }} />
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="mt-4 flex items-center gap-2 border-t border-[#F4F4F2] pt-3">
                <Link
                  href="/assistant"
                  className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#4338CA]"
                >
                  <Brain className="h-3 w-3" /> Analyze with GovCon Intel
                </Link>
                <div className="flex items-center gap-1 text-[11px] text-[#A1A1AA]">
                  <Clock className="h-3 w-3" />
                  {Math.ceil((new Date(opp.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Agent boundary notice */}
      <div className="flex items-start gap-3 rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] px-4 py-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]" />
        <p className="text-xs text-[#92400E]">
          <span className="font-semibold">GovCon Intel is read-only at district level.</span> The AI agent can analyze opportunities,
          estimate win probability, and draft strategy briefs — but does NOT submit proposals or commit resources autonomously.
          All proposal submissions require explicit human authorization from the GovCon team.
        </p>
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        GovCon Intel monitors SAM.gov · Win probabilities are AI estimates only · All submissions require human authorization
      </p>
    </div>
  )
}
