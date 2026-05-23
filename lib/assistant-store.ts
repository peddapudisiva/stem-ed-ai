"use client"

import { create } from "zustand"
import { AGENTS } from "@/lib/demo-data"

export interface Message {
  id: string
  role: "user" | "agent"
  agentId: string
  agentName?: string
  content: string
  streaming: boolean
  timestamp: string
}

// Realistic mock responses per agent
const MOCK_RESPONSES: Record<string, string[]> = {
  tutor: [
    "Great question! Let me break this down step by step.\n\nFirst, let's understand the core concept. Think of it like building blocks — each piece depends on the one before it.\n\n**Key points to remember:**\n1. Start with the fundamentals before moving to edge cases\n2. Practice with small examples first\n3. Connect new knowledge to what you already know\n\nWould you like me to walk through a specific example from your CS 1010 coursework?",
    "I can see you're working through a challenging topic. Let me help clarify.\n\nThe key insight here is that this concept appears in many real-world systems. For instance, in your Introduction to Programming course, you've already seen a simpler version of this.\n\nShall we work through a practice problem together? I can generate one that matches your current assignment level.",
    "That's an excellent observation! You're thinking about this in exactly the right way.\n\nHere's how I'd approach this problem:\n\n```python\ndef solve(n):\n    # Base case\n    if n <= 1:\n        return n\n    # Recursive case\n    return solve(n-1) + solve(n-2)\n```\n\nNotice how the base case prevents infinite recursion. Your GPA of 3.7 tells me you're ready to tackle more advanced patterns — want to explore dynamic programming next?",
  ],
  teacher: [
    "I've drafted a lesson plan for you based on the current curriculum standards.\n\n**Lesson: Introduction to Recursion**\n*Duration: 75 minutes · CS 1010 · Dr. Marcus Webb*\n\n**Learning Objectives:**\n- Define recursion and identify base/recursive cases\n- Trace recursive function execution\n- Implement 3+ recursive solutions\n\n**Activities:**\n1. (15 min) Warm-up: Russian nesting dolls analogy\n2. (25 min) Live coding demo — factorial, fibonacci\n3. (20 min) Pair programming exercise\n4. (15 min) Exit ticket + spaced repetition preview\n\nThis aligns with ACCS standards CS-ALG-3.2. Want me to generate the rubric as well?",
    "I've analyzed your gradebook and found 4 students showing early risk signals:\n\n- **Marcus T.** — 0 submissions this week, grade drop from 82% → 71%\n- **Destiny W.** — Missed last 2 lab sessions\n- **Jaylen M.** — Strong quiz scores but no homework submissions\n- **Amara J.** — Active in discussions but assignment quality declining\n\nI recommend scheduling check-ins with Marcus and Destiny this week. Should I draft intervention emails for each student?",
  ],
  curriculum: [
    "I've completed the AI impact analysis for proposal **CUR-2026-0142: ENGR 4850 — AI Systems Engineering**.\n\n**ABET Alignment Score: 94/100** ✓\n\n**Findings:**\n- Strong alignment with Computing Accreditation Commission criteria 3a–3k\n- Course fills a gap in the existing AI/ML pathway\n- No prerequisite conflicts detected\n- Labor market demand: 847 open roles in GA matching this curriculum\n\n**Recommended adjustments:**\n1. Add NIST AI RMF framework coverage (criterion 3h)\n2. Include industry advisory board review before final approval\n\nShall I generate the full committee report?",
    "Analyzing the proposed curriculum changes against current eCatalog version 2.3.1...\n\n**Impact Assessment:**\n- 3 downstream courses affected by prerequisite changes\n- 47 currently enrolled students would need a transition plan\n- Credit hour load within SACSCOC thresholds ✓\n- Estimated time to implement: 1 semester\n\nWould you like me to draft the impact mitigation plan for the committee?",
  ],
  assessment: [
    "Here are 5 multiple-choice questions for **CS 1010 — Recursion Module** (Bloom's Level: Apply):\n\n**Q1.** What is the output of `factorial(0)`?\na) 0  b) 1 ✓  c) undefined  d) Error\n\n**Q2.** Which is the correct base case for binary search?\na) mid == target ✓  b) left > right  c) arr.length == 0  d) Both A and B\n\n**Q3.** A function calls itself without a base case. This causes:\na) Correct recursion  b) A loop  c) Stack overflow ✓  d) Memory leak\n\n**Q4.** What is the time complexity of recursive fibonacci (naive)?\na) O(n)  b) O(n log n)  c) O(2^n) ✓  d) O(n²)\n\n**Q5.** Which problem is best solved with recursion?\na) Linear search  b) Sorting an array  c) Tree traversal ✓  d) Hash lookup\n\nNote: Assessment Builder does NOT determine final grades — submit to instructor for review.",
  ],
  district: [
    "**District Retention Intelligence Report — Week of May 19, 2026**\n\nAnalyzing data across 3 institutions (read-only):\n\n| Institution | Enrollment | Current Retention | Target | Gap |\n|---|---|---|---|---|\n| ATC | 3,493 | 60% | 73% | **-13%** ⚠️ |\n| GSU | 26,500 | 78% | 85% | -7% |\n| KSU | 43,000 | 81% | 88% | -7% |\n\n**SKORA signals this week:**\n- 47 new at-risk flags across district (↑12% vs last week)\n- ATC Nursing program: highest concentration of risk scores 70+\n- Financial aid hold correlation: 83% of at-risk students have aid issues\n\n*District Analyst is read-only. Actions must be initiated by institution administrators.*",
  ],
  govcon: [
    "**SAM.gov Opportunity Scan — May 19, 2026**\n\nFound **3 matching opportunities** for SERA Neural Labs criteria:\n\n1. **ED-OII-26-001** — AI-Enhanced STEM Education Initiative\n   - Agency: U.S. Dept. of Education\n   - Value: $2.4M · Due: June 15, 2026\n   - Win probability: 74% · Status: Active\n\n2. **NSF-IUSE-2026-B** — Community College Digital Transformation  \n   - Agency: NSF · Value: $950K · Due: May 30, 2026 ⚡ **Urgent**\n   - Win probability: 82%\n\n3. **DOL-ETA-26-142** — Workforce Development AI Platform\n   - Agency: Dept. of Labor · Value: $1.8M · Due: July 1, 2026\n   - Win probability: 61%\n\n*GovCon Intel does NOT submit proposals. All submissions require human approval.*",
  ],
  rag: [
    "Searching institutional knowledge base...\n\n**Retrieved 4 relevant documents:**\n\n1. **ATC Academic Policies 2026** — Section 3.4: Grading Standards (relevance: 94%)\n2. **SACSCOC Accreditation Standards** — Chapter 7: Faculty Qualifications (relevance: 89%)\n3. **TCSG Workforce Development Guidelines** — Q1 2026 revision (relevance: 87%)\n4. **ATC Student Handbook** — Financial Aid Satisfactory Academic Progress (relevance: 82%)\n\nAll retrieved from verified institutional sources. RAG Knowledge retrieves only — it does not generate original content or draw conclusions.",
  ],
  workflow: [
    "**Workflow: Curriculum Proposal — CUR-2026-0142**\n\nCurrent state: Step 3 of 6 — Committee Review\n\n```\n✓ Step 1: Draft submitted (May 12)\n✓ Step 2: Department Chair review (May 14)\n→ Step 3: Committee Review [IN PROGRESS]\n  Step 4: Dean Approval\n  Step 5: Provost Sign-off  \n  Step 6: eCatalog Publication\n```\n\nNext action required: Committee vote by May 24, 2026\nAssigned reviewers: Dr. Mitchell, Dr. Webb, Prof. Torres (2/3 confirmed)\n\n*Workflow Orchestrator executes defined logic only. Cannot modify approval criteria.*",
  ],
  reporting: [
    "**TCSG Compliance Report — ATC · Q1 2026**\n\nGenerating summary (read-only)...\n\n**Enrollment & Completion:**\n- Total enrolled: 3,493 · Active: 3,201 · Completion rate: 67.2%\n- Program completers: 847 · Transfer rate: 23%\n\n**Faculty Compliance:**\n- PD completion: 3/5 full-time faculty at 100% · 2 behind schedule\n- FERPA training: 5/5 compliant ✓\n\n**Financial Aid:**\n- SAP (Satisfactory Academic Progress) holds: 142 students\n- Pell Grant recipients: 1,847 (52.9% of enrollment)\n\nReport ready for export. *Reporting Engine summarizes only — does not make recommendations.*",
  ],
  compliance: [
    "**Compliance Scan Results — May 19, 2026**\n\n🔴 **2 Critical Flags:**\n1. **FERPA Risk** — Student record accessed by unauthorized role (user_id: u4421) at 3:14 AM. Recommend immediate audit.\n2. **NIST AI RMF Gap** — AI vendor risk assessment overdue by 14 days for Tutor Agent integration.\n\n🟡 **1 Warning:**\n- CMMC Level 2 control AC.2.006 — Account management review scheduled but not completed (due May 15)\n\n✅ **Passing:**\n- Section 508 accessibility: 94% compliance\n- Data residency: All student data within Georgia jurisdiction ✓\n- SOC 2 Type II: Controls verified ✓\n\n*Compliance Guard flags only. Remediation requires authorized personnel.*",
  ],
}

function getRandomResponse(agentId: string): string {
  const responses = MOCK_RESPONSES[agentId] ?? [
    "I'm analyzing your request. This capability is being refined — check back soon for full functionality.",
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

export interface AssistantState {
  activeAgentId: string
  messages: Record<string, Message[]> // keyed by agentId
  streamingMessageId: string | null
  streamBuffer: string
  multiAgentMode: boolean
  selectedAgentIds: string[]
  inputValue: string

  selectAgent: (agentId: string) => void
  sendMessage: (content: string) => void
  setStreamBuffer: (text: string) => void
  finalizeStream: (agentId: string, messageId: string) => void
  toggleMultiAgent: () => void
  toggleAgentSelection: (agentId: string) => void
  clearConversation: (agentId: string) => void
  setInputValue: (v: string) => void
}

export const useAssistantStore = create<AssistantState>((set, get) => ({
  activeAgentId: "tutor",
  messages: {},
  streamingMessageId: null,
  streamBuffer: "",
  multiAgentMode: false,
  selectedAgentIds: ["tutor"],
  inputValue: "",

  selectAgent: (agentId) => {
    set({ activeAgentId: agentId })
    if (!get().multiAgentMode) {
      set({ selectedAgentIds: [agentId] })
    }
  },

  sendMessage: async (content) => {
    const { activeAgentId, messages, multiAgentMode, selectedAgentIds } = get()
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const agentIds = multiAgentMode ? selectedAgentIds : [activeAgentId]

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      agentId: activeAgentId,
      content,
      streaming: false,
      timestamp: now,
    }

    set((s) => ({
      messages: {
        ...s.messages,
        [activeAgentId]: [...(s.messages[activeAgentId] ?? []), userMsg],
      },
    }))

    // Stream agent responses
    const streamText = (agentId: string, responseText: string, streamId: string) => {
      const agent = AGENTS.find((a) => a.id === agentId)
      const streamMsg: Message = {
        id: streamId,
        role: "agent",
        agentId,
        agentName: agent?.name ?? agentId,
        content: "",
        streaming: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      set((s) => ({
        messages: {
          ...s.messages,
          [activeAgentId]: [...(s.messages[activeAgentId] ?? []), streamMsg],
        },
        streamingMessageId: streamId,
      }))

      let i = 0
      const interval = setInterval(() => {
        i += 3
        const partial = responseText.slice(0, i)
        set((s) => ({
          messages: {
            ...s.messages,
            [activeAgentId]: (s.messages[activeAgentId] ?? []).map((m) =>
              m.id === streamId ? { ...m, content: partial } : m
            ),
          },
        }))
        if (i >= responseText.length) {
          clearInterval(interval)
          set((s) => ({
            messages: {
              ...s.messages,
              [activeAgentId]: (s.messages[activeAgentId] ?? []).map((m) =>
                m.id === streamId ? { ...m, content: responseText, streaming: false } : m
              ),
            },
            streamingMessageId: null,
          }))
        }
      }, 18)
    }

    for (let idx = 0; idx < agentIds.length; idx++) {
      const agentId = agentIds[idx]
      const streamId = `stream-${agentId}-${Date.now()}-${idx}`

      await new Promise<void>((resolve) => setTimeout(resolve, 600 + idx * 800))

      // Build system prompt from agent type
      const systemPromptMap: Record<string, string> = {
        tutor: "You are SERA AI Tutor. Help students learn — never do their work for them. Be encouraging, concise (under 200 words).",
        teacher: "You are SERA Teacher Assistant. Help faculty with lesson plans, rubrics, and admin tasks. Never make final grade decisions.",
        curriculum: "You are SERA Curriculum Architect. Help with course proposals and standards alignment. Never personalize to individual students.",
        assessment: "You are SERA Assessment Builder. Generate and analyze assessments. Never determine final grades.",
        district: "You are SERA District Analyst. Provide read-only KPI intelligence. Never trigger actions.",
        govcon: "You are SERA GovCon Intel. Track federal opportunities. Never submit proposals autonomously.",
        rag: "You are SERA RAG Knowledge. Retrieve from institutional knowledge base. Retrieval only, never generate original content.",
        workflow: "You are SERA Workflow Orchestrator. Execute defined workflow logic only.",
        reporting: "You are SERA Reporting Engine. Summarize compliance data only, never recommend actions.",
        compliance: "You are SERA Compliance Guard. Flag issues only, never auto-remediate.",
      }

      const agentHistory = (messages[activeAgentId] ?? []).slice(-8).map((m) => ({
        role: m.role === "user" ? "user" : "assistant" as "user" | "assistant",
        content: m.content,
      }))

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...agentHistory, { role: "user", content }],
            systemPrompt: systemPromptMap[agentId] ?? systemPromptMap.tutor,
          }),
        })
        const data = await res.json()
        const responseText = data.content ?? getRandomResponse(agentId)
        streamText(agentId, responseText, streamId)
      } catch {
        streamText(agentId, getRandomResponse(agentId), streamId)
      }
    }
  },

  setStreamBuffer: (text) => set({ streamBuffer: text }),

  finalizeStream: (agentId, messageId) => {
    set((s) => ({
      messages: {
        ...s.messages,
        [agentId]: (s.messages[agentId] ?? []).map((m) =>
          m.id === messageId ? { ...m, streaming: false } : m
        ),
      },
      streamingMessageId: null,
    }))
  },

  toggleMultiAgent: () => {
    const { multiAgentMode, activeAgentId } = get()
    set({
      multiAgentMode: !multiAgentMode,
      selectedAgentIds: [activeAgentId],
    })
  },

  toggleAgentSelection: (agentId) => {
    const { selectedAgentIds } = get()
    if (selectedAgentIds.includes(agentId)) {
      if (selectedAgentIds.length === 1) return
      set({ selectedAgentIds: selectedAgentIds.filter((id) => id !== agentId) })
    } else {
      if (selectedAgentIds.length >= 3) return // max 3 agents at once
      set({ selectedAgentIds: [...selectedAgentIds, agentId] })
    }
  },

  clearConversation: (agentId) => {
    set((s) => ({
      messages: { ...s.messages, [agentId]: [] },
      streamingMessageId: null,
    }))
  },

  setInputValue: (v) => set({ inputValue: v }),
}))
