import type { Metadata } from "next"
import Link from "next/link"
import {
  BookOpen, Users, ClipboardList, AlertTriangle,
  ArrowRight, CheckCircle2, Clock, Zap, BarChart3,
  GraduationCap, CalendarDays, Brain
} from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { AT_RISK_STUDENTS, COURSES, CALENDAR_EVENTS, LESSON_PLANS } from "@/lib/demo-data"

export const metadata: Metadata = { title: "Teacher Dashboard — STEM-ED-AI" }

const CLASS_PERFORMANCE = [
  { code: "CS 1010", title: "Intro to Programming", avg: 76, students: 28, atRisk: 2 },
  { code: "MATH 2010", title: "Calculus I", avg: 71, students: 24, atRisk: 1 },
  { code: "ENGR 4850", title: "AI Systems Engineering", avg: 83, students: 18, atRisk: 0 },
  { code: "NURS 2100", title: "Clinical Fundamentals", avg: 79, students: 22, atRisk: 1 },
]

export default function TeacherDashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
  const todayEvents = CALENDAR_EVENTS.filter((e) => e.category === "class").slice(0, 3)
  const atRiskStudents = AT_RISK_STUDENTS.slice(0, 3)

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">{greeting}, Dr. Webb</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            Monday, May 19 · 2 classes today · 12 assignments pending grading
          </p>
        </div>
        <Link
          href="/assistant"
          className="hidden sm:flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4338CA] hover:-translate-y-px"
        >
          <Brain className="h-4 w-4" />
          AI Assistant
        </Link>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Active Courses" value={4} hint="92 total students" animationDelay={0} />
        <StatCard label="Pending Grading" value={12} unit="items" hint="3 overdue" variant="warning" animationDelay={0.05} />
        <StatCard label="At-Risk Students" value={3} hint="Action recommended" variant="danger" animationDelay={0.1} />
        <StatCard label="PD Compliance" value="4/4" hint="All modules complete" variant="success" animationDelay={0.15} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* At-risk alerts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-[#FEE2E2] bg-white">
            <div className="flex items-center justify-between border-b border-[#FEE2E2] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-[#DC2626]" />
                <p className="text-sm font-semibold text-[#18181B]">At-Risk Alerts</p>
                <span className="rounded-full bg-[#FEE2E2] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#DC2626]">
                  {atRiskStudents.length}
                </span>
              </div>
              <Link href="/dashboard/admin/students" className="flex items-center gap-1 text-xs text-[#4F46E5] hover:underline">
                SKORA view <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {atRiskStudents.map((s) => (
                <div key={s.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2]">
                    <span className="font-mono text-xs font-bold text-[#DC2626]">{s.riskScore}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#18181B]">{s.name}</p>
                    <p className="text-xs text-[#52525B]">{s.program} · {s.lmsActivity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      s.aid === "Hold" ? "bg-[#FEE2E2] text-[#DC2626]" :
                      s.aid === "Delayed" ? "bg-[#FEF3C7] text-[#D97706]" :
                      "bg-[#D1FAE5] text-[#059669]"
                    }`}>
                      Aid: {s.aid}
                    </span>
                    <Link
                      href="/assistant"
                      className="rounded-lg border border-[#E8E6E1] px-2.5 py-1 text-[11px] text-[#52525B] transition-colors hover:border-[#4F46E5] hover:text-[#4F46E5]"
                    >
                      Draft outreach
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Class performance */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="flex items-center justify-between border-b border-[#E8E6E1] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#4F46E5]" />
                <p className="text-sm font-semibold text-[#18181B]">Class Performance</p>
              </div>
              <Link href="/dashboard/teacher/gradebook" className="flex items-center gap-1 text-xs text-[#4F46E5] hover:underline">
                Gradebook <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {CLASS_PERFORMANCE.map((cls) => (
                <div key={cls.code} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FF]">
                    <BookOpen className="h-4 w-4 text-[#4F46E5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#18181B]">{cls.title}</p>
                      <span className={`font-mono text-sm font-semibold ${
                        cls.avg >= 80 ? "text-[#059669]" : cls.avg >= 70 ? "text-[#D97706]" : "text-[#DC2626]"
                      }`}>
                        {cls.avg}%
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-3">
                      <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-[#F4F4F2]">
                        <div
                          className={`h-full rounded-full ${cls.avg >= 80 ? "bg-[#059669]" : cls.avg >= 70 ? "bg-[#D97706]" : "bg-[#DC2626]"}`}
                          style={{ width: `${cls.avg}%` }}
                        />
                      </div>
                      <span className="shrink-0 text-[11px] text-[#A1A1AA]">{cls.students} students</span>
                      {cls.atRisk > 0 && (
                        <span className="shrink-0 text-[11px] text-[#DC2626]">{cls.atRisk} at risk</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Today's schedule */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="flex items-center gap-2 border-b border-[#E8E6E1] px-4 py-3.5">
              <CalendarDays className="h-4 w-4 text-[#52525B]" />
              <p className="text-sm font-semibold text-[#18181B]">Today</p>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {todayEvents.map((evt) => (
                <div key={evt.id} className="px-4 py-3">
                  <p className="text-sm font-medium text-[#18181B]">{evt.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Clock className="h-3 w-3 text-[#A1A1AA]" />
                    <span className="text-[11px] text-[#A1A1AA]">
                      {new Date(evt.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      {" – "}
                      {new Date(evt.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {evt.location && (
                      <span className="text-[11px] text-[#A1A1AA]">· {evt.location}</span>
                    )}
                  </div>
                </div>
              ))}
              <div className="px-4 py-3">
                <Link href="/calendar" className="text-xs text-[#4F46E5] hover:underline">
                  View full calendar →
                </Link>
              </div>
            </div>
          </div>

          {/* Recent lesson plans */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="flex items-center justify-between border-b border-[#E8E6E1] px-4 py-3.5">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#B8860B]" />
                <p className="text-sm font-semibold text-[#18181B]">Recent Plans</p>
              </div>
              <Link href="/dashboard/teacher/curriculum" className="text-xs text-[#4F46E5] hover:underline">
                Generator →
              </Link>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {LESSON_PLANS.slice(0, 3).map((plan) => (
                <div key={plan.id} className="flex items-start gap-3 px-4 py-3">
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    plan.status === "published" ? "bg-[#D1FAE5]" : "bg-[#FEF3C7]"
                  }`}>
                    {plan.status === "published"
                      ? <CheckCircle2 className="h-3 w-3 text-[#059669]" />
                      : <Clock className="h-3 w-3 text-[#D97706]" />
                    }
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#18181B]">{plan.title}</p>
                    <p className="text-[11px] text-[#A1A1AA]">{plan.course} · {plan.generatedAt}</p>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3">
                <Link href="/dashboard/teacher/curriculum" className="flex items-center gap-1 text-xs text-[#4F46E5] hover:underline">
                  <Zap className="h-3.5 w-3.5" />
                  Generate new lesson plan
                </Link>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Gradebook", icon: ClipboardList, href: "/dashboard/teacher/gradebook", color: "#4F46E5" },
                { label: "Classes", icon: Users, href: "/dashboard/teacher/classes", color: "#059669" },
                { label: "Lesson AI", icon: Zap, href: "/dashboard/teacher/curriculum", color: "#B8860B" },
                { label: "Students", icon: GraduationCap, href: "/dashboard/admin/students", color: "#7C3AED" },
              ].map(({ label, icon: Icon, href, color }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-[#E8E6E1] p-3 text-center text-xs font-medium text-[#52525B] transition-all hover:border-[#D6D3CC] hover:-translate-y-px"
                >
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
