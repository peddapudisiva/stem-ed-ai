import type { Metadata } from "next"
import { AgentSelector } from "@/components/assistant/agent-selector"
import { ConversationPanel } from "@/components/assistant/conversation-panel"
import { ContextPanel } from "@/components/assistant/context-panel"

export const metadata: Metadata = {
  title: "AI Workspace — STEM-ED-AI",
  description: "Multi-agent AI workspace with 10 specialized education agents",
}

export default function AssistantPage() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <AgentSelector />
      <ConversationPanel />
      <ContextPanel />
    </div>
  )
}
