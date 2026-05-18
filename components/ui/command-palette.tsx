"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  GraduationCap, BookOpen, Building2, BarChart3, ScrollText,
  Globe, Baby, Cpu, Brain, LayoutDashboard, BookMarked,
  CalendarDays, Settings, User, TrendingUp, FileText,
  Users, ClipboardList, Zap, Shield, Bot, MessageSquare,
  PlusCircle, BarChart2, Lock, GraduationCap as Grad,
} from "lucide-react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command"
import { useAuthStore, type AuthRole } from "@/lib/auth-store"

interface CommandEntry {
  id: string
  label: string
  description?: string
  icon: React.ElementType
  shortcut?: string
  action: (router: ReturnType<typeof useRouter>) => void
  roles?: AuthRole[]
}

const ROLE_NAV: Record<AuthRole, CommandEntry[]> = {
  student: [
    { id: "s-dash", label: "Student Dashboard", icon: LayoutDashboard, action: (r) => r.push("/dashboard/student") },
    { id: "s-courses", label: "My Courses", icon: BookOpen, action: (r) => r.push("/dashboard/student/courses") },
    { id: "s-tutor", label: "AI Tutor", description: "Get help from your AI tutor", icon: Bot, action: (r) => r.push("/dashboard/student/tutor") },
    { id: "s-creds", label: "Credentials & Badges", icon: Grad, action: (r) => r.push("/dashboard/student/credentials") },
    { id: "s-community", label: "Community", icon: Users, action: (r) => r.push("/dashboard/student/community") },
  ],
  teacher: [
    { id: "t-dash", label: "Teacher Dashboard", icon: LayoutDashboard, action: (r) => r.push("/dashboard/teacher") },
    { id: "t-classes", label: "My Classes", icon: Users, action: (r) => r.push("/dashboard/teacher/classes") },
    { id: "t-gradebook", label: "Gradebook", icon: ClipboardList, action: (r) => r.push("/dashboard/teacher/gradebook") },
    { id: "t-curriculum", label: "Curriculum Map", icon: BookMarked, action: (r) => r.push("/dashboard/teacher/curriculum") },
    { id: "t-assistant", label: "AI Teaching Assistant", icon: Bot, action: (r) => r.push("/dashboard/teacher/assistant") },
  ],
  admin: [
    { id: "a-dash", label: "Admin Dashboard", icon: LayoutDashboard, action: (r) => r.push("/dashboard/admin") },
    { id: "a-students", label: "Student Directory", icon: GraduationCap, action: (r) => r.push("/dashboard/admin/students") },
    { id: "a-faculty", label: "Faculty Tracker", icon: Users, action: (r) => r.push("/dashboard/admin/faculty") },
    { id: "a-reports", label: "Reports & KPIs", icon: BarChart2, action: (r) => r.push("/dashboard/admin/reports") },
  ],
  district_leader: [
    { id: "d-dash", label: "District Dashboard", icon: LayoutDashboard, action: (r) => r.push("/dashboard/district") },
    { id: "d-retention", label: "Retention Intelligence", description: "SKORA multi-school view", icon: TrendingUp, action: (r) => r.push("/dashboard/district/retention") },
    { id: "d-schools", label: "School Comparison", icon: Building2, action: (r) => r.push("/dashboard/district/schools") },
    { id: "d-govcon", label: "GovCon Pipeline", icon: Globe, action: (r) => r.push("/dashboard/district/govcon") },
  ],
  curriculum_committee: [
    { id: "c-dash", label: "Curriculum Dashboard", icon: LayoutDashboard, action: (r) => r.push("/dashboard/curriculum") },
    { id: "c-proposals", label: "Proposals", icon: FileText, action: (r) => r.push("/dashboard/curriculum/proposals") },
    { id: "c-new", label: "New Proposal", description: "Start a curriculum change request", icon: PlusCircle, action: (r) => r.push("/dashboard/curriculum/proposals/new") },
    { id: "c-catalog", label: "eCatalog", icon: BookMarked, action: (r) => r.push("/dashboard/curriculum/catalog") },
    { id: "c-assistant", label: "AI Curriculum Assistant", icon: Bot, action: (r) => r.push("/dashboard/curriculum/assistant") },
  ],
  govcon: [
    { id: "g-dash", label: "GovCon Dashboard", icon: LayoutDashboard, action: (r) => r.push("/dashboard/govcon") },
  ],
  parent: [
    { id: "p-dash", label: "Parent Dashboard", icon: LayoutDashboard, action: (r) => r.push("/dashboard/parent") },
  ],
  cyber_it: [
    { id: "cy-dash", label: "IT / Cyber Dashboard", icon: LayoutDashboard, action: (r) => r.push("/dashboard/cyber") },
    { id: "cy-risk", label: "NIST RMF Risk Register", icon: Shield, action: (r) => r.push("/dashboard/cyber/risk") },
    { id: "cy-compliance", label: "Compliance Monitor", icon: Lock, action: (r) => r.push("/dashboard/cyber/compliance") },
    { id: "cy-audit", label: "Audit Log", icon: ClipboardList, action: (r) => r.push("/dashboard/cyber/audit") },
  ],
}

const GLOBAL_ACTIONS: CommandEntry[] = [
  { id: "act-assistant", label: "Open AI Workspace", description: "Chat with any of the 10 AI agents", icon: Brain, shortcut: "⌘ A", action: (r) => r.push("/assistant") },
  { id: "act-calendar", label: "Calendar", description: "View all events and deadlines", icon: CalendarDays, shortcut: "⌘ .", action: (r) => r.push("/calendar") },
  { id: "act-messages", label: "Messages", icon: MessageSquare, action: (r) => r.push("/dashboard/student/community") },
]

const SETTINGS_ENTRIES: CommandEntry[] = [
  { id: "set-profile", label: "Profile Settings", icon: User, action: (r) => r.push("/settings/profile") },
  { id: "set-notif", label: "Notification Preferences", icon: Zap, action: (r) => r.push("/settings/notifications") },
  { id: "set-settings", label: "All Settings", icon: Settings, shortcut: "⌘ ,", action: (r) => r.push("/settings") },
]

const AGENT_ENTRIES: CommandEntry[] = [
  { id: "ag-tutor", label: "AI Tutor", description: "Personalized learning support", icon: GraduationCap, roles: ["student"] as AuthRole[], action: (r) => r.push("/dashboard/student/tutor") },
  { id: "ag-teach", label: "Teacher Assistant", description: "Lesson plans, grading support", icon: BookOpen, roles: ["teacher"] as AuthRole[], action: (r) => r.push("/dashboard/teacher/assistant") },
  { id: "ag-curr", label: "Curriculum Architect", description: "Proposal analysis & ABET alignment", icon: ScrollText, roles: ["curriculum_committee", "teacher"] as AuthRole[], action: (r) => r.push("/dashboard/curriculum/assistant") },
  { id: "ag-district", label: "District Analyst", description: "Retention signals & intervention triggers", icon: BarChart3, roles: ["district_leader", "admin"] as AuthRole[], action: (r) => r.push("/dashboard/district/retention") },
  { id: "ag-compliance", label: "Compliance Guard", description: "FERPA, NIST, SACSCOC flags", icon: Shield, roles: ["cyber_it", "admin"] as AuthRole[], action: (r) => r.push("/dashboard/cyber/compliance") },
  { id: "ag-govcon", label: "GovCon Intel", description: "SAM.gov opportunities & pipeline", icon: Globe, roles: ["govcon", "district_leader"] as AuthRole[], action: (r) => r.push("/dashboard/govcon") },
  { id: "ag-workspace", label: "Multi-Agent Workspace", description: "Activate multiple agents at once", icon: Brain, action: (r) => r.push("/assistant") },
]

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const role = user?.role ?? "student"

  const navItems = ROLE_NAV[role] ?? []
  const visibleAgents = AGENT_ENTRIES.filter(
    (a) => !a.roles || a.roles.includes(role)
  )

  const run = useCallback(
    (entry: CommandEntry) => {
      onOpenChange(false)
      entry.action(router)
    },
    [router, onOpenChange]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onOpenChange])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} className="max-w-xl">
      <CommandInput placeholder="Search pages, actions, agents…" />
      <CommandList className="max-h-[420px]">
        <CommandEmpty>No results for that search.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navItems.map((entry) => {
            const Icon = entry.icon
            return (
              <CommandItem key={entry.id} onSelect={() => run(entry)}>
                <Icon className="text-[#52525B]" />
                <span>{entry.label}</span>
                {entry.description && (
                  <span className="ml-1 text-xs text-muted-foreground">{entry.description}</span>
                )}
                {entry.shortcut && <CommandShortcut>{entry.shortcut}</CommandShortcut>}
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          {GLOBAL_ACTIONS.map((entry) => {
            const Icon = entry.icon
            return (
              <CommandItem key={entry.id} onSelect={() => run(entry)}>
                <Icon className="text-[#4F46E5]" />
                <span>{entry.label}</span>
                {entry.description && (
                  <span className="ml-1 text-xs text-muted-foreground">{entry.description}</span>
                )}
                {entry.shortcut && <CommandShortcut>{entry.shortcut}</CommandShortcut>}
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="AI Agents">
          {visibleAgents.map((entry) => {
            const Icon = entry.icon
            return (
              <CommandItem key={entry.id} onSelect={() => run(entry)}>
                <Icon className="text-[#059669]" />
                <span>{entry.label}</span>
                {entry.description && (
                  <span className="ml-1 text-xs text-muted-foreground">{entry.description}</span>
                )}
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          {SETTINGS_ENTRIES.map((entry) => {
            const Icon = entry.icon
            return (
              <CommandItem key={entry.id} onSelect={() => run(entry)}>
                <Icon className="text-[#A1A1AA]" />
                <span>{entry.label}</span>
                {entry.shortcut && <CommandShortcut>{entry.shortcut}</CommandShortcut>}
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>

      <div className="border-t border-[#E8E6E1] px-3 py-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-mono text-[10px] text-[#A1A1AA]">
            <kbd className="rounded border border-[#E8E6E1] bg-[#F4F4F2] px-1">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-[#A1A1AA]">
            <kbd className="rounded border border-[#E8E6E1] bg-[#F4F4F2] px-1">↵</kbd> open
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-[#A1A1AA]">
            <kbd className="rounded border border-[#E8E6E1] bg-[#F4F4F2] px-1">esc</kbd> close
          </span>
        </div>
      </div>
    </CommandDialog>
  )
}
