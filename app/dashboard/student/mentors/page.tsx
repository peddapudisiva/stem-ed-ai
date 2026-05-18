"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users, Star, Calendar, Clock, CheckCircle2, MessageSquare,
  MapPin, Briefcase, ChevronDown, Filter, Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import { MENTORS, MENTOR_SESSIONS } from "@/lib/demo-data"
import type { MentorAvailability } from "@/lib/demo-data"

const FIELD_OPTIONS  = ["All Fields", "Data Science", "Software Engineering", "Cybersecurity", "Artificial Intelligence", "Product Management", "Entrepreneurship"]
const AVAIL_OPTIONS: { value: MentorAvailability | "all"; label: string }[] = [
  { value: "all",       label: "Any availability" },
  { value: "weekly",    label: "Weekly" },
  { value: "biweekly",  label: "Bi-weekly" },
  { value: "monthly",   label: "Monthly" },
]

function MatchRing({ score }: { score: number }) {
  const color = score >= 90 ? "#4F46E5" : score >= 80 ? "#059669" : score >= 70 ? "#D97706" : "#A1A1AA"
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="18" fill="none" stroke="#F4F4F2" strokeWidth="3.5" />
        <circle
          cx="22" cy="22" r="18" fill="none"
          stroke={color} strokeWidth="3.5"
          strokeDasharray={`${2 * Math.PI * 18}`}
          strokeDashoffset={`${2 * Math.PI * 18 * (1 - score / 100)}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="font-mono text-[11px] font-bold" style={{ color }}>{score}</span>
    </div>
  )
}

export default function StudentMentorsPage() {
  const [field,     setField]     = useState("All Fields")
  const [avail,     setAvail]     = useState<MentorAvailability | "all">("all")
  const [connected, setConnected] = useState<Set<string>>(
    () => new Set(MENTORS.filter((m) => m.connected).map((m) => m.id))
  )
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = MENTORS.filter((m) => {
    if (field !== "All Fields" && m.field !== field) return false
    if (avail !== "all" && m.availability !== avail) return false
    return true
  }).sort((a, b) => b.matchScore - a.matchScore)

  const connectedMentors = MENTORS.filter((m) => connected.has(m.id))

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div>
        <h1 className="page-title">NABA Mentor Matching</h1>
        <p className="mt-1 text-sm text-[#52525B]">
          {MENTORS.length} mentors available · {connectedMentors.length} connected · Powered by SERA AI
        </p>
      </div>

      {/* Connected mentor + sessions (if any) */}
      {connectedMentors.length > 0 && (
        <div className="space-y-3">
          <p className="section-header">My Mentors</p>
          {connectedMentors.map((mentor) => {
            const sessions = MENTOR_SESSIONS.filter((s) => s.mentorId === mentor.id)
            const next     = sessions.find((s) => s.status === "scheduled")
            const done     = sessions.filter((s) => s.status === "completed")
            return (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-[#4F46E5]/30 bg-[#EEF2FF]/40 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4F46E5] text-sm font-bold text-white">
                    {mentor.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-[#18181B]">{mentor.name}</p>
                      <span className="flex items-center gap-0.5 rounded-full bg-[#D1FAE5] px-1.5 py-0.5 text-[9px] font-semibold text-[#059669]">
                        <CheckCircle2 className="h-2.5 w-2.5" /> Connected
                      </span>
                    </div>
                    <p className="text-xs text-[#52525B]">{mentor.title} · {mentor.company}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-[#A1A1AA]">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{done.length} sessions completed</span>
                      {next && (
                        <span className="flex items-center gap-1 text-[#4F46E5]">
                          <Clock className="h-3 w-3" />Next: {next.date} · {next.topic}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="shrink-0 flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] hover:bg-[#FAFAF9]">
                    <MessageSquare className="h-3 w-3" /> Message
                  </button>
                </div>

                {/* Session history */}
                {done.length > 0 && (
                  <div className="mt-4 space-y-2 border-t border-[#E8E6E1] pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA]">Session Log</p>
                    {done.map((s) => (
                      <div key={s.id} className="rounded-lg border border-[#E8E6E1] bg-white px-3 py-2.5">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-[#18181B]">{s.topic}</p>
                          <span className="font-mono text-[10px] text-[#A1A1AA]">{s.date} · {s.duration}min</span>
                        </div>
                        {s.notes && <p className="mt-1 text-[11px] text-[#52525B]">{s.notes}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Filter className="h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" />
        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="h-9 rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm text-[#52525B] outline-none focus:border-[#4F46E5]"
        >
          {FIELD_OPTIONS.map((f) => <option key={f}>{f}</option>)}
        </select>
        <div className="flex gap-1.5">
          {AVAIL_OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => setAvail(o.value)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                avail === o.value
                  ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                  : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
        <span className="ml-auto text-xs text-[#A1A1AA]">{filtered.length} mentors</span>
      </div>

      {/* AI match banner */}
      <div className="flex items-center gap-3 rounded-xl border border-[#EEF2FF] bg-[#F5F3FF] px-4 py-3">
        <Sparkles className="h-4 w-4 shrink-0 text-[#4F46E5]" />
        <p className="text-xs text-[#4F46E5]">
          <span className="font-semibold">AI match scores</span> are calculated from your major, interests, career goals, and academic performance.
          Update your profile to improve matches.
        </p>
      </div>

      {/* Mentor cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((mentor, i) => {
          const isConnected = connected.has(mentor.id)
          const isExpanded  = expanded === mentor.id
          return (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className={cn(
                "overflow-hidden rounded-xl border bg-white transition-all",
                isConnected ? "border-[#4F46E5]/40" : "border-[#E8E6E1]"
              )}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                    isConnected ? "bg-[#4F46E5] text-white" : "bg-[#F4F4F2] text-[#52525B]"
                  )}>
                    {mentor.initials}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#18181B]">{mentor.name}</p>
                    <p className="text-xs text-[#52525B]">{mentor.title}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Briefcase className="h-3 w-3 text-[#A1A1AA]" />
                      <span className="text-[11px] text-[#A1A1AA]">{mentor.company}</span>
                      <MapPin className="ml-1.5 h-3 w-3 text-[#A1A1AA]" />
                      <span className="text-[11px] text-[#A1A1AA]">{mentor.location}</span>
                    </div>
                  </div>

                  {/* Match ring */}
                  <MatchRing score={mentor.matchScore} />
                </div>

                {/* Rating + availability */}
                <div className="mt-3 flex items-center gap-3 text-[11px] text-[#A1A1AA]">
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 text-[#D97706] fill-[#D97706]" />
                    {mentor.rating.toFixed(1)}
                  </span>
                  <span>·</span>
                  <span>{mentor.sessionsCompleted} sessions</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" />{mentor.availabilityLabel}</span>
                </div>

                {/* Expertise tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {mentor.expertise.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#F4F4F2] px-2 py-0.5 text-[10px] text-[#52525B]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expand bio */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : mentor.id)}
                  className="mt-3 flex items-center gap-1 text-[11px] text-[#A1A1AA] hover:text-[#52525B]"
                >
                  {isExpanded ? "Hide bio" : "Read bio"}
                  <ChevronDown className={cn("h-3 w-3 transition-transform", isExpanded && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-2 text-xs text-[#52525B] leading-relaxed overflow-hidden"
                    >
                      {mentor.bio}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-[#F4F4F2] px-5 py-3">
                <span className="text-[11px] text-[#A1A1AA]">{mentor.field}</span>
                {isConnected ? (
                  <div className="flex items-center gap-1.5">
                    <button className="flex items-center gap-1 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] hover:bg-[#FAFAF9]">
                      <Calendar className="h-3 w-3" /> Schedule
                    </button>
                    <button className="flex items-center gap-1 rounded-lg bg-[#EEF2FF] px-3 py-1.5 text-xs font-medium text-[#4F46E5]">
                      <MessageSquare className="h-3 w-3" /> Message
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConnected((prev) => new Set([...prev, mentor.id]))}
                    className="rounded-lg bg-[#4F46E5] px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#4338CA]"
                  >
                    Request Connection
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        NABA Mentor Network · Connections reviewed within 48h · Sessions logged automatically · FERPA compliant
      </p>
    </div>
  )
}
