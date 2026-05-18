"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Plus, Brain, Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PROPOSALS } from "@/lib/demo-data"

type StatusFilter = "All" | "Draft" | "In Review" | "Committee Review" | "Pending Approval"

const STATUS_STYLE: Record<string, { badge: string; bar: string }> = {
  "Draft":            { badge: "bg-[#F4F4F2] text-[#52525B]",  bar: "#A1A1AA" },
  "In Review":        { badge: "bg-[#EEF2FF] text-[#4F46E5]",  bar: "#4F46E5" },
  "Committee Review": { badge: "bg-[#FEF3C7] text-[#D97706]",  bar: "#D97706" },
  "Pending Approval": { badge: "bg-[#FEE2E2] text-[#DC2626]",  bar: "#DC2626" },
}

const FILTERS: StatusFilter[] = ["All", "Draft", "In Review", "Committee Review", "Pending Approval"]

function ScorePill({ score }: { score: number }) {
  const color = score >= 90 ? "#059669" : score >= 75 ? "#D97706" : "#DC2626"
  return (
    <span className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold" style={{ borderColor: `${color}40`, color }}>
      <Sparkles className="h-2.5 w-2.5" />
      {score}
    </span>
  )
}

export default function ProposalsListPage() {
  const [filter, setFilter] = useState<StatusFilter>("All")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    let list = [...PROPOSALS]
    if (filter !== "All") list = list.filter((p) => p.status === filter)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q))
    }
    return list
  }, [filter, search])

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Proposals</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {PROPOSALS.length} proposals · Spring 2026 cycle
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/assistant"
            className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm text-[#52525B] transition-colors hover:border-[#D6D3CC]"
          >
            <Brain className="h-3.5 w-3.5" /> AI Review
          </Link>
          <Link
            href="/dashboard/curriculum/proposals/new"
            className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
          >
            <Plus className="h-3.5 w-3.5" /> New Proposal
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A1A1AA]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author…"
            className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const count = f === "All" ? PROPOSALS.length : PROPOSALS.filter((p) => p.status === f).length
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  filter === f
                    ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                    : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
                )}
              >
                {f} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Proposal list */}
      <div className="space-y-3">
        {filtered.map((p, i) => {
          const style = STATUS_STYLE[p.status] ?? STATUS_STYLE["Draft"]
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/dashboard/curriculum/proposals/${p.id}`}
                className="block rounded-xl border border-[#E8E6E1] bg-white p-5 transition-all hover:border-[#D6D3CC] hover:shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[11px] font-semibold text-[#A1A1AA]">{p.id}</span>
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", style.badge)}>{p.status}</span>
                      <ScorePill score={p.aiScore} />
                    </div>
                    <p className="mt-1.5 font-semibold text-[#18181B] leading-snug">{p.title}</p>
                    <p className="mt-0.5 text-xs text-[#52525B]">{p.author} · Submitted {p.submittedAt}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#A1A1AA] mt-1" />
                </div>

                {/* Step progress */}
                <div className="mt-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: p.total }).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-1.5 flex-1 rounded-full"
                        style={{ background: idx < p.step ? style.bar : "#F4F4F2" }}
                      />
                    ))}
                  </div>
                  <p className="mt-1.5 text-[10px] text-[#A1A1AA]">
                    Step {p.step} of {p.total}
                    {p.status === "Pending Approval" && <span className="ml-2 font-medium text-[#DC2626]">· Awaiting approval</span>}
                  </p>
                </div>
              </Link>
            </motion.div>
          )
        })}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-[#E8E6E1] bg-white py-12 text-center text-sm text-[#A1A1AA]">
            No proposals match your filters.
          </div>
        )}
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        Curriculum Architect AI scores every proposal automatically · All approvals require human authorization
      </p>
    </div>
  )
}
