"use client"

import { motion } from "framer-motion"
import { Brain, Layers, Trash2, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { AGENTS } from "@/lib/demo-data"
import { useAssistantStore } from "@/lib/assistant-store"

const STATUS_STYLE = {
  online: { dot: "bg-[#059669]", label: "Online" },
  beta: { dot: "bg-[#B8860B]", label: "Beta" },
  offline: { dot: "bg-[#A1A1AA]", label: "Offline" },
}

export function AgentSelector() {
  const {
    activeAgentId,
    selectedAgentIds,
    multiAgentMode,
    messages,
    selectAgent,
    toggleMultiAgent,
    toggleAgentSelection,
    clearConversation,
  } = useAssistantStore()

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-[#E8E6E1] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E8E6E1] px-4 py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4F46E5]">
            <Brain className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-[#18181B]">AI Agents</span>
        </div>
        <span className="font-mono text-[10px] text-[#A1A1AA]">10 agents</span>
      </div>

      {/* Multi-agent toggle */}
      <div className="border-b border-[#E8E6E1] px-4 py-3">
        <button
          onClick={toggleMultiAgent}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition-all",
            multiAgentMode
              ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
              : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
          )}
        >
          <Layers className="h-3.5 w-3.5 shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Multi-Agent Mode</p>
            <p className="text-[10px] text-[#A1A1AA]">
              {multiAgentMode ? `${selectedAgentIds.length}/3 selected` : "Select up to 3 agents"}
            </p>
          </div>
          {multiAgentMode && (
            <div className="flex h-4 w-4 items-center justify-center rounded bg-[#4F46E5]">
              <Check className="h-2.5 w-2.5 text-white" />
            </div>
          )}
        </button>
      </div>

      {/* Agent list */}
      <div className="flex-1 overflow-y-auto py-2">
        {AGENTS.map((agent, i) => {
          const isActive = !multiAgentMode && activeAgentId === agent.id
          const isSelected = multiAgentMode && selectedAgentIds.includes(agent.id)
          const highlighted = isActive || isSelected
          const statusInfo = STATUS_STYLE[agent.status]
          const msgCount = (messages[agent.id] ?? []).filter((m) => m.role === "user").length

          return (
            <motion.button
              key={agent.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              onClick={() =>
                multiAgentMode ? toggleAgentSelection(agent.id) : selectAgent(agent.id)
              }
              className={cn(
                "group flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                highlighted ? "bg-[#EEF2FF]" : "hover:bg-[#FAFAF9]"
              )}
            >
              {/* Color dot / selection indicator */}
              <div
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white text-[10px] font-bold transition-transform group-hover:scale-105"
                style={{ background: agent.color }}
              >
                {multiAgentMode && isSelected ? (
                  <Check className="h-4 w-4" />
                ) : (
                  agent.name.slice(0, 2).toUpperCase()
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className={cn(
                    "truncate text-sm font-medium",
                    highlighted ? "text-[#4F46E5]" : "text-[#18181B]"
                  )}>
                    {agent.name}
                  </p>
                  {msgCount > 0 && (
                    <span className="shrink-0 rounded-full bg-[#4F46E5] px-1.5 py-0.5 font-mono text-[9px] text-white">
                      {msgCount}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-[11px] text-[#A1A1AA]">{agent.role}</p>
                <div className="mt-1 flex items-center gap-1">
                  <span className={cn("h-1.5 w-1.5 rounded-full", statusInfo.dot)} />
                  <span className="text-[10px] text-[#A1A1AA]">{statusInfo.label}</span>
                </div>
              </div>

              {/* Clear button on hover */}
              {msgCount > 0 && !multiAgentMode && isActive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    clearConversation(agent.id)
                  }}
                  className="ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded opacity-0 transition-opacity hover:bg-[#FEE2E2] group-hover:opacity-100"
                  title="Clear conversation"
                >
                  <Trash2 className="h-3 w-3 text-[#DC2626]" />
                </button>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-[#E8E6E1] px-4 py-3">
        <p className="text-[10px] text-[#A1A1AA]">
          All agents are FERPA-compliant. Conversations are not stored.
        </p>
      </div>
    </aside>
  )
}
