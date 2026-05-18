"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar, CheckCircle2, Save, Plus, Trash2,
  RefreshCw, Link2, ToggleLeft, ToggleRight, AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"

interface ConnectedCal {
  id: string
  provider: "google" | "outlook" | "apple"
  email: string
  connected: boolean
  syncing: boolean
  lastSync: string
  color: string
}

const INITIAL_CALS: ConnectedCal[] = [
  { id: "gc-1", provider: "google",  email: "jordan.rivera@gmail.com",     connected: true,  syncing: false, lastSync: "2 min ago",   color: "#4285F4" },
  { id: "ol-1", provider: "outlook", email: "jordan.r@atlantatech.edu",    connected: false, syncing: false, lastSync: "Never",       color: "#0078D4" },
]

const SYNC_DIRECTIONS = [
  { value: "import",     label: "Import only",    description: "Pull events from external calendars into STEM-ED-AI" },
  { value: "export",     label: "Export only",    description: "Push STEM-ED-AI events to external calendars" },
  { value: "both",       label: "Two-way sync",   description: "Full bidirectional synchronization" },
]

const EVENT_CATEGORIES = [
  { id: "classes",    label: "Classes & lectures",     synced: true  },
  { id: "deadlines",  label: "Assignment deadlines",   synced: true  },
  { id: "exams",      label: "Exams & quizzes",        synced: true  },
  { id: "meetings",   label: "Meetings & office hours",synced: true  },
  { id: "personal",   label: "Personal events",        synced: false },
]

const DEFAULT_VIEWS = [
  { value: "month",  label: "Month" },
  { value: "week",   label: "Week"  },
  { value: "agenda", label: "Agenda"},
]

function ProviderLogo({ provider }: { provider: string }) {
  if (provider === "google")  return <span className="font-bold text-[11px] text-[#4285F4]">G</span>
  if (provider === "outlook") return <span className="font-bold text-[11px] text-[#0078D4]">O</span>
  return <span className="font-bold text-[11px] text-[#A1A1AA]">A</span>
}

export default function CalendarSettingsPage() {
  const [cals,       setCals]       = useState<ConnectedCal[]>(INITIAL_CALS)
  const [direction,  setDirection]  = useState("both")
  const [categories, setCategories] = useState(EVENT_CATEGORIES)
  const [defaultView,setDefaultView]= useState("week")
  const [weekStart,  setWeekStart]  = useState("0")
  const [syncId,     setSyncId]     = useState<string | null>(null)
  const [saved,      setSaved]      = useState(false)

  function toggleConnect(id: string) {
    setCals((prev) => prev.map((c) => c.id === id ? { ...c, connected: !c.connected, lastSync: "Never" } : c))
    setSaved(false)
  }

  function syncNow(id: string) {
    setSyncId(id)
    setCals((prev) => prev.map((c) => c.id === id ? { ...c, syncing: true } : c))
    setTimeout(() => {
      setSyncId(null)
      setCals((prev) => prev.map((c) => c.id === id ? { ...c, syncing: false, lastSync: "Just now" } : c))
    }, 2000)
  }

  function toggleCategory(id: string) {
    setCategories((prev) => prev.map((c) => c.id === id ? { ...c, synced: !c.synced } : c))
    setSaved(false)
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6 animate-fade-up">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="page-title">Calendar & Sync</h1>
            <p className="mt-1 text-sm text-[#52525B]">Connect external calendars and configure sync preferences</p>
          </div>
          <button onClick={handleSave}
            className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#4338CA]">
            <Save className="h-3.5 w-3.5" /> Save
          </button>
        </div>

        {saved && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-xl border border-[#D1FAE5] bg-[#F0FDF4] px-4 py-3 text-sm font-medium text-[#059669]">
            <CheckCircle2 className="h-4 w-4" /> Calendar settings saved
          </motion.div>
        )}

        {/* Connected calendars */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
          <div className="flex items-center justify-between border-b border-[#F4F4F2] px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#A1A1AA] flex items-center gap-2">
              <Link2 className="h-3.5 w-3.5" /> Connected Calendars
            </p>
            <button className="flex items-center gap-1 text-xs font-medium text-[#4F46E5] hover:underline">
              <Plus className="h-3 w-3" /> Add calendar
            </button>
          </div>

          <div className="divide-y divide-[#F4F4F2]">
            {cals.map((cal) => (
              <div key={cal.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E8E6E1] bg-white">
                  <ProviderLogo provider={cal.provider} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#18181B] capitalize">{cal.provider} Calendar</p>
                    {cal.connected && (
                      <span className="flex items-center gap-0.5 rounded-full bg-[#D1FAE5] px-1.5 py-0.5 text-[9px] font-semibold text-[#059669]">
                        <CheckCircle2 className="h-2.5 w-2.5" /> Connected
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#A1A1AA]">{cal.email}</p>
                  <p className="text-[10px] text-[#A1A1AA]">Last sync: {cal.lastSync}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {cal.connected && (
                    <button onClick={() => syncNow(cal.id)} disabled={!!syncId}
                      className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-2.5 py-1.5 text-[11px] text-[#52525B] hover:bg-[#FAFAF9] disabled:opacity-50">
                      <RefreshCw className={cn("h-3 w-3", cal.syncing && "animate-spin")} />
                      {cal.syncing ? "Syncing…" : "Sync"}
                    </button>
                  )}
                  <button onClick={() => toggleConnect(cal.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-2.5 py-1.5 text-[11px] text-[#52525B] hover:bg-[#FAFAF9]">
                    {cal.connected
                      ? <><ToggleRight className="h-3.5 w-3.5 text-[#059669]" /> Disconnect</>
                      : <><ToggleLeft  className="h-3.5 w-3.5 text-[#A1A1AA]" /> Connect</>
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#F4F4F2] bg-[#FAFAF9] px-5 py-3">
            <div className="flex items-start gap-2 text-[11px] text-[#A1A1AA]">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              OAuth 2.0 · Read/write scope only · Credentials stored encrypted · Revoke anytime
            </div>
          </div>
        </motion.div>

        {/* Sync direction */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Sync Direction</p>
          <div className="space-y-2">
            {SYNC_DIRECTIONS.map((opt) => (
              <label key={opt.value}
                className={cn("flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all hover:border-[#C7D2FE]",
                  direction === opt.value ? "border-[#4F46E5] bg-[#EEF2FF]" : "border-[#E8E6E1]")}>
                <input type="radio" name="direction" value={opt.value} checked={direction === opt.value}
                  onChange={() => { setDirection(opt.value); setSaved(false) }}
                  className="mt-0.5 accent-[#4F46E5]" />
                <div>
                  <p className="text-sm font-medium text-[#18181B]">{opt.label}</p>
                  <p className="text-[11px] text-[#A1A1AA]">{opt.description}</p>
                </div>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Event categories to sync */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.11 }}
          className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
          <p className="border-b border-[#F4F4F2] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">
            Event Categories to Sync
          </p>
          <div className="divide-y divide-[#F4F4F2]">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between px-5 py-3.5">
                <p className="text-sm text-[#18181B]">{cat.label}</p>
                <button onClick={() => toggleCategory(cat.id)}
                  className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors"
                  style={{ background: cat.synced ? "#4F46E5" : "#E4E4E7" }}>
                  <span className="pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform"
                    style={{ transform: cat.synced ? "translate(18px, 2px)" : "translate(2px, 2px)" }} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Display preferences */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Display Preferences</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-[#52525B] mb-1.5">Default calendar view</label>
              <select value={defaultView} onChange={(e) => { setDefaultView(e.target.value); setSaved(false) }}
                className="w-full rounded-lg border border-[#E8E6E1] bg-white px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]">
                {DEFAULT_VIEWS.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#52525B] mb-1.5">Week starts on</label>
              <select value={weekStart} onChange={(e) => { setWeekStart(e.target.value); setSaved(false) }}
                className="w-full rounded-lg border border-[#E8E6E1] bg-white px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]">
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
              </select>
            </div>
          </div>
        </motion.div>

        <p className="text-[11px] text-[#A1A1AA]">Calendar data synced securely · FERPA compliant · Events never shared with third parties</p>
      </div>
    </AppShell>
  )
}
