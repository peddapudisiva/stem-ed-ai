"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft, ChevronRight, Plus, Clock, MapPin,
  BookOpen, AlertCircle, Users, Calendar as CalendarIcon, List
} from "lucide-react"
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addMonths, subMonths, addWeeks, subWeeks, eachDayOfInterval,
  isSameMonth, isSameDay, isToday, parseISO, addDays, subDays
} from "date-fns"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"
import { CALENDAR_EVENTS } from "@/lib/demo-data"

type View = "month" | "week" | "agenda"
type EventCategory = "class" | "deadline" | "meeting" | "officehours" | "exam" | "personal"

const CAT_CONFIG: Record<EventCategory, { color: string; bg: string; border: string; label: string }> = {
  class:       { color: "#4F46E5", bg: "#EEF2FF", border: "#C7D2FE", label: "Class"        },
  deadline:    { color: "#DC2626", bg: "#FEE2E2", border: "#FECACA", label: "Deadline"     },
  meeting:     { color: "#D97706", bg: "#FEF3C7", border: "#FDE68A", label: "Meeting"      },
  officehours: { color: "#059669", bg: "#D1FAE5", border: "#A7F3D0", label: "Office Hours" },
  exam:        { color: "#7C3AED", bg: "#EDE9FE", border: "#DDD6FE", label: "Exam"         },
  personal:    { color: "#52525B", bg: "#F4F4F2", border: "#E4E4E7", label: "Personal"     },
}

// Expand demo events to fill out the month
const EXTRA_EVENTS = [
  { id: "e006", title: "CS 1010 — Lecture",            start: "2026-05-21T09:00:00", end: "2026-05-21T10:15:00", category: "class"       as const, location: "Room 204"     },
  { id: "e007", title: "MATH 2010 — Lab",               start: "2026-05-21T11:00:00", end: "2026-05-21T12:30:00", category: "class"       as const, location: "Math Lab B"   },
  { id: "e008", title: "CS 1010 — Lecture",            start: "2026-05-23T09:00:00", end: "2026-05-23T10:15:00", category: "class"       as const, location: "Room 204"     },
  { id: "e009", title: "NURS 2100 — Clinical Sim",     start: "2026-05-23T08:00:00", end: "2026-05-23T08:50:00", category: "class"       as const, location: "Sim Lab A"    },
  { id: "e010", title: "MATH 2010 Midterm",            start: "2026-05-27T11:00:00", end: "2026-05-27T12:30:00", category: "exam"        as const, location: "Math Lab B"   },
  { id: "e011", title: "ENGR 4850 — Lecture",          start: "2026-05-27T14:00:00", end: "2026-05-27T15:15:00", category: "class"       as const, location: "Eng Hall 310" },
  { id: "e012", title: "Advisor Meeting",              start: "2026-05-28T10:00:00", end: "2026-05-28T10:30:00", category: "meeting"     as const, location: "Adv Office"   },
  { id: "e013", title: "CS Project 2 Due",             start: "2026-05-28T23:59:00", end: "2026-05-28T23:59:00", category: "deadline"    as const, location: ""             },
  { id: "e014", title: "NABA Mentor Session",          start: "2026-05-29T15:00:00", end: "2026-05-29T16:00:00", category: "meeting"     as const, location: "Virtual"      },
  { id: "e015", title: "Study Group — Calculus",       start: "2026-05-25T14:00:00", end: "2026-05-25T16:00:00", category: "personal"    as const, location: "Library 2F"   },
  { id: "e016", title: "Prof. Torres Office Hours",    start: "2026-05-26T13:00:00", end: "2026-05-26T15:00:00", category: "officehours" as const, location: "Nursing Dept" },
  { id: "e017", title: "CS 1010 — Lecture",            start: "2026-05-26T09:00:00", end: "2026-05-26T10:15:00", category: "class"       as const, location: "Room 204"     },
  { id: "e018", title: "ENGR Final Project Due",       start: "2026-06-02T23:59:00", end: "2026-06-02T23:59:00", category: "deadline"    as const, location: ""             },
  { id: "e019", title: "MATH 2010 — Lab",              start: "2026-05-28T11:00:00", end: "2026-05-28T12:30:00", category: "class"       as const, location: "Math Lab B"   },
  { id: "e020", title: "CS 1010 Final Exam",           start: "2026-06-04T09:00:00", end: "2026-06-04T11:00:00", category: "exam"        as const, location: "Room 204"     },
]

const ALL_EVENTS = [...CALENDAR_EVENTS, ...EXTRA_EVENTS]

function getEventsForDay(date: Date) {
  return ALL_EVENTS.filter((e) => isSameDay(parseISO(e.start), date))
}

function formatEventTime(isoStr: string) {
  const d = parseISO(isoStr)
  return format(d, "h:mm a")
}

export default function CalendarPage() {
  const [view,     setView]     = useState<View>("month")
  const [current,  setCurrent]  = useState(new Date("2026-05-19"))
  const [selected, setSelected] = useState<Date | null>(new Date("2026-05-19"))
  const [modal,    setModal]    = useState<typeof ALL_EVENTS[0] | null>(null)

  // ── Month grid ──────────────────────────────────────────────────────────────
  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(current), { weekStartsOn: 0 })
    const end   = endOfWeek(endOfMonth(current),     { weekStartsOn: 0 })
    return eachDayOfInterval({ start, end })
  }, [current])

  // ── Week grid ───────────────────────────────────────────────────────────────
  const weekDays = useMemo(() => {
    const start = startOfWeek(current, { weekStartsOn: 0 })
    return eachDayOfInterval({ start, end: addDays(start, 6) })
  }, [current])

  // ── Agenda (next 14 days) ───────────────────────────────────────────────────
  const agendaDays = useMemo(() => {
    const days = eachDayOfInterval({ start: current, end: addDays(current, 13) })
    return days.map((d) => ({ date: d, events: getEventsForDay(d) })).filter((d) => d.events.length > 0)
  }, [current])

  function prev() {
    if (view === "month")  setCurrent(subMonths(current, 1))
    if (view === "week")   setCurrent(subWeeks(current,  1))
    if (view === "agenda") setCurrent(subDays(current, 7))
  }
  function next() {
    if (view === "month")  setCurrent(addMonths(current, 1))
    if (view === "week")   setCurrent(addWeeks(current,  1))
    if (view === "agenda") setCurrent(addDays(current, 7))
  }

  const navLabel =
    view === "month"  ? format(current, "MMMM yyyy") :
    view === "week"   ? `${format(weekDays[0], "MMM d")} – ${format(weekDays[6], "MMM d, yyyy")}` :
                        `${format(current, "MMM d")} – ${format(addDays(current, 13), "MMM d, yyyy")}`

  return (
    <AppShell>
      <div className="flex h-full flex-col space-y-4 animate-fade-up">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF2FF]">
              <CalendarIcon className="h-4 w-4 text-[#4F46E5]" />
            </div>
            <div>
              <h1 className="page-title leading-tight">Calendar</h1>
              <p className="text-xs text-[#A1A1AA]">Atlanta Technical College · Spring 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View switcher */}
            <div className="flex rounded-lg border border-[#E8E6E1] overflow-hidden bg-white">
              {(["month", "week", "agenda"] as View[]).map((v) => (
                <button key={v} onClick={() => setView(v)}
                  className={cn("px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                    view === v ? "bg-[#4F46E5] text-white" : "text-[#52525B] hover:bg-[#FAFAF9]")}>
                  {v === "agenda" ? <List className="h-3.5 w-3.5" /> : v}
                </button>
              ))}
            </div>
            <button onClick={() => { setCurrent(new Date("2026-05-19")); setSelected(new Date("2026-05-19")) }}
              className="rounded-lg border border-[#E8E6E1] bg-white px-3 py-1.5 text-xs text-[#52525B] hover:bg-[#FAFAF9]">
              Today
            </button>
            <button onClick={() => setModal({ id: "new", title: "", start: "", end: "", category: "personal" as const, location: "" })}
              className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4338CA]">
              <Plus className="h-3.5 w-3.5" /> Add event
            </button>
          </div>
        </div>

        {/* Nav row */}
        <div className="flex items-center gap-3">
          <button onClick={prev} className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8E6E1] bg-white text-[#52525B] hover:bg-[#FAFAF9]">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold text-[#18181B] min-w-[200px] text-center">{navLabel}</span>
          <button onClick={next} className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8E6E1] bg-white text-[#52525B] hover:bg-[#FAFAF9]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2">
          {(Object.entries(CAT_CONFIG) as [EventCategory, typeof CAT_CONFIG[EventCategory]][]).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: v.color }} />
              <span className="text-[11px] text-[#A1A1AA]">{v.label}</span>
            </div>
          ))}
        </div>

        {/* ── Month view ── */}
        {view === "month" && (
          <div className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white flex-1">
            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 border-b border-[#F4F4F2]">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
                <div key={d} className="py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-[#A1A1AA]">{d}</div>
              ))}
            </div>
            {/* Day cells */}
            <div className="grid grid-cols-7 auto-rows-[minmax(80px,1fr)]">
              {monthDays.map((day) => {
                const events = getEventsForDay(day)
                const isCurrentMonth = isSameMonth(day, current)
                const isSel = selected && isSameDay(day, selected)
                return (
                  <div
                    key={day.toISOString()}
                    onClick={() => setSelected(day)}
                    className={cn(
                      "border-b border-r border-[#F4F4F2] p-1.5 cursor-pointer transition-colors hover:bg-[#FAFAF9]",
                      !isCurrentMonth && "bg-[#FAFAF9] opacity-50",
                      isSel && "bg-[#EEF2FF]"
                    )}
                  >
                    <div className={cn(
                      "mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                      isToday(day) ? "bg-[#4F46E5] text-white" : "text-[#52525B]",
                      isSel && !isToday(day) && "bg-[#C7D2FE] text-[#4F46E5]"
                    )}>
                      {format(day, "d")}
                    </div>
                    <div className="space-y-0.5">
                      {events.slice(0, 2).map((ev) => {
                        const cfg = CAT_CONFIG[ev.category as EventCategory]
                        return (
                          <div key={ev.id}
                            onClick={(e) => { e.stopPropagation(); setModal(ev) }}
                            className="truncate rounded px-1 py-0.5 text-[10px] font-medium cursor-pointer hover:opacity-80"
                            style={{ background: cfg.bg, color: cfg.color }}>
                            {ev.title}
                          </div>
                        )
                      })}
                      {events.length > 2 && (
                        <div className="text-[10px] text-[#A1A1AA] pl-1">+{events.length - 2} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Week view ── */}
        {view === "week" && (
          <div className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white flex-1">
            <div className="grid grid-cols-7 border-b border-[#F4F4F2]">
              {weekDays.map((day) => (
                <div key={day.toISOString()}
                  className={cn("py-3 text-center border-r border-[#F4F4F2] last:border-r-0",
                    isToday(day) && "bg-[#EEF2FF]")}>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-[#A1A1AA]">{format(day, "EEE")}</p>
                  <p className={cn("mt-0.5 text-lg font-bold",
                    isToday(day) ? "text-[#4F46E5]" : "text-[#18181B]")}>
                    {format(day, "d")}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 min-h-[400px] overflow-y-auto">
              {weekDays.map((day) => {
                const events = getEventsForDay(day)
                return (
                  <div key={day.toISOString()} className={cn("border-r border-[#F4F4F2] last:border-r-0 p-1.5 space-y-1", isToday(day) && "bg-[#FAFAFF]")}>
                    {events.map((ev) => {
                      const cfg = CAT_CONFIG[ev.category as EventCategory]
                      return (
                        <motion.div key={ev.id}
                          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                          onClick={() => setModal(ev)}
                          className="rounded-lg p-2 cursor-pointer hover:opacity-90 transition-opacity"
                          style={{ background: cfg.bg, borderLeft: `3px solid ${cfg.color}` }}>
                          <p className="text-[10px] font-semibold leading-tight" style={{ color: cfg.color }}>{ev.title}</p>
                          <p className="mt-0.5 text-[9px] text-[#A1A1AA]">{formatEventTime(ev.start)}</p>
                          {ev.location && <p className="text-[9px] text-[#A1A1AA] truncate">{ev.location}</p>}
                        </motion.div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Agenda view ── */}
        {view === "agenda" && (
          <div className="space-y-4 overflow-y-auto flex-1">
            {agendaDays.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CalendarIcon className="mb-3 h-10 w-10 text-[#E8E6E1]" />
                <p className="text-sm font-medium text-[#18181B]">No events in this range</p>
                <p className="text-xs text-[#A1A1AA]">Move forward or add a new event</p>
              </div>
            ) : agendaDays.map(({ date, events }) => (
              <motion.div key={date.toISOString()} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-2 flex items-center gap-2">
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold",
                    isToday(date) ? "bg-[#4F46E5] text-white" : "bg-[#F4F4F2] text-[#52525B]")}>
                    {format(date, "d")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#18181B]">{format(date, "EEEE")}</p>
                    <p className="text-[11px] text-[#A1A1AA]">{format(date, "MMMM d, yyyy")}</p>
                  </div>
                </div>
                <div className="ml-10 space-y-2">
                  {events.map((ev) => {
                    const cfg = CAT_CONFIG[ev.category as EventCategory]
                    return (
                      <div key={ev.id} onClick={() => setModal(ev)}
                        className="flex items-start gap-3 rounded-xl border bg-white p-3.5 cursor-pointer hover:shadow-sm transition-shadow"
                        style={{ borderColor: cfg.border }}>
                        <div className="h-2.5 w-2.5 shrink-0 rounded-full mt-1.5" style={{ background: cfg.color }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#18181B]">{ev.title}</p>
                          <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-[#A1A1AA]">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatEventTime(ev.start)}</span>
                            {ev.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</span>}
                          </div>
                        </div>
                        <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
                          style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Event detail modal */}
        <AnimatePresence>
          {modal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
              onClick={() => setModal(null)}>
              <motion.div initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl bg-white shadow-xl overflow-hidden">
                {modal.id === "new" ? (
                  <div className="p-6">
                    <p className="font-semibold text-[#18181B] mb-4">New Event</p>
                    <input placeholder="Event title" autoFocus
                      className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm outline-none focus:border-[#4F46E5] mb-3" />
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <input type="datetime-local" className="rounded-lg border border-[#E8E6E1] px-3 py-2 text-xs outline-none focus:border-[#4F46E5]" />
                      <input type="datetime-local" className="rounded-lg border border-[#E8E6E1] px-3 py-2 text-xs outline-none focus:border-[#4F46E5]" />
                    </div>
                    <input placeholder="Location (optional)"
                      className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm outline-none focus:border-[#4F46E5] mb-4" />
                    <div className="flex gap-2">
                      <button onClick={() => setModal(null)}
                        className="flex-1 rounded-lg border border-[#E8E6E1] py-2 text-sm text-[#52525B] hover:bg-[#FAFAF9]">Cancel</button>
                      <button onClick={() => setModal(null)}
                        className="flex-1 rounded-lg bg-[#4F46E5] py-2 text-sm font-medium text-white hover:bg-[#4338CA]">Save</button>
                    </div>
                  </div>
                ) : (() => {
                  const cfg = CAT_CONFIG[modal.category as EventCategory]
                  return (
                    <>
                      <div className="px-5 py-4" style={{ background: cfg.bg }}>
                        <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: cfg.color }}>{cfg.label}</span>
                        <p className="mt-1 text-base font-semibold text-[#18181B]">{modal.title}</p>
                      </div>
                      <div className="space-y-3 px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#52525B]">
                          <Clock className="h-4 w-4 text-[#A1A1AA]" />
                          <span>{formatEventTime(modal.start)}{modal.end && modal.end !== modal.start ? ` – ${formatEventTime(modal.end)}` : ""}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#52525B]">
                          <CalendarIcon className="h-4 w-4 text-[#A1A1AA]" />
                          <span>{format(parseISO(modal.start), "EEEE, MMMM d, yyyy")}</span>
                        </div>
                        {modal.location && (
                          <div className="flex items-center gap-2 text-sm text-[#52525B]">
                            <MapPin className="h-4 w-4 text-[#A1A1AA]" />
                            <span>{modal.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="border-t border-[#F4F4F2] px-5 py-3 flex justify-end">
                        <button onClick={() => setModal(null)}
                          className="rounded-lg border border-[#E8E6E1] px-4 py-1.5 text-xs text-[#52525B] hover:bg-[#FAFAF9]">Close</button>
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  )
}
