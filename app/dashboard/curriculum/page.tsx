import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight, Brain, FileText, CheckCircle2, Clock,
  AlertTriangle, Plus, BookOpen, BarChart3, Sparkles
} from "lucide-react"
import { PROPOSALS } from "@/lib/demo-data"

export const metadata: Metadata = { title: "Curriculum Dashboard — STEM-ED-AI" }

const STATUS_STYLE: Record<string, { badge: string; bar: string }> = {
  "Draft":            { badge: "bg-[#F4F4F2] text-[#52525B]",      bar: "#A1A1AA" },
  "In Review":        { badge: "bg-[#EEF2FF] text-[#4F46E5]",      bar: "#4F46E5" },
  "Committee Review": { badge: "bg-[#FEF3C7] text-[#D97706]",      bar: "#D97706" },
  "Pending Approval": { badge: "bg-[#FEE2E2] text-[#DC2626]",      bar: "#DC2626" },
  "Approved":         { badge: "bg-[#D1FAE5] text-[#059669]",      bar: "#059669" },
}

const WORKFLOW_STEPS_6 = ["Draft", "AI Review", "Dept. Review", "Committee", "Pending Approval", "Approved"]

function StepBar({ step, total, color }: { step: number; total: number; color: string }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full"
          style={{ background: i < step ? color : "#F4F4F2" }}
        />
      ))}
    </div>
  )
}

export default function CurriculumDashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  const inReview       = PROPOSALS.filter((p) => p.status === "In Review").length
  const pendingApproval = PROPOSALS.filter((p) => p.status === "Pending Approval").length
  const avgScore = Math.round(PROPOSALS.reduce((s, p) => s + p.aiScore, 0) / PROPOSALS.length)

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">{greeting}, Dr. Nair</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            Curriculum Committee · {PROPOSALS.length} active proposals
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/curriculum/proposals/new"
            className="hidden sm:flex items-center gap-2 rounded-xl border border-[#E8E6E1] px-4 py-2.5 text-sm font-medium text-[#52525B] transition-all hover:border-[#D6D3CC]"
          >
            <Plus className="h-4 w-4" /> New Proposal
          </Link>
          <Link
            href="/assistant"
            className="hidden sm:flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4338CA] hover:-translate-y-px"
          >
            <Brain className="h-4 w-4" /> Curriculum AI
          </Link>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Proposals",  value: PROPOSALS.length, icon: FileText,     color: "#4F46E5", bg: "#EEF2FF" },
          { label: "In Review",        value: inReview,          icon: Clock,        color: "#D97706", bg: "#FEF3C7" },
          { label: "Pending Approval", value: pendingApproval,   icon: AlertTriangle, color: "#DC2626", bg: "#FEE2E2" },
          { label: "Avg AI Score",     value: `${avgScore}/100`, icon: Sparkles,     color: "#059669", bg: "#D1FAE5" },
        ].map((kpi, i) => (
          <div key={kpi.label} className="rounded-xl border border-[#E8E6E1] bg-white p-4" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: kpi.bg }}>
                <kpi.icon className="h-4 w-4" style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="font-mono text-xl font-bold text-[#18181B]">{kpi.value}</p>
                <p className="text-[11px] text-[#A1A1AA]">{kpi.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Active proposals (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="flex items-center justify-between border-b border-[#E8E6E1] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EEF2FF]">
                  <FileText className="h-3.5 w-3.5 text-[#4F46E5]" />
                </div>
                <p className="text-sm font-semibold text-[#18181B]">Active Proposals</p>
              </div>
              <Link href="/dashboard/curriculum/proposals" className="flex items-center gap-1 text-xs text-[#4F46E5] hover:underline">
                All proposals <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-[#F4F4F2]">
              {PROPOSALS.map((p) => {
                const style = STATUS_STYLE[p.status] ?? STATUS_STYLE["Draft"]
                return (
                  <Link
                    key={p.id}
                    href={`/dashboard/curriculum/proposals/${p.id}`}
                    className="block px-5 py-4 transition-colors hover:bg-[#FAFAF9]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[11px] font-semibold text-[#A1A1AA]">{p.id}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.badge}`}>{p.status}</span>
                        </div>
                        <p className="mt-1 font-medium text-[#18181B] text-sm leading-snug">{p.title}</p>
                        <p className="mt-0.5 text-[11px] text-[#A1A1AA]">{p.author} · {p.submittedAt}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-mono text-sm font-bold" style={{ color: style.bar }}>{p.aiScore}</p>
                        <p className="text-[10px] text-[#A1A1AA]">AI score</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <StepBar step={p.step} total={p.total} color={style.bar} />
                      <p className="mt-1 text-[10px] text-[#A1A1AA]">Step {p.step} of {p.total}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Workflow pipeline visual */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-5">
            <p className="mb-4 text-sm font-semibold text-[#18181B]">Standard Approval Pipeline</p>
            <div className="flex items-center gap-0">
              {WORKFLOW_STEPS_6.map((step, i) => {
                const count = PROPOSALS.filter((p) => {
                  if (step === "Draft")            return p.status === "Draft"
                  if (step === "AI Review")        return false
                  if (step === "Dept. Review")     return p.status === "In Review" && p.step === 3
                  if (step === "Committee")        return p.status === "Committee Review"
                  if (step === "Pending Approval") return p.status === "Pending Approval"
                  if (step === "Approved")         return false
                  return false
                }).length

                return (
                  <div key={step} className="flex flex-1 items-center">
                    <div className="flex-1 text-center">
                      <div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        count > 0 ? "bg-[#4F46E5] text-white" : "bg-[#F4F4F2] text-[#A1A1AA]"
                      }`}>
                        {count > 0 ? count : i + 1}
                      </div>
                      <p className="mt-1.5 text-[10px] text-[#52525B] leading-tight">{step}</p>
                    </div>
                    {i < WORKFLOW_STEPS_6.length - 1 && (
                      <div className="h-px w-4 shrink-0 bg-[#E8E6E1]" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Quick actions */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Quick Actions</p>
            <div className="space-y-2">
              {[
                { label: "New Proposal",   href: "/dashboard/curriculum/proposals/new", icon: Plus,     color: "#4F46E5", desc: "Start a new course proposal" },
                { label: "Browse eCatalog", href: "/dashboard/curriculum/catalog",       icon: BookOpen, color: "#059669", desc: "Search active course catalog" },
                { label: "AI Workspace",   href: "/assistant",                           icon: Brain,    color: "#B8860B", desc: "Curriculum Architect agent" },
                { label: "All Proposals",  href: "/dashboard/curriculum/proposals",      icon: BarChart3, color: "#D97706", desc: "Filter and manage proposals" },
              ].map(({ label, href, icon: Icon, color, desc }) => (
                <Link key={label} href={href} className="flex items-center gap-3 rounded-lg border border-[#E8E6E1] px-3 py-2.5 transition-colors hover:border-[#D6D3CC] hover:bg-[#FAFAF9]">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: `${color}15` }}>
                    <Icon className="h-3.5 w-3.5" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#18181B]">{label}</p>
                    <p className="text-[10px] text-[#A1A1AA]">{desc}</p>
                  </div>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Standards coverage */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-4 w-4 text-[#059669]" />
              <p className="text-sm font-semibold text-[#18181B]">Standards Coverage</p>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "ABET",    pct: 87, color: "#4F46E5" },
                { label: "ACM/IEEE", pct: 72, color: "#059669" },
                { label: "TCSG",    pct: 94, color: "#D97706" },
                { label: "AACSB",   pct: 65, color: "#B8860B" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-[#52525B]">{s.label}</span>
                    <span className="font-mono font-semibold text-[#18181B]">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        Curriculum Architect AI scores proposals against ABET, ACM, TCSG standards · All approvals are human-authorized
      </p>
    </div>
  )
}
