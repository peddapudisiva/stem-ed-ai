"use client"

import { motion } from "framer-motion"
import { Flame, CheckSquare, Brain, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { WEEKLY_CHALLENGES } from "@/lib/demo-data"

const ICONS = {
  flame: Flame,
  check: CheckSquare,
  brain: Brain,
}

export function WeeklyChallengeCard() {
  const totalXp = WEEKLY_CHALLENGES.reduce((s, c) => s + c.xp, 0)
  const earnedXp = WEEKLY_CHALLENGES.reduce((s, c) => {
    if (c.current >= c.target) return s + c.xp
    return s
  }, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="rounded-xl border border-[#E8E6E1] bg-white p-6 transition-all hover:border-[#D6D3CC] hover:-translate-y-px"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="section-header">Weekly Challenges</p>
        <div className="flex items-center gap-1 rounded-full bg-[#FEF9C3] px-2 py-0.5">
          <Zap className="h-3 w-3 text-[#B8860B]" />
          <span className="font-mono text-[10px] font-semibold text-[#B8860B]">
            {earnedXp}/{totalXp} XP
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {WEEKLY_CHALLENGES.map((challenge, i) => {
          const Icon = ICONS[challenge.icon]
          const complete = challenge.current >= challenge.target
          const pct = Math.min(100, Math.round((challenge.current / challenge.target) * 100))

          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.06 }}
              className={cn(
                "rounded-lg border p-3 transition-colors",
                complete ? "border-[#D1FAE5] bg-[#F0FDF4]" : "border-[#E8E6E1]"
              )}
            >
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                  complete ? "bg-[#059669]" : "bg-[#F4F4F2]"
                )}>
                  <Icon className={cn("h-3.5 w-3.5", complete ? "text-white" : "text-[#52525B]")} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "text-sm font-medium",
                      complete ? "text-[#059669]" : "text-[#18181B]"
                    )}>
                      {challenge.title}
                    </p>
                    <span className="ml-2 shrink-0 font-mono text-[10px] text-[#A1A1AA]">
                      {challenge.current}/{challenge.target}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.06 }}
                      className={cn(
                        "h-full rounded-full",
                        complete ? "bg-[#059669]" : "bg-[#4F46E5]"
                      )}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <p className="mt-3 text-[11px] text-[#A1A1AA]">Resets every Monday · Week of May 19</p>
    </motion.div>
  )
}
