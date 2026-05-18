"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAssistantStore } from "@/lib/assistant-store"
import { Loader2 } from "lucide-react"

export default function CurriculumAssistantPage() {
  const router = useRouter()
  const selectAgent = useAssistantStore((s) => s.selectAgent)

  useEffect(() => {
    selectAgent("curriculum")
    router.replace("/assistant")
  }, [selectAgent, router])

  return (
    <div className="flex h-64 items-center justify-center gap-3 text-[#A1A1AA]">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm">Opening Curriculum Assistant…</span>
    </div>
  )
}
