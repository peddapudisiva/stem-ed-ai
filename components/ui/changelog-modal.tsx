"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Sparkles, Brain, Shield, BarChart3,
  Users, Calendar, BookOpen, Zap, CheckCircle2
} from "lucide-react"

const CHANGELOG = [
  {
    version: "v1.0.0",
    date: "May 2026",
    label: "Initial Release",
    color: "#4F46E5",
    bg: "#EEF2FF",
    items: [
      { icon: Brain,    text: "AI Tutor & multi-agent workspace with 10 specialized agents" },
      { icon: BarChart3,text: "Advanced reporting — compliance, custom builder, PDF export" },
      { icon: Shield,   text: "2FA, SAML SSO (Okta / Azure AD), active session management" },
      { icon: Users,    text: "8 role dashboards: Student, Teacher, Admin, District, and more" },
      { icon: Calendar, text: "Unified calendar with Google & Outlook sync" },
      { icon: BookOpen, text: "NABA mentor matching, faculty PD tracker, course file management" },
      { icon: Zap,      text: "Integrations Hub — Banner SIS, Canvas, webhooks, and SSO" },
      { icon: Sparkles, text: "Gamification — XP, badges, streaks, and digital credentials" },
    ],
  },
]

const STORAGE_KEY = "sera_changelog_seen_v1.0.0"

export function ChangelogModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY)
    if (!seen) {
      const timer = setTimeout(() => setOpen(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1")
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1,    y: 0,  opacity: 1 }}
            exit={{   scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="relative overflow-hidden px-6 py-6" style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)" }}>
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)" }} />
              <button onClick={dismiss}
                className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">What&apos;s New</p>
                  <p className="text-lg font-bold text-white leading-tight">STEM-ED-AI {CHANGELOG[0].version}</p>
                  <p className="text-[11px] text-white/60">{CHANGELOG[0].date} · {CHANGELOG[0].label}</p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="px-6 py-5">
              <div className="space-y-3">
                {CHANGELOG[0].items.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FF]">
                        <Icon className="h-3.5 w-3.5 text-[#4F46E5]" />
                      </div>
                      <p className="text-sm text-[#52525B] leading-relaxed">{item.text}</p>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#D1FAE5] bg-[#F0FDF4] px-4 py-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#059669]" />
                <p className="text-[11px] text-[#059669] font-medium">FERPA compliant · SOC 2 Type II in progress · All data encrypted at rest</p>
              </div>

              <button onClick={dismiss}
                className="mt-4 w-full rounded-xl bg-[#4F46E5] py-3 text-sm font-medium text-white hover:bg-[#4338CA] transition-colors">
                Get started →
              </button>
              <p className="mt-2 text-center text-[10px] text-[#A1A1AA]">Won&apos;t show again · View changelog in Help Center</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
