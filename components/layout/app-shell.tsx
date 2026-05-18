"use client"

import { useState } from "react"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { AppSidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Animated background — fixed, z-0 */}
      <AnimatedBackground />

      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden lg:flex">
        <AppSidebar />
      </div>

      {/* Mobile sidebar drawer */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-[240px] p-0 border-r border-[#E8E6E1]">
          <AppSidebar inDrawer onDrawerClose={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main content area */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden min-w-0">
        <Topbar onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-4 lg:px-6 lg:py-6 pb-24 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <BottomNav />
    </div>
  )
}
