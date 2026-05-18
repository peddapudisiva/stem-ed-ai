"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Zap, Star, TrendingUp } from "lucide-react"
import { getLevelInfo } from "@/lib/gamification"
import { STUDENTS } from "@/lib/demo-data"

const student = STUDENTS[0]

export function XpLevelCard() {
  const info = getLevelInfo(student.xp)
  const xpToNext = info.nextLevelXp - info.currentXp

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="flex flex-col gap-4 rounded-xl border border-[#E8E6E1] bg-white p-6 transition-all hover:border-[#D6D3CC] hover:-translate-y-px"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="section-header">XP & Level</p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display text-4xl leading-none tracking-tight text-[#18181B]">
              {info.level}
            </span>
            <span className="font-mono text-sm text-[#A1A1AA]">/ 20</span>
          </div>
          <p className="mt-0.5 text-xs font-medium text-[#4F46E5]">{info.title}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF9C3]">
          <Star className="h-5 w-5 text-[#B8860B]" />
        </div>
      </div>

      {/* XP Bar */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-mono text-[11px] text-[#A1A1AA]">
            {info.currentXp.toLocaleString()} XP
          </span>
          <span className="font-mono text-[11px] text-[#A1A1AA]">
            {info.nextLevelXp.toLocaleString()} XP
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${info.progressPct}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]"
          />
        </div>
        <p className="mt-1.5 text-[11px] text-[#52525B]">
          <span className="font-medium text-[#18181B]">{xpToNext} XP</span> to Level {info.level + 1}
        </p>
      </div>

      <div className="flex items-center gap-1.5 rounded-lg bg-[#F4F4F2] px-3 py-2">
        <TrendingUp className="h-3.5 w-3.5 text-[#059669]" />
        <span className="text-xs text-[#52525B]">
          <span className="font-medium text-[#059669]">+{student.xp} XP</span> total earned
        </span>
      </div>

      <Link
        href="/dashboard/student/credentials"
        className="text-xs font-medium text-[#4F46E5] hover:underline"
      >
        View all credentials →
      </Link>
    </motion.div>
  )
}
