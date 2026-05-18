"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Award, Lock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { BADGES, EARNED_BADGE_IDS } from "@/lib/demo-data"

const CATEGORY_COLOR: Record<string, { bg: string; text: string }> = {
  academic: { bg: "#EEF2FF", text: "#4F46E5" },
  social: { bg: "#ECFDF5", text: "#059669" },
  skills: { bg: "#FEF9C3", text: "#B8860B" },
  workforce: { bg: "#FFF7ED", text: "#C2410C" },
}

export function BadgeShelf() {
  const earned = BADGES.filter((b) => EARNED_BADGE_IDS.includes(b.id))
  const locked = BADGES.filter((b) => !EARNED_BADGE_IDS.includes(b.id))

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      className="rounded-xl border border-[#E8E6E1] bg-white p-6 transition-all hover:border-[#D6D3CC] hover:-translate-y-px"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="section-header">Badges & Credentials</p>
          <p className="mt-0.5 text-[11px] text-[#A1A1AA]">
            {earned.length} earned · {locked.length} locked
          </p>
        </div>
        <Link
          href="/dashboard/student/credentials"
          className="flex items-center gap-1 text-xs font-medium text-[#4F46E5] hover:underline"
        >
          All credentials <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Earned badges */}
      <div className="mb-4">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
          Earned
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {earned.map((badge, i) => {
            const colors = CATEGORY_COLOR[badge.category]
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                className="flex flex-col items-center gap-2 rounded-xl border border-[#E8E6E1] p-3 text-center hover:border-[#D6D3CC] transition-colors"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: colors.bg }}
                >
                  <Award className="h-5 w-5" style={{ color: colors.text }} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#18181B]">{badge.name}</p>
                  <p className="font-mono text-[10px] text-[#A1A1AA]">+{badge.xp} XP</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Locked badges preview */}
      <div>
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
          Locked — complete goals to unlock
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {locked.slice(0, 6).map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.55 + i * 0.04 }}
              title={badge.description}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-dashed border-[#E8E6E1] p-3 text-center opacity-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F4F2]">
                <Lock className="h-4 w-4 text-[#A1A1AA]" />
              </div>
              <p className="text-[10px] text-[#A1A1AA]">{badge.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
