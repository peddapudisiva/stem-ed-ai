"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, ChevronRight, Menu, Moon, Search, Settings, LogOut, Sun, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { TOPBAR } from "@/lib/copy"
import { useAuthStore, ROLE_HOME } from "@/lib/auth-store"
import { useNotificationStore } from "@/lib/notification-store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommandPalette } from "@/components/ui/command-palette"
import { useThemeStore } from "@/lib/theme-store"

function useBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  return segments.map((seg, i) => ({
    label: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: "/" + segments.slice(0, i + 1).join("/"),
  }))
}

const TYPE_DOT: Record<string, string> = {
  alert: "bg-[#DC2626]",
  mention: "bg-[#B8860B]",
  success: "bg-[#059669]",
  update: "bg-[#4F46E5]",
}

interface TopbarProps {
  onMenuClick?: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const breadcrumbs = useBreadcrumb()
  const router = useRouter()

  const user = useAuthStore((s) => s.user)
  const signOut = useAuthStore((s) => s.signOut)

  const notifications = useNotificationStore((s) => s.notifications)
  const markAsRead = useNotificationStore((s) => s.markAsRead)
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead)
  const unreadCount = useNotificationStore((s) => s.unreadCount)()

  const { theme, toggle: toggleTheme } = useThemeStore()

  const [notifOpen, setNotifOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)

  const handleSignOut = () => {
    signOut()
    router.replace("/login")
  }

  const handleNotifClick = (id: string, link: string) => {
    markAsRead(id)
    setNotifOpen(false)
    router.push(link)
  }

  return (
    <>
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />

      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-[#E8E6E1] bg-white/90 px-4 backdrop-blur-sm">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#52525B] hover:bg-[#F4F4F2] transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb */}
        <nav className="flex flex-1 items-center gap-1 overflow-hidden">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1 min-w-0">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" />}
              <Link
                href={crumb.href}
                className={cn(
                  "truncate text-sm transition-colors",
                  i === breadcrumbs.length - 1
                    ? "font-medium text-[#18181B]"
                    : "text-[#A1A1AA] hover:text-[#52525B]"
                )}
              >
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1">
          {/* Cmd+K trigger */}
          <button
            onClick={() => setCmdOpen(true)}
            className="hidden sm:flex items-center gap-2 rounded-lg border border-[#E8E6E1] bg-[#FAFAF9] px-3 py-1.5 text-xs text-[#A1A1AA] transition-colors hover:border-[#D6D3CC] hover:text-[#52525B]"
          >
            <Search className="h-3.5 w-3.5" />
            <span>{TOPBAR.searchPlaceholder}</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-[#E8E6E1] bg-white px-1 font-mono text-[10px] text-[#A1A1AA]">
              ⌘K
            </kbd>
          </button>

          {/* Mobile search */}
          <button
            onClick={() => setCmdOpen(true)}
            className="sm:hidden flex h-9 w-9 items-center justify-center rounded-lg text-[#52525B] hover:bg-[#F4F4F2] transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#52525B] hover:bg-[#F4F4F2] dark:text-[#A1A1AA] dark:hover:bg-[#262626] transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Notification bell */}
          <button
            onClick={() => setNotifOpen(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#52525B] hover:bg-[#F4F4F2] transition-colors"
            aria-label={TOPBAR.notificationsLabel}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-[#4F46E5]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4F46E5] opacity-60" />
              </span>
            )}
          </button>

          {/* Avatar / profile */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[#F4F4F2] transition-colors"
              aria-label={TOPBAR.profileLabel}
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-[#EEF2FF] text-[10px] font-semibold text-[#4F46E5]">
                  {user?.avatarInitials ?? "??"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-[#18181B]">{user?.name ?? "—"}</p>
                <p className="text-xs text-[#A1A1AA]">{user?.email ?? "—"}</p>
                <Badge variant="secondary" className="mt-1 text-[9px] uppercase tracking-wide">
                  {user?.role?.replace(/_/g, " ") ?? ""}
                </Badge>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onClick={() => router.push("/settings/profile")}
              >
                <User className="h-4 w-4 text-[#A1A1AA]" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onClick={() => router.push("/settings")}
              >
                <Settings className="h-4 w-4 text-[#A1A1AA]" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 cursor-pointer text-[#DC2626] focus:text-[#DC2626]"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Notification drawer */}
      <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
        <SheetContent side="right" className="w-[420px] p-0">
          <SheetHeader className="border-b border-[#E8E6E1] px-5 py-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base font-semibold text-[#18181B]">
                Notifications
              </SheetTitle>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-[#4F46E5] hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>
          </SheetHeader>

          <Tabs defaultValue="all" className="flex h-full flex-col">
            <TabsList className="h-10 w-full justify-start gap-0 rounded-none border-b border-[#E8E6E1] bg-transparent px-4">
              <TabsTrigger
                value="all"
                className="h-10 rounded-none border-b-2 border-transparent px-3 text-xs data-[state=active]:border-[#4F46E5] data-[state=active]:text-[#4F46E5]"
              >
                All{" "}
                <span className="ml-1 font-mono text-[10px]">{notifications.length}</span>
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className="h-10 rounded-none border-b-2 border-transparent px-3 text-xs data-[state=active]:border-[#4F46E5] data-[state=active]:text-[#4F46E5]"
              >
                Alerts{" "}
                <span className="ml-1 font-mono text-[10px]">
                  {notifications.filter((n) => n.type === "alert").length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="mentions"
                className="h-10 rounded-none border-b-2 border-transparent px-3 text-xs data-[state=active]:border-[#4F46E5] data-[state=active]:text-[#4F46E5]"
              >
                Mentions
              </TabsTrigger>
            </TabsList>

            {(["all", "alerts", "mentions"] as const).map((tab) => {
              const items =
                tab === "all"
                  ? notifications
                  : tab === "alerts"
                  ? notifications.filter((n) => n.type === "alert")
                  : notifications.filter((n) => n.type === "mention")

              return (
                <TabsContent key={tab} value={tab} className="flex-1 overflow-y-auto p-0 mt-0">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                      <Bell className="h-8 w-8 text-[#D6D3CC]" />
                      <p className="text-sm text-[#A1A1AA]">Nothing here yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#E8E6E1]">
                      <div className="px-5 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
                          Today
                        </p>
                      </div>
                      {items.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => handleNotifClick(n.id, n.link)}
                          className={cn(
                            "flex w-full gap-3 px-5 py-3.5 text-left transition-colors hover:bg-[#FAFAF9]",
                            !n.read && "bg-[#FAFAF9]"
                          )}
                        >
                          <span
                            className={cn(
                              "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                              !n.read ? TYPE_DOT[n.type] ?? "bg-[#4F46E5]" : "bg-transparent"
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "text-sm leading-snug text-[#18181B]",
                                !n.read && "font-medium"
                              )}
                            >
                              {n.title}
                            </p>
                            <p className="mt-0.5 text-xs text-[#52525B] line-clamp-1">
                              {n.description}
                            </p>
                            <p className="mt-1 font-mono text-[10px] text-[#A1A1AA]">{n.time}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </TabsContent>
              )
            })}
          </Tabs>

          <div className="border-t border-[#E8E6E1] p-4">
            <Link
              href="/settings/notifications"
              onClick={() => setNotifOpen(false)}
              className="text-xs text-[#52525B] hover:text-[#4F46E5] transition-colors"
            >
              Notification preferences →
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
