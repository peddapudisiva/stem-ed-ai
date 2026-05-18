"use client"

import { useState, useMemo } from "react"
import type { Metadata } from "next"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle, ChevronDown, ChevronUp, ThumbsUp,
  Pin, Pencil, GraduationCap, Tag
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DISCUSSION_THREADS, DISCUSSION_REPLIES } from "@/lib/demo-data"
import type { DiscussionThread } from "@/lib/demo-data"

const COURSES = ["All", "NUR-101", "CIS-150", "MED-110"] as const
type CourseTab = typeof COURSES[number]

const ROLE_STYLE: Record<string, string> = {
  student: "bg-[#F4F4F2] text-[#52525B]",
  teacher: "bg-[#EEF2FF] text-[#4F46E5]",
}

function ThreadCard({ thread }: { thread: DiscussionThread }) {
  const [expanded, setExpanded] = useState(false)
  const replies = DISCUSSION_REPLIES[thread.id] ?? []

  return (
    <motion.div layout className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
      {/* Thread header */}
      <button
        className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-[#FAFAF9]"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Author avatar */}
        <div className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
          thread.authorRole === "teacher" ? "bg-[#EEF2FF] text-[#4F46E5]" : "bg-[#F4F4F2] text-[#52525B]"
        )}>
          {thread.authorInitials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {thread.pinned && (
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-[#4F46E5]">
                <Pin className="h-2.5 w-2.5" /> Pinned
              </span>
            )}
            {thread.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#F4F4F2] px-1.5 py-0.5 text-[9px] font-medium text-[#A1A1AA]">
                #{tag}
              </span>
            ))}
          </div>

          <p className="mt-0.5 text-sm font-semibold text-[#18181B] leading-snug">
            {thread.title}
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-[#A1A1AA]">{thread.preview}</p>

          <div className="mt-2 flex items-center gap-3 text-[10px] text-[#A1A1AA]">
            <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-semibold", ROLE_STYLE[thread.authorRole])}>
              {thread.authorRole === "teacher" ? (
                <span className="flex items-center gap-0.5"><GraduationCap className="h-2.5 w-2.5" />{thread.author}</span>
              ) : thread.author}
            </span>
            <span className="flex items-center gap-0.5">
              <MessageCircle className="h-3 w-3" />
              {thread.replies} {thread.replies === 1 ? "reply" : "replies"}
            </span>
            <span>Last active {thread.lastActivity}</span>
            {expanded
              ? <ChevronUp className="h-3 w-3 ml-auto" />
              : <ChevronDown className="h-3 w-3 ml-auto" />
            }
          </div>
        </div>
      </button>

      {/* Replies */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#F4F4F2]">
              {replies.length === 0 ? (
                <p className="px-5 py-4 text-xs text-[#A1A1AA]">No replies yet. Be the first to reply!</p>
              ) : (
                <ul className="divide-y divide-[#F4F4F2]">
                  {replies.map((reply) => (
                    <li key={reply.id} className="flex gap-3 px-5 py-3.5">
                      <div className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                        reply.authorRole === "teacher" ? "bg-[#EEF2FF] text-[#4F46E5]" : "bg-[#F4F4F2] text-[#52525B]"
                      )}>
                        {reply.authorInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#18181B]">{reply.author}</span>
                          {reply.authorRole === "teacher" && (
                            <span className="rounded-full bg-[#EEF2FF] px-1.5 py-0.5 text-[9px] font-bold text-[#4F46E5]">Instructor</span>
                          )}
                          <span className="text-[10px] text-[#A1A1AA]">{reply.timestamp}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-[#52525B] leading-relaxed">{reply.content}</p>
                        <button className="mt-1.5 flex items-center gap-1 text-[10px] text-[#A1A1AA] hover:text-[#4F46E5] transition-colors">
                          <ThumbsUp className="h-3 w-3" />
                          {reply.upvotes}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Quick reply input */}
              <div className="border-t border-[#F4F4F2] px-5 py-3">
                <div className="flex items-center gap-2 rounded-lg border border-[#E8E6E1] bg-[#FAFAF9] px-3 py-2">
                  <input
                    type="text"
                    placeholder="Write a reply…"
                    className="flex-1 bg-transparent text-xs text-[#18181B] placeholder:text-[#A1A1AA] outline-none"
                  />
                  <button className="text-[11px] font-medium text-[#4F46E5] hover:underline">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<CourseTab>("All")

  const threads = useMemo(() => {
    const list = [...DISCUSSION_THREADS].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return 0
    })
    if (activeTab === "All") return list
    return list.filter((t) => t.courseCode === activeTab)
  }, [activeTab])

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Community</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {DISCUSSION_THREADS.length} discussions across {new Set(DISCUSSION_THREADS.map((t) => t.courseCode)).size} courses
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-xl bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]">
          <Pencil className="h-3.5 w-3.5" />
          New Post
        </button>
      </div>

      {/* Course tabs */}
      <div className="flex gap-2 flex-wrap">
        {COURSES.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-all",
              activeTab === tab
                ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
            )}
          >
            {tab}
            {tab !== "All" && (
              <span className="ml-1.5 font-mono text-[9px] text-[#A1A1AA]">
                {DISCUSSION_THREADS.filter((t) => t.courseCode === tab).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Thread list */}
      <div className="space-y-3">
        {threads.length === 0 ? (
          <div className="rounded-xl border border-[#E8E6E1] bg-white py-14 text-center text-sm text-[#A1A1AA]">
            No discussions in this course yet.
          </div>
        ) : (
          threads.map((thread, i) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ThreadCard thread={thread} />
            </motion.div>
          ))
        )}
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        Course discussions are monitored per ATC Academic Integrity Policy
      </p>
    </div>
  )
}
