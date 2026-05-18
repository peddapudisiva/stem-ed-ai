"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  User, Bell, LayoutDashboard, Calendar, CreditCard,
  Plug, ChevronRight, Shield, LogOut
} from "lucide-react"
import { AppShell } from "@/components/layout/app-shell"

const SETTINGS_SECTIONS = [
  {
    items: [
      { href: "/settings/profile",       icon: User,          label: "Profile",               description: "Name, email, avatar, and account details" },
      { href: "/settings/notifications",  icon: Bell,          label: "Notifications",         description: "Email, push, and in-app alert preferences" },
      { href: "/settings/dashboard",      icon: LayoutDashboard,label: "Dashboard Layout",    description: "Customize your widget grid and default view" },
      { href: "/settings/calendar",       icon: Calendar,      label: "Calendar & Sync",       description: "Connect Google, Outlook, and manage events" },
    ],
  },
  {
    items: [
      { href: "/settings/integrations",   icon: Plug,          label: "Integrations",          description: "Banner SIS, Canvas, SSO, webhooks, and more" },
      { href: "/settings/billing",        icon: CreditCard,    label: "Billing & Plan",        description: "Subscription, usage, invoices, and upgrades" },
    ],
  },
]

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6 animate-fade-up">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="mt-1 text-sm text-[#52525B]">Manage your account, notifications, and integrations</p>
        </div>

        {SETTINGS_SECTIONS.map((section, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.08 }}
            className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white divide-y divide-[#F4F4F2]"
          >
            {section.items.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#FAFAF9]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F4F2]">
                    <Icon className="h-4 w-4 text-[#52525B]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#18181B]">{item.label}</p>
                    <p className="text-xs text-[#A1A1AA]">{item.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#A1A1AA]" />
                </Link>
              )
            })}
          </motion.div>
        ))}

        {/* Danger zone */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-xl border border-[#FEE2E2] bg-white divide-y divide-[#FEE2E2]"
        >
          <Link href="/settings/security" className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#FFF5F5]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FEE2E2]">
              <Shield className="h-4 w-4 text-[#DC2626]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#18181B]">Security</p>
              <p className="text-xs text-[#A1A1AA]">Password, 2FA, active sessions, and SSO</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#A1A1AA]" />
          </Link>
          <button className="flex w-full items-center gap-4 px-5 py-4 transition-colors hover:bg-[#FFF5F5]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FEE2E2]">
              <LogOut className="h-4 w-4 text-[#DC2626]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-[#DC2626]">Sign out</p>
              <p className="text-xs text-[#A1A1AA]">Sign out of your account on this device</p>
            </div>
          </button>
        </motion.div>

        <p className="text-[11px] text-[#A1A1AA]">
          SERA Neural Labs · v1.0.0 · FERPA compliant · SOC 2 Type II in progress
        </p>
      </div>
    </AppShell>
  )
}
