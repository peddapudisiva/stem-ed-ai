"use client"

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer
} from "recharts"
import { RETENTION_TREND } from "@/lib/demo-data"

export function RetentionChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={RETENTION_TREND} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F2" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#A1A1AA" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[45, 80]}
          tick={{ fontSize: 11, fill: "#A1A1AA" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid #E8E6E1",
            borderRadius: 8,
            fontSize: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
          formatter={(value) => [`${value}%`, "Retention"]}
        />
        <ReferenceLine
          y={73}
          stroke="#D97706"
          strokeDasharray="4 4"
          label={{ value: "Target 73%", position: "right", fontSize: 10, fill: "#D97706" }}
        />
        <Area
          type="monotone"
          dataKey="rate"
          stroke="#4F46E5"
          strokeWidth={2}
          fill="url(#retentionGrad)"
          dot={{ r: 3, fill: "#4F46E5", strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "#4F46E5" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
