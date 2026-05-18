"use client"

import { motion } from "framer-motion"
import { Trophy, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import { LEADERBOARD } from "@/lib/demo-data"

const RANK_COLORS = ["text-[#B8860B]", "text-[#A1A1AA]", "text-[#C2410C]"]

export function LeaderboardWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="rounded-xl border border-[#E8E6E1] bg-white p-6 transition-all hover:border-[#D6D3CC] hover:-translate-y-px"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="section-header">Class Leaderboard</p>
          <p className="mt-0.5 text-[11px] text-[#A1A1AA]">CS 1010 · Opt-in · Week of May 19</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF9C3]">
          <Trophy className="h-4 w-4 text-[#B8860B]" />
        </div>
      </div>

      <div className="space-y-2">
        {LEADERBOARD.map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.45 + i * 0.05 }}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
              entry.isMe
                ? "border border-[#4F46E5]/20 bg-[#EEF2FF]"
                : "hover:bg-[#FAFAF9]"
            )}
          >
            <span className={cn(
              "w-5 shrink-0 text-center font-mono text-sm font-bold",
              RANK_COLORS[i] ?? "text-[#52525B]"
            )}>
              {entry.rank}
            </span>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] font-mono text-xs font-semibold text-[#4F46E5]">
              {entry.initials}
            </div>

            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-sm font-medium",
                entry.isMe ? "text-[#4F46E5]" : "text-[#18181B]"
              )}>
                {entry.name} {entry.isMe && <span className="text-[10px] text-[#A1A1AA]">(you)</span>}
              </p>
              <p className="font-mono text-[10px] text-[#A1A1AA]">Level {entry.level}</p>
            </div>

            <div className="flex flex-col items-end gap-0.5">
              <span className="font-mono text-sm font-semibold text-[#18181B]">
                {entry.xp.toLocaleString()}
              </span>
              <div className="flex items-center gap-0.5">
                <Flame className="h-3 w-3 text-[#D97706]" />
                <span className="font-mono text-[10px] text-[#A1A1AA]">{entry.streak}d</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-[11px] text-[#A1A1AA]">
        Participation is opt-in. Only classmates who opted in are shown.
      </p>
    </motion.div>
  )
}
