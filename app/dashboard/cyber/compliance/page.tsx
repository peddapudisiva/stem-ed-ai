import type { Metadata } from "next"
import Link from "next/link"
import {
  CheckCircle2, AlertTriangle, Clock, Brain,
  Shield, Lock, Eye, FileText, ArrowRight
} from "lucide-react"

export const metadata: Metadata = { title: "Compliance — STEM-ED-AI" }

const FRAMEWORKS = [
  {
    id: "ferpa",
    name: "FERPA",
    full: "Family Educational Rights & Privacy Act",
    status: "Compliant",
    score: 98,
    lastAudit: "May 10, 2026",
    nextReview: "Nov 10, 2026",
    icon: Lock,
    color: "#059669",
    bg: "#D1FAE5",
    controls: [
      { label: "Student record access controls",       pass: true },
      { label: "PII encryption at rest & in transit",  pass: true },
      { label: "Third-party data sharing agreements",  pass: true },
      { label: "Audit trail for all data access",      pass: true },
      { label: "Annual staff FERPA training",          pass: false },
    ],
  },
  {
    id: "cmmc",
    name: "CMMC 2.0",
    full: "Cybersecurity Maturity Model Certification",
    status: "In Progress",
    score: 71,
    lastAudit: "Apr 15, 2026",
    nextReview: "Jul 1, 2026",
    icon: Shield,
    color: "#4F46E5",
    bg: "#EEF2FF",
    controls: [
      { label: "Multi-factor authentication (MFA)",    pass: true },
      { label: "Incident response plan",               pass: false },
      { label: "System & communications protection",   pass: true },
      { label: "Configuration management baseline",    pass: true },
      { label: "Supply chain risk management",         pass: false },
    ],
  },
  {
    id: "508",
    name: "ADA / Section 508",
    full: "Accessibility for Persons with Disabilities",
    status: "Compliant",
    score: 94,
    lastAudit: "May 1, 2026",
    nextReview: "Nov 1, 2026",
    icon: Eye,
    color: "#059669",
    bg: "#D1FAE5",
    controls: [
      { label: "WCAG 2.1 AA color contrast",           pass: true },
      { label: "Keyboard navigation on all UIs",       pass: true },
      { label: "Screen reader compatibility",          pass: true },
      { label: "Alt text on all images",               pass: true },
      { label: "Captioning for video content",         pass: false },
    ],
  },
  {
    id: "cisa",
    name: "CISA KEV",
    full: "Known Exploited Vulnerabilities Catalog",
    status: "0 open KEVs",
    score: 100,
    lastAudit: "May 18, 2026",
    nextReview: "Continuous",
    icon: AlertTriangle,
    color: "#059669",
    bg: "#D1FAE5",
    controls: [
      { label: "Log4Shell (CVE-2021-44228)",            pass: true },
      { label: "ProxyLogon (CVE-2021-26855)",           pass: true },
      { label: "MOVEit (CVE-2023-34362)",               pass: true },
      { label: "Citrix Bleed (CVE-2023-4966)",          pass: true },
      { label: "PaperCut (CVE-2023-27350)",             pass: true },
    ],
  },
]

function statusBadge(status: string, score: number) {
  if (status === "Compliant" || status === "0 open KEVs") return "bg-[#D1FAE5] text-[#059669]"
  if (status === "In Progress") return "bg-[#EEF2FF] text-[#4F46E5]"
  return "bg-[#FEF3C7] text-[#D97706]"
}

export default function CyberCompliancePage() {
  const compliantCount = FRAMEWORKS.filter((f) => f.score >= 90).length

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Compliance</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {FRAMEWORKS.length} frameworks · {compliantCount} fully compliant · ATC Spring 2026
          </p>
        </div>
        <Link href="/assistant" className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]">
          <Brain className="h-3.5 w-3.5" /> Compliance Guard
        </Link>
      </div>

      {/* Framework cards */}
      <div className="grid gap-5 lg:grid-cols-2">
        {FRAMEWORKS.map((fw) => {
          const failCount = fw.controls.filter((c) => !c.pass).length
          const scoreColor = fw.score >= 90 ? "#059669" : fw.score >= 75 ? "#D97706" : "#DC2626"
          return (
            <div key={fw.id} className="rounded-xl border border-[#E8E6E1] bg-white p-5">
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: fw.bg }}>
                    <fw.icon className="h-5 w-5" style={{ color: fw.color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#18181B]">{fw.name}</p>
                    <p className="text-[11px] text-[#A1A1AA]">{fw.full}</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusBadge(fw.status, fw.score)}`}>
                  {fw.status}
                </span>
              </div>

              {/* Score bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-[#A1A1AA]">Compliance score</span>
                  <span className="font-mono font-bold" style={{ color: scoreColor }}>{fw.score}/100</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                  <div className="h-full rounded-full transition-all" style={{ width: `${fw.score}%`, background: scoreColor }} />
                </div>
              </div>

              {/* Controls checklist */}
              <div className="mt-4 space-y-1.5">
                {fw.controls.map((ctrl) => (
                  <div key={ctrl.label} className="flex items-center gap-2 text-xs">
                    {ctrl.pass
                      ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#059669]" />
                      : <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#D97706]" />
                    }
                    <span className={ctrl.pass ? "text-[#52525B]" : "text-[#D97706] font-medium"}>{ctrl.label}</span>
                  </div>
                ))}
              </div>

              {/* Meta */}
              <div className="mt-4 flex items-center justify-between border-t border-[#F4F4F2] pt-3 text-[10px] text-[#A1A1AA]">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Last audit: {fw.lastAudit}</span>
                <span>Next: {fw.nextReview}</span>
              </div>

              {failCount > 0 && (
                <div className="mt-3 flex items-center justify-between rounded-lg bg-[#FFFBEB] border border-[#FEF3C7] px-3 py-2">
                  <p className="text-[11px] text-[#92400E]">
                    <span className="font-semibold">{failCount} control{failCount > 1 ? "s" : ""}</span> need attention
                  </p>
                  <Link href="/assistant" className="flex items-center gap-1 text-[11px] font-medium text-[#4F46E5] hover:underline">
                    Get guidance <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Agent boundary */}
      <div className="flex items-start gap-2 rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] px-4 py-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]" />
        <p className="text-xs text-[#92400E]">
          <span className="font-semibold">Compliance Guard flags only — it does not auto-remediate.</span> All
          remediation actions must be authorized and executed by the IT team. Flagged items are logged in the audit trail.
        </p>
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        Compliance data reflects most recent scan · FERPA data never leaves ATC boundary · All agent actions are audit-logged
      </p>
    </div>
  )
}
