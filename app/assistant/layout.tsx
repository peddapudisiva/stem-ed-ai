import { AuthGuard } from "@/components/layout/auth-guard"
import { Topbar } from "@/components/layout/topbar"
import { AnimatedBackground } from "@/components/ui/animated-background"

export default function AssistantLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="relative flex h-screen flex-col overflow-hidden bg-[#FAFAF9]">
        <AnimatedBackground />
        <div className="relative z-10 flex h-full flex-col">
          <Topbar />
          <main className="flex flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
