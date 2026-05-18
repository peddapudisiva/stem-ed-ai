"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CreditCard, CheckCircle2, Zap, Users, HardDrive,
  Brain, FileText, Download, AlertTriangle, ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    period: "free",
    description: "For individual educators exploring the platform",
    features: ["Up to 30 students", "3 AI sessions / month", "1 GB storage", "Basic reports", "Email support"],
    color: "#52525B", bg: "#F4F4F2",
    cta: "Current plan",
  },
  {
    id: "professional",
    name: "Professional",
    price: 49,
    period: "mo",
    description: "For teachers and small departments",
    features: ["Up to 200 students", "Unlimited AI sessions", "25 GB storage", "Advanced analytics", "Priority support", "Canvas & Banner integration"],
    color: "#059669", bg: "#D1FAE5",
    cta: "Upgrade",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    period: "custom",
    description: "For districts and large institutions",
    features: ["Unlimited students", "Dedicated AI capacity", "1 TB+ storage", "SAML SSO & 2FA", "Multi-tenant management", "SLA & dedicated CSM", "FERPA BAA included"],
    color: "#4F46E5", bg: "#EEF2FF",
    cta: "Contact sales",
  },
]

const USAGE = [
  { label: "AI Sessions",    used: 3,     limit: 3,    unit: "sessions",  icon: Brain,    color: "#DC2626" },
  { label: "Students",       used: 12,    limit: 30,   unit: "students",  icon: Users,    color: "#4F46E5" },
  { label: "Storage",        used: 0.4,   limit: 1,    unit: "GB",        icon: HardDrive,color: "#059669" },
  { label: "Reports",        used: 2,     limit: 5,    unit: "reports",   icon: FileText, color: "#D97706" },
]

const INVOICES = [
  { id: "INV-2026-04", date: "May 1, 2026",   amount: "$0.00", status: "paid",    plan: "Starter" },
  { id: "INV-2026-03", date: "Apr 1, 2026",   amount: "$0.00", status: "paid",    plan: "Starter" },
  { id: "INV-2026-02", date: "Mar 1, 2026",   amount: "$0.00", status: "paid",    plan: "Starter" },
]

export default function BillingPage() {
  const [currentPlan]  = useState("starter")
  const [showUpgrade,  setShowUpgrade]  = useState(false)
  const [showInvoices, setShowInvoices] = useState(false)

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6 animate-fade-up">
        {/* Header */}
        <div>
          <h1 className="page-title">Billing & Plan</h1>
          <p className="mt-1 text-sm text-[#52525B]">Manage your subscription, usage, and invoices</p>
        </div>

        {/* Current plan card */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#F4F4F2] px-2.5 py-0.5 text-xs font-semibold text-[#52525B]">STARTER</span>
                <span className="rounded-full bg-[#D1FAE5] px-2 py-0.5 text-[10px] font-semibold text-[#059669]">ACTIVE</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-[#18181B]">Free</p>
              <p className="text-sm text-[#A1A1AA]">Atlanta Technical College · Individual</p>
            </div>
            <button onClick={() => setShowUpgrade(!showUpgrade)}
              className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white hover:bg-[#4338CA]">
              <Zap className="h-3.5 w-3.5" /> Upgrade plan
            </button>
          </div>

          {/* Usage bars */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {USAGE.map((u) => {
              const pct = Math.round((u.used / u.limit) * 100)
              return (
                <div key={u.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#52525B]">
                      <u.icon className="h-3.5 w-3.5 text-[#A1A1AA]" />
                      {u.label}
                    </div>
                    <span className="text-[11px] font-mono text-[#A1A1AA]">{u.used} / {u.limit} {u.unit}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, background: pct >= 90 ? "#DC2626" : u.color }} />
                  </div>
                  {pct >= 90 && (
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-[#DC2626]">
                      <AlertTriangle className="h-3 w-3" /> Near limit
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          {/* AI sessions maxed out */}
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] px-4 py-3">
            <AlertTriangle className="h-4 w-4 shrink-0 text-[#D97706] mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#D97706]">AI sessions limit reached</p>
              <p className="text-[11px] text-[#A1A1AA]">You've used all 3 free AI sessions this month. Upgrade to Professional for unlimited access.</p>
            </div>
          </div>
        </motion.div>

        {/* Plan comparison */}
        <AnimatePresence>
          {showUpgrade && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden">
              <div className="grid gap-4 sm:grid-cols-3">
                {PLANS.map((plan, i) => (
                  <motion.div key={plan.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className={cn("rounded-xl border p-5 transition-all",
                      plan.id === "professional" ? "border-[#4F46E5] ring-1 ring-[#4F46E5]" : "border-[#E8E6E1]",
                      plan.id === currentPlan && "opacity-70"
                    )}>
                    {plan.id === "professional" && (
                      <div className="mb-2 inline-block rounded-full bg-[#4F46E5] px-2 py-0.5 text-[10px] font-semibold text-white">RECOMMENDED</div>
                    )}
                    <p className="font-semibold text-[#18181B]">{plan.name}</p>
                    <div className="mt-1 flex items-end gap-1">
                      {plan.price === null
                        ? <p className="text-xl font-bold text-[#18181B]">Custom</p>
                        : <>
                            <p className="text-2xl font-bold text-[#18181B]">${plan.price}</p>
                            {plan.price > 0 && <p className="mb-0.5 text-xs text-[#A1A1AA]">/{plan.period}</p>}
                          </>
                      }
                    </div>
                    <p className="mt-1 text-[11px] text-[#A1A1AA] leading-relaxed">{plan.description}</p>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-[11px] text-[#52525B]">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: plan.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={cn("mt-5 w-full rounded-lg py-2 text-xs font-medium transition-colors",
                        plan.id === currentPlan
                          ? "bg-[#F4F4F2] text-[#A1A1AA] cursor-default"
                          : plan.id === "professional"
                            ? "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
                            : "border border-[#E8E6E1] text-[#52525B] hover:bg-[#FAFAF9]"
                      )}
                      disabled={plan.id === currentPlan}
                    >
                      {plan.cta}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment method */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-xl border border-[#E8E6E1] bg-white p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Payment Method</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-[#E8E6E1] bg-[#FAFAF9]">
                <CreditCard className="h-5 w-5 text-[#A1A1AA]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#18181B]">No payment method on file</p>
                <p className="text-[11px] text-[#A1A1AA]">Required for paid plans</p>
              </div>
            </div>
            <button className="rounded-lg border border-[#E8E6E1] px-4 py-2 text-sm text-[#52525B] hover:bg-[#FAFAF9]">
              Add card
            </button>
          </div>
        </motion.div>

        {/* Invoices */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}
          className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
          <button onClick={() => setShowInvoices(!showInvoices)}
            className="flex w-full items-center justify-between px-6 py-4 hover:bg-[#FAFAF9]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Invoice History</p>
            <ChevronDown className={cn("h-4 w-4 text-[#A1A1AA] transition-transform", showInvoices && "rotate-180")} />
          </button>

          <AnimatePresence>
            {showInvoices && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                className="overflow-hidden">
                <div className="divide-y divide-[#F4F4F2]">
                  {INVOICES.map((inv) => (
                    <div key={inv.id} className="flex items-center gap-4 px-6 py-3.5">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-[#18181B]">{inv.id}</p>
                          <span className="rounded-full bg-[#D1FAE5] px-1.5 py-0.5 text-[9px] font-semibold text-[#059669] uppercase">{inv.status}</span>
                        </div>
                        <p className="text-[11px] text-[#A1A1AA]">{inv.date} · {inv.plan}</p>
                      </div>
                      <p className="font-mono text-sm font-medium text-[#18181B]">{inv.amount}</p>
                      <button className="flex items-center gap-1 text-[11px] text-[#4F46E5] hover:underline">
                        <Download className="h-3 w-3" /> PDF
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="text-[11px] text-[#A1A1AA]">Billing managed by Stripe · SOC 2 Type II in progress · Invoices retained 7 years</p>
      </div>
    </AppShell>
  )
}
