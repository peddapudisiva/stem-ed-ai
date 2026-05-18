"use client"

import { use } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft, Brain, CheckCircle2, Clock, User,
  Sparkles, MessageSquare, ThumbsUp, AlertTriangle, ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PROPOSALS, PROPOSAL_ACTIVITY } from "@/lib/demo-data"

const WORKFLOW_STEPS_6 = ["Draft", "AI Review", "Dept. Review", "Committee", "Pending Approval", "Approved"]
const WORKFLOW_STEPS_8 = ["Draft", "AI Review", "Dept. Review", "Committee", "Academic Affairs", "Board", "Catalog", "Published"]

const STATUS_STYLE: Record<string, { badge: string; color: string }> = {
  "Draft":            { badge: "bg-[#F4F4F2] text-[#52525B]",  color: "#A1A1AA" },
  "In Review":        { badge: "bg-[#EEF2FF] text-[#4F46E5]",  color: "#4F46E5" },
  "Committee Review": { badge: "bg-[#FEF3C7] text-[#D97706]",  color: "#D97706" },
  "Pending Approval": { badge: "bg-[#FEE2E2] text-[#DC2626]",  color: "#DC2626" },
}

const ACTION_ICON: Record<string, React.ElementType> = {
  submitted: ArrowRight,
  approved:  CheckCircle2,
  comment:   MessageSquare,
  scored:    Sparkles,
  draft:     Clock,
}

const ROLE_COLOR: Record<string, string> = {
  ai:        "#4F46E5",
  author:    "#059669",
  reviewer:  "#D97706",
  committee: "#B8860B",
}

export default function ProposalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const proposal = PROPOSALS.find((p) => p.id === id)
  const activity = PROPOSAL_ACTIVITY[id] ?? []

  if (!proposal) {
    return (
      <div className="space-y-4 animate-fade-up">
        <Link href="/dashboard/curriculum/proposals" className="flex items-center gap-1.5 text-sm text-[#A1A1AA] hover:text-[#52525B]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to proposals
        </Link>
        <div className="rounded-xl border border-[#E8E6E1] bg-white py-16 text-center text-sm text-[#A1A1AA]">
          Proposal not found.
        </div>
      </div>
    )
  }

  const style   = STATUS_STYLE[proposal.status] ?? STATUS_STYLE["Draft"]
  const steps   = proposal.total === 8 ? WORKFLOW_STEPS_8 : WORKFLOW_STEPS_6
  const scoreColor = proposal.aiScore >= 90 ? "#059669" : proposal.aiScore >= 75 ? "#D97706" : "#DC2626"

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Back + header */}
      <div>
        <Link href="/dashboard/curriculum/proposals" className="flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-[#52525B] transition-colors mb-3">
          <ArrowLeft className="h-3.5 w-3.5" /> All proposals
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-semibold text-[#A1A1AA]">{proposal.id}</span>
              <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", style.badge)}>{proposal.status}</span>
              <span className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold" style={{ borderColor: `${scoreColor}40`, color: scoreColor }}>
                <Sparkles className="h-3 w-3" /> {proposal.aiScore}/100
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold text-[#18181B] leading-snug">{proposal.title}</h1>
            <p className="mt-1 text-sm text-[#52525B]">{proposal.author} · Submitted {proposal.submittedAt}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/assistant"
              className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm text-[#52525B] transition-colors hover:border-[#D6D3CC]"
            >
              <Brain className="h-3.5 w-3.5" /> AI Review
            </Link>
          </div>
        </div>
      </div>

      {/* Workflow stepper */}
      <div className="rounded-xl border border-[#E8E6E1] bg-white p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Approval Workflow</p>
        <div className="flex items-center">
          {steps.map((step, i) => {
            const completed = i < proposal.step
            const current   = i === proposal.step - 1
            return (
              <div key={step} className="flex flex-1 items-center">
                <div className="flex-1 flex flex-col items-center">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all",
                    completed ? "border-[#4F46E5] bg-[#4F46E5] text-white" :
                    current   ? "border-[#4F46E5] bg-white text-[#4F46E5]" :
                    "border-[#E8E6E1] bg-[#FAFAF9] text-[#A1A1AA]"
                  )}>
                    {completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <p className={cn("mt-1.5 text-center text-[9px] leading-tight", current ? "font-semibold text-[#4F46E5]" : completed ? "text-[#52525B]" : "text-[#A1A1AA]")}>
                    {step}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className={cn("mb-4 h-px flex-1", i < proposal.step - 1 ? "bg-[#4F46E5]" : "bg-[#E8E6E1]")} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Main content + sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Activity log */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-[#E8E6E1] bg-white">
            <div className="border-b border-[#E8E6E1] px-5 py-3.5">
              <p className="text-sm font-semibold text-[#18181B]">Activity</p>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {activity.length === 0 && (
                <p className="px-5 py-8 text-center text-sm text-[#A1A1AA]">No activity yet.</p>
              )}
              {activity.map((entry, i) => {
                const Icon = ACTION_ICON[entry.action] ?? MessageSquare
                const roleColor = ROLE_COLOR[entry.role] ?? "#52525B"
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex gap-3 px-5 py-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: `${roleColor}15` }}>
                      <Icon className="h-3.5 w-3.5" style={{ color: roleColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-[#18181B]">{entry.author}</span>
                        <span className="text-[10px] text-[#A1A1AA]">{entry.time}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#52525B] leading-relaxed">{entry.content}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Action buttons */}
          {proposal.status !== "Draft" && (
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1.5 rounded-lg bg-[#059669] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#047857]">
                <ThumbsUp className="h-3.5 w-3.5" /> Approve & Advance
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-[#FEF3C7] bg-[#FFFBEB] px-4 py-2 text-sm font-medium text-[#D97706] transition-colors hover:bg-[#FEF3C7]">
                <AlertTriangle className="h-3.5 w-3.5" /> Request Changes
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-[#FEE2E2] bg-[#FFF5F5] px-4 py-2 text-sm font-medium text-[#DC2626] transition-colors hover:bg-[#FEE2E2]">
                Reject
              </button>
            </div>
          )}
          {proposal.status === "Draft" && (
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]">
                <ArrowRight className="h-3.5 w-3.5" /> Submit for Review
              </button>
            </div>
          )}
        </div>

        {/* Right: AI score card + metadata */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-[#4F46E5]" />
              <p className="text-sm font-semibold text-[#18181B]">AI Analysis</p>
            </div>
            <div className="flex items-center justify-center py-3">
              <div className="text-center">
                <p className="font-mono text-4xl font-bold" style={{ color: scoreColor }}>{proposal.aiScore}</p>
                <p className="text-xs text-[#A1A1AA]">out of 100</p>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {[
                { label: "Standards Alignment", score: Math.min(100, proposal.aiScore + 3) },
                { label: "Outcomes Mapping",    score: Math.max(60, proposal.aiScore - 5) },
                { label: "Assessment Rubrics",  score: Math.max(55, proposal.aiScore - 12) },
                { label: "Workforce Relevance", score: Math.min(100, proposal.aiScore + 5) },
              ].map((dim) => (
                <div key={dim.label}>
                  <div className="flex items-center justify-between text-[10px] mb-0.5">
                    <span className="text-[#52525B]">{dim.label}</span>
                    <span className="font-mono font-semibold text-[#18181B]">{dim.score}</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                    <div className="h-full rounded-full" style={{ width: `${dim.score}%`, background: scoreColor }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Details</p>
            <div className="space-y-2">
              {[
                { label: "Author",    value: proposal.author,        icon: User },
                { label: "Submitted", value: proposal.submittedAt,   icon: Clock },
                { label: "Step",      value: `${proposal.step} / ${proposal.total}`, icon: ArrowRight },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2 text-xs">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" />
                  <span className="text-[#A1A1AA]">{label}:</span>
                  <span className="font-medium text-[#52525B]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
