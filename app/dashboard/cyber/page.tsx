import type { Metadata } from "next"
import Link from "next/link"
import {
  Shield, AlertTriangle, CheckCircle2, Brain,
  BarChart3, FileText, Lock, Eye, ArrowRight, Clock
} from "lucide-react"
import { NIST_CONTROLS, AUDIT_LOG } from "@/lib/demo-data"
import { StatCard } from "@/components/dashboard/stat-card"

export const metadata: Metadata = { title: "Cyber & IT Dashboard — STEM-ED-AI" }

const COMPLIANCE_ITEMS = [
  { label: "FERPA",         status: "Compliant",    color: "#059669", bg: "#D1FAE5" },
  { label: "CMMC 2.0",      status: "In Progress",  color: "#4F46E5", bg: "#EEF2FF" },
  { label: "ADA / 508",     status: "Compliant",    color: "#059669", bg: "#D1FAE5" },
  { label: "CISA KEV",      status: "0 open",       color: "#059669", bg: "#D1FAE5" },
  { label: "NIST 800-171",  status: "83%",          color: "#D97706", bg: "#FEF3C7" },
  { label: "ISO 27001",     status: "Gap Analysis",  color: "#A1A1AA", bg: "#F4F4F2" },
]

export default function CyberDashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  const totalControls = NIST_CONTROLS.reduce((s, c) => s + c.controls, 0)
  const passedControls = NIST_CONTROLS.reduce((s, c) => s + c.passed, 0)
  const nistScore = Math.round(NIST_CONTROLS.reduce((s, c) => s + c.score, 0) / NIST_CONTROLS.length)
  const highFindings = AUDIT_LOG.filter((e) => e.severity === "high").length

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">{greeting}, IT Admin</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            Security Operations · ATC · Last scan: Today 06:00 AM
          </p>
        </div>
        <Link
          href="/assistant"
          className="hidden sm:flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4338CA] hover:-translate-y-px"
        >
          <Brain className="h-4 w-4" /> Compliance Guard
        </Link>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="NIST RMF Score"    value={`${nistScore}/100`} hint="NIST 800-53 avg" variant={nistScore >= 90 ? "success" : "warning"} animationDelay={0} />
        <StatCard label="Controls Passing"  value={`${passedControls}/${totalControls}`} hint="NIST 800-53" variant="success" animationDelay={0.05} />
        <StatCard label="High Findings"     value={highFindings} hint="Require immediate action" variant={highFindings > 0 ? "danger" : "success"} animationDelay={0.1} />
        <StatCard label="FERPA Status"      value="Compliant" hint="Last reviewed May 10" variant="success" animationDelay={0.15} />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* NIST control family overview + quick nav */}
        <div className="lg:col-span-2 space-y-6">

          {/* Top control families */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="flex items-center justify-between border-b border-[#E8E6E1] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EEF2FF]">
                  <Shield className="h-3.5 w-3.5 text-[#4F46E5]" />
                </div>
                <p className="text-sm font-semibold text-[#18181B]">NIST 800-53 Control Families</p>
              </div>
              <Link href="/dashboard/cyber/risk" className="flex items-center gap-1 text-xs text-[#4F46E5] hover:underline">
                Full risk register <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {NIST_CONTROLS.slice(0, 6).map((ctrl) => {
                const color = ctrl.score >= 90 ? "#059669" : ctrl.score >= 75 ? "#D97706" : "#DC2626"
                return (
                  <div key={ctrl.id} className="flex items-center gap-4 px-5 py-3">
                    <span className="w-8 font-mono text-xs font-bold uppercase text-[#A1A1AA]">{ctrl.id}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-[#18181B]">{ctrl.family}</p>
                        <span className="font-mono text-xs font-semibold" style={{ color }}>{ctrl.score}</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                        <div className="h-full rounded-full" style={{ width: `${ctrl.score}%`, background: color }} />
                      </div>
                    </div>
                    <span className="text-[11px] text-[#A1A1AA] shrink-0">{ctrl.passed}/{ctrl.controls}</span>
                  </div>
                )
              })}
            </div>
            <div className="rounded-b-xl bg-[#FAFAF9] px-5 py-3">
              <Link href="/dashboard/cyber/risk" className="flex items-center gap-1 text-xs font-medium text-[#4F46E5] hover:underline">
                View all {NIST_CONTROLS.length} control families <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Recent audit entries */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="flex items-center justify-between border-b border-[#E8E6E1] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#52525B]" />
                <p className="text-sm font-semibold text-[#18181B]">Recent Audit Events</p>
              </div>
              <Link href="/dashboard/cyber/audit" className="flex items-center gap-1 text-xs text-[#4F46E5] hover:underline">
                Full audit log <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {AUDIT_LOG.slice(0, 4).map((entry) => (
                <div key={entry.id} className="flex items-start gap-3 px-5 py-3">
                  <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                    entry.severity === "high" ? "bg-[#DC2626]" : entry.severity === "medium" ? "bg-[#D97706]" : "bg-[#059669]"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#18181B]">{entry.details}</p>
                    <div className="mt-0.5 flex items-center gap-2 text-[10px] text-[#A1A1AA]">
                      <span>{entry.user}</span>
                      {entry.agent && <span>· {entry.agent}</span>}
                      <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{entry.timestamp.slice(11, 16)}</span>
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    entry.severity === "high"   ? "bg-[#FEE2E2] text-[#DC2626]" :
                    entry.severity === "medium" ? "bg-[#FEF3C7] text-[#D97706]" :
                    "bg-[#D1FAE5] text-[#059669]"
                  }`}>{entry.severity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Compliance status */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-4 w-4 text-[#059669]" />
              <p className="text-sm font-semibold text-[#18181B]">Compliance Status</p>
            </div>
            <div className="space-y-2">
              {COMPLIANCE_ITEMS.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg border border-[#E8E6E1] px-3 py-2">
                  <span className="text-xs font-medium text-[#52525B]">{item.label}</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: item.bg, color: item.color }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/dashboard/cyber/compliance" className="mt-3 flex items-center gap-1 text-xs text-[#4F46E5] hover:underline">
              Full compliance report <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quick actions */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Risk",       icon: Shield,    href: "/dashboard/cyber/risk",       color: "#DC2626" },
                { label: "Compliance", icon: CheckCircle2, href: "/dashboard/cyber/compliance", color: "#059669" },
                { label: "Audit Log",  icon: Eye,       href: "/dashboard/cyber/audit",       color: "#4F46E5" },
                { label: "Reports",    icon: BarChart3, href: "/dashboard/admin/reports",     color: "#D97706" },
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

          {/* Agent boundary */}
          <div className="flex items-start gap-2 rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] px-3 py-3">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D97706]" />
            <p className="text-[11px] text-[#92400E]">
              <span className="font-semibold">Compliance Guard</span> flags policy violations and FERPA risks.
              It does <span className="font-semibold">not</span> auto-remediate. All fixes require IT team action.
            </p>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        NIST 800-53 scores update on each scan · All agent actions are audit-logged · FERPA data never leaves ATC boundary
      </p>
    </div>
  )
}
