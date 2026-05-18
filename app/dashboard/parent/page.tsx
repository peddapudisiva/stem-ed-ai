import type { Metadata } from "next"
import Link from "next/link"
import {
  AlertTriangle, CheckCircle2, MessageSquare, Brain,
  GraduationCap, CalendarDays, DollarSign, ArrowRight, Mail
} from "lucide-react"
import { PARENT_CHILDREN, PARENT_MESSAGES } from "@/lib/demo-data"

export const metadata: Metadata = { title: "Parent Dashboard — STEM-ED-AI" }

const STATUS_STYLE: Record<string, { badge: string; ring: string; icon: typeof AlertTriangle }> = {
  "at-risk": { badge: "bg-[#FEE2E2] text-[#DC2626]",  ring: "border-[#FEE2E2]", icon: AlertTriangle },
  "watch":   { badge: "bg-[#FEF3C7] text-[#D97706]",  ring: "border-[#FEF3C7]", icon: AlertTriangle },
  "good":    { badge: "bg-[#D1FAE5] text-[#059669]",  ring: "border-[#D1FAE5]", icon: CheckCircle2  },
}
const STATUS_LABEL: Record<string, string> = { "at-risk": "Needs Attention", "watch": "Watch", "good": "On Track" }

export default function ParentDashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
  const unreadMessages = PARENT_MESSAGES.filter((m) => !m.read).length

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">{greeting}, Ms. Thompson</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {PARENT_CHILDREN.length} students enrolled · Atlanta Technical College
          </p>
        </div>
        <Link
          href="/assistant"
          className="hidden sm:flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#4338CA] hover:-translate-y-px"
        >
          <Brain className="h-4 w-4" /> Ask AI
        </Link>
      </div>

      {/* Children cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {PARENT_CHILDREN.map((child) => {
          const style = STATUS_STYLE[child.status]
          const StatusIcon = style.icon
          return (
            <Link
              key={child.id}
              href={`/dashboard/parent/child/${child.id}`}
              className={`block rounded-xl border-2 bg-white p-5 transition-all hover:shadow-md hover:-translate-y-px ${style.ring}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-lg ${
                    child.status === "at-risk" ? "bg-[#FEE2E2] text-[#DC2626]" : "bg-[#D1FAE5] text-[#059669]"
                  }`}>
                    {child.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#18181B]">{child.name}</p>
                    <p className="text-xs text-[#52525B]">{child.program} · {child.grade}</p>
                  </div>
                </div>
                <span className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${style.badge}`}>
                  <StatusIcon className="h-3 w-3" />
                  {STATUS_LABEL[child.status]}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: "GPA",        value: child.gpa.toFixed(1), color: child.gpa >= 3.0 ? "#059669" : "#DC2626" },
                  { label: "Attendance", value: `${child.attendance}%`, color: child.attendance >= 75 ? "#059669" : "#DC2626" },
                  { label: "Aid",        value: child.aid, color: child.aid === "Hold" ? "#DC2626" : "#059669" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="rounded-lg bg-[#FAFAF9] px-3 py-2 text-center">
                    <p className="font-mono text-sm font-bold" style={{ color }}>{value}</p>
                    <p className="text-[10px] text-[#A1A1AA]">{label}</p>
                  </div>
                ))}
              </div>

              {child.status === "at-risk" && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#FFF5F5] px-3 py-2">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#DC2626]" />
                  <p className="text-[11px] text-[#DC2626] font-medium">Attendance below threshold · Financial aid on hold</p>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between text-[11px] text-[#A1A1AA]">
                <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{child.nextClass}</span>
                <span className="flex items-center gap-1 text-[#4F46E5] font-medium">View details <ArrowRight className="h-3 w-3" /></span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Messages + quick actions */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Messages (2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-[#E8E6E1] bg-white">
          <div className="flex items-center justify-between border-b border-[#E8E6E1] px-5 py-3.5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EEF2FF]">
                <Mail className="h-3.5 w-3.5 text-[#4F46E5]" />
              </div>
              <p className="text-sm font-semibold text-[#18181B]">Messages from School</p>
              {unreadMessages > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DC2626] text-[10px] font-bold text-white">{unreadMessages}</span>
              )}
            </div>
          </div>
          <div className="divide-y divide-[#F4F4F2]">
            {PARENT_MESSAGES.map((msg) => {
              const child = PARENT_CHILDREN.find((c) => c.id === msg.childId)
              return (
                <div key={msg.id} className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[#FAFAF9] ${!msg.read ? "bg-[#FAFAF9]" : ""}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    !msg.read ? "bg-[#4F46E5] text-white" : "bg-[#F4F4F2] text-[#A1A1AA]"
                  }`}>
                    <MessageSquare className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${!msg.read ? "font-semibold text-[#18181B]" : "font-medium text-[#52525B]"}`}>{msg.subject}</p>
                      <span className="shrink-0 text-[11px] text-[#A1A1AA]">{msg.time}</span>
                    </div>
                    <p className="text-[11px] text-[#A1A1AA]">{msg.from} · Re: {child?.name}</p>
                    <p className="mt-0.5 text-xs text-[#52525B] truncate">{msg.preview}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Quick Actions</p>
            <div className="space-y-2">
              {PARENT_CHILDREN.map((child) => (
                <Link key={child.id} href={`/dashboard/parent/child/${child.id}`}
                  className="flex items-center gap-3 rounded-lg border border-[#E8E6E1] px-3 py-2.5 transition-colors hover:border-[#D6D3CC] hover:bg-[#FAFAF9]">
                  <GraduationCap className="h-4 w-4 shrink-0 text-[#4F46E5]" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#18181B] truncate">{child.name}</p>
                    <p className="text-[10px] text-[#A1A1AA]">View grades & attendance</p>
                  </div>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-4 w-4 text-[#B8860B]" />
              <p className="text-sm font-semibold text-[#18181B]">Financial Aid</p>
            </div>
            {PARENT_CHILDREN.map((child) => (
              <div key={child.id} className="mb-2 flex items-center justify-between rounded-lg border border-[#E8E6E1] px-3 py-2">
                <div>
                  <p className="text-xs font-medium text-[#18181B]">{child.name.split(" ")[0]}</p>
                  <p className="text-[10px] text-[#A1A1AA]">{child.program}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  child.aid === "Hold" ? "bg-[#FEE2E2] text-[#DC2626]" : "bg-[#D1FAE5] text-[#059669]"
                }`}>{child.aid}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        Student records are FERPA-protected · Contact the registrar for official transcripts
      </p>
    </div>
  )
}
