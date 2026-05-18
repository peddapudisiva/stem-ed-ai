import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight, Brain, TrendingUp, Users, AlertTriangle,
  Building2, DollarSign, BarChart3, GraduationCap, Shield
} from "lucide-react"
import { INSTITUTIONS, INSTITUTION_DETAILS, GOVCON_OPPORTUNITIES, AT_RISK_STUDENTS } from "@/lib/demo-data"
import { StatCard } from "@/components/dashboard/stat-card"

export const metadata: Metadata = { title: "District Dashboard — STEM-ED-AI" }

const SCHOOL_COLORS: Record<string, { accent: string; bg: string }> = {
  atc:      { accent: "#4F46E5", bg: "#EEF2FF" },
  gsu:      { accent: "#059669", bg: "#D1FAE5" },
  kennesaw: { accent: "#D97706", bg: "#FEF3C7" },
}

export default function DistrictDashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  const totalStudents = INSTITUTIONS.reduce((sum, i) => sum + i.students, 0)
  const totalAtRisk   = INSTITUTION_DETAILS.reduce((sum, d) => sum + d.atRisk, 0)
  const avgRetention  = Math.round(
    INSTITUTIONS.reduce((sum, i) => sum + i.retention, 0) / INSTITUTIONS.length
  )
  const govconValue   = GOVCON_OPPORTUNITIES.reduce((sum, o) => sum + o.value, 0)

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">{greeting}, Dr. Carter</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            Georgia District · {INSTITUTIONS.length} institutions · {totalStudents.toLocaleString()} students enrolled
          </p>
        </div>
        <Link
          href="/assistant"
          className="hidden sm:flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4338CA] hover:-translate-y-px"
        >
          <Brain className="h-4 w-4" />
          District AI
        </Link>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Enrollment" value={totalStudents.toLocaleString()} hint="Across 3 institutions" animationDelay={0} />
        <StatCard
          label="Avg Retention"
          value={`${avgRetention}%`}
          hint="District avg vs 82% target"
          variant="warning"
          delta={{ value: avgRetention - 82, period: "vs target" }}
          animationDelay={0.05}
        />
        <StatCard label="At-Risk Students" value={totalAtRisk.toLocaleString()} hint="District-wide SKORA alerts" variant="danger" animationDelay={0.1} />
        <StatCard
          label="GovCon Pipeline"
          value={`$${(govconValue / 1_000_000).toFixed(1)}M`}
          hint={`${GOVCON_OPPORTUNITIES.length} active opportunities`}
          variant="success"
          animationDelay={0.15}
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left + center */}
        <div className="lg:col-span-2 space-y-6">

          {/* Institution retention cards */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="flex items-center justify-between border-b border-[#E8E6E1] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EEF2FF]">
                  <TrendingUp className="h-3.5 w-3.5 text-[#4F46E5]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#18181B]">SKORA — Institution Overview</p>
                  <p className="text-[10px] text-[#A1A1AA]">Retention intelligence · Updated 9:42 AM</p>
                </div>
              </div>
              <Link href="/dashboard/district/schools" className="flex items-center gap-1 text-xs text-[#4F46E5] hover:underline">
                Compare schools <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-[#F4F4F2]">
              {INSTITUTIONS.map((inst) => {
                const detail = INSTITUTION_DETAILS.find((d) => d.id === inst.id)!
                const gap = inst.target - inst.retention
                const { accent, bg } = SCHOOL_COLORS[inst.id]
                const pct = Math.round((inst.retention / inst.target) * 100)

                return (
                  <div key={inst.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold" style={{ background: bg, color: accent }}>
                      {inst.shortName}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#18181B]">{inst.name}</p>
                        <span className="font-mono text-sm font-bold" style={{ color: accent }}>{inst.retention}%</span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F4F4F2]">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: accent }} />
                        </div>
                        <span className="text-[11px] text-[#A1A1AA] shrink-0">Target {inst.target}%</span>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-[11px] text-[#A1A1AA]">
                        <span>{inst.students.toLocaleString()} students</span>
                        <span className={gap > 5 ? "text-[#DC2626] font-medium" : "text-[#D97706] font-medium"}>
                          {gap}pp gap
                        </span>
                        <span>{detail.atRisk} at-risk</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rounded-b-xl bg-[#FAFAF9] px-5 py-3">
              <Link href="/dashboard/district/retention" className="flex items-center gap-1 text-xs font-medium text-[#4F46E5] hover:underline">
                View retention trends <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* SKORA alert strip from ATC */}
          <div className="rounded-xl border border-[#FEE2E2] bg-white">
            <div className="flex items-center justify-between border-b border-[#FEE2E2] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FEE2E2]">
                  <AlertTriangle className="h-3.5 w-3.5 text-[#DC2626]" />
                </div>
                <p className="text-sm font-semibold text-[#18181B]">ATC — Highest-Risk Students</p>
              </div>
              <Link href="/dashboard/admin/students" className="flex items-center gap-1 text-xs text-[#4F46E5] hover:underline">
                Full directory <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-[#FFF5F5]">
              {AT_RISK_STUDENTS.slice(0, 3).map((s) => (
                <div key={s.id} className="flex items-center gap-3 px-5 py-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold ${
                    s.riskScore >= 85 ? "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]" : "border-[#D97706] bg-[#FFFBEB] text-[#D97706]"
                  }`}>
                    {s.riskScore}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#18181B]">{s.name}</p>
                    <p className="text-xs text-[#52525B]">{s.program} · {s.lmsActivity}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    s.aid === "Hold" ? "bg-[#FEE2E2] text-[#DC2626]" :
                    s.aid === "Delayed" ? "bg-[#FEF3C7] text-[#D97706]" :
                    "bg-[#D1FAE5] text-[#059669]"
                  }`}>
                    Aid: {s.aid}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* GovCon pipeline snapshot */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="flex items-center justify-between border-b border-[#E8E6E1] px-4 py-3.5">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-[#B8860B]" />
                <p className="text-sm font-semibold text-[#18181B]">GovCon Pipeline</p>
              </div>
              <Link href="/dashboard/district/govcon" className="text-xs text-[#4F46E5] hover:underline">
                All →
              </Link>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {GOVCON_OPPORTUNITIES.map((opp) => (
                <div key={opp.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium text-[#18181B] leading-snug">{opp.title}</p>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      opp.status === "Urgent" ? "bg-[#FEE2E2] text-[#DC2626]" : "bg-[#D1FAE5] text-[#059669]"
                    }`}>
                      {opp.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-[#A1A1AA]">{opp.agency}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="font-mono font-semibold text-[#B8860B]">${(opp.value / 1_000_000).toFixed(1)}M</span>
                    <span className="text-[#A1A1AA]">Win: <span className="font-semibold text-[#52525B]">{opp.winProbability}%</span></span>
                  </div>
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                    <div className="h-full rounded-full bg-[#B8860B]" style={{ width: `${opp.winProbability}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Schools",   icon: Building2,     href: "/dashboard/district/schools",    color: "#4F46E5" },
                { label: "Retention", icon: TrendingUp,    href: "/dashboard/district/retention",  color: "#059669" },
                { label: "GovCon",    icon: DollarSign,    href: "/dashboard/district/govcon",     color: "#B8860B" },
                { label: "Reports",   icon: BarChart3,     href: "/dashboard/admin/reports",       color: "#D97706" },
              ].map(({ label, icon: Icon, href, color }) => (
                <Link key={label} href={href} className="flex flex-col items-center gap-1.5 rounded-lg border border-[#E8E6E1] p-3 text-center text-xs font-medium text-[#52525B] transition-all hover:border-[#D6D3CC] hover:-translate-y-px">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${color}15` }}>
                    <Icon className="h-4 w-4" style={{ color }} />
                  </div>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Compliance snapshot */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-[#52525B]" />
              <p className="text-sm font-semibold text-[#18181B]">Compliance</p>
            </div>
            <div className="space-y-2">
              {[
                { label: "FERPA",    status: "Compliant", color: "#059669" },
                { label: "TCSG",     status: "On Track",  color: "#059669" },
                { label: "SACSCOC",  status: "Due Jun 1", color: "#D97706" },
                { label: "CMMC 2.0", status: "In Review", color: "#D97706" },
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-between rounded-lg border border-[#E8E6E1] px-3 py-2">
                  <span className="text-xs text-[#52525B]">{c.label}</span>
                  <span className="font-mono text-[10px] font-semibold" style={{ color: c.color }}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        District data is FERPA-compliant · Student data never crosses institution boundaries · SKORA updates every 4 hours
      </p>
    </div>
  )
}
