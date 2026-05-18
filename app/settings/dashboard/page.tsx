"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  LayoutDashboard, GripVertical, Eye, EyeOff,
  Save, CheckCircle2, BarChart3, BookOpen, Bell,
  Calendar, Users, Brain, TrendingUp, ClipboardList
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"

interface Widget {
  id: string
  label: string
  description: string
  icon: React.ElementType
  enabled: boolean
  size: "small" | "medium" | "large"
}

const INITIAL_WIDGETS: Widget[] = [
  { id: "stats",        label: "KPI Stats Strip",       description: "GPA, XP, attendance, streak at a glance",  icon: BarChart3,     enabled: true,  size: "large"  },
  { id: "courses",      label: "My Courses",             description: "Current courses with progress bars",       icon: BookOpen,      enabled: true,  size: "medium" },
  { id: "assignments",  label: "Assignment Feed",        description: "Upcoming deadlines and recent grades",     icon: ClipboardList, enabled: true,  size: "medium" },
  { id: "calendar",     label: "Calendar Preview",       description: "Next 3 events from your calendar",        icon: Calendar,      enabled: true,  size: "small"  },
  { id: "notifications",label: "Notification Tray",     description: "Recent alerts and messages",              icon: Bell,          enabled: false, size: "small"  },
  { id: "classmates",   label: "Classmates Online",      description: "Who's active in your courses right now",  icon: Users,         enabled: false, size: "small"  },
  { id: "ai-summary",   label: "AI Daily Summary",       description: "SERA Tutor's personalized study tip",     icon: Brain,         enabled: true,  size: "medium" },
  { id: "retention",    label: "Progress Tracker",       description: "Weekly study hours and streak chart",     icon: TrendingUp,    enabled: true,  size: "medium" },
]

const DENSITY_OPTIONS = [
  { value: "comfortable", label: "Comfortable", description: "More spacing, larger cards" },
  { value: "compact",     label: "Compact",     description: "Fit more widgets on screen" },
  { value: "focus",       label: "Focus",       description: "Show only essential widgets" },
]

const DEFAULT_VIEW_OPTIONS = [
  { value: "student",   label: "Student Dashboard"   },
  { value: "calendar",  label: "Calendar"            },
  { value: "assistant", label: "AI Workspace"        },
]

export default function DashboardSettingsPage() {
  const [widgets,     setWidgets]     = useState<Widget[]>(INITIAL_WIDGETS)
  const [density,     setDensity]     = useState("comfortable")
  const [defaultView, setDefaultView] = useState("student")
  const [saved,       setSaved]       = useState(false)
  const [dragId,      setDragId]      = useState<string | null>(null)
  const [overId,      setOverId]      = useState<string | null>(null)

  function toggleWidget(id: string) {
    setWidgets((prev) => prev.map((w) => w.id === id ? { ...w, enabled: !w.enabled } : w))
    setSaved(false)
  }

  function handleDragStart(id: string) { setDragId(id) }
  function handleDragOver(e: React.DragEvent, id: string) { e.preventDefault(); setOverId(id) }
  function handleDrop(targetId: string) {
    if (!dragId || dragId === targetId) { setDragId(null); setOverId(null); return }
    setWidgets((prev) => {
      const arr = [...prev]
      const from = arr.findIndex((w) => w.id === dragId)
      const to   = arr.findIndex((w) => w.id === targetId)
      const [item] = arr.splice(from, 1)
      arr.splice(to, 0, item)
      return arr
    })
    setDragId(null); setOverId(null); setSaved(false)
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const enabledCount = widgets.filter((w) => w.enabled).length

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6 animate-fade-up">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="page-title">Dashboard Layout</h1>
            <p className="mt-1 text-sm text-[#52525B]">Choose which widgets appear and in what order</p>
          </div>
          <button onClick={handleSave}
            className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#4338CA]">
            <Save className="h-3.5 w-3.5" /> Save layout
          </button>
        </div>

        {saved && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-xl border border-[#D1FAE5] bg-[#F0FDF4] px-4 py-3 text-sm font-medium text-[#059669]">
            <CheckCircle2 className="h-4 w-4" /> Layout saved
          </motion.div>
        )}

        {/* Widget list */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
          <div className="flex items-center justify-between border-b border-[#F4F4F2] px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#A1A1AA] flex items-center gap-2">
              <LayoutDashboard className="h-3.5 w-3.5" /> Widgets
            </p>
            <span className="text-[11px] text-[#A1A1AA]">{enabledCount} of {widgets.length} enabled</span>
          </div>

          <p className="px-5 py-2 text-[11px] text-[#A1A1AA] bg-[#FAFAF9] border-b border-[#F4F4F2]">
            Drag rows to reorder · Toggle eye icon to show/hide
          </p>

          <div className="divide-y divide-[#F4F4F2]">
            {widgets.map((widget) => {
              const Icon = widget.icon
              const isOver = overId === widget.id && dragId !== widget.id
              return (
                <div
                  key={widget.id}
                  draggable
                  onDragStart={() => handleDragStart(widget.id)}
                  onDragOver={(e) => handleDragOver(e, widget.id)}
                  onDrop={() => handleDrop(widget.id)}
                  onDragEnd={() => { setDragId(null); setOverId(null) }}
                  className={cn(
                    "flex items-center gap-4 px-5 py-3.5 cursor-grab active:cursor-grabbing transition-colors",
                    !widget.enabled && "opacity-50",
                    isOver && "bg-[#EEF2FF]",
                    dragId === widget.id && "opacity-30"
                  )}
                >
                  <GripVertical className="h-4 w-4 shrink-0 text-[#D4D4D8]" />
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F2]">
                    <Icon className="h-4 w-4 text-[#52525B]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#18181B]">{widget.label}</p>
                    <p className="text-[11px] text-[#A1A1AA]">{widget.description}</p>
                  </div>
                  <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-semibold",
                    widget.size === "large" ? "bg-[#EEF2FF] text-[#4F46E5]" :
                    widget.size === "medium" ? "bg-[#F4F4F2] text-[#52525B]" :
                    "bg-[#F4F4F2] text-[#A1A1AA]")}>
                    {widget.size}
                  </span>
                  <button onClick={() => toggleWidget(widget.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F4F4F2] transition-colors">
                    {widget.enabled
                      ? <Eye className="h-4 w-4 text-[#4F46E5]" />
                      : <EyeOff className="h-4 w-4 text-[#A1A1AA]" />
                    }
                  </button>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Density */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Display Density</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {DENSITY_OPTIONS.map((opt) => (
              <label key={opt.value}
                className={cn("flex cursor-pointer flex-col rounded-xl border p-4 transition-all hover:border-[#C7D2FE]",
                  density === opt.value ? "border-[#4F46E5] bg-[#EEF2FF]" : "border-[#E8E6E1]")}>
                <div className="flex items-center gap-2 mb-1">
                  <input type="radio" name="density" value={opt.value} checked={density === opt.value}
                    onChange={() => { setDensity(opt.value); setSaved(false) }}
                    className="accent-[#4F46E5]" />
                  <span className="text-sm font-medium text-[#18181B]">{opt.label}</span>
                </div>
                <p className="text-[11px] text-[#A1A1AA] ml-5">{opt.description}</p>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Default landing page */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Default Landing Page</p>
          <p className="mb-3 text-sm text-[#52525B]">Where should STEM-ED-AI take you after login?</p>
          <select value={defaultView} onChange={(e) => { setDefaultView(e.target.value); setSaved(false) }}
            className="w-full rounded-lg border border-[#E8E6E1] bg-white px-3 py-2.5 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]">
            {DEFAULT_VIEW_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </motion.div>

        <p className="text-[11px] text-[#A1A1AA]">Layout preferences are saved per device · Drag-to-reorder requires mouse or trackpad</p>
      </div>
    </AppShell>
  )
}
