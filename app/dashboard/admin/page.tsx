import type { Metadata } from "next"
import Link from "next/link"
import {
  AlertTriangle, ArrowRight, TrendingUp, Users,
  GraduationCap, CheckCircle2, Clock, Brain,
  BarChart3, Shield, BookOpen
} from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { RetentionChart } from "@/components/dashboard/admin/retention-chart"
import { AT_RISK_STUDENTS, FACULTY, FACULTY_PD_DETAIL, INSTITUTIONS } from "@/lib/demo-data"

export const metadata: Metadata = { title: "Admin Dashboard — STEM-ED-AI" }

const atc = INSTITUTIONS[0]

export default function AdminDashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
  const pdCompliant = FACULTY.filter((f) => f.pdCompliant).length

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">{greeting}, Dr. Lee</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            Atlanta Technical College · {atc.students.toLocaleString()} students enrolled
          </p>
        </div>
        <Link
          href="/assistant"
          className="hidden sm:flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4338CA] hover:-translate-y-px"
        >
          <Brain className="h-4 w-4" />
          AI Workspace
        </Link>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Enrollment" value={atc.students.toLocaleString()} hint="Spring 2026" animationDelay={0} />
        <StatCard
          label="Retention Rate"
          value={`${atc.retention}%`}
          hint={`Target: ${atc.target}% · Gap: ${atc.target - atc.retention}pp`}
          variant="warning"
          delta={{ value: -(atc.target - atc.retention), period: "vs target" }}
          animationDelay={0.05}
        />
        <StatCard label="At-Risk Students" value={47} hint="Up 12% this week" variant="danger" animationDelay={0.1} />
        <StatCard
          label="Faculty PD"
          value={`${pdCompliant}/${FACULTY.length}`}
          hint={`${FACULTY.length - pdCompliant} faculty behind schedule`}
          variant={pdCompliant === FACULTY.length ? "success" : "warning"}
          animationDelay={0.15}
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left + center (2 cols) */}
        <div className="lg:col-span-2 space-y-6">

          {/* SKORA at-risk panel */}
          <div className="rounded-xl border border-[#FEE2E2] bg-white">
            <div className="flex items-center justify-between border-b border-[#FEE2E2] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FEE2E2]">
                  <TrendingUp className="h-3.5 w-3.5 text-[#DC2626]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#18181B]">SKORA — At-Risk Alerts</p>
                  <p className="text-[10px] text-[#A1A1AA]">Retention intelligence · Updated 9:42 AM</p>
                </div>
              </div>
              <Link href="/dashboard/admin/students" className="flex items-center gap-1 text-xs text-[#4F46E5] hover:underline">
                All students <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-[#FFF5F5]">
              {AT_RISK_STUDENTS.map((s) => (
                <div key={s.id} className="flex items-center gap-4 px-5 py-3.5">
                  {/* Risk score ring */}
                  <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 ${
                    s.riskScore >= 85 ? "border-[#DC2626] bg-[#FEF2F2]" :
                    s.riskScore >= 70 ? "border-[#D97706] bg-[#FFFBEB]" :
                    "border-[#A1A1AA] bg-[#FAFAF9]"
                  }`}>
                    <span className={`font-mono text-xs font-bold ${
                      s.riskScore >= 85 ? "text-[#DC2626]" :
                      s.riskScore >= 70 ? "text-[#D97706]" : "text-[#52525B]"
                    }`}>
                      {s.riskScore}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#18181B]">{s.name}</p>
                    <p className="text-xs text-[#52525B]">{s.program} · {s.lmsActivity}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      s.aid === "Hold"    ? "bg-[#FEE2E2] text-[#DC2626]" :
                      s.aid === "Delayed" ? "bg-[#FEF3C7] text-[#D97706]" :
                      "bg-[#D1FAE5] text-[#059669]"
                    }`}>
                      Aid: {s.aid}
                    </span>
                    <span className="text-[11px] text-[#A1A1AA]">{s.lastSeen}</span>
                    <Link
                      href="/assistant"
                      className="rounded-lg border border-[#E8E6E1] px-2.5 py-1 text-[11px] font-medium text-[#52525B] transition-colors hover:border-[#4F46E5] hover:text-[#4F46E5]"
                    >
                      Intervene
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-3 bg-[#FFF5F5] rounded-b-xl">
              <p className="text-[11px] text-[#A1A1AA]">
                SKORA monitors 14 behavioral signals · Risk scores update every 4 hours
              </p>
            </div>
          </div>

          {/* Retention trend chart */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#18181B]">Retention Trend</p>
                <p className="mt-0.5 text-[11px] text-[#A1A1AA]">ATC · Oct 2025 – May 2026 · Target: 73%</p>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#4F46E5]" />
                  <span className="text-[#52525B]">Actual</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-px w-5 border-t-2 border-dashed border-[#D97706]" />
                  <span className="text-[#52525B]">Target</span>
                </div>
              </div>
            </div>
            <RetentionChart />
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#FEF3C7] px-3 py-2">
              <AlertTriangle className="h-3.5 w-3.5 text-[#D97706]" />
              <p className="text-[11px] text-[#92400E]">
                <span className="font-semibold">13pp gap to target.</span> At current trajectory, ATC will reach 65% by semester end — 8pp short.
              </p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Faculty PD compliance */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="flex items-center justify-between border-b border-[#E8E6E1] px-4 py-3.5">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#52525B]" />
                <p className="text-sm font-semibold text-[#18181B]">Faculty PD</p>
              </div>
              <Link href="/dashboard/admin/faculty" className="text-xs text-[#4F46E5] hover:underline">
                Details →
              </Link>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {FACULTY.map((f) => {
                const completed = (FACULTY_PD_DETAIL[f.id] ?? []).length
                return (
                  <div key={f.id} className="flex items-center gap-3 px-4 py-3">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      f.pdCompliant ? "bg-[#D1FAE5]" : "bg-[#FEE2E2]"
                    }`}>
                      {f.pdCompliant
                        ? <CheckCircle2 className="h-3.5 w-3.5 text-[#059669]" />
                        : <Clock className="h-3.5 w-3.5 text-[#DC2626]" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-[#18181B]">{f.name}</p>
                      <p className="text-[10px] text-[#A1A1AA]">{f.department}</p>
                    </div>
                    <span className={`font-mono text-xs font-semibold ${
                      f.pdCompliant ? "text-[#059669]" : "text-[#DC2626]"
                    }`}>
                      {completed}/{f.pdRequired}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick reports */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-[#52525B]" />
              <p className="text-sm font-semibold text-[#18181B]">Reports</p>
            </div>
            <div className="space-y-2">
              {[
                { label: "TCSG Q1 2026 Report", status: "Ready", color: "#059669" },
                { label: "SACSCOC Accreditation", status: "Due Jun 1", color: "#D97706" },
                { label: "Faculty PD Compliance", status: "Ready", color: "#059669" },
                { label: "IPEDS Fall Survey", status: "Draft", color: "#A1A1AA" },
              ].map((r) => (
                <Link
                  key={r.label}
                  href="/dashboard/admin/reports"
                  className="flex items-center justify-between rounded-lg border border-[#E8E6E1] px-3 py-2.5 transition-colors hover:border-[#D6D3CC] hover:bg-[#FAFAF9]"
                >
                  <span className="text-xs text-[#52525B]">{r.label}</span>
                  <span className="font-mono text-[10px]" style={{ color: r.color }}>{r.status}</span>
                </Link>
              ))}
            </div>
            <Link href="/dashboard/admin/reports" className="mt-3 flex items-center gap-1 text-xs text-[#4F46E5] hover:underline">
              All reports <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quick actions */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Students", icon: GraduationCap, href: "/dashboard/admin/students", color: "#4F46E5" },
                { label: "Faculty", icon: Users, href: "/dashboard/admin/faculty", color: "#059669" },
                { label: "Reports", icon: BarChart3, href: "/dashboard/admin/reports", color: "#B8860B" },
                { label: "Compliance", icon: Shield, href: "/dashboard/cyber/compliance", color: "#DC2626" },
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
        </div>
      </div>
    </div>
  )
}
