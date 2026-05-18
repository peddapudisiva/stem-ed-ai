"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  unit?: string
  delta?: { value: number; period: string }
  hint?: string
  variant?: "default" | "warning" | "success" | "danger"
  className?: string
  animationDelay?: number
}

const VARIANT_STYLES = {
  default: "",
  warning: "border-l-2 border-l-[#D97706]",
  success: "border-l-2 border-l-[#059669]",
  danger: "border-l-2 border-l-[#DC2626]",
}

export function StatCard({
  label,
  value,
  unit,
  delta,
  hint,
  variant = "default",
  className,
  animationDelay = 0,
}: StatCardProps) {
  const isPositive = delta && delta.value > 0
  const isNeutral = delta && delta.value === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: animationDelay }}
      className={cn(
        "group relative rounded-xl border border-[#E8E6E1] bg-white p-6",
        "transition-all duration-200 hover:border-[#D6D3CC] hover:-translate-y-px",
        VARIANT_STYLES[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="section-header">{label}</span>

        {delta && (
          <span
            className={cn(
              "flex items-center gap-1 font-mono-custom text-xs",
              isPositive ? "text-[#059669]" : isNeutral ? "text-[#A1A1AA]" : "text-[#DC2626]"
            )}
          >
            {isNeutral ? (
              <Minus className="h-3 w-3" />
            ) : isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(delta.value)}%
            <span className="text-[#A1A1AA]">{delta.period}</span>
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="font-display text-[40px] leading-none tracking-tight text-[#18181B]">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {unit && (
          <span className="font-mono-custom text-sm text-[#A1A1AA]">{unit}</span>
        )}
      </div>

      {hint && (
        <p className="mt-2 text-xs text-[#52525B]">{hint}</p>
      )}
    </motion.div>
  )
}
