"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2, AlertTriangle, XCircle, RefreshCw,
  Plus, Trash2, ExternalLink, Zap, Globe, Shield,
  Database, MessageSquare, ToggleLeft, ToggleRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"
import { INTEGRATIONS, WEBHOOKS } from "@/lib/demo-data"
import type { IntegrationCategory, IntegrationStatus } from "@/lib/demo-data"

const STATUS_CONFIG: Record<IntegrationStatus, { color: string; bg: string; icon: React.ElementType; label: string }> = {
  connected:    { color: "#059669", bg: "#D1FAE5", icon: CheckCircle2, label: "Connected"    },
  disconnected: { color: "#A1A1AA", bg: "#F4F4F2", icon: XCircle,      label: "Disconnected" },
  error:        { color: "#DC2626", bg: "#FEE2E2", icon: AlertTriangle, label: "Error"        },
  syncing:      { color: "#4F46E5", bg: "#EEF2FF", icon: RefreshCw,     label: "Syncing"      },
}

const CATEGORY_CONFIG: Record<IntegrationCategory, { label: string; color: string; bg: string }> = {
  sis:           { label: "SIS",           color: "#4F46E5", bg: "#EEF2FF" },
  lms:           { label: "LMS",           color: "#7C3AED", bg: "#EDE9FE" },
  sso:           { label: "SSO",           color: "#0891B2", bg: "#CFFAFE" },
  communication: { label: "Messaging",     color: "#059669", bg: "#D1FAE5" },
  federal:       { label: "Federal",       color: "#B8860B", bg: "#FEF3C7" },
  productivity:  { label: "Productivity",  color: "#52525B", bg: "#F4F4F2" },
}

const CATEGORY_FILTERS: { value: IntegrationCategory | "all"; label: string }[] = [
  { value: "all",           label: "All" },
  { value: "sis",           label: "SIS" },
  { value: "lms",           label: "LMS" },
  { value: "sso",           label: "SSO" },
  { value: "communication", label: "Messaging" },
  { value: "federal",       label: "Federal" },
  { value: "productivity",  label: "Productivity" },
]

export default function IntegrationsPage() {
  const [catFilter,    setCatFilter]    = useState<IntegrationCategory | "all">("all")
  const [statuses,     setStatuses]     = useState<Record<string, IntegrationStatus>>(
    () => Object.fromEntries(INTEGRATIONS.map((i) => [i.id, i.status]))
  )
  const [syncing,      setSyncing]      = useState<string | null>(null)
  const [webhookList,  setWebhookList]  = useState(WEBHOOKS)
  const [showAddWh,    setShowAddWh]    = useState(false)
  const [newWhName,    setNewWhName]    = useState("")
  const [newWhUrl,     setNewWhUrl]     = useState("")

  const integrations = INTEGRATIONS.filter((i) => catFilter === "all" || i.category === catFilter)
  const connectedCount = Object.values(statuses).filter((s) => s === "connected").length
  const errorCount     = Object.values(statuses).filter((s) => s === "error").length

  function handleSync(id: string) {
    setSyncing(id)
    setStatuses((prev) => ({ ...prev, [id]: "syncing" }))
    setTimeout(() => {
      setSyncing(null)
      setStatuses((prev) => ({ ...prev, [id]: "connected" }))
    }, 2500)
  }

  function toggleConnection(id: string) {
    setStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === "connected" ? "disconnected" : "connected",
    }))
  }

  function addWebhook() {
    if (!newWhName || !newWhUrl) return
    setWebhookList((prev) => [...prev, {
      id: `wh${Date.now()}`, name: newWhName, url: newWhUrl,
      events: ["custom"], active: true, lastTriggered: "Never", deliveries: 0,
    }])
    setNewWhName(""); setNewWhUrl(""); setShowAddWh(false)
  }

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-up">
        {/* Header */}
        <div>
          <h1 className="page-title">Integrations Hub</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {INTEGRATIONS.length} integrations · {connectedCount} connected
            {errorCount > 0 && <span className="text-[#DC2626]"> · {errorCount} error{errorCount > 1 ? "s" : ""}</span>}
          </p>
        </div>

        {/* Status strip */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Connected",    value: connectedCount,                              color: "#059669", bg: "#D1FAE5" },
            { label: "Errors",       value: errorCount,                                  color: "#DC2626", bg: "#FEE2E2" },
            { label: "Webhooks",     value: webhookList.filter((w) => w.active).length,  color: "#4F46E5", bg: "#EEF2FF" },
          ].map((k, i) => (
            <motion.div key={k.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-[#E8E6E1] bg-white px-4 py-3 text-center">
              <p className="font-mono text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
              <p className="text-[11px] text-[#A1A1AA]">{k.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_FILTERS.map((f) => (
            <button key={f.value} onClick={() => setCatFilter(f.value)}
              className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-all",
                catFilter === f.value
                  ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                  : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]")}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Integration cards */}
        <div className="space-y-3">
          {integrations.map((integration, i) => {
            const status  = statuses[integration.id] ?? integration.status
            const cfg     = STATUS_CONFIG[status]
            const catCfg  = CATEGORY_CONFIG[integration.category]
            const isSyncing = syncing === integration.id
            const StatusIcon = cfg.icon

            return (
              <motion.div key={integration.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className={cn("rounded-xl border bg-white p-4 transition-all",
                  status === "error" ? "border-[#FEE2E2]" : "border-[#E8E6E1]")}>
                <div className="flex flex-wrap items-start gap-4">
                  {/* Name + category */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-[#18181B]">{integration.name}</p>
                      <span className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
                        style={{ background: catCfg.bg, color: catCfg.color }}>
                        {catCfg.label}
                      </span>
                      <span className={cn("flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold")}
                        style={{ background: cfg.bg, color: cfg.color }}>
                        <StatusIcon className={cn("h-2.5 w-2.5", isSyncing && "animate-spin")} />
                        {isSyncing ? "Syncing…" : cfg.label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#52525B] leading-relaxed">{integration.description}</p>
                    {(integration.lastSync || integration.syncFrequency || integration.recordsSync) && (
                      <div className="mt-1.5 flex flex-wrap gap-3 text-[10px] text-[#A1A1AA]">
                        {integration.lastSync     && <span>Last sync: {integration.lastSync}</span>}
                        {integration.syncFrequency && <span>Frequency: {integration.syncFrequency}</span>}
                        {integration.recordsSync  && <span>{integration.recordsSync.toLocaleString()} records</span>}
                      </div>
                    )}
                    {status === "error" && (
                      <p className="mt-1.5 text-[11px] font-medium text-[#DC2626]">
                        Connection failed — last successful sync: {integration.lastSync ?? "unknown"}. Check API credentials.
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {status === "connected" && (
                      <button onClick={() => handleSync(integration.id)} disabled={isSyncing}
                        className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] hover:bg-[#FAFAF9] disabled:opacity-50">
                        <RefreshCw className={cn("h-3 w-3", isSyncing && "animate-spin")} />
                        Sync now
                      </button>
                    )}
                    {status === "error" && (
                      <button onClick={() => handleSync(integration.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-[#DC2626] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#B91C1C]">
                        <RefreshCw className="h-3 w-3" /> Reconnect
                      </button>
                    )}
                    <button onClick={() => toggleConnection(integration.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] hover:bg-[#FAFAF9]">
                      {status === "connected"
                        ? <><ToggleRight className="h-3.5 w-3.5 text-[#059669]" /> Disable</>
                        : <><ToggleLeft  className="h-3.5 w-3.5 text-[#A1A1AA]" /> Enable</>
                      }
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Webhooks */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="section-header flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-[#4F46E5]" /> Webhook Manager
            </p>
            <button onClick={() => setShowAddWh(!showAddWh)}
              className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4338CA]">
              <Plus className="h-3 w-3" /> Add Webhook
            </button>
          </div>

          {/* Add webhook form */}
          <AnimatePresence>
            {showAddWh && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="mb-3 overflow-hidden rounded-xl border border-[#EEF2FF] bg-[#F5F3FF] p-4">
                <div className="flex flex-wrap gap-3">
                  <input value={newWhName} onChange={(e) => setNewWhName(e.target.value)}
                    placeholder="Webhook name"
                    className="h-9 flex-1 min-w-[140px] rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm outline-none focus:border-[#4F46E5]" />
                  <input value={newWhUrl} onChange={(e) => setNewWhUrl(e.target.value)}
                    placeholder="https://your-endpoint.com/webhook"
                    className="h-9 flex-[2] min-w-[200px] rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm font-mono outline-none focus:border-[#4F46E5]" />
                  <button onClick={addWebhook}
                    className="h-9 rounded-lg bg-[#4F46E5] px-4 text-xs font-medium text-white hover:bg-[#4338CA]">
                    Save
                  </button>
                  <button onClick={() => setShowAddWh(false)}
                    className="h-9 rounded-lg border border-[#E8E6E1] px-3 text-xs text-[#52525B] hover:bg-white">
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white divide-y divide-[#F4F4F2]">
            {webhookList.map((wh, i) => (
              <motion.div key={wh.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 px-5 py-3.5">
                <div className={cn("h-2 w-2 shrink-0 rounded-full", wh.active ? "bg-[#059669]" : "bg-[#A1A1AA]")} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#18181B]">{wh.name}</p>
                    {wh.events.map((e) => (
                      <span key={e} className="rounded-full bg-[#F4F4F2] px-1.5 py-0.5 font-mono text-[9px] text-[#52525B]">{e}</span>
                    ))}
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] text-[#A1A1AA] truncate">{wh.url}</p>
                  <p className="text-[10px] text-[#A1A1AA]">
                    Last triggered: {wh.lastTriggered} · {wh.deliveries} deliveries
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => setWebhookList((prev) => prev.map((w) => w.id === wh.id ? { ...w, active: !w.active } : w))}
                    className="rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] hover:bg-[#FAFAF9]">
                    {wh.active ? "Disable" : "Enable"}
                  </button>
                  <button onClick={() => setWebhookList((prev) => prev.filter((w) => w.id !== wh.id))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8E6E1] text-[#A1A1AA] hover:border-[#FEE2E2] hover:text-[#DC2626]">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-[#A1A1AA]">
          All integrations use OAuth 2.0 or API key auth · Credentials stored encrypted · Webhook deliveries logged · FERPA compliant
        </p>
      </div>
    </AppShell>
  )
}
