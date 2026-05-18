"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield, Smartphone, Key, Monitor, LogOut, CheckCircle2,
  Copy, RefreshCw, AlertTriangle, Lock, Globe, ChevronLeft,
  Plus, Trash2
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"

const MOCK_SESSIONS = [
  { id: "s1", device: "Chrome · Windows 11", location: "Atlanta, GA · 192.168.1.1", lastActive: "Now (current)",   current: true  },
  { id: "s2", device: "Safari · iPhone 15",   location: "Atlanta, GA · 192.168.1.5", lastActive: "2 hours ago",    current: false },
  { id: "s3", device: "Firefox · macOS",      location: "Decatur, GA · 10.0.0.12",   lastActive: "Yesterday 4 PM", current: false },
]

const BACKUP_CODES = ["K7X2-M9QP", "R4BN-W1ZT", "H8CL-J3YE", "P5AV-D6SF", "N2GK-Q0XU", "T1JH-C7RM"]

const SAML_PROVIDERS = [
  { id: "okta",    name: "Okta",     logo: "O", status: "not-configured" as const },
  { id: "azure",   name: "Azure AD", logo: "A", status: "not-configured" as const },
  { id: "google",  name: "Google",   logo: "G", status: "connected"      as const },
]

const IP_ALLOWLIST_MOCK = [
  { id: "ip1", label: "ATC Main Campus",  cidr: "198.51.100.0/24" },
  { id: "ip2", label: "GSU Network",      cidr: "203.0.113.0/24"  },
]

export default function SecurityPage() {
  const [twoFaStep,    setTwoFaStep]    = useState<"off" | "qr" | "verify" | "done">("off")
  const [verifyCode,   setVerifyCode]   = useState("")
  const [verifyError,  setVerifyError]  = useState(false)
  const [sessions,     setSessions]     = useState(MOCK_SESSIONS)
  const [copiedCode,   setCopiedCode]   = useState<string | null>(null)
  const [pwOld,        setPwOld]        = useState("")
  const [pwNew,        setPwNew]        = useState("")
  const [pwSaved,      setPwSaved]      = useState(false)
  const [ipList,       setIpList]       = useState(IP_ALLOWLIST_MOCK)
  const [newIpLabel,   setNewIpLabel]   = useState("")
  const [newIpCidr,    setNewIpCidr]    = useState("")

  function handleVerify() {
    if (verifyCode === "123456" || verifyCode.length === 6) {
      setTwoFaStep("done"); setVerifyError(false)
    } else {
      setVerifyError(true)
    }
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).catch(() => {})
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  function revokeSession(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }

  function savePw() {
    if (pwOld && pwNew.length >= 8) { setPwSaved(true); setPwOld(""); setPwNew("") }
  }

  function addIp() {
    if (!newIpLabel || !newIpCidr) return
    setIpList((prev) => [...prev, { id: `ip${Date.now()}`, label: newIpLabel, cidr: newIpCidr }])
    setNewIpLabel(""); setNewIpCidr("")
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6 animate-fade-up">
        <div>
          <Link href="/settings" className="mb-3 flex items-center gap-1 text-xs text-[#A1A1AA] hover:text-[#52525B]">
            <ChevronLeft className="h-3.5 w-3.5" /> Settings
          </Link>
          <h1 className="page-title">Security</h1>
          <p className="mt-1 text-sm text-[#52525B]">Two-factor auth, sessions, password, and access control</p>
        </div>

        {/* ── 2FA ── */}
        <section className="rounded-xl border border-[#E8E6E1] bg-white overflow-hidden">
          <div className="flex items-start justify-between gap-4 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF]">
                <Smartphone className="h-5 w-5 text-[#4F46E5]" />
              </div>
              <div>
                <p className="font-semibold text-[#18181B]">Two-Factor Authentication</p>
                <p className="text-xs text-[#52525B]">Require a code from your authenticator app on login</p>
              </div>
            </div>
            {twoFaStep === "done" ? (
              <span className="flex items-center gap-1 rounded-full bg-[#D1FAE5] px-2.5 py-1 text-xs font-semibold text-[#059669]">
                <CheckCircle2 className="h-3 w-3" /> Enabled
              </span>
            ) : twoFaStep === "off" ? (
              <button onClick={() => setTwoFaStep("qr")}
                className="rounded-lg bg-[#4F46E5] px-4 py-2 text-xs font-medium text-white hover:bg-[#4338CA]">
                Enable 2FA
              </button>
            ) : null}
          </div>

          <AnimatePresence>
            {twoFaStep === "qr" && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="border-t border-[#F4F4F2] px-5 py-5 space-y-4 overflow-hidden">
                <p className="text-sm font-medium text-[#18181B]">Step 1 — Scan this QR code with your authenticator app</p>
                {/* Mock QR code */}
                <div className="flex items-start gap-6">
                  <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-xl border-2 border-[#E8E6E1] bg-[#FAFAF9]">
                    <div className="grid grid-cols-7 gap-0.5 p-2 opacity-80">
                      {Array.from({ length: 49 }).map((_, i) => (
                        <div key={i} className={cn("h-3 w-3 rounded-[1px]", [0,1,2,3,4,5,6,7,14,21,28,35,42,43,44,45,46,47,48,8,15,16,17,22,24,29,30,31,36,38,39,40,10,12,19,26,33].includes(i) ? "bg-[#18181B]" : "bg-transparent")} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-[#52525B]">Or enter this key manually:</p>
                    <code className="block rounded-lg bg-[#F4F4F2] px-3 py-2 font-mono text-xs text-[#18181B] tracking-widest">
                      JBSW Y3DP EHPK 3PXP
                    </code>
                    <p className="text-[11px] text-[#A1A1AA]">Works with Google Authenticator, Authy, 1Password, etc.</p>
                  </div>
                </div>
                <button onClick={() => setTwoFaStep("verify")}
                  className="rounded-lg bg-[#4F46E5] px-5 py-2 text-sm font-medium text-white hover:bg-[#4338CA]">
                  I've scanned it — Enter code
                </button>
              </motion.div>
            )}

            {twoFaStep === "verify" && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="border-t border-[#F4F4F2] px-5 py-5 space-y-4 overflow-hidden">
                <p className="text-sm font-medium text-[#18181B]">Step 2 — Enter the 6-digit code from your app</p>
                <div className="flex items-center gap-3">
                  <input value={verifyCode} onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000" maxLength={6}
                    className={cn("h-11 w-36 rounded-xl border text-center font-mono text-xl tracking-[0.4em] outline-none focus:ring-2 focus:ring-[#4F46E5]/20",
                      verifyError ? "border-[#DC2626] bg-[#FFF5F5]" : "border-[#E8E6E1] bg-[#FAFAF9] focus:border-[#4F46E5]")} />
                  <button onClick={handleVerify}
                    className="rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4338CA]">
                    Verify
                  </button>
                </div>
                {verifyError && <p className="text-xs text-[#DC2626]">Incorrect code. Try again. (hint: any 6 digits work in demo)</p>}
              </motion.div>
            )}

            {twoFaStep === "done" && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                className="border-t border-[#F4F4F2] px-5 py-4 overflow-hidden">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Backup Codes — save these somewhere safe</p>
                <div className="grid grid-cols-3 gap-2">
                  {BACKUP_CODES.map((code) => (
                    <button key={code} onClick={() => copyCode(code)}
                      className="flex items-center justify-between rounded-lg border border-[#E8E6E1] px-3 py-2 font-mono text-xs text-[#18181B] hover:bg-[#FAFAF9]">
                      {code}
                      {copiedCode === code
                        ? <CheckCircle2 className="h-3 w-3 text-[#059669]" />
                        : <Copy className="h-3 w-3 text-[#A1A1AA]" />}
                    </button>
                  ))}
                </div>
                <button onClick={() => setTwoFaStep("off")}
                  className="mt-3 text-xs text-[#DC2626] hover:underline">
                  Disable 2FA
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── Password ── */}
        <section className="rounded-xl border border-[#E8E6E1] bg-white p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F4F2]">
              <Key className="h-5 w-5 text-[#52525B]" />
            </div>
            <div>
              <p className="font-semibold text-[#18181B]">Change Password</p>
              <p className="text-xs text-[#52525B]">Use a strong password of at least 8 characters</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-[#52525B] mb-1.5">Current password</label>
              <input type="password" value={pwOld} onChange={(e) => setPwOld(e.target.value)}
                className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-[#FAFAF9] px-3 text-sm outline-none focus:border-[#4F46E5]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#52525B] mb-1.5">New password</label>
              <input type="password" value={pwNew} onChange={(e) => { setPwNew(e.target.value); setPwSaved(false) }}
                className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-[#FAFAF9] px-3 text-sm outline-none focus:border-[#4F46E5]" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={savePw}
              className={cn("rounded-lg px-4 py-2 text-xs font-medium transition-colors",
                pwSaved ? "bg-[#D1FAE5] text-[#059669]" : "bg-[#4F46E5] text-white hover:bg-[#4338CA]")}>
              {pwSaved ? <><CheckCircle2 className="inline h-3 w-3 mr-1" />Saved</> : "Update Password"}
            </button>
            {pwNew.length > 0 && pwNew.length < 8 && (
              <p className="text-xs text-[#D97706]">Must be at least 8 characters</p>
            )}
          </div>
        </section>

        {/* ── Active Sessions ── */}
        <section className="rounded-xl border border-[#E8E6E1] bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F4F4F2]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F4F2]">
                <Monitor className="h-5 w-5 text-[#52525B]" />
              </div>
              <div>
                <p className="font-semibold text-[#18181B]">Active Sessions</p>
                <p className="text-xs text-[#52525B]">{sessions.length} device{sessions.length !== 1 ? "s" : ""} signed in</p>
              </div>
            </div>
            <button onClick={() => setSessions((prev) => prev.filter((s) => s.current))}
              className="flex items-center gap-1.5 rounded-lg border border-[#FEE2E2] px-3 py-1.5 text-xs text-[#DC2626] hover:bg-[#FFF5F5]">
              <LogOut className="h-3 w-3" /> Revoke all others
            </button>
          </div>
          <div className="divide-y divide-[#F4F4F2]">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center gap-4 px-5 py-3.5">
                <Monitor className="h-4 w-4 shrink-0 text-[#A1A1AA]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#18181B]">{session.device}</p>
                  <p className="text-[11px] text-[#A1A1AA]">{session.location} · {session.lastActive}</p>
                </div>
                {session.current ? (
                  <span className="rounded-full bg-[#D1FAE5] px-2 py-0.5 text-[10px] font-semibold text-[#059669]">Current</span>
                ) : (
                  <button onClick={() => revokeSession(session.id)}
                    className="flex items-center gap-1 rounded-lg border border-[#E8E6E1] px-2.5 py-1 text-xs text-[#52525B] hover:border-[#FEE2E2] hover:text-[#DC2626]">
                    <LogOut className="h-3 w-3" /> Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── IP Allowlist ── */}
        <section className="rounded-xl border border-[#E8E6E1] bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F4F4F2]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F4F2]">
                <Globe className="h-5 w-5 text-[#52525B]" />
              </div>
              <div>
                <p className="font-semibold text-[#18181B]">IP Allowlisting</p>
                <p className="text-xs text-[#52525B]">Restrict admin/district logins to approved networks</p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-[#F4F4F2]">
            {ipList.map((ip) => (
              <div key={ip.id} className="flex items-center gap-3 px-5 py-3">
                <Lock className="h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#18181B]">{ip.label}</p>
                  <p className="font-mono text-[11px] text-[#A1A1AA]">{ip.cidr}</p>
                </div>
                <button onClick={() => setIpList((prev) => prev.filter((x) => x.id !== ip.id))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E8E6E1] text-[#A1A1AA] hover:border-[#FEE2E2] hover:text-[#DC2626]">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2 px-5 py-3">
              <input value={newIpLabel} onChange={(e) => setNewIpLabel(e.target.value)}
                placeholder="Label (e.g. Main Campus)"
                className="h-8 flex-1 rounded-lg border border-[#E8E6E1] bg-[#FAFAF9] px-3 text-xs outline-none focus:border-[#4F46E5]" />
              <input value={newIpCidr} onChange={(e) => setNewIpCidr(e.target.value)}
                placeholder="CIDR (e.g. 10.0.0.0/24)"
                className="h-8 w-40 rounded-lg border border-[#E8E6E1] bg-[#FAFAF9] px-3 font-mono text-xs outline-none focus:border-[#4F46E5]" />
              <button onClick={addIp}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA]">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ── SAML/SSO ── */}
        <section className="rounded-xl border border-[#E8E6E1] bg-white overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F4F4F2]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F4F2]">
              <Shield className="h-5 w-5 text-[#52525B]" />
            </div>
            <div>
              <p className="font-semibold text-[#18181B]">SAML / SSO Providers</p>
              <p className="text-xs text-[#52525B]">Institutional identity providers for faculty and staff</p>
            </div>
          </div>
          <div className="divide-y divide-[#F4F4F2]">
            {SAML_PROVIDERS.map((provider) => (
              <div key={provider.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F2] font-bold text-sm text-[#52525B]">
                  {provider.logo}
                </div>
                <p className="flex-1 text-sm font-medium text-[#18181B]">{provider.name}</p>
                {provider.status === "connected" ? (
                  <span className="flex items-center gap-1 rounded-full bg-[#D1FAE5] px-2.5 py-0.5 text-[10px] font-semibold text-[#059669]">
                    <CheckCircle2 className="h-2.5 w-2.5" /> Connected
                  </span>
                ) : (
                  <button className="rounded-lg border border-[#E8E6E1] px-3 py-1.5 text-xs text-[#52525B] hover:bg-[#FAFAF9]">
                    Configure
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <p className="text-[11px] text-[#A1A1AA]">
          Security settings · SERA Neural Labs · SOC 2 Type II in progress · All changes audit-logged
        </p>
      </div>
    </AppShell>
  )
}
