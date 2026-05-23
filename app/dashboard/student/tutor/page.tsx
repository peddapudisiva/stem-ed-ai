"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain, Send, RefreshCw, BookOpen, ChevronDown,
  Lightbulb, Shield, Sparkles, User, Copy, ThumbsUp, ThumbsDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"
import { COURSES } from "@/lib/demo-data"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  liked?: boolean
}

const QUICK_STARTS = [
  { icon: BookOpen, text: "Explain a concept from my current course" },
  { icon: Lightbulb, text: "Help me understand why I got this wrong" },
  { icon: Sparkles, text: "Create a study plan for my upcoming exam" },
  { icon: RefreshCw, text: "Quiz me on recent lecture material" },
]

// ─── Response bank — keyed by intent ────────────────────────────────────────
const RESPONSES: Record<string, string[]> = {
  wrong: [
    "No worries — mistakes are how we learn! Let me help you figure out what happened.\n\nThe most common reasons students get this type of problem wrong are:\n\n**1. Misreading the question**\nIt's easy to skim and miss a key word like \"NOT\" or \"except\". Always re-read the question after you choose your answer.\n\n**2. Confusing similar concepts**\nFor example, mixing up `==` (equality check) and `=` (assignment) in code, or confusing mean vs. median in statistics.\n\n**3. Rushing on the last step**\nYou may have set up the problem correctly but made an arithmetic or logic error right at the end.\n\n**What to do next:**\n- Identify which step went wrong\n- Redo the problem without looking at the answer\n- Then check if your new answer matches\n\nCan you share the specific question and what answer you chose? I can give you much more targeted help!",
    "Good instinct to review your mistakes — that's exactly what strong students do.\n\nLet me walk you through a diagnostic approach:\n\n**Step 1 — Categorize the error**\n- Did you understand the concept but make a calculation mistake?\n- Did you confuse this concept with a different one?\n- Did you not know the material at all?\n\n**Step 2 — Trace back**\nWork the problem from scratch, writing every step out loud. This usually reveals exactly where the logic broke down.\n\n**Step 3 — Find the gap**\nIf you're still stuck after tracing it, that means there's a concept we need to reinforce.\n\nShare the problem with me and I'll walk through it side-by-side with you!",
  ],
  explain: [
    "Great question — let me build this up from scratch so it really sticks.\n\n**The core idea in one sentence:**\nA variable is just a named container that holds a value your program can use and change later.\n\n**Mental model:**\nThink of variables like labeled boxes on a shelf. The label is the name, the box is the memory slot, and what's inside is the value.\n\n```\nage = 20      # box labeled \"age\" holds 20\nage = age + 1 # now the box holds 21\n```\n\n**Why it matters:**\nWithout variables, every program would need to hard-code every value — you couldn't write a program that works for *any* student, only for one specific student.\n\nWant me to go deeper on data types (what kinds of things can go in the box)?",
    "Happy to explain! Let me start with the intuition before the technical definition.\n\n**Analogy first:**\nImagine you're following a recipe. A loop is like the instruction \"repeat steps 3–5 for each egg.\" Instead of writing the same steps 12 times, you write them once and say how many times to repeat.\n\n**In code:**\n```\nfor i in range(5):\n    print(f\"Egg {i+1} is cracked\")\n```\nThis prints 5 lines without copy-pasting.\n\n**Key concepts:**\n- **Iteration variable** (`i`) — tracks which repetition you're on\n- **Range** — defines how many times to loop\n- **Loop body** — the code that runs each time\n\n**Common mistake:** Off-by-one errors — `range(5)` gives 0,1,2,3,4 (not 1–5). Always double-check your start and stop values.\n\nShould I show you a real-world example using your course data?",
  ],
  study: [
    "Here's a focused 3-day study plan tailored for exam prep:\n\n**Day 1 — Active Review (2 hours)**\n- Re-read your lecture notes, but don't just highlight — write a 1-sentence summary of each section\n- List every formula or rule you need to memorize on a single page\n- Complete any practice problems from lecture slides\n\n**Day 2 — Applied Practice (2.5 hours)**\n- Attempt 5–8 practice problems without looking at notes first\n- For every problem you get wrong, spend 10 minutes understanding *why*\n- Explain the hardest concept to yourself out loud (the Feynman technique)\n\n**Day 3 — Simulate + Sleep (1.5 hours)**\n- Take a timed mock exam under real conditions\n- Review only the problems you missed\n- Stop studying 2 hours before bed — sleep consolidates memory\n\nResearch shows active recall beats re-reading by 2–3×. You've got this!",
    "Let me build you a personalized study strategy.\n\n**Know your enemy first — what's on the exam?**\nMake a list of every topic covered since the last test. Rate each one: ✅ solid / ⚠️ shaky / ❌ don't know.\n\n**Prioritize ruthlessly:**\n- ❌ topics get 60% of your study time\n- ⚠️ topics get 30%\n- ✅ topics — quick review only, don't over-study what you already know\n\n**Study session structure (Pomodoro-style):**\n- 25 min focused work → 5 min break → repeat 4× → 20 min break\n- Phone in another room during the 25-min blocks\n\n**The night before:**\n- Light review only — no new material\n- Prepare everything you need (ID, pencils, calculator) the night before\n- 8 hours of sleep is worth more than 3 more hours of cramming\n\nWant me to build a topic-by-topic breakdown based on your course outline?",
  ],
  quiz: [
    "Let's go — quiz mode activated! 🎯\n\n**Question 1 of 5:**\nWhat is the time complexity of searching for an element in a sorted array using binary search?\n\na) O(n)\nb) O(n²)\nc) O(log n)\nd) O(1)\n\nThink carefully — binary search cuts the search space in half each time. What does that tell you about the growth rate?\n\nType your answer (a, b, c, or d) and I'll explain why it's right or wrong!",
    "Quiz time! I'll ask you 5 questions, one at a time.\n\n**Question 1:**\nIn Python, what does the following code print?\n```\nx = [1, 2, 3]\nprint(x[-1])\n```\na) 1\nb) -1\nc) 3\nd) Error\n\nRemember: Python supports negative indexing. `-1` refers to the last element, `-2` to the second-to-last, and so on.\n\nWhat's your answer?",
  ],
  hello: [
    "Hi there! I'm SERA, your AI Tutor. I'm here to help you understand concepts, prepare for exams, work through problems, and build your confidence — never to do your work for you.\n\n**What I can help with:**\n- Explaining concepts from your courses\n- Walking through problems step-by-step\n- Building study plans\n- Quizzing you on material\n- Reviewing why you got something wrong\n\nWhat would you like to work on today?",
    "Hello! Great to see you. I'm ready to help you learn.\n\nA quick reminder of what I'm best at:\n- Breaking down complex topics into simple steps\n- Giving you practice problems with instant feedback\n- Helping you build a study schedule\n- Explaining the *why* behind answers, not just the *what*\n\nWhat's on your mind — a specific topic, an upcoming exam, or a question from class?",
  ],
  concept: [
    "Let me break that concept down clearly.\n\n**Definition:**\nRecursion is when a function calls itself as part of its own definition — but with a smaller or simpler version of the problem each time.\n\n**The two rules of recursion:**\n1. **Base case** — a condition where the function stops calling itself\n2. **Recursive case** — where the function calls itself with a simpler input\n\n**Example — factorial:**\n```\ndef factorial(n):\n    if n == 0:          # base case\n        return 1\n    return n * factorial(n - 1)  # recursive case\n```\n`factorial(4)` = 4 × 3 × 2 × 1 = 24\n\n**Common mistake:** Forgetting the base case causes infinite recursion (stack overflow).\n\nWould you like to try writing a recursive function yourself? I'll give you feedback!",
    "Great concept to dig into. Let me explain it with a real-world analogy first.\n\n**Object-Oriented Programming (OOP) in plain English:**\nInstead of writing a list of instructions, you model the world as *objects* — things with properties and behaviors.\n\n**Example — a Student object:**\n```\nclass Student:\n    def __init__(self, name, gpa):\n        self.name = name    # property\n        self.gpa  = gpa     # property\n\n    def is_honor_roll(self):  # behavior\n        return self.gpa >= 3.8\n```\n\n**Four pillars of OOP:**\n- **Encapsulation** — bundle data + methods together\n- **Inheritance** — child class inherits from parent\n- **Polymorphism** — same method, different behavior per class\n- **Abstraction** — hide complexity, expose only what's needed\n\nWant me to show how inheritance works with a real example?",
  ],
  grade: [
    "I can hear that you're stressed about your grade — that's completely understandable.\n\nHere's what I want you to know: one grade doesn't define your trajectory. What matters most is what you do *next*.\n\n**Immediate steps:**\n1. Review every question you got wrong — not to feel bad, but to understand the pattern\n2. Meet with your professor or TA during office hours — showing up signals that you care\n3. Check if there are extra credit opportunities or a grade recovery option\n\n**For the rest of the semester:**\n- Focus on the next assignment, not the last one\n- Consistent effort over the remaining weeks can meaningfully change your final grade\n\n**I can help you:**\n- Build a recovery study plan\n- Work through the concepts you missed\n- Practice similar problems until you feel solid\n\nWhat topic gave you the most trouble? Let's start there.",
  ],
  calculus: [
    "Calculus can feel abstract, but let's make it concrete.\n\n**The derivative — what it actually means:**\nA derivative measures *how fast something is changing* at a specific instant.\n\n- Driving a car: your speedometer shows your derivative (speed = rate of change of position)\n- `f'(x)` at any point = the slope of the tangent line at that point\n\n**The Power Rule (most used rule):**\n```\nIf f(x) = xⁿ, then f'(x) = n·xⁿ⁻¹\n\nExample:\nf(x) = x³  →  f'(x) = 3x²\nf(x) = x⁵  →  f'(x) = 5x⁴\n```\n\n**Common mistakes:**\n- Forgetting to apply chain rule with composite functions\n- Treating constants as variables (derivative of 5 is 0, not 5)\n\nWant to practice a few derivative problems together?",
  ],
  programming: [
    "Let's work through this programming concept together.\n\n**The key mental shift for new programmers:**\nA computer does *exactly* what you tell it — nothing more, nothing less. Bugs don't happen because the computer is wrong; they happen because the instructions weren't precise enough.\n\n**Debugging strategy (works 90% of the time):**\n1. **Read the error message** — Python error messages tell you the line number and type of error\n2. **Add print statements** — print variable values at each step to see where logic breaks\n3. **Rubber duck debugging** — explain your code out loud to an imaginary rubber duck; you'll often spot the error yourself\n4. **Isolate the problem** — comment out sections until the bug disappears, then narrow down\n\n**Most common Python errors:**\n- `IndentationError` — Python uses whitespace for structure\n- `NameError` — using a variable before defining it\n- `TypeError` — wrong data type (e.g., adding a string to a number)\n- `IndexError` — accessing a list index that doesn't exist\n\nShare your code and error message and I'll help you fix it!",
  ],
  summarize: [
    "Here's a concise summary of the key topics you should know:\n\n**Core concepts (high exam weight):**\n1. Variables and data types — int, float, string, bool, list\n2. Control flow — if/elif/else, for loops, while loops\n3. Functions — defining, calling, parameters, return values\n4. Lists and dictionaries — indexing, iteration, common methods\n\n**Medium priority:**\n- String methods (`.split()`, `.strip()`, `.format()`)\n- File I/O basics\n- Error handling with try/except\n\n**Lower priority (know the concept, not every detail):**\n- Classes and objects\n- List comprehensions\n- Importing modules\n\n**Study tip:** If you can *explain* a concept without looking at notes, you know it. If you can only recognize it when you see it, you need more practice.\n\nWant me to quiz you on any of these areas?",
  ],
  fallback: [
    "That's a thoughtful question! Let me address it directly.\n\nBased on what you've asked, I think the key thing to understand here is the relationship between the inputs and the expected output. In most problems like this, there's usually a pattern or rule that connects them.\n\n**My suggestion:**\n- Start by identifying what you *know* vs. what you're trying to find\n- Write out the relationship between those two things\n- Then apply the relevant formula, rule, or logic\n\nIf you can share more context — like the specific problem, formula, or topic from your course — I can give you a much more targeted answer. What class is this for, and what chapter or module does it come from?",
    "Good question! Let me think through this with you.\n\nThe best way I can help is if you give me a bit more context:\n- What specific topic or assignment is this from?\n- What have you tried so far?\n- Where exactly did you get stuck?\n\nIn the meantime, here's a general approach that works for most academic problems:\n\n**The IDEAL framework:**\n1. **I**dentify the problem clearly\n2. **D**efine what you already know\n3. **E**xplore possible strategies\n4. **A**ct on the best strategy\n5. **L**ook back — does the answer make sense?\n\nShare more details and I'll walk through it step by step with you!",
    "I want to make sure I give you the most helpful answer possible.\n\nCould you tell me a bit more about:\n- **The subject** — which of your courses is this from?\n- **The specific concept** — what topic does this fall under?\n- **Where you're stuck** — is it understanding the concept, applying it, or something else?\n\nMeanwhile, a useful habit: whenever you encounter something you don't understand, ask yourself:\n1. Can I define this in my own words?\n2. Can I give an example?\n3. Can I solve a basic problem using it?\n\nIf you can't do all three, that's exactly where to focus. Which one are you struggling with right now?",
  ],
}

// Rotation counters so the same intent gives a different response each time
const intentCounters: Record<string, number> = {}

function pick(key: string): string {
  const arr = RESPONSES[key] ?? RESPONSES.fallback
  const i = (intentCounters[key] ?? 0) % arr.length
  intentCounters[key] = i + 1
  return arr[i]
}

function getResponse(msg: string): string {
  const q = msg.toLowerCase()

  // Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|howdy|sup)\b/.test(q)) return pick("hello")

  // Wrong answer / mistake review
  if (/wrong|got it wrong|missed|incorrect|mistake|didn.t get|don.t understand why|why did i|failed|fail/.test(q)) return pick("wrong")

  // Grade / score anxiety
  if (/grade|gpa|score|failed|failing|bad grade|low score|disappointed/.test(q)) return pick("grade")

  // Study plan / exam prep
  if (/study plan|study schedule|exam prep|prepare for|how to study|when.s the exam|exam is|test is|midterm|final/.test(q)) return pick("study")

  // Quiz / practice questions
  if (/quiz me|test me|give me (a |some )?questions?|practice (problems?|questions?)|can you test|ask me/.test(q)) return pick("quiz")

  // Summarize / overview
  if (/summar|overview|outline|what.s on the (exam|test|quiz)|key topics|what should i know|what do i need/.test(q)) return pick("summarize")

  // Calculus specific
  if (/calculus|derivative|integral|limit|differentiat|dy.dx|slope|tangent|chain rule|power rule/.test(q)) return pick("calculus")

  // Programming / coding
  if (/code|program|python|function|loop|variable|debug|error|syntax|class|object|array|list|algorithm|runtime|complexity/.test(q)) return pick("programming")

  // Concept explanation
  if (/explain|what is|what are|what does|how does|how do|tell me about|define|definition|concept|mean|difference between/.test(q)) return pick("explain")

  // General concept (recursion, OOP, etc.)
  if (/recursion|recursive|inherit|polymorphism|encapsulat|abstraction|sorting|searching|hash|stack|queue|tree|graph/.test(q)) return pick("concept")

  // Fallback — rotates through 3 different responses
  return pick("fallback")
}

function formatContent(text: string) {
  const lines = text.split("\n")
  return lines.map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return <p key={i} className="font-semibold text-[#18181B] mt-2 mb-1">{line.replace(/\*\*/g, "")}</p>
    }
    if (line.match(/^\d+\./)) {
      return <li key={i} className="ml-4 list-decimal text-[#52525B]">{line.replace(/^\d+\.\s/, "")}</li>
    }
    if (line.startsWith("- ")) {
      return <li key={i} className="ml-4 list-disc text-[#52525B]">{line.replace(/^- /, "")}</li>
    }
    if (line.startsWith("a)") || line.startsWith("b)") || line.startsWith("c)") || line.startsWith("d)")) {
      return <p key={i} className="ml-4 text-[#52525B] py-0.5">{line}</p>
    }
    if (!line.trim()) return <br key={i} />
    return <p key={i} className="text-[#52525B]">{line}</p>
  })
}

export default function TutorPage() {
  const [messages,    setMessages]    = useState<Message[]>([])
  const [input,       setInput]       = useState("")
  const [isTyping,    setIsTyping]    = useState(false)
  const [course,      setCourse]      = useState(COURSES[0].id)
  const [showCourses, setShowCourses] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const selectedCourse = COURSES.find((c) => c.id === course) ?? COURSES[0]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  async function sendMessage(text: string = input.trim()) {
    if (!text) return
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text, timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    try {
      const history = messages.slice(-10).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }))
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...history, { role: "user", content: text }],
          systemPrompt: `You are SERA, an AI academic tutor for the course ${selectedCourse.code} — ${selectedCourse.title}. Help the student understand course material, work through problems, and develop study strategies. Be encouraging and concise (under 200 words). Never complete assignments for the student — guide them to find the answer themselves.`,
        }),
      })
      const data = await res.json()
      const content = data.content ?? getResponse(text)
      const aiMsg: Message = { id: `a-${Date.now()}`, role: "assistant", content, timestamp: new Date() }
      setMessages((prev) => [...prev, aiMsg])
    } catch {
      // Fallback to demo responses if API unavailable
      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: getResponse(text),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMsg])
    } finally {
      setIsTyping(false)
    }
  }

  function toggleLike(id: string, val: boolean) {
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, liked: m.liked === val ? undefined : val } : m))
  }

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 animate-fade-up">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#4F46E5]">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="page-title leading-tight">AI Tutor</h1>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
                <p className="text-xs text-[#A1A1AA]">Tutor Agent · Online</p>
              </div>
            </div>
          </div>

          {/* Course selector */}
          <div className="relative">
            <button onClick={() => setShowCourses(!showCourses)}
              className="flex items-center gap-2 rounded-xl border border-[#E8E6E1] bg-white px-4 py-2 text-sm text-[#52525B] hover:bg-[#FAFAF9]">
              <BookOpen className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span className="font-medium text-[#18181B]">{selectedCourse.code}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {showCourses && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                  className="absolute right-0 top-full z-20 mt-1.5 w-[260px] overflow-hidden rounded-xl border border-[#E8E6E1] bg-white shadow-lg">
                  {COURSES.map((c) => (
                    <button key={c.id} onClick={() => { setCourse(c.id); setShowCourses(false) }}
                      className={cn("flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-[#FAFAF9]",
                        c.id === course && "bg-[#EEF2FF]")}>
                      <div>
                        <p className="text-sm font-medium text-[#18181B]">{c.code}</p>
                        <p className="text-[11px] text-[#A1A1AA]">{c.title}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* FERPA boundary notice */}
        <div className="flex items-center gap-2 rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] px-4 py-2.5 shrink-0">
          <Shield className="h-3.5 w-3.5 shrink-0 text-[#D97706]" />
          <p className="text-[11px] text-[#92400E]">
            <strong>Tutor AI boundary:</strong> This agent explains concepts and guides learning. It never submits assignments, determines grades, or accesses other students' data.
          </p>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto rounded-xl border border-[#E8E6E1] bg-white">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2FF]">
                <Brain className="h-7 w-7 text-[#4F46E5]" />
              </div>
              <p className="mb-1 text-base font-semibold text-[#18181B]">Hi, I'm your SERA Tutor!</p>
              <p className="mb-6 text-sm text-[#A1A1AA] text-center max-w-xs">
                I'm here to help you understand concepts from <strong>{selectedCourse.code} — {selectedCourse.title}</strong>. Ask me anything!
              </p>
              <div className="grid gap-2 w-full max-w-sm">
                {QUICK_STARTS.map((qs) => {
                  const Icon = qs.icon
                  return (
                    <button key={qs.text} onClick={() => sendMessage(qs.text)}
                      className="flex items-center gap-3 rounded-xl border border-[#E8E6E1] px-4 py-3 text-left text-sm text-[#52525B] hover:border-[#C7D2FE] hover:bg-[#EEF2FF] hover:text-[#4F46E5] transition-all">
                      <Icon className="h-4 w-4 shrink-0" />
                      {qs.text}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {messages.map((msg, i) => (
                <motion.div key={msg.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i === messages.length - 1 ? 0 : 0 }}
                  className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}>
                  {/* Avatar */}
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                    msg.role === "assistant" ? "bg-[#4F46E5]" : "bg-[#F4F4F2]")}>
                    {msg.role === "assistant"
                      ? <Brain className="h-4 w-4 text-white" />
                      : <User className="h-4 w-4 text-[#52525B]" />
                    }
                  </div>
                  <div className={cn("max-w-[75%] space-y-1", msg.role === "user" && "items-end flex flex-col")}>
                    <div className={cn("rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      msg.role === "assistant"
                        ? "bg-[#F8F8FF] border border-[#E8E6E1]"
                        : "bg-[#4F46E5] text-white"
                    )}>
                      {msg.role === "assistant"
                        ? <div className="space-y-1">{formatContent(msg.content)}</div>
                        : msg.content
                      }
                    </div>
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-2 px-1">
                        <button onClick={() => navigator.clipboard.writeText(msg.content)}
                          className="flex items-center gap-1 text-[10px] text-[#A1A1AA] hover:text-[#52525B]">
                          <Copy className="h-3 w-3" /> Copy
                        </button>
                        <button onClick={() => toggleLike(msg.id, true)}
                          className={cn("flex items-center gap-1 text-[10px] hover:text-[#059669]",
                            msg.liked === true ? "text-[#059669]" : "text-[#A1A1AA]")}>
                          <ThumbsUp className="h-3 w-3" />
                        </button>
                        <button onClick={() => toggleLike(msg.id, false)}
                          className={cn("flex items-center gap-1 text-[10px] hover:text-[#DC2626]",
                            msg.liked === false ? "text-[#DC2626]" : "text-[#A1A1AA]")}>
                          <ThumbsDown className="h-3 w-3" />
                        </button>
                        <span className="text-[10px] text-[#A1A1AA]">
                          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#4F46E5]">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl border border-[#E8E6E1] bg-[#F8F8FF] px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} className="h-2 w-2 rounded-full bg-[#4F46E5]"
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0">
          <div className="flex items-end gap-2 rounded-xl border border-[#E8E6E1] bg-white px-4 py-3 focus-within:border-[#4F46E5] transition-colors">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
              placeholder={`Ask anything about ${selectedCourse.code}…`}
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-[#18181B] placeholder:text-[#A1A1AA] outline-none max-h-32"
              style={{ overflowY: "auto" }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] disabled:opacity-40 transition-opacity">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-1.5 text-center text-[10px] text-[#A1A1AA]">
            SERA Tutor guides learning · Never grades, never submits work on your behalf
          </p>
        </div>
      </div>
    </AppShell>
  )
}
