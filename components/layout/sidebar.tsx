"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen, Brain, Calendar, ChevronDown, GraduationCap, LayoutDashboard,
  MessageSquare, FileText, Users, BarChart3, Shield, Globe, Baby,
  Award, ClipboardList, Building2, TrendingUp, ScrollText, FlaskConical,
  PanelLeftClose, PanelLeftOpen, ChevronRight, Cpu, Megaphone, CalendarCheck,
  HelpCircle, Settings
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ROLES, FOOTER, NAV } from "@/lib/copy"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type Role = keyof typeof ROLES

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: string
}

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  student: [
    { label: NAV.home, href: "/dashboard/student", icon: LayoutDashboard },
    { label: NAV.courses, href: "/dashboard/student/courses", icon: BookOpen },
    { label: NAV.tutor, href: "/dashboard/student/tutor", icon: Brain },
    { label: NAV.calendar, href: "/calendar", icon: Calendar },
    { label: NAV.credentials, href: "/dashboard/student/credentials", icon: Award },
    { label: NAV.community, href: "/dashboard/student/community", icon: Users },
    { label: "Mentors", href: "/dashboard/student/mentors", icon: Users },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Announcements", href: "/announcements", icon: Megaphone },
  ],
  teacher: [
    { label: NAV.home, href: "/dashboard/teacher", icon: LayoutDashboard },
    { label: NAV.classes, href: "/dashboard/teacher/classes", icon: Users },
    { label: NAV.gradebook, href: "/dashboard/teacher/gradebook", icon: ClipboardList },
    { label: "Attendance", href: "/dashboard/teacher/attendance", icon: CalendarCheck },
    { label: "Course Files", href: "/dashboard/teacher/files", icon: FileText },
    { label: NAV.curriculum, href: "/dashboard/teacher/curriculum", icon: FileText },
    { label: NAV.assistant, href: "/dashboard/teacher/assistant", icon: Brain },
    { label: NAV.calendar, href: "/calendar", icon: Calendar },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Announcements", href: "/announcements", icon: Megaphone },
  ],
  admin: [
    { label: NAV.home, href: "/dashboard/admin", icon: LayoutDashboard },
    { label: NAV.students, href: "/dashboard/admin/students", icon: Users },
    { label: NAV.faculty, href: "/dashboard/admin/faculty", icon: GraduationCap },
    { label: "PD Catalog", href: "/dashboard/admin/pd-catalog", icon: BookOpen },
    { label: NAV.reports, href: "/dashboard/admin/reports", icon: BarChart3 },
    { label: "Tenants", href: "/dashboard/admin/tenants", icon: Building2, badge: "SUPER" },
    { label: NAV.calendar, href: "/calendar", icon: Calendar },
  ],
  district_leader: [
    { label: NAV.home, href: "/dashboard/district", icon: LayoutDashboard },
    { label: NAV.retention, href: "/dashboard/district/retention", icon: TrendingUp },
    { label: NAV.schools, href: "/dashboard/district/schools", icon: Building2 },
    { label: NAV.reports, href: "/dashboard/admin/reports", icon: BarChart3 },
    { label: "GovCon", href: "/dashboard/district/govcon", icon: Globe, badge: "BETA" },
  ],
  curriculum_committee: [
    { label: NAV.home, href: "/dashboard/curriculum", icon: LayoutDashboard },
    { label: NAV.proposals, href: "/dashboard/curriculum/proposals", icon: ScrollText },
    { label: NAV.catalog, href: "/dashboard/curriculum/catalog", icon: BookOpen },
    { label: NAV.assistant, href: "/dashboard/curriculum/assistant", icon: Brain },
    { label: NAV.calendar, href: "/calendar", icon: Calendar },
  ],
  govcon: [
    { label: NAV.home, href: "/dashboard/govcon", icon: LayoutDashboard },
    { label: "Opportunities", href: "/dashboard/govcon", icon: Globe },
    { label: NAV.reports, href: "/dashboard/admin/reports", icon: BarChart3 },
  ],
  parent: [
    { label: NAV.home, href: "/dashboard/parent", icon: LayoutDashboard },
    { label: NAV.calendar, href: "/calendar", icon: Calendar },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Announcements", href: "/announcements", icon: Megaphone },
  ],
  cyber_it: [
    { label: NAV.home, href: "/dashboard/cyber", icon: LayoutDashboard },
    { label: NAV.risk, href: "/dashboard/cyber/risk", icon: Shield },
    { label: NAV.compliance, href: "/dashboard/cyber/compliance", icon: FlaskConical },
    { label: NAV.audit, href: "/dashboard/cyber/audit", icon: ScrollText },
  ],
}

const ROLE_ICONS: Record<Role, React.ElementType> = {
  student: GraduationCap,
  teacher: BookOpen,
  admin: Building2,
  district_leader: BarChart3,
  curriculum_committee: ScrollText,
  govcon: Globe,
  parent: Baby,
  cyber_it: Cpu,
}

interface AppSidebarProps {
  inDrawer?: boolean
  onDrawerClose?: () => void
}

export function AppSidebar({ inDrawer, onDrawerClose }: AppSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [activeRole, setActiveRole] = useState<Role>("student")

  const effectiveCollapsed = inDrawer ? false : collapsed
  const navItems = NAV_BY_ROLE[activeRole]
  const RoleIcon = ROLE_ICONS[activeRole]

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col border-r border-[#E8E6E1] bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        inDrawer ? "w-full" : effectiveCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex h-14 items-center border-b border-[#E8E6E1] px-4",
        effectiveCollapsed ? "justify-center" : "gap-2"
      )}>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#4F46E5]">
          <Brain className="h-4 w-4 text-white" />
        </div>
        {!effectiveCollapsed && (
          <span className="font-display text-[15px] tracking-tight text-[#18181B]">
            STEM-ED-AI
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-3">
        <ul className="space-y-0.5 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm transition-all duration-150",
                    isActive
                      ? "bg-[#EEF2FF] text-[#4F46E5] font-medium"
                      : "text-[#52525B] hover:bg-[#F4F4F2] hover:text-[#18181B]",
                    effectiveCollapsed && "justify-center px-2"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#4F46E5]" : "text-[#A1A1AA] group-hover:text-[#52525B]")} />
                  {!effectiveCollapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="h-4 px-1 text-[9px] font-semibold uppercase tracking-wide">
                          {item.badge}
                        </Badge>
                      )}
                      {isActive && <ChevronRight className="h-3 w-3 text-[#4F46E5] opacity-60" />}
                    </>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Divider */}
        <div className="mx-4 my-3 border-t border-[#E8E6E1]" />

        {/* Global links */}
        <ul className="space-y-0.5 px-2">
          {[
            { href: "/assistant", icon: Brain,       label: "AI Workspace" },
            { href: "/settings",  icon: Settings,    label: "Settings"     },
            { href: "/help",      icon: HelpCircle,  label: "Help"         },
          ].map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm transition-all duration-150",
                    isActive
                      ? "bg-[#EEF2FF] text-[#4F46E5] font-medium"
                      : "text-[#52525B] hover:bg-[#F4F4F2] hover:text-[#18181B]",
                    effectiveCollapsed && "justify-center px-2"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#4F46E5]" : "text-[#A1A1AA] group-hover:text-[#52525B]")} />
                  {!effectiveCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Role switcher */}
      <div className={cn(
        "border-t border-[#E8E6E1] p-2",
        effectiveCollapsed ? "flex justify-center" : ""
      )}>
        {effectiveCollapsed ? (
          <button
            onClick={() => setCollapsed(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#A1A1AA] hover:bg-[#F4F4F2] hover:text-[#52525B] transition-colors"
          >
            <RoleIcon className="h-4 w-4" />
          </button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-[#52525B] hover:bg-[#F4F4F2] hover:text-[#18181B] transition-colors">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#F4F4F2]">
                <RoleIcon className="h-3.5 w-3.5 text-[#52525B]" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs font-medium text-[#18181B]">{ROLES[activeRole]}</div>
                <div className="text-[10px] text-[#A1A1AA]">Switch role</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[#A1A1AA]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-[220px]">
              {(Object.keys(ROLES) as Role[]).map((role) => {
                const Icon = ROLE_ICONS[role]
                return (
                  <DropdownMenuItem
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={cn("gap-2.5 cursor-pointer", activeRole === role && "bg-[#EEF2FF] text-[#4F46E5]")}
                  >
                    <Icon className="h-4 w-4" />
                    {ROLES[role]}
                    {activeRole === role && <span className="ml-auto text-[10px] font-semibold text-[#4F46E5]">ACTIVE</span>}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Footer brand */}
      {!effectiveCollapsed && (
        <div className="border-t border-[#E8E6E1] px-4 py-2">
          <p className="font-mono-custom text-[10px] text-[#A1A1AA]">
            {FOOTER.brand} · {FOOTER.version}
          </p>
        </div>
      )}

      {/* Collapse toggle — hidden inside mobile drawer */}
      {!inDrawer && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-[60px] flex h-6 w-6 items-center justify-center rounded-full border border-[#E8E6E1] bg-white text-[#A1A1AA] shadow-sm hover:text-[#52525B] transition-colors z-10"
          aria-label={effectiveCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {effectiveCollapsed
            ? <PanelLeftOpen className="h-3 w-3" />
            : <PanelLeftClose className="h-3 w-3" />
          }
        </button>
      )}
    </aside>
  )
}
