"use client"

import { useState, useMemo } from "react"
import type { Metadata } from "next"
import { motion, AnimatePresence } from "framer-motion"
import {
  Megaphone, Pin, AlertTriangle, ChevronDown, ChevronUp,
  Eye, School, BookOpen, GraduationCap, Pencil
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ANNOUNCEMENTS } from "@/lib/demo-data"
import type { Announcement } from "@/lib/demo-data"
import { useAuthStore } from "@/lib/auth-store"

type ScopeFilter = "all" | "school" | "class" | "program"

const SCOPE_ICON: Record<string, React.ElementType> = {
  school:  School,
  class:   BookOpen,
  program: GraduationCap,
}

const SCOPE_STYLE: Record<string, string> = {
  school:  "bg-[#EEF2FF] text-[#4F46E5]",
  class:   "bg-[#D1FAE5] text-[#059669]",
  program: "bg-[#FEF3C7] text-[#D97706]",
}

const CAN_POST = new Set(["teacher", "admin", "district_leader", "curriculum_committee"])

function AnnouncementCard({ ann, defaultOpen }: { ann: Announcement; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false)
  const ScopeIcon = SCOPE_ICON[ann.scope]

  return (
    <motion.div
      layout
      className={cn(
        "overflow-hidden rounded-xl border bg-white transition-colors",
        ann.priority === "urgent"
          ? "border-[#FEE2E2]"
          : ann.pinned
          ? "border-[#E8E6E1] ring-1 ring-[#4F46E5]/10"
          : "border-[#E8E6E1]"
      )}
    >
      {/* Priority stripe */}
      {ann.priority === "urgent" && (
        <div className="h-0.5 w-full bg-[#DC2626]" />
      )}

      <div className="px-5 py-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            {/* Author avatar */}
            <div className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
              ann.priority === "urgent" ? "bg-[#FEE2E2] text-[#DC2626]" : "bg-[#F4F4F2] text-[#52525B]"
            )}>
              {ann.authorInitials}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {ann.pinned && (
                  <span className="flex items-center gap-0.5 text-[10px] font-semibold text-[#4F46E5]">
                    <Pin className="h-2.5 w-2.5" /> Pinned
                  </span>
                )}
                {ann.priority === "urgent" && (
                  <span className="flex items-center gap-0.5 rounded-full bg-[#FEE2E2] px-1.5 py-0.5 text-[9px] font-bold text-[#DC2626]">
                    <AlertTriangle className="h-2.5 w-2.5" /> Urgent
                  </span>
                )}
                <span className={cn("flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold", SCOPE_STYLE[ann.scope])}>
                  <ScopeIcon className="h-2.5 w-2.5" />
                  {ann.scope === "class" ? ann.course : ann.scope === "program" ? ann.program : "School-Wide"}
                </span>
              </div>
              <p className={cn(
                "mt-1 text-sm font-semibold leading-snug",
                ann.priority === "urgent" ? "text-[#DC2626]" : "text-[#18181B]"
              )}>
                {ann.title}
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="shrink-0 flex items-center gap-1 text-[11px] text-[#A1A1AA] hover:text-[#52525B] transition-colors"
          >
            {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Preview / full body */}
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="full"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-sm leading-relaxed text-[#52525B]">{ann.body}</p>
            </motion.div>
          ) : (
            <p className="mt-2 line-clamp-2 text-xs text-[#A1A1AA]">{ann.body}</p>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-[#A1A1AA]">
          <span>{ann.author} · {ann.authorRole} · {ann.timestamp}</span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {ann.views.toLocaleString()} views
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function AnnouncementsPage() {
  const user   = useAuthStore((s) => s.user)
  const canPost = CAN_POST.has(user?.role ?? "")

  const [scope, setScope] = useState<ScopeFilter>("all")

  const filtered = useMemo(() => {
    let list = [...ANNOUNCEMENTS].sort((a, b) => {
      // pinned first, then urgent, then chronological (desc)
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      if (a.priority === "urgent" && b.priority !== "urgent") return -1
      if (a.priority !== "urgent" && b.priority === "urgent") return 1
      return 0
    })
    if (scope !== "all") list = list.filter((a) => a.scope === scope)
    return list
  }, [scope])

  const urgentCount = ANNOUNCEMENTS.filter((a) => a.priority === "urgent").length

  return (
    <div className="mx-auto max-w-3xl space-y-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Announcements</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {ANNOUNCEMENTS.length} posts · {urgentCount} urgent
          </p>
        </div>
        {canPost && (
          <button className="flex items-center gap-1.5 rounded-xl bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]">
            <Pencil className="h-3.5 w-3.5" />
            Post
          </button>
        )}
      </div>

      {/* Scope filter */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "school", "class", "program"] as ScopeFilter[]).map((s) => {
          const Icon = s !== "all" ? SCOPE_ICON[s] : Megaphone
          return (
            <button
              key={s}
              onClick={() => setScope(s)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all",
                scope === s
                  ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                  : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
              )}
            >
              <Icon className="h-3 w-3" />
              {s === "all" ? "All" : s === "school" ? "School-Wide" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          )
        })}
      </div>

      {/* Announcement cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-[#E8E6E1] bg-white py-14 text-center text-sm text-[#A1A1AA]">
            No announcements in this category.
          </div>
        ) : (
          filtered.map((ann, i) => (
            <motion.div
              key={ann.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <AnnouncementCard ann={ann} defaultOpen={ann.pinned && ann.priority === "urgent"} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
