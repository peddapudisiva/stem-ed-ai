"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, BookOpen, Zap, Shield, Users, BarChart3, Brain,
  ChevronDown, ChevronRight, ExternalLink, MessageSquare,
  CheckCircle2, AlertCircle, Send, X, Sparkles, FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"

interface Article {
  id: string
  title: string
  excerpt: string
  views: number
}

interface Category {
  id: string
  label: string
  icon: React.ElementType
  color: string
  bg: string
  articles: Article[]
}

const CATEGORIES: Category[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Zap,
    color: "#4F46E5",
    bg: "#EEF2FF",
    articles: [
      { id: "gs-1", title: "Setting up your account for the first time", excerpt: "Learn how to configure your profile, choose your role, and connect your institution.", views: 3241 },
      { id: "gs-2", title: "Understanding the role switcher", excerpt: "Switch between Student, Teacher, Admin, and other roles to see different dashboards.", views: 1892 },
      { id: "gs-3", title: "Connecting Google or Outlook calendar", excerpt: "Sync your institutional calendar so assignments and events appear automatically.", views: 1437 },
      { id: "gs-4", title: "How to navigate the sidebar", excerpt: "The sidebar adapts to your active role — learn what each section contains.", views: 987 },
    ],
  },
  {
    id: "ai-tutor",
    label: "AI Tutor & Assistant",
    icon: Brain,
    color: "#7C3AED",
    bg: "#EDE9FE",
    articles: [
      { id: "ai-1", title: "Starting your first AI tutoring session", excerpt: "Open AI Workspace from the sidebar and ask any question about your coursework.", views: 2718 },
      { id: "ai-2", title: "AI Tutor boundaries — what it can and can't do", excerpt: "The Tutor AI guides learning; it never submits assignments or assigns grades on your behalf.", views: 1556 },
      { id: "ai-3", title: "Using the Curriculum Assistant as a teacher", excerpt: "Generate lesson plans, rubrics, and differentiated materials with the Curriculum Agent.", views: 1203 },
      { id: "ai-4", title: "AI session limits and how to increase them", excerpt: "Free accounts include 3 AI sessions per month. Upgrade to Professional for unlimited.", views: 944 },
    ],
  },
  {
    id: "student",
    label: "Students",
    icon: BookOpen,
    color: "#059669",
    bg: "#D1FAE5",
    articles: [
      { id: "st-1", title: "Viewing and submitting assignments", excerpt: "Find all due assignments on your dashboard. Click any assignment to open it.", views: 4102 },
      { id: "st-2", title: "Taking a timed quiz", excerpt: "Timed assessments auto-submit when the clock reaches zero. You'll see a live countdown.", views: 2891 },
      { id: "st-3", title: "Earning badges and credentials", excerpt: "Complete course milestones to earn verifiable digital badges shown on your profile.", views: 1734 },
      { id: "st-4", title: "Connecting with a NABA mentor", excerpt: "Visit Dashboard → Mentors to browse matched mentors and request a session.", views: 1221 },
    ],
  },
  {
    id: "teacher",
    label: "Teachers",
    icon: Users,
    color: "#D97706",
    bg: "#FEF3C7",
    articles: [
      { id: "te-1", title: "Taking attendance in your class", excerpt: "Open Classes → Attendance to mark present, late, or absent for each student.", views: 2347 },
      { id: "te-2", title: "Uploading course files and materials", excerpt: "Go to Course Files and drag-and-drop PDFs, videos, or images directly onto the page.", views: 1876 },
      { id: "te-3", title: "Using the gradebook", excerpt: "Gradebook shows all assignments, grades, and at-risk flags for your class roster.", views: 1543 },
      { id: "te-4", title: "Creating announcements", excerpt: "Broadcast updates to your entire class from the Announcements section.", views: 889 },
    ],
  },
  {
    id: "security",
    label: "Security & Privacy",
    icon: Shield,
    color: "#DC2626",
    bg: "#FEE2E2",
    articles: [
      { id: "sec-1", title: "Enabling two-factor authentication (2FA)", excerpt: "Settings → Security → Two-Factor Authentication. Use any TOTP app like Google Authenticator.", views: 3011 },
      { id: "sec-2", title: "FERPA compliance and student data privacy", excerpt: "STEM-ED-AI uses Supabase Row-Level Security to ensure student data never crosses district boundaries.", views: 1678 },
      { id: "sec-3", title: "Revoking active sessions", excerpt: "Review and revoke any active session from Settings → Security → Active Sessions.", views: 1102 },
      { id: "sec-4", title: "Setting up SAML SSO for your institution", excerpt: "Connect Okta, Azure AD, or Google Workspace for single sign-on in Settings → Security → SSO.", views: 978 },
    ],
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    icon: BarChart3,
    color: "#0891B2",
    bg: "#CFFAFE",
    articles: [
      { id: "rp-1", title: "Running a compliance report", excerpt: "Navigate to Admin → Reports → Compliance Reports to generate FERPA and attendance reports.", views: 1887 },
      { id: "rp-2", title: "Building a custom report", excerpt: "Use the Custom Builder tab to select metrics, cohorts, and date ranges.", views: 1344 },
      { id: "rp-3", title: "Saving and scheduling reports", excerpt: "Click Save Report after building. Scheduled reports are emailed as PDFs.", views: 987 },
      { id: "rp-4", title: "Exporting data to CSV or Excel", excerpt: "Most report views include an Export button in the top right.", views: 756 },
    ],
  },
]

const ALL_ARTICLES = CATEGORIES.flatMap((c) => c.articles.map((a) => ({ ...a, category: c.label, categoryId: c.id })))

interface TicketForm {
  subject: string
  description: string
  priority: string
  email: string
}

export default function HelpPage() {
  const [query,        setQuery]        = useState("")
  const [expanded,     setExpanded]     = useState<string | null>("getting-started")
  const [showTicket,   setShowTicket]   = useState(false)
  const [ticket,       setTicket]       = useState<TicketForm>({ subject: "", description: "", priority: "medium", email: "jordan.rivera@atlantatech.edu" })
  const [ticketSent,   setTicketSent]   = useState(false)
  const [openArticle,  setOpenArticle]  = useState<(typeof ALL_ARTICLES)[0] | null>(null)

  const results = query.trim().length > 1
    ? ALL_ARTICLES.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : []

  function submitTicket() {
    if (!ticket.subject || !ticket.description) return
    setTicketSent(true)
    setTimeout(() => { setShowTicket(false); setTicketSent(false); setTicket((p) => ({ ...p, subject: "", description: "" })) }, 3000)
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6 animate-fade-up">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2FF]">
            <Sparkles className="h-7 w-7 text-[#4F46E5]" />
          </div>
          <h1 className="page-title text-center">Help Center</h1>
          <p className="mt-2 text-sm text-[#52525B]">Search articles, browse guides, or contact support</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search help articles…"
            className="w-full rounded-xl border border-[#E8E6E1] bg-white py-3 pl-11 pr-4 text-sm text-[#18181B] shadow-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#C7D2FE]"
          />
          {query && (
            <button onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-[#A1A1AA] hover:text-[#52525B]">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Search results */}
        <AnimatePresence>
          {query.trim().length > 1 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
              {results.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <AlertCircle className="mx-auto mb-2 h-8 w-8 text-[#A1A1AA]" />
                  <p className="text-sm font-medium text-[#18181B]">No articles found</p>
                  <p className="text-xs text-[#A1A1AA]">Try different keywords or contact support below</p>
                </div>
              ) : (
                <div className="divide-y divide-[#F4F4F2]">
                  {results.map((a) => (
                    <button key={a.id} onClick={() => setOpenArticle(a)}
                      className="flex w-full items-start gap-3 px-5 py-4 text-left hover:bg-[#FAFAF9]">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#4F46E5]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#18181B]">{a.title}</p>
                        <p className="mt-0.5 text-[11px] text-[#A1A1AA] line-clamp-1">{a.excerpt}</p>
                        <span className="mt-1 inline-block text-[10px] text-[#4F46E5]">{a.category}</span>
                      </div>
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories accordion */}
        {!query.trim() && (
          <div className="space-y-3">
            {CATEGORIES.map((cat, ci) => {
              const Icon = cat.icon
              const isOpen = expanded === cat.id
              return (
                <motion.div key={cat.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.05 }}
                  className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
                  <button onClick={() => setExpanded(isOpen ? null : cat.id)}
                    className="flex w-full items-center gap-4 px-5 py-4 hover:bg-[#FAFAF9]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: cat.bg }}>
                      <Icon className="h-4 w-4" style={{ color: cat.color }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-[#18181B]">{cat.label}</p>
                      <p className="text-[11px] text-[#A1A1AA]">{cat.articles.length} articles</p>
                    </div>
                    <ChevronDown className={cn("h-4 w-4 text-[#A1A1AA] transition-transform", isOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                        className="overflow-hidden">
                        <div className="divide-y divide-[#F4F4F2]">
                          {cat.articles.map((a) => (
                            <button key={a.id} onClick={() => setOpenArticle({ ...a, category: cat.label, categoryId: cat.id })}
                              className="flex w-full items-start gap-3 px-5 py-3.5 text-left hover:bg-[#FAFAF9]">
                              <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-[#18181B]">{a.title}</p>
                                <p className="mt-0.5 text-[11px] text-[#A1A1AA] line-clamp-2">{a.excerpt}</p>
                              </div>
                              <span className="shrink-0 font-mono text-[10px] text-[#A1A1AA]">{a.views.toLocaleString()} views</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Article modal */}
        <AnimatePresence>
          {openArticle && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
              onClick={() => setOpenArticle(null)}>
              <motion.div initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 12 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg rounded-2xl bg-white shadow-xl overflow-hidden">
                <div className="flex items-start justify-between gap-4 border-b border-[#F4F4F2] px-6 py-4">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#4F46E5]">{openArticle.category}</span>
                    <p className="mt-1 text-base font-semibold text-[#18181B] leading-snug">{openArticle.title}</p>
                  </div>
                  <button onClick={() => setOpenArticle(null)}
                    className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#A1A1AA] hover:bg-[#F4F4F2]">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="px-6 py-5">
                  <p className="text-sm text-[#52525B] leading-relaxed">{openArticle.excerpt}</p>
                  <div className="mt-4 rounded-xl border border-[#EEF2FF] bg-[#F5F3FF] px-4 py-3 text-sm text-[#52525B] leading-relaxed">
                    This is a live documentation preview. Full step-by-step articles with screenshots are available in the SERA Neural Labs documentation portal.
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[11px] text-[#A1A1AA]">{openArticle.views.toLocaleString()} views</p>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-[#4F46E5] hover:underline">
                      <ExternalLink className="h-3.5 w-3.5" /> Open full article
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Support CTA */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#E8E6E1] bg-white p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF2FF]">
                <MessageSquare className="h-4 w-4 text-[#4F46E5]" />
              </div>
              <p className="font-semibold text-[#18181B]">Live Chat</p>
            </div>
            <p className="text-[11px] text-[#A1A1AA] mb-4">Chat with our support team. Available Mon–Fri, 8 AM–6 PM ET.</p>
            <button className="w-full rounded-lg bg-[#4F46E5] py-2 text-xs font-medium text-white hover:bg-[#4338CA]">
              Start chat
            </button>
          </div>

          <div className="rounded-xl border border-[#E8E6E1] bg-white p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF3C7]">
                <AlertCircle className="h-4 w-4 text-[#D97706]" />
              </div>
              <p className="font-semibold text-[#18181B]">Report a Problem</p>
            </div>
            <p className="text-[11px] text-[#A1A1AA] mb-4">Submit a bug report or feature request. We respond within 24 hours.</p>
            <button onClick={() => setShowTicket(true)}
              className="w-full rounded-lg border border-[#E8E6E1] py-2 text-xs font-medium text-[#52525B] hover:bg-[#FAFAF9]">
              Submit ticket
            </button>
          </div>
        </motion.div>

        {/* Ticket form modal */}
        <AnimatePresence>
          {showTicket && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
              onClick={() => !ticketSent && setShowTicket(false)}>
              <motion.div initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 12 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#F4F4F2] px-6 py-4">
                  <p className="font-semibold text-[#18181B]">Submit a Support Ticket</p>
                  {!ticketSent && (
                    <button onClick={() => setShowTicket(false)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[#A1A1AA] hover:bg-[#F4F4F2]">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {ticketSent ? (
                  <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                    <CheckCircle2 className="h-12 w-12 text-[#059669]" />
                    <p className="font-semibold text-[#18181B]">Ticket submitted!</p>
                    <p className="text-sm text-[#A1A1AA]">We'll email you at {ticket.email} within 24 hours.</p>
                  </div>
                ) : (
                  <div className="space-y-4 px-6 py-5">
                    <div>
                      <label className="block text-xs font-medium text-[#52525B] mb-1.5">Subject</label>
                      <input value={ticket.subject} onChange={(e) => setTicket((p) => ({ ...p, subject: e.target.value }))}
                        placeholder="Brief description of the issue"
                        className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#52525B] mb-1.5">Priority</label>
                      <select value={ticket.priority} onChange={(e) => setTicket((p) => ({ ...p, priority: e.target.value }))}
                        className="w-full rounded-lg border border-[#E8E6E1] bg-white px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]">
                        <option value="low">Low — general question</option>
                        <option value="medium">Medium — minor issue</option>
                        <option value="high">High — blocking my work</option>
                        <option value="critical">Critical — data or security issue</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#52525B] mb-1.5">Description</label>
                      <textarea value={ticket.description} onChange={(e) => setTicket((p) => ({ ...p, description: e.target.value }))}
                        placeholder="Please describe the problem in detail, including steps to reproduce…"
                        rows={4}
                        className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5] resize-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#52525B] mb-1.5">Reply to</label>
                      <input value={ticket.email} onChange={(e) => setTicket((p) => ({ ...p, email: e.target.value }))}
                        type="email"
                        className="w-full rounded-lg border border-[#E8E6E1] px-3 py-2 text-sm text-[#18181B] outline-none focus:border-[#4F46E5]" />
                    </div>
                    <button onClick={submitTicket}
                      disabled={!ticket.subject || !ticket.description}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] py-2.5 text-sm font-medium text-white hover:bg-[#4338CA] disabled:opacity-50">
                      <Send className="h-4 w-4" /> Submit ticket
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[11px] text-[#A1A1AA]">SERA Neural Labs Support · support@seratrust.org · SLA: 24h response for paid plans</p>
      </div>
    </AppShell>
  )
}
