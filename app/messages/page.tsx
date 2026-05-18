"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Pencil, MessageSquare, Users, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { CONVERSATIONS } from "@/lib/demo-data"
import type { Metadata } from "next"

type FilterType = "all" | "direct" | "class" | "advisory"

const TYPE_ICON: Record<string, React.ElementType> = {
  direct:   MessageSquare,
  class:    Users,
  advisory: BookOpen,
}

const TYPE_LABEL: Record<string, string> = {
  direct:   "Direct",
  class:    "Class",
  advisory: "Advisory",
}

const TYPE_COLOR: Record<string, string> = {
  direct:   "bg-[#EEF2FF] text-[#4F46E5]",
  class:    "bg-[#D1FAE5] text-[#059669]",
  advisory: "bg-[#FEF3C7] text-[#D97706]",
}

export default function MessagesPage() {
  const [filter, setFilter]   = useState<FilterType>("all")
  const [search, setSearch]   = useState("")

  const totalUnread = CONVERSATIONS.reduce((acc, c) => acc + c.unread, 0)

  const filtered = useMemo(() => {
    let list = [...CONVERSATIONS]
    if (filter !== "all") list = list.filter((c) => c.type === filter)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        (c) =>
          c.with.name.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          c.lastMessage.toLowerCase().includes(q)
      )
    }
    return list
  }, [filter, search])

  return (
    <div className="mx-auto max-w-3xl space-y-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Messages</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {CONVERSATIONS.length} conversations · {totalUnread} unread
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-xl bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]">
          <Pencil className="h-3.5 w-3.5" />
          Compose
        </button>
      </div>

      {/* Search + filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A1A1AA]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages…"
            className="h-10 w-full rounded-xl border border-[#E8E6E1] bg-white pl-9 pr-4 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "direct", "class", "advisory"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all",
                filter === f
                  ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                  : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
              )}
            >
              {f === "all" ? "All" : TYPE_LABEL[f]}
              {f === "all" && totalUnread > 0 && (
                <span className="ml-1.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#DC2626] px-1 text-[9px] font-bold text-white">
                  {totalUnread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation list */}
      <div className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
        {filtered.length === 0 ? (
          <div className="py-14 text-center text-sm text-[#A1A1AA]">
            No conversations match your search.
          </div>
        ) : (
          <ul className="divide-y divide-[#F4F4F2]">
            {filtered.map((conv, i) => {
              const TypeIcon = TYPE_ICON[conv.type]
              return (
                <motion.li
                  key={conv.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={`/messages/${conv.id}`}
                    className={cn(
                      "flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[#FAFAF9]",
                      conv.unread > 0 && "bg-[#FAFAF9]"
                    )}
                  >
                    {/* Avatar */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] font-semibold text-sm text-[#4F46E5]">
                      {conv.with.initials}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={cn(
                            "truncate text-sm",
                            conv.unread > 0 ? "font-semibold text-[#18181B]" : "font-medium text-[#52525B]"
                          )}>
                            {conv.with.name}
                          </span>
                          <span className={cn("shrink-0 flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold", TYPE_COLOR[conv.type])}>
                            <TypeIcon className="h-2.5 w-2.5" />
                            {TYPE_LABEL[conv.type]}
                          </span>
                          {conv.courseCode && (
                            <span className="shrink-0 rounded-full bg-[#F4F4F2] px-1.5 py-0.5 font-mono text-[9px] text-[#A1A1AA]">
                              {conv.courseCode}
                            </span>
                          )}
                        </div>
                        <span className="shrink-0 text-[11px] text-[#A1A1AA]">{conv.lastTime}</span>
                      </div>
                      <p className={cn(
                        "mt-0.5 text-xs",
                        conv.unread > 0 ? "font-medium text-[#18181B]" : "text-[#52525B]"
                      )}>
                        {conv.subject}
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <p className="truncate text-[11px] text-[#A1A1AA]">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-[#4F46E5] px-1 text-[10px] font-bold text-white">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.li>
              )
            })}
          </ul>
        )}
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        Messages are FERPA-protected · Stored within ATC boundary
      </p>
    </div>
  )
}
