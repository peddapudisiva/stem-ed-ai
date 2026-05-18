"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, Legend, ResponsiveContainer
} from "recharts"
import { AlertTriangle, Brain, TrendingUp, TrendingDown } from "lucide-react"
import { INSTITUTIONS, DISTRICT_RETENTION_MONTHLY } from "@/lib/demo-data"

const SCHOOL_COLORS: Record<string, string> = {
  atc:      "#4F46E5",
  gsu:      "#059669",
  kennesaw: "#D97706",
}

const SCHOOL_TARGETS: Record<string, number> = {
  atc:      73,
  gsu:      85,
  kennesaw: 88,
}

interface TooltipPayloadEntry {
  dataKey: string
  value: number
  color: string
  name: string
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadEntry[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-[#E8E6E1] bg-white p-3 shadow-lg text-xs">
      <p className="mb-2 font-semibold text-[#18181B]">{label} 2025–26</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            <span className="text-[#52525B]">{p.name}</span>
          </div>
          <span className="font-mono font-semibold" style={{ color: p.color }}>{p.value}%</span>
        </div>
      ))}
    </div>
  )
}

export default function DistrictRetentionPage() {
  const latestMonth = DISTRICT_RETENTION_MONTHLY[DISTRICT_RETENTION_MONTHLY.length - 1]

  const stats = INSTITUTIONS.map((inst) => {
    const latest  = latestMonth[inst.id as "atc" | "gsu" | "kennesaw"]
    const prev    = DISTRICT_RETENTION_MONTHLY[DISTRICT_RETENTION_MONTHLY.length - 2][inst.id as "atc" | "gsu" | "kennesaw"]
    const gap     = SCHOOL_TARGETS[inst.id] - latest
    const trend   = latest - prev
    return { inst, latest, gap, trend }
  })

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Retention Trends</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            Georgia District · Oct 2025 – May 2026 · All institutions
          </p>
        </div>
        <Link
          href="/assistant"
          className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
        >
          <Brain className="h-3.5 w-3.5" /> AI Analysis
        </Link>
      </div>

      {/* Per-institution KPI cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ inst, latest, gap, trend }, i) => (
          <motion.div
            key={inst.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-[#E8E6E1] bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#52525B]">{inst.shortName}</p>
              <div className="flex items-center gap-1 text-[11px]" style={{ color: trend >= 0 ? "#059669" : "#DC2626" }}>
                {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span className="font-mono font-semibold">{trend >= 0 ? "+" : ""}{trend}pp</span>
              </div>
            </div>
            <p className="mt-1 font-mono text-3xl font-bold" style={{ color: SCHOOL_COLORS[inst.id] }}>
              {latest}%
            </p>
            <p className="text-[11px] text-[#A1A1AA]">
              Target {SCHOOL_TARGETS[inst.id]}% · <span className={gap > 5 ? "text-[#DC2626] font-medium" : "text-[#D97706] font-medium"}>{gap}pp gap</span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F4F4F2]">
              <div
                className="h-full rounded-full"
                style={{ width: `${(latest / SCHOOL_TARGETS[inst.id]) * 100}%`, background: SCHOOL_COLORS[inst.id] }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Multi-line chart */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-[#E8E6E1] bg-white p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#18181B]">Institution Comparison</p>
            <p className="mt-0.5 text-[11px] text-[#A1A1AA]">Monthly retention rate · Oct 2025 – May 2026</p>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className="h-px w-5 border-t-2 border-dashed border-[#A1A1AA]" />
              <span className="text-[#A1A1AA]">Targets</span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={DISTRICT_RETENTION_MONTHLY} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F2" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#A1A1AA" }} axisLine={false} tickLine={false} />
            <YAxis domain={[45, 95]} tick={{ fontSize: 11, fill: "#A1A1AA" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
              formatter={(value) => {
                const inst = INSTITUTIONS.find((i) => i.id === value)
                return inst?.shortName ?? value
              }}
            />
            {/* Target reference lines */}
            <ReferenceLine y={73} stroke="#4F46E5" strokeDasharray="4 4" strokeOpacity={0.4} />
            <ReferenceLine y={85} stroke="#059669" strokeDasharray="4 4" strokeOpacity={0.4} />
            <ReferenceLine y={88} stroke="#D97706" strokeDasharray="4 4" strokeOpacity={0.4} />
            {/* Data lines */}
            {INSTITUTIONS.map((inst) => (
              <Line
                key={inst.id}
                type="monotone"
                dataKey={inst.id}
                name={inst.id}
                stroke={SCHOOL_COLORS[inst.id]}
                strokeWidth={2}
                dot={{ r: 3, fill: SCHOOL_COLORS[inst.id], strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Insight banner */}
      <div className="flex items-start gap-2 rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] px-4 py-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]" />
        <p className="text-xs text-[#92400E]">
          <span className="font-semibold">ATC is 13pp below target.</span> GSU and KSU are trending upward and approaching their respective targets.
          At the current ATC trajectory (+1pp/month), the institution will finish the semester at ~60% — 13pp short of the 73% TCSG target.
          District Analyst recommends prioritizing intervention resources at ATC.
        </p>
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        Retention data is read-only at district level · SKORA updates every 4 hours · FERPA compliant
      </p>
    </div>
  )
}
