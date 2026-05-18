"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, BookOpen, Brain, Calendar, Award,
  Users, ClipboardList, BarChart3, TrendingUp, Building2,
  ScrollText, Globe, MessageSquare, Shield, Cpu
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/auth-store"

type AuthRole =
  | "student" | "teacher" | "admin" | "district_leader"
  | "curriculum_committee" | "govcon" | "parent" | "cyber_it"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

const BOTTOM_NAV: Record<AuthRole, NavItem[]> = {
  student: [
    { label: "Home",     href: "/dashboard/student",        icon: LayoutDashboard },
    { label: "Courses",  href: "/dashboard/student/courses", icon: BookOpen },
    { label: "AI Tutor", href: "/dashboard/student/tutor",   icon: Brain },
    { label: "Messages", href: "/messages",                  icon: MessageSquare },
    { label: "Calendar", href: "/calendar",                  icon: Calendar },
  ],
  teacher: [
    { label: "Home",     href: "/dashboard/teacher",           icon: LayoutDashboard },
    { label: "Classes",  href: "/dashboard/teacher/classes",   icon: Users },
    { label: "Grades",   href: "/dashboard/teacher/gradebook", icon: ClipboardList },
    { label: "Messages", href: "/messages",                    icon: MessageSquare },
    { label: "AI",       href: "/assistant",                   icon: Brain },
  ],
  admin: [
    { label: "Home",     href: "/dashboard/admin",           icon: LayoutDashboard },
    { label: "Students", href: "/dashboard/admin/students",  icon: Users },
    { label: "Faculty",  href: "/dashboard/admin/faculty",   icon: Award },
    { label: "Reports",  href: "/dashboard/admin/reports",   icon: BarChart3 },
    { label: "AI",       href: "/assistant",                 icon: Brain },
  ],
  district_leader: [
    { label: "Home",      href: "/dashboard/district",            icon: LayoutDashboard },
    { label: "Retention", href: "/dashboard/district/retention",  icon: TrendingUp },
    { label: "Schools",   href: "/dashboard/district/schools",    icon: Building2 },
    { label: "GovCon",    href: "/dashboard/district/govcon",     icon: Globe },
    { label: "AI",        href: "/assistant",                     icon: Brain },
  ],
  curriculum_committee: [
    { label: "Home",      href: "/dashboard/curriculum",            icon: LayoutDashboard },
    { label: "Proposals", href: "/dashboard/curriculum/proposals",  icon: ScrollText },
    { label: "Catalog",   href: "/dashboard/curriculum/catalog",    icon: BookOpen },
    { label: "AI",        href: "/assistant",                       icon: Brain },
    { label: "Calendar",  href: "/calendar",                        icon: Calendar },
  ],
  govcon: [
    { label: "Home",    href: "/dashboard/govcon",         icon: LayoutDashboard },
    { label: "Opps",    href: "/dashboard/govcon",         icon: Globe },
    { label: "Reports", href: "/dashboard/admin/reports",  icon: BarChart3 },
    { label: "AI",      href: "/assistant",                icon: Brain },
    { label: "Calendar",href: "/calendar",                 icon: Calendar },
  ],
  parent: [
    { label: "Home",     href: "/dashboard/parent",  icon: LayoutDashboard },
    { label: "Messages", href: "/messages",          icon: MessageSquare },
    { label: "AI",       href: "/assistant",         icon: Brain },
    { label: "Calendar", href: "/calendar",          icon: Calendar },
  ],
  cyber_it: [
    { label: "Home",       href: "/dashboard/cyber",            icon: LayoutDashboard },
    { label: "Risk",       href: "/dashboard/cyber/risk",       icon: Shield },
    { label: "Compliance", href: "/dashboard/cyber/compliance", icon: Cpu },
    { label: "Audit",      href: "/dashboard/cyber/audit",      icon: ScrollText },
    { label: "AI",         href: "/assistant",                  icon: Brain },
  ],
}

export function BottomNav() {
  const pathname = usePathname()
  const user = useAuthStore((s) => s.user)
  const role = (user?.role ?? "student") as AuthRole
  const items = BOTTOM_NAV[role] ?? BOTTOM_NAV.student

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-[#E8E6E1] bg-white/95 backdrop-blur-sm safe-area-bottom">
      <div className="flex items-stretch">
        {items.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 transition-colors",
                isActive ? "text-[#4F46E5]" : "text-[#A1A1AA] hover:text-[#52525B]"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-[#4F46E5]")} />
              <span className={cn(
                "text-[10px] font-medium leading-none",
                isActive ? "text-[#4F46E5]" : "text-[#A1A1AA]"
              )}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 h-0.5 w-8 rounded-t-full bg-[#4F46E5]" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
