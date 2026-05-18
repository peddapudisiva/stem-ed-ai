"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Award, Star, Lock, Share2, Download, ExternalLink,
  Zap, Flame, Trophy, CheckCircle2, BookOpen, Users, Briefcase, Brain
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"
import { BADGES, EARNED_BADGE_IDS, STUDENTS } from "@/lib/demo-data"

const student = STUDENTS[1] // Jordan Rivera

const CATEGORY_CONFIG = {
  academic:  { label: "Academic",  color: "#4F46E5", bg: "#EEF2FF", icon: BookOpen  },
  social:    { label: "Social",    color: "#059669", bg: "#D1FAE5", icon: Users     },
  skills:    { label: "Skills",    color: "#7C3AED", bg: "#EDE9FE", icon: Brain     },
  workforce: { label: "Workforce", color: "#D97706", bg: "#FEF3C7", icon: Briefcase },
} as const

const XP_TO_NEXT_LEVEL = 500
const currentLevelXp = student.xp % XP_TO_NEXT_LEVEL
const xpProgress = Math.round((currentLevelXp / XP_TO_NEXT_LEVEL) * 100)

const CERTIFICATIONS = [
  { id: "cert-1", name: "SERA AI Literacy Certificate",   issuer: "SERA Neural Labs",         date: "Apr 2026", credential: "SERA-AIL-2026-0047",   verified: true  },
  { id: "cert-2", name: "Python Fundamentals",             issuer: "Atlanta Technical College", date: "Mar 2026", credential: "ATC-PY-2026-0312",      verified: true  },
  { id: "cert-3", name: "FERPA Compliance Training",       issuer: "SERA Neural Labs",         date: "Jan 2026", credential: "SERA-FERPA-2026-0021",  verified: true  },
  { id: "cert-4", name: "Data Structures & Algorithms",    issuer: "Atlanta Technical College", date: "Pending",  credential: "—",                     verified: false },
]

type BadgeCat = keyof typeof CATEGORY_CONFIG

export default function CredentialsPage() {
  const [filter,     setFilter]     = useState<BadgeCat | "all">("all")
  const [shareModal, setShareModal] = useState<string | null>(null)
  const [copied,     setCopied]     = useState(false)

  const filteredBadges = BADGES.filter((b) => filter === "all" || b.category === filter)

  function copy(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-up">
        {/* Header */}
        <div>
          <h1 className="page-title">Credentials & Badges</h1>
          <p className="mt-1 text-sm text-[#52525B]">Your earned achievements, digital badges, and verifiable certifications</p>
        </div>

        {/* XP / Level card */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            {/* Identity */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4F46E5] text-2xl font-bold text-white shrink-0">
                {student.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-lg font-semibold text-[#18181B]">{student.name}</p>
                <p className="text-sm text-[#A1A1AA]">{student.program}</p>
                <p className="text-xs text-[#A1A1AA]">Atlanta Technical College</p>
              </div>
            </div>

            {/* Level + stats */}
            <div className="flex gap-6 flex-wrap">
              {[
                { label: "Level",    value: student.level,                icon: Trophy, color: "#D97706" },
                { label: "Total XP", value: student.xp.toLocaleString(), icon: Zap,    color: "#4F46E5" },
                { label: "Streak",   value: `${student.streak}d`,        icon: Flame,  color: "#DC2626" },
                { label: "Badges",   value: EARNED_BADGE_IDS.length,     icon: Award,  color: "#059669" },
              ].map((s) => (
                <div key={s.label} className="text-center min-w-[64px]">
                  <s.icon className="mx-auto h-4 w-4 mb-1" style={{ color: s.color }} />
                  <p className="font-mono text-xl font-bold text-[#18181B]">{s.value}</p>
                  <p className="text-[10px] text-[#A1A1AA]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* XP bar */}
          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-[#52525B]">Level {student.level}</span>
              <span className="font-mono text-[#A1A1AA]">{currentLevelXp} / {XP_TO_NEXT_LEVEL} XP to Level {student.level + 1}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]"
              />
            </div>
          </div>
        </motion.div>

        {/* Badge section */}
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#18181B]">
              Badges
              <span className="ml-2 font-mono text-xs text-[#A1A1AA]">{EARNED_BADGE_IDS.length} earned · {BADGES.length - EARNED_BADGE_IDS.length} locked</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {([["all", "All"], ...Object.entries(CATEGORY_CONFIG).map(([k, v]) => [k, v.label])] as [string, string][]).map(([val, label]) => (
                <button key={val} onClick={() => setFilter(val as BadgeCat | "all")}
                  className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-all",
                    filter === val
                      ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                      : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]")}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredBadges.map((badge, i) => {
              const earned = EARNED_BADGE_IDS.includes(badge.id)
              const catCfg = CATEGORY_CONFIG[badge.category]
              const CatIcon = catCfg.icon
              return (
                <motion.div key={badge.id}
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                  className={cn("relative flex flex-col items-center rounded-2xl border p-4 text-center transition-all",
                    earned
                      ? "border-[#E8E6E1] bg-white cursor-pointer hover:shadow-md hover:border-[#C7D2FE]"
                      : "border-[#F4F4F2] bg-[#FAFAF9] opacity-60"
                  )}
                  onClick={() => earned && setShareModal(badge.id)}
                >
                  {/* Badge icon */}
                  <div className={cn("relative mb-3 flex h-14 w-14 items-center justify-center rounded-2xl",
                    earned ? "" : "grayscale"
                  )} style={{ background: earned ? catCfg.bg : "#F4F4F2" }}>
                    <CatIcon className="h-7 w-7" style={{ color: earned ? catCfg.color : "#A1A1AA" }} />
                    {earned && (
                      <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#059669]">
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      </div>
                    )}
                    {!earned && (
                      <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#A1A1AA]">
                        <Lock className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-[#18181B] leading-tight">{badge.name}</p>
                  <p className="mt-1 text-[10px] text-[#A1A1AA] leading-tight">{badge.description}</p>
                  <div className="mt-2 flex items-center gap-1">
                    <Zap className="h-3 w-3" style={{ color: earned ? catCfg.color : "#A1A1AA" }} />
                    <span className="font-mono text-[10px] font-semibold" style={{ color: earned ? catCfg.color : "#A1A1AA" }}>
                      +{badge.xp} XP
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <p className="mb-3 text-sm font-semibold text-[#18181B]">Verifiable Certifications</p>
          <div className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white divide-y divide-[#F4F4F2]">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div key={cert.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="flex flex-wrap items-center gap-4 px-5 py-4">
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  cert.verified ? "bg-[#D1FAE5]" : "bg-[#F4F4F2]")}>
                  <Award className={cn("h-5 w-5", cert.verified ? "text-[#059669]" : "text-[#A1A1AA]")} />
                </div>
                <div className="flex-1 min-w-[180px]">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-[#18181B]">{cert.name}</p>
                    {cert.verified && (
                      <span className="flex items-center gap-0.5 rounded-full bg-[#D1FAE5] px-1.5 py-0.5 text-[9px] font-semibold text-[#059669]">
                        <CheckCircle2 className="h-2.5 w-2.5" /> Verified
                      </span>
                    )}
                    {!cert.verified && (
                      <span className="rounded-full bg-[#F4F4F2] px-1.5 py-0.5 text-[9px] font-semibold text-[#A1A1AA]">Pending</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#A1A1AA]">{cert.issuer} · {cert.date}</p>
                  {cert.verified && <p className="font-mono text-[10px] text-[#A1A1AA]">ID: {cert.credential}</p>}
                </div>
                {cert.verified && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => copy(cert.credential)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-[11px] text-[#52525B] hover:bg-[#FAFAF9]">
                      <Share2 className="h-3 w-3" /> Share
                    </button>
                    <button className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-[11px] text-[#52525B] hover:bg-[#FAFAF9]">
                      <Download className="h-3 w-3" /> PDF
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* LinkedIn prompt */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex items-center justify-between gap-4 rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-[#1E40AF]">Add certifications to LinkedIn</p>
            <p className="text-[11px] text-[#3B82F6]">Share your verified SERA credentials directly on your LinkedIn profile.</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-[#0A66C2] px-4 py-2 text-xs font-medium text-white hover:bg-[#004182]">
            <ExternalLink className="h-3.5 w-3.5" /> Connect LinkedIn
          </button>
        </motion.div>

        {/* Share modal */}
        <AnimatePresence>
          {shareModal && (() => {
            const badge = BADGES.find((b) => b.id === shareModal)!
            const catCfg = CATEGORY_CONFIG[badge.category]
            return (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                onClick={() => setShareModal(null)}>
                <motion.div initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-sm rounded-2xl bg-white shadow-xl overflow-hidden">
                  <div className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: catCfg.bg }}>
                      <Award className="h-8 w-8" style={{ color: catCfg.color }} />
                    </div>
                    <p className="font-semibold text-[#18181B]">{badge.name}</p>
                    <p className="mt-1 text-sm text-[#A1A1AA]">{badge.description}</p>
                    <div className="mt-5 w-full space-y-2">
                      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A66C2] py-2.5 text-sm font-medium text-white hover:bg-[#004182]">
                        <ExternalLink className="h-4 w-4" /> Share on LinkedIn
                      </button>
                      <button onClick={() => copy(`I earned the "${badge.name}" badge on SERA Neural Labs STEM-ED-AI! 🎓`)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#E8E6E1] py-2.5 text-sm text-[#52525B] hover:bg-[#FAFAF9]">
                        {copied ? <CheckCircle2 className="h-4 w-4 text-[#059669]" /> : <Share2 className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy share text"}
                      </button>
                      <button onClick={() => setShareModal(null)}
                        className="w-full py-2 text-sm text-[#A1A1AA] hover:text-[#52525B]">Close</button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })()}
        </AnimatePresence>

        <p className="text-[11px] text-[#A1A1AA]">
          Credentials verified by SERA Neural Labs · Open Badges 3.0 standard · Blockchain-anchored on request
        </p>
      </div>
    </AppShell>
  )
}
