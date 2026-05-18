"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Building2, Users, HardDrive, Shield, CheckCircle2,
  AlertTriangle, RefreshCw, Settings, Globe, Activity,
  Database, Lock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TENANTS } from "@/lib/demo-data"
import type { TenantStatus } from "@/lib/demo-data"

const STATUS_CONFIG: Record<TenantStatus, { color: string; bg: string; border: string; icon: React.ElementType; label: string }> = {
  healthy:  { color: "#059669", bg: "#D1FAE5", border: "border-[#D1FAE5]", icon: CheckCircle2, label: "Healthy"  },
  warning:  { color: "#D97706", bg: "#FEF3C7", border: "border-[#FEF3C7]", icon: AlertTriangle,label: "Warning"  },
  critical: { color: "#DC2626", bg: "#FEE2E2", border: "border-[#FEE2E2]", icon: AlertTriangle,label: "Critical" },
}

const PLAN_BADGE: Record<string, string> = {
  enterprise:    "bg-[#EEF2FF] text-[#4F46E5]",
  professional:  "bg-[#D1FAE5] text-[#059669]",
  starter:       "bg-[#F4F4F2] text-[#A1A1AA]",
}

function StorageBar({ used, limit }: { used: number; limit: number }) {
  const pct   = Math.round((used / limit) * 100)
  const color = pct >= 90 ? "#DC2626" : pct >= 70 ? "#D97706" : "#059669"
  const usedGb  = (used  / 1024).toFixed(1)
  const limitGb = (limit / 1024).toFixed(0)
  return (
    <div>
      <div className="flex justify-between text-[10px] text-[#A1A1AA] mb-1">
        <span>{usedGb} GB used</span>
        <span>{limitGb} GB limit · {pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

export default function TenantsPage() {
  const [syncing,  setSyncing]  = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const totalStudents     = TENANTS.reduce((s, t) => s + t.students, 0)
  const totalActiveUsers  = TENANTS.reduce((s, t) => s + t.activeUsers, 0)
  const healthyCount      = TENANTS.filter((t) => t.status === "healthy").length

  function handleSync(id: string) {
    setSyncing(id)
    setTimeout(() => setSyncing(null), 2500)
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Multi-Tenant Management</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            SERA Super-Admin · {TENANTS.length} institutions · All tenant data is FERPA-isolated
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-[#D1FAE5] bg-[#F0FDF4] px-3 py-1.5 text-xs font-medium text-[#059669]">
          <Lock className="h-3.5 w-3.5" />
          All tenants FERPA isolated
        </div>
      </div>

      {/* Platform KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Students",  value: totalStudents.toLocaleString(),  color: "#4F46E5", bg: "#EEF2FF", icon: Users },
          { label: "Active Users",    value: totalActiveUsers.toLocaleString(),color: "#059669", bg: "#D1FAE5", icon: Activity },
          { label: "Institutions",    value: TENANTS.length,                  color: "#D97706", bg: "#FEF3C7", icon: Building2 },
          { label: "Healthy Tenants", value: `${healthyCount}/${TENANTS.length}`, color: "#059669", bg: "#D1FAE5", icon: CheckCircle2 },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-[#E8E6E1] bg-white p-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: kpi.bg }}>
                <kpi.icon className="h-4 w-4" style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="font-mono text-xl font-bold text-[#18181B]">{kpi.value}</p>
                <p className="text-[11px] text-[#A1A1AA]">{kpi.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tenant cards */}
      <div className="space-y-4">
        {TENANTS.map((tenant, i) => {
          const cfg       = STATUS_CONFIG[tenant.status]
          const StatusIcon = cfg.icon
          const isSyncing  = syncing === tenant.id
          const isExpanded = expanded === tenant.id

          return (
            <motion.div key={tenant.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={cn("overflow-hidden rounded-xl border bg-white", cfg.border)}
            >
              {/* Main row */}
              <div className="p-5">
                <div className="flex flex-wrap items-start gap-4">
                  {/* Brand dot + name */}
                  <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white"
                      style={{ background: tenant.accentColor }}>
                      {tenant.shortName}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-[#18181B]">{tenant.name}</p>
                        <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-semibold capitalize", PLAN_BADGE[tenant.plan])}>
                          {tenant.plan}
                        </span>
                        <span className={cn("flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold")}
                          style={{ background: cfg.bg, color: cfg.color }}>
                          <StatusIcon className="h-2.5 w-2.5" /> {cfg.label}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-[11px] text-[#A1A1AA]">
                        <Globe className="h-3 w-3" />
                        <span className="font-mono">{tenant.subdomain}</span>
                      </div>
                    </div>
                  </div>

                  {/* KPI mini-grid */}
                  <div className="flex gap-4 flex-wrap">
                    {[
                      { label: "Students",     value: tenant.students.toLocaleString(),     icon: Users },
                      { label: "Faculty",      value: tenant.faculty,                       icon: Users },
                      { label: "Active Now",   value: tenant.activeUsers.toLocaleString(),  icon: Activity },
                      { label: "Compliance",   value: `${tenant.complianceScore}%`,         icon: Shield },
                    ].map((k) => (
                      <div key={k.label} className="text-center min-w-[56px]">
                        <p className="font-mono text-base font-bold text-[#18181B]">{k.value}</p>
                        <p className="text-[10px] text-[#A1A1AA]">{k.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 ml-auto">
                    <button onClick={() => handleSync(tenant.id)} disabled={isSyncing}
                      className={cn("flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] hover:bg-[#FAFAF9]",
                        isSyncing && "cursor-wait")}>
                      <RefreshCw className={cn("h-3 w-3", isSyncing && "animate-spin")} />
                      {isSyncing ? "Syncing…" : "Sync"}
                    </button>
                    <button onClick={() => setExpanded(isExpanded ? null : tenant.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] hover:bg-[#FAFAF9]">
                      <Settings className="h-3 w-3" /> Config
                    </button>
                  </div>
                </div>

                {/* Storage bar */}
                <div className="mt-4">
                  <StorageBar used={tenant.storageUsedMb} limit={tenant.storageLimitMb} />
                </div>

                <p className="mt-2 text-[11px] text-[#A1A1AA]">
                  Last sync: {tenant.lastSync}
                  {tenant.ferpaIsolated && (
                    <span className="ml-2 inline-flex items-center gap-0.5 text-[#059669]">
                      <Lock className="h-2.5 w-2.5" /> FERPA isolated
                    </span>
                  )}
                </p>
              </div>

              {/* Expanded config panel */}
              {isExpanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  className="border-t border-[#F4F4F2] px-5 py-4 bg-[#FAFAF9]">
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Branding */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#A1A1AA] mb-3">Branding</p>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] text-[#52525B] mb-1">Primary Color</label>
                          <div className="flex items-center gap-2">
                            <input type="color" defaultValue={tenant.accentColor}
                              className="h-8 w-8 cursor-pointer rounded border border-[#E8E6E1]" />
                            <span className="font-mono text-xs text-[#52525B]">{tenant.accentColor}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#52525B] mb-1">Subdomain</label>
                          <div className="flex items-center gap-1 rounded-lg border border-[#E8E6E1] bg-white px-3 py-2">
                            <span className="font-mono text-xs text-[#A1A1AA]">https://</span>
                            <span className="font-mono text-xs text-[#18181B]">{tenant.subdomain}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FERPA / Data */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#A1A1AA] mb-3">Data Isolation</p>
                      <div className="space-y-2">
                        {[
                          { label: "RLS Policy Active",         done: true  },
                          { label: "Cross-tenant queries blocked",done: true  },
                          { label: "Audit log enabled",          done: true  },
                          { label: "Data residency: US-East",    done: true  },
                          { label: "Encryption at rest (AES-256)",done: true  },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-2 text-[11px]">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#059669]" />
                            <span className="text-[#52525B]">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Storage */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#A1A1AA] mb-3">Storage</p>
                      <div className="space-y-2 text-[11px] text-[#52525B]">
                        <div className="flex justify-between"><span className="text-[#A1A1AA]">Used</span><span className="font-mono">{(tenant.storageUsedMb / 1024).toFixed(1)} GB</span></div>
                        <div className="flex justify-between"><span className="text-[#A1A1AA]">Limit</span><span className="font-mono">{(tenant.storageLimitMb / 1024).toFixed(0)} GB</span></div>
                        <div className="flex justify-between"><span className="text-[#A1A1AA]">Provider</span><span className="font-mono">Supabase Storage</span></div>
                        <div className="flex justify-between"><span className="text-[#A1A1AA]">Region</span><span className="font-mono">us-east-1</span></div>
                      </div>
                      <button className="mt-3 flex items-center gap-1.5 rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] hover:bg-white">
                        <Database className="h-3 w-3" /> Manage Storage
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      <p className="text-[11px] text-[#A1A1AA]">
        SERA Super-Admin view · Tenant data never crosses institutional boundaries (Supabase RLS) · All actions audit-logged
      </p>
    </div>
  )
}
