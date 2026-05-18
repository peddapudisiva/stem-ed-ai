"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Mail, Smartphone, Monitor, CheckCircle2, Save } from "lucide-react"
import { AppShell } from "@/components/layout/app-shell"

interface NotifSetting {
  id: string
  label: string
  description: string
  email: boolean
  push: boolean
  inApp: boolean
}

const INITIAL_SETTINGS: NotifSetting[] = [
  { id: "assignment",  label: "Assignment due reminders",   description: "24h and 1h before deadline",                email: true,  push: true,  inApp: true  },
  { id: "grade",       label: "Grade posted",               description: "When a teacher posts or updates a grade",   email: true,  push: false, inApp: true  },
  { id: "message",     label: "New messages",               description: "Direct messages and thread replies",        email: false, push: true,  inApp: true  },
  { id: "announce",    label: "Announcements",              description: "School-wide and course announcements",      email: true,  push: false, inApp: true  },
  { id: "attend",      label: "Attendance alerts",          description: "Absences and tardiness recorded",           email: true,  push: true,  inApp: true  },
  { id: "report",      label: "Report generation",         description: "When a scheduled report is ready",          email: true,  push: false, inApp: false },
  { id: "sync",        label: "Integration sync errors",   description: "SIS or LMS sync failures",                  email: true,  push: false, inApp: true  },
  { id: "security",    label: "Security events",           description: "New login, password change, 2FA changes",   email: true,  push: true,  inApp: true  },
  { id: "mentor",      label: "Mentor sessions",           description: "Session reminders and booking confirmations",email: true,  push: true,  inApp: true  },
  { id: "credential",  label: "Badge & credential awarded", description: "When a new badge or certificate is earned", email: true,  push: true,  inApp: true  },
]

const DIGEST_OPTIONS = [
  { value: "realtime", label: "Real-time",     description: "Every notification delivered immediately" },
  { value: "daily",    label: "Daily digest",  description: "Summary email each morning at 7 AM" },
  { value: "weekly",   label: "Weekly digest", description: "Summary email every Monday morning" },
]

export default function NotificationsPage() {
  const [settings,  setSettings]  = useState<NotifSetting[]>(INITIAL_SETTINGS)
  const [digest,    setDigest]    = useState("realtime")
  const [quietHrs,  setQuietHrs]  = useState(true)
  const [quietFrom, setQuietFrom] = useState("22:00")
  const [quietTo,   setQuietTo]   = useState("07:00")
  const [saved,     setSaved]     = useState(false)

  function toggle(id: string, channel: "email" | "push" | "inApp") {
    setSettings((prev) => prev.map((s) => s.id === id ? { ...s, [channel]: !s[channel] } : s))
    setSaved(false)
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const channelHeaders = [
    { key: "email", icon: Mail,       label: "Email"  },
    { key: "push",  icon: Smartphone, label: "Push"   },
    { key: "inApp", icon: Monitor,    label: "In-app" },
  ] as const

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6 animate-fade-up">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="page-title">Notifications</h1>
            <p className="mt-1 text-sm text-[#52525B]">Choose what you want to be notified about and how</p>
          </div>
          <button onClick={handleSave}
            className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#4338CA]">
            <Save className="h-3.5 w-3.5" /> Save
          </button>
        </div>

        {saved && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-xl border border-[#D1FAE5] bg-[#F0FDF4] px-4 py-3 text-sm font-medium text-[#059669]">
            <CheckCircle2 className="h-4 w-4" /> Notification preferences saved
          </motion.div>
        )}

        {/* Per-notification table */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_80px_80px_80px] items-center border-b border-[#F4F4F2] px-5 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">
              <Bell className="h-3.5 w-3.5" /> Notification
            </div>
            {channelHeaders.map(({ key, icon: Icon, label }) => (
              <div key={key} className="flex flex-col items-center gap-1 text-center">
                <Icon className="h-3.5 w-3.5 text-[#A1A1AA]" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#A1A1AA]">{label}</span>
              </div>
            ))}
          </div>

          {settings.map((s, i) => (
            <motion.div key={s.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              className="grid grid-cols-[1fr_80px_80px_80px] items-center border-b border-[#F4F4F2] px-5 py-3.5 last:border-0">
              <div>
                <p className="text-sm font-medium text-[#18181B]">{s.label}</p>
                <p className="text-[11px] text-[#A1A1AA]">{s.description}</p>
              </div>
              {(["email", "push", "inApp"] as const).map((ch) => (
                <div key={ch} className="flex justify-center">
                  <Toggle checked={s[ch]} onChange={() => toggle(s.id, ch)} />
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Digest frequency */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Email Digest</p>
          <div className="space-y-2">
            {DIGEST_OPTIONS.map((opt) => (
              <label key={opt.value}
                className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all hover:border-[#C7D2FE]"
                style={{ borderColor: digest === opt.value ? "#4F46E5" : "#E8E6E1", background: digest === opt.value ? "#EEF2FF" : "white" }}>
                <input type="radio" name="digest" value={opt.value} checked={digest === opt.value}
                  onChange={() => { setDigest(opt.value); setSaved(false) }}
                  className="mt-0.5 accent-[#4F46E5]" />
                <div>
                  <p className="text-sm font-medium text-[#18181B]">{opt.label}</p>
                  <p className="text-[11px] text-[#A1A1AA]">{opt.description}</p>
                </div>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Quiet hours */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Quiet Hours</p>
            <Toggle checked={quietHrs} onChange={() => { setQuietHrs((p) => !p); setSaved(false) }} />
          </div>
          <p className="mb-4 text-sm text-[#52525B]">Suppress push and in-app notifications during these hours.</p>
          <div className={quietHrs ? "" : "pointer-events-none opacity-40"}>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-[11px] text-[#52525B] mb-1">From</label>
                <input type="time" value={quietFrom} onChange={(e) => { setQuietFrom(e.target.value); setSaved(false) }}
                  className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]" />
              </div>
              <div className="flex-1">
                <label className="block text-[11px] text-[#52525B] mb-1">To</label>
                <input type="time" value={quietTo} onChange={(e) => { setQuietTo(e.target.value); setSaved(false) }}
                  className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]" />
              </div>
            </div>
          </div>
        </motion.div>

        <p className="text-[11px] text-[#A1A1AA]">Push notifications require browser permission · Email preferences apply to institutional address only</p>
      </div>
    </AppShell>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ background: checked ? "#4F46E5" : "#E4E4E7" }}
    >
      <span
        className="pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform"
        style={{ transform: checked ? "translate(18px, 2px)" : "translate(2px, 2px)" }}
      />
    </button>
  )
}
