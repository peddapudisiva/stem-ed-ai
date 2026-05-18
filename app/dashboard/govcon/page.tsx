import type { Metadata } from "next"
import Link from "next/link"
import {
  Brain, DollarSign, AlertTriangle, CheckCircle2,
  Clock, TrendingUp, Building2, FileText, CalendarDays, Users
} from "lucide-react"
import { GOVCON_OPPORTUNITIES, GOVCON_TEAM, GOVCON_COMPLIANCE } from "@/lib/demo-data"
import { StatCard } from "@/components/dashboard/stat-card"

export const metadata: Metadata = { title: "GovCon Dashboard — STEM-ED-AI" }

const STATUS_STYLE: Record<string, { badge: string; color: string }> = {
  "Active":      { badge: "bg-[#D1FAE5] text-[#059669]",  color: "#059669" },
  "Urgent":      { badge: "bg-[#FEE2E2] text-[#DC2626]",  color: "#DC2626" },
  "Current":     { badge: "bg-[#D1FAE5] text-[#059669]",  color: "#059669" },
  "Active (reg)":{ badge: "bg-[#D1FAE5] text-[#059669]",  color: "#059669" },
  "In Progress": { badge: "bg-[#EEF2FF] text-[#4F46E5]",  color: "#4F46E5" },
  "Pending":     { badge: "bg-[#F4F4F2] text-[#A1A1AA]",  color: "#A1A1AA" },
}

function winColor(p: number) {
  return p >= 75 ? "#059669" : p >= 50 ? "#D97706" : "#DC2626"
}

export default function GovConDashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  const totalValue  = GOVCON_OPPORTUNITIES.reduce((s, o) => s + o.value, 0)
  const avgWin      = Math.round(GOVCON_OPPORTUNITIES.reduce((s, o) => s + o.winProbability, 0) / GOVCON_OPPORTUNITIES.length)
  const urgentCount = GOVCON_OPPORTUNITIES.filter((o) => o.status === "Urgent").length

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">{greeting}, James</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            GovCon Team · {GOVCON_OPPORTUNITIES.length} active opportunities · SERA Neural Labs
          </p>
        </div>
        <Link
          href="/assistant"
          className="hidden sm:flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4338CA] hover:-translate-y-px"
        >
          <Brain className="h-4 w-4" /> GovCon Intel
        </Link>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Pipeline Value"      value={`$${(totalValue / 1_000_000).toFixed(2)}M`} hint={`${GOVCON_OPPORTUNITIES.length} opportunities`} animationDelay={0} />
        <StatCard label="Avg Win Probability" value={`${avgWin}%`} hint="AI estimate" variant="success" animationDelay={0.05} />
        <StatCard label="Urgent Deadlines"    value={urgentCount} hint="Due ≤ 30 days" variant={urgentCount > 0 ? "danger" : "success"} animationDelay={0.1} />
        <StatCard label="Team Assigned"       value={GOVCON_TEAM.length} hint="Capture managers" animationDelay={0.15} />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Opportunities (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-[#18181B]">Active Opportunities</h2>
          {GOVCON_OPPORTUNITIES.map((opp) => {
            const style     = STATUS_STYLE[opp.status] ?? STATUS_STYLE["Active"]
            const color     = winColor(opp.winProbability)
            const daysLeft  = Math.ceil((new Date(opp.dueDate).getTime() - Date.now()) / 86_400_000)
            const teamMember = GOVCON_TEAM.find((t) => t.opportunityId === opp.id)

            return (
              <div key={opp.id} className="rounded-xl border border-[#E8E6E1] bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-[220px]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.badge}`}>{opp.status}</span>
                      <span className="font-mono text-[11px] text-[#A1A1AA]">{opp.solicitation}</span>
                    </div>
                    <p className="mt-1.5 font-semibold text-[#18181B] leading-snug">{opp.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-[#A1A1AA]">
                      <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{opp.agency}</span>
                      <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />
                        {new Date(opp.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        <span className={daysLeft <= 30 ? "font-semibold text-[#DC2626]" : ""}> · {daysLeft}d</span>
                      </span>
                      {teamMember && (
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{teamMember.name} · {teamMember.role}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-lg font-bold text-[#B8860B]">${(opp.value / 1_000_000).toFixed(1)}M</p>
                    <p className="text-[10px] text-[#A1A1AA]">contract value</p>
                  </div>
                </div>

                {/* Win probability */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-[#A1A1AA]">Win Probability</span>
                    <span className="font-mono font-semibold" style={{ color }}>{opp.winProbability}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                    <div className="h-full rounded-full" style={{ width: `${opp.winProbability}%`, background: color }} />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2 border-t border-[#F4F4F2] pt-3">
                  <Link
                    href="/assistant"
                    className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#4338CA]"
                  >
                    <Brain className="h-3 w-3" /> Analyze with AI
                  </Link>
                  <button className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] transition-colors hover:border-[#D6D3CC]">
                    <FileText className="h-3 w-3" /> Draft Strategy
                  </button>
                  <div className="ml-auto flex items-center gap-1 text-[11px] text-[#A1A1AA]">
                    <Clock className="h-3 w-3" />{daysLeft} days remaining
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Team */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="flex items-center gap-2 border-b border-[#E8E6E1] px-4 py-3.5">
              <Users className="h-4 w-4 text-[#52525B]" />
              <p className="text-sm font-semibold text-[#18181B]">Capture Team</p>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {GOVCON_TEAM.map((member) => {
                const opp = GOVCON_OPPORTUNITIES.find((o) => o.id === member.opportunityId)
                return (
                  <div key={member.name} className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] font-bold text-xs text-[#4F46E5]">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#18181B] truncate">{member.name}</p>
                        <p className="text-[10px] text-[#A1A1AA]">{member.role}</p>
                      </div>
                    </div>
                    {opp && <p className="mt-1.5 text-[10px] text-[#52525B] pl-10 truncate">{opp.agency}</p>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* SAM.gov compliance */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-4 w-4 text-[#059669]" />
              <p className="text-sm font-semibold text-[#18181B]">SAM.gov Status</p>
            </div>
            <div className="space-y-2">
              {GOVCON_COMPLIANCE.map((item) => {
                const style = STATUS_STYLE[item.status] ?? STATUS_STYLE["Pending"]
                return (
                  <div key={item.label} className="flex items-center justify-between rounded-lg border border-[#E8E6E1] px-3 py-2">
                    <span className="text-xs text-[#52525B]">{item.label}</span>
                    <div className="flex items-center gap-2">
                      {item.expires && <span className="text-[10px] text-[#A1A1AA]">exp {item.expires.slice(0, 7)}</span>}
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.badge}`}>{item.status}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Agent boundary */}
          <div className="flex items-start gap-2 rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] px-3 py-3">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D97706]" />
            <p className="text-[11px] text-[#92400E]">
              <span className="font-semibold">GovCon Intel</span> analyzes opportunities and drafts strategies.
              It does <span className="font-semibold">not</span> submit proposals autonomously.
              All submissions require explicit team authorization.
            </p>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        Win probabilities are AI estimates · All proposal submissions require human authorization · SAM.gov data syncs daily
      </p>
    </div>
  )
}
