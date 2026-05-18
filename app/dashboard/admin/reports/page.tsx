"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Download, Brain, CheckCircle2, Clock, AlertTriangle,
  FileText, BarChart3, Shield, GraduationCap, RefreshCw,
  Filter, FileSpreadsheet, Trash2, CalendarDays, Users, BookOpen
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { REPORT_PROGRAMS, REPORT_COHORTS, SAVED_REPORTS } from "@/lib/demo-data"

type ReportStatus = "Ready" | "Due Soon" | "Draft" | "Generating"

interface Report {
  id: string; title: string; framework: string; status: ReportStatus
  dueDate: string; description: string; lastGenerated: string
  pages: number; icon: React.ElementType; color: string; bg: string
}

const REPORTS: Report[] = [
  { id: "tcsg-q1",    title: "TCSG Q1 2026 Performance Report",      framework: "TCSG",        status: "Ready",    dueDate: "May 31, 2026", description: "Quarterly enrollment, retention, and completion metrics for Technical College System of Georgia oversight.",         lastGenerated: "May 17, 2026 · 9:42 AM",     pages: 24, icon: BarChart3,   color: "#059669", bg: "#D1FAE5" },
  { id: "sacscoc",    title: "SACSCOC Accreditation Report",          framework: "SACSCOC",     status: "Due Soon", dueDate: "Jun 1, 2026",  description: "Southern Association annual institutional effectiveness and continuous improvement documentation.",                lastGenerated: "Apr 30, 2026 · 2:15 PM",     pages: 47, icon: Shield,     color: "#D97706", bg: "#FEF3C7" },
  { id: "faculty-pd", title: "Faculty PD Compliance Summary",         framework: "Internal/TCSG",status: "Ready",   dueDate: "May 31, 2026", description: "Professional development completion status across all faculty, mapped to TCSG compliance requirements.",            lastGenerated: "May 18, 2026 · 8:02 AM",     pages: 8,  icon: GraduationCap,color:"#059669",bg: "#D1FAE5" },
  { id: "ipeds",      title: "IPEDS Fall Survey 2026",                framework: "IPEDS/NCES",  status: "Draft",    dueDate: "Aug 15, 2026", description: "Integrated Postsecondary Education Data System enrollment, financial aid, and outcomes reporting.",                lastGenerated: "Draft started May 15, 2026",  pages: 0,  icon: FileText,   color: "#A1A1AA", bg: "#F4F4F2" },
  { id: "bor",        title: "Board of Regents Retention Analysis",   framework: "BOR/USG",     status: "Draft",    dueDate: "Jul 1, 2026",  description: "University System of Georgia annual retention and persistence analysis benchmarked against peer institutions.",     lastGenerated: "Not yet generated",           pages: 0,  icon: BarChart3,  color: "#A1A1AA", bg: "#F4F4F2" },
  { id: "ferpa-audit",title: "FERPA Privacy Compliance Audit",        framework: "FERPA/DOE",   status: "Ready",    dueDate: "Ongoing",      description: "Annual Family Educational Rights and Privacy Act compliance review of data handling and access controls.",           lastGenerated: "May 10, 2026 · 11:30 AM",    pages: 15, icon: Shield,     color: "#059669", bg: "#D1FAE5" },
]

const STATUS_STYLE: Record<ReportStatus, { badge: string; icon: React.ElementType }> = {
  "Ready":      { badge: "bg-[#D1FAE5] text-[#059669]", icon: CheckCircle2 },
  "Due Soon":   { badge: "bg-[#FEF3C7] text-[#D97706]", icon: AlertTriangle },
  "Draft":      { badge: "bg-[#F4F4F2] text-[#A1A1AA]", icon: FileText },
  "Generating": { badge: "bg-[#EEF2FF] text-[#4F46E5]", icon: RefreshCw },
}

const METRICS = ["Enrollment", "Retention Rate", "Completion Rate", "GPA Distribution", "At-Risk Count", "Financial Aid Status", "Attendance Rate", "Assessment Scores"]
const DEMOGRAPHIC_OPTIONS = ["All", "Gender", "Race/Ethnicity", "Age Group", "Pell Grant", "First Generation", "Transfer Students"]

export default function AdminReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null)

  // Custom builder state
  const [cbProgram,   setCbProgram]   = useState("All Programs")
  const [cbCohort,    setCbCohort]    = useState("All Cohorts")
  const [cbDateFrom,  setCbDateFrom]  = useState("2026-01-01")
  const [cbDateTo,    setCbDateTo]    = useState("2026-05-31")
  const [cbMetrics,   setCbMetrics]   = useState<string[]>(["Enrollment", "Retention Rate"])
  const [cbDemog,     setCbDemog]     = useState("All")
  const [cbFormat,    setCbFormat]    = useState<"pdf" | "xlsx">("xlsx")
  const [cbRunning,   setCbRunning]   = useState(false)
  const [cbDone,      setCbDone]      = useState(false)

  const [savedList, setSavedList] = useState(SAVED_REPORTS)

  function handleGenerate(id: string) {
    setGenerating(id)
    setTimeout(() => setGenerating(null), 3000)
  }

  function handleRunReport() {
    setCbRunning(true); setCbDone(false)
    setTimeout(() => { setCbRunning(false); setCbDone(true) }, 2500)
  }

  function toggleMetric(m: string) {
    setCbMetrics((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m])
  }

  const readyCount   = REPORTS.filter((r) => r.status === "Ready").length
  const dueSoonCount = REPORTS.filter((r) => r.status === "Due Soon").length
  const draftCount   = REPORTS.filter((r) => r.status === "Draft").length

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Reports & Exports</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {REPORTS.length} compliance reports · Custom builder · Spring 2026
          </p>
        </div>
        <Link href="/assistant" className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-2 text-sm font-medium text-white hover:bg-[#4338CA]">
          <Brain className="h-3.5 w-3.5" /> AI Reports
        </Link>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Ready to Export", value: readyCount,   color: "#059669", bg: "#D1FAE5", icon: CheckCircle2 },
          { label: "Due Soon",        value: dueSoonCount, color: "#D97706", bg: "#FEF3C7", icon: AlertTriangle },
          { label: "In Draft",        value: draftCount,   color: "#A1A1AA", bg: "#F4F4F2", icon: FileText },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-[#E8E6E1] bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: kpi.bg }}>
                <kpi.icon className="h-4 w-4" style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-[#18181B]">{kpi.value}</p>
                <p className="text-[11px] text-[#A1A1AA]">{kpi.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="compliance">
        <TabsList className="w-full justify-start gap-0 rounded-none border-b border-[#E8E6E1] bg-transparent px-0 h-10">
          {[
            { value: "compliance", label: "Compliance Reports" },
            { value: "builder",    label: "Custom Builder" },
            { value: "saved",      label: `Saved (${savedList.length})` },
          ].map((t) => (
            <TabsTrigger key={t.value} value={t.value}
              className="h-10 rounded-none border-b-2 border-transparent px-4 text-sm data-[state=active]:border-[#4F46E5] data-[state=active]:text-[#4F46E5] data-[state=active]:bg-transparent">
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Compliance Reports ── */}
        <TabsContent value="compliance" className="mt-5">
          <div className="grid gap-4 lg:grid-cols-2">
            {REPORTS.map((report, i) => {
              const isGenerating    = generating === report.id
              const currentStatus: ReportStatus = isGenerating ? "Generating" : report.status
              const { badge, icon: StatusIcon } = STATUS_STYLE[currentStatus]
              return (
                <motion.div key={report.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-[#E8E6E1] bg-white p-5 transition-shadow hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: report.bg }}>
                        <report.icon className="h-4 w-4" style={{ color: report.color }} />
                      </div>
                      <div>
                        <p className="font-medium text-[#18181B] leading-snug">{report.title}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-[#A1A1AA]">{report.framework}</p>
                      </div>
                    </div>
                    <span className={cn("shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold", badge)}>
                      <StatusIcon className={cn("h-2.5 w-2.5", isGenerating && "animate-spin")} />
                      {currentStatus}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-[#52525B] leading-relaxed">{report.description}</p>
                  <div className="mt-3 flex items-center gap-4 text-[11px] text-[#A1A1AA]">
                    <span>Due: <span className="font-medium text-[#52525B]">{report.dueDate}</span></span>
                    {report.pages > 0 && <span>{report.pages} pages</span>}
                    <span className="ml-auto">{report.lastGenerated}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 border-t border-[#F4F4F2] pt-3">
                    {report.status === "Ready" && (
                      <>
                        <button className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4338CA]">
                          <Download className="h-3 w-3" /> PDF
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] hover:border-[#D6D3CC]">
                          <FileSpreadsheet className="h-3 w-3" /> Excel
                        </button>
                      </>
                    )}
                    {(report.status === "Draft" || report.status === "Due Soon") && (
                      <button onClick={() => handleGenerate(report.id)} disabled={isGenerating}
                        className={cn("flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                          isGenerating ? "bg-[#EEF2FF] text-[#4F46E5] cursor-wait" : "bg-[#4F46E5] text-white hover:bg-[#4338CA]")}>
                        {isGenerating ? <><RefreshCw className="h-3 w-3 animate-spin" /> Generating…</> : <><Brain className="h-3 w-3" /> Generate with AI</>}
                      </button>
                    )}
                    <button className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] hover:border-[#D6D3CC]">
                      <FileText className="h-3 w-3" /> Preview
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </TabsContent>

        {/* ── Custom Builder ── */}
        <TabsContent value="builder" className="mt-5">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Filters panel */}
            <div className="lg:col-span-1 space-y-5">
              <div className="rounded-xl border border-[#E8E6E1] bg-white p-5 space-y-4">
                <p className="font-semibold text-[#18181B] flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#4F46E5]" /> Filters
                </p>

                <div>
                  <label className="block text-xs font-medium text-[#52525B] mb-1.5">Program</label>
                  <select value={cbProgram} onChange={(e) => setCbProgram(e.target.value)}
                    className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]">
                    {REPORT_PROGRAMS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#52525B] mb-1.5">Cohort</label>
                  <select value={cbCohort} onChange={(e) => setCbCohort(e.target.value)}
                    className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]">
                    {REPORT_COHORTS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-[#52525B] mb-1.5">
                      <CalendarDays className="inline h-3 w-3 mr-0.5" /> From
                    </label>
                    <input type="date" value={cbDateFrom} onChange={(e) => setCbDateFrom(e.target.value)}
                      className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm outline-none focus:border-[#4F46E5]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#52525B] mb-1.5">To</label>
                    <input type="date" value={cbDateTo} onChange={(e) => setCbDateTo(e.target.value)}
                      className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm outline-none focus:border-[#4F46E5]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#52525B] mb-1.5">
                    <Users className="inline h-3 w-3 mr-0.5" /> Breakdown by
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {DEMOGRAPHIC_OPTIONS.map((d) => (
                      <button key={d} onClick={() => setCbDemog(d)}
                        className={cn("rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-all",
                          cbDemog === d ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]")}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#52525B] mb-1.5">Export format</label>
                  <div className="flex gap-2">
                    {(["xlsx", "pdf"] as const).map((f) => (
                      <button key={f} onClick={() => setCbFormat(f)}
                        className={cn("flex-1 flex items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-all",
                          cbFormat === f ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "border-[#E8E6E1] text-[#52525B]")}>
                        {f === "xlsx" ? <FileSpreadsheet className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                        {f.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics + output */}
            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-xl border border-[#E8E6E1] bg-white p-5">
                <p className="mb-3 font-semibold text-[#18181B] flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#4F46E5]" /> Metrics to Include
                </p>
                <div className="flex flex-wrap gap-2">
                  {METRICS.map((m) => {
                    const active = cbMetrics.includes(m)
                    return (
                      <button key={m} onClick={() => toggleMetric(m)}
                        className={cn("flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all",
                          active ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]")}>
                        {active && <CheckCircle2 className="h-3 w-3" />}
                        {m}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Preview summary */}
              <div className="rounded-xl border border-[#E8E6E1] bg-[#FAFAF9] p-5">
                <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-widest mb-3">Report Preview</p>
                <div className="space-y-1.5 text-sm text-[#52525B]">
                  <div className="flex justify-between"><span className="text-[#A1A1AA]">Program</span><span className="font-medium text-[#18181B]">{cbProgram}</span></div>
                  <div className="flex justify-between"><span className="text-[#A1A1AA]">Cohort</span><span className="font-medium text-[#18181B]">{cbCohort}</span></div>
                  <div className="flex justify-between"><span className="text-[#A1A1AA]">Date range</span><span className="font-medium text-[#18181B]">{cbDateFrom} → {cbDateTo}</span></div>
                  <div className="flex justify-between"><span className="text-[#A1A1AA]">Breakdown</span><span className="font-medium text-[#18181B]">{cbDemog}</span></div>
                  <div className="flex justify-between"><span className="text-[#A1A1AA]">Metrics ({cbMetrics.length})</span><span className="font-medium text-[#18181B] text-right max-w-[60%] text-xs">{cbMetrics.join(", ")}</span></div>
                  <div className="flex justify-between"><span className="text-[#A1A1AA]">Format</span><span className="font-medium text-[#18181B]">{cbFormat.toUpperCase()}</span></div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRunReport}
                  disabled={cbRunning || cbMetrics.length === 0}
                  className={cn("flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors",
                    cbRunning ? "bg-[#EEF2FF] text-[#4F46E5] cursor-wait"
                    : cbMetrics.length === 0 ? "bg-[#F4F4F2] text-[#A1A1AA] cursor-not-allowed"
                    : "bg-[#4F46E5] text-white hover:bg-[#4338CA]")}
                >
                  {cbRunning
                    ? <><RefreshCw className="h-4 w-4 animate-spin" /> Building report…</>
                    : <><BarChart3 className="h-4 w-4" /> Run Report</>}
                </button>

                <AnimatePresence>
                  {cbDone && (
                    <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 rounded-lg bg-[#059669] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#047857]">
                        <Download className="h-3.5 w-3.5" /> Download {cbFormat.toUpperCase()}
                      </button>
                      <span className="text-xs text-[#059669] font-medium">
                        <CheckCircle2 className="inline h-3.5 w-3.5 mr-1" />Ready
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Saved Reports ── */}
        <TabsContent value="saved" className="mt-5">
          {savedList.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#A1A1AA]">No saved reports yet. Use the Custom Builder to generate your first report.</div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white divide-y divide-[#F4F4F2]">
              {savedList.map((r, i) => (
                <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: r.format === "xlsx" ? "#D1FAE5" : "#EEF2FF" }}>
                    {r.format === "xlsx"
                      ? <FileSpreadsheet className="h-4 w-4 text-[#059669]" />
                      : <FileText className="h-4 w-4 text-[#4F46E5]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#18181B] truncate">{r.name}</p>
                    <p className="text-[11px] text-[#A1A1AA]">{r.filters} · {r.rows} rows · {r.generatedAt}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4338CA]">
                      <Download className="h-3 w-3" /> {r.format.toUpperCase()}
                    </button>
                    <button onClick={() => setSavedList((prev) => prev.filter((x) => x.id !== r.id))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8E6E1] text-[#A1A1AA] hover:border-[#FEE2E2] hover:text-[#DC2626]">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <p className="text-[11px] text-[#A1A1AA]">
        Reports generated by SKORA Reporting Engine · All exports audit-logged · FERPA compliant · TCSG / SACSCOC / BOR / IPEDS ready
      </p>
    </div>
  )
}
