"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Brain, ArrowRight, ArrowLeft, Check, X,
  GraduationCap, BookOpen, Building2, BarChart3,
  ScrollText, Globe, Baby, Cpu,
  LayoutDashboard, Command, Bell, Sparkles, BarChart2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useAuthStore, type AuthRole, ROLE_HOME } from "@/lib/auth-store"
import { AnimatedBackground } from "@/components/ui/animated-background"

type Role = AuthRole

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

const ROLE_LABELS: Record<Role, string> = {
  student: "Student",
  teacher: "Teacher",
  admin: "Admin / Principal",
  district_leader: "District Leader",
  curriculum_committee: "Curriculum Committee",
  govcon: "GovCon / Leadership",
  parent: "Parent / Guardian",
  cyber_it: "IT / Cyber",
}

const TOUR_STEPS = [
  {
    icon: LayoutDashboard,
    title: "Your role dashboard",
    description: "Everything important to your role, in one place. It adapts based on what you do.",
    color: "#4F46E5",
    bg: "#EEF2FF",
  },
  {
    icon: Command,
    title: "Press ⌘K to jump anywhere",
    description: "Search students, courses, proposals, and settings without leaving your keyboard.",
    color: "#059669",
    bg: "#ECFDF5",
  },
  {
    icon: Bell,
    title: "We notify you about what matters",
    description: "At-risk student alerts, proposal updates, and PD deadlines — all in one drawer.",
    color: "#D97706",
    bg: "#FFFBEB",
  },
  {
    icon: Sparkles,
    title: "10 AI agents on your team",
    description: "Each agent has a specific job and clear boundaries. No black boxes. Full audit trail.",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    icon: BarChart2,
    title: "Retention intelligence built in",
    description: "SKORA monitors 3,493 students at ATC. You'll see the data that actually moves the needle.",
    color: "#B8860B",
    bg: "#FEFCE8",
  },
]

const ROLE_OPTIONS: { id: Role; label: string; icon: React.ElementType }[] = [
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "teacher", label: "Teacher", icon: BookOpen },
  { id: "admin", label: "Admin", icon: Building2 },
  { id: "district_leader", label: "District Leader", icon: BarChart3 },
  { id: "curriculum_committee", label: "Curriculum", icon: ScrollText },
  { id: "govcon", label: "GovCon", icon: Globe },
  { id: "parent", label: "Parent", icon: Baby },
  { id: "cyber_it", label: "IT / Cyber", icon: Cpu },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user, completeOnboarding, setUser } = useAuthStore()

  const [step, setStep] = useState(0)
  const [selectedRole, setSelectedRole] = useState<Role>(user?.role ?? "student")
  const [selectedInstitution, setSelectedInstitution] = useState(user?.institution ?? "Atlanta Technical College")
  const [tourStep, setTourStep] = useState(0)
  const [inTour, setInTour] = useState(false)

  const INSTITUTIONS = ["Atlanta Technical College", "Georgia Southern University", "Kennesaw State University", "Other"]

  const handleFinish = () => {
    completeOnboarding()
    if (user) {
      setUser({ ...user, role: selectedRole, institution: selectedInstitution, hasOnboarded: true })
    }
    router.push(ROLE_HOME[selectedRole])
  }

  const handleSkip = () => {
    completeOnboarding()
    router.push(ROLE_HOME[selectedRole])
  }

  const currentTour = TOUR_STEPS[tourStep]

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAF9] px-4">
      <AnimatedBackground />

      {/* Skip */}
      <button
        onClick={handleSkip}
        className="absolute right-6 top-6 z-20 flex items-center gap-1.5 text-sm text-[#A1A1AA] hover:text-[#52525B] transition-colors"
      >
        Skip onboarding <X className="h-3.5 w-3.5" />
      </button>

      <div className="relative z-10 w-full max-w-lg">

        <AnimatePresence mode="wait">

          {/* Step 0 — Welcome */}
          {step === 0 && !inTour && (
            <motion.div key="welcome"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2FF]">
                <Brain className="h-8 w-8 text-[#4F46E5]" />
              </div>
              <h1 className="font-display text-4xl tracking-tight text-[#18181B]">
                Welcome to STEM-ED-AI
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#52525B]">
                Let&rsquo;s set up your workspace in under 60 seconds. You can always change these settings later.
              </p>

              {/* Progress dots */}
              <div className="mt-8 flex items-center justify-center gap-1.5">
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className={cn("h-1.5 rounded-full transition-all",
                    i === step ? "w-5 bg-[#4F46E5]" : "w-1.5 bg-[#E8E6E1]"
                  )} />
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="mt-8 flex h-11 items-center gap-2 rounded-xl bg-[#4F46E5] px-8 text-sm font-medium text-white transition-all hover:bg-[#4338CA] hover:-translate-y-px mx-auto"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* Step 1 — Role confirmation */}
          {step === 1 && !inTour && (
            <motion.div key="role"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-3xl tracking-tight text-[#18181B]">Which best describes you?</h1>
              <p className="mt-2 text-sm text-[#52525B]">Confirm or update your role.</p>

              <div className="mt-5 grid grid-cols-4 gap-2.5">
                {ROLE_OPTIONS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedRole(id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border p-3 transition-all",
                      selectedRole === id
                        ? "border-[#4F46E5] bg-[#EEF2FF] ring-2 ring-[#4F46E5]/20"
                        : "border-[#E8E6E1] hover:border-[#D6D3CC] hover:-translate-y-px"
                    )}
                  >
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg",
                      selectedRole === id ? "bg-[#4F46E5]" : "bg-[#F4F4F2]"
                    )}>
                      <Icon className={cn("h-4 w-4", selectedRole === id ? "text-white" : "text-[#52525B]")} />
                    </div>
                    <span className={cn("text-center text-[11px] font-medium",
                      selectedRole === id ? "text-[#4F46E5]" : "text-[#52525B]"
                    )}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-center gap-1.5">
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className={cn("h-1.5 rounded-full transition-all",
                    i === 1 ? "w-5 bg-[#4F46E5]" : i < 1 ? "w-1.5 bg-[#4F46E5]/40" : "w-1.5 bg-[#E8E6E1]"
                  )} />
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(0)} className="flex items-center gap-1.5 text-sm text-[#52525B] hover:text-[#18181B]">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button onClick={() => setStep(2)}
                  className="flex items-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4338CA]">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2 — Institution */}
          {step === 2 && !inTour && (
            <motion.div key="institution"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-3xl tracking-tight text-[#18181B]">Where do you work or study?</h1>
              <p className="mt-2 text-sm text-[#52525B]">Confirm your institution.</p>

              <div className="mt-5 space-y-2">
                {INSTITUTIONS.map((inst) => (
                  <button key={inst} onClick={() => setSelectedInstitution(inst)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all",
                      selectedInstitution === inst
                        ? "border-[#4F46E5] bg-[#EEF2FF] ring-2 ring-[#4F46E5]/20"
                        : "border-[#E8E6E1] hover:border-[#D6D3CC]"
                    )}
                  >
                    <span className="text-sm font-medium text-[#18181B]">{inst}</span>
                    {selectedInstitution === inst && <Check className="h-4 w-4 text-[#4F46E5]" />}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-center gap-1.5">
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className={cn("h-1.5 rounded-full transition-all",
                    i === 2 ? "w-5 bg-[#4F46E5]" : i < 2 ? "w-1.5 bg-[#4F46E5]/40" : "w-1.5 bg-[#E8E6E1]"
                  )} />
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm text-[#52525B] hover:text-[#18181B]">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button onClick={() => setStep(3)}
                  className="flex items-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4338CA]">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Complete */}
          {step === 3 && !inTour && (
            <motion.div key="complete"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ECFDF5]">
                <Check className="h-8 w-8 text-[#059669]" />
              </div>
              <h1 className="font-display text-3xl tracking-tight text-[#18181B]">
                You&rsquo;re all set, {user?.name?.split(" ")[0] ?? "there"}
              </h1>
              <p className="mt-2 text-sm text-[#52525B]">
                Your workspace is ready. Take a 2-minute tour to learn the key features.
              </p>

              <div className="mt-5 rounded-xl border border-[#E8E6E1] bg-[#FAFAF9] p-4 text-left">
                <div className="flex items-center gap-2.5">
                  {(() => { const Icon = ROLE_ICONS[selectedRole]; return <Icon className="h-4 w-4 text-[#52525B]" /> })()}
                  <span className="text-sm font-medium text-[#18181B]">{ROLE_LABELS[selectedRole]}</span>
                  <span className="text-[#A1A1AA]">·</span>
                  <span className="text-sm text-[#52525B]">{selectedInstitution}</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-1.5">
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className={cn("h-1.5 rounded-full transition-all",
                    i <= 3 ? "w-1.5 bg-[#4F46E5]/40" : "w-1.5 bg-[#E8E6E1]"
                  )} />
                ))}
              </div>

              <div className="mt-7 flex flex-col items-center gap-3">
                <button
                  onClick={() => { setTourStep(0); setInTour(true); setStep(4) }}
                  className="flex h-11 items-center gap-2 rounded-xl bg-[#4F46E5] px-8 text-sm font-medium text-white hover:bg-[#4338CA] hover:-translate-y-px transition-all"
                >
                  Take the tour <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={handleFinish} className="text-sm text-[#A1A1AA] hover:text-[#52525B] transition-colors">
                  Skip to dashboard
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4 — Product tour */}
          {step === 4 && inTour && (
            <motion.div key={`tour-${tourStep}`}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Tour card */}
              <div className="rounded-2xl border border-[#E8E6E1] bg-white p-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#A1A1AA]">
                    {tourStep + 1} of {TOUR_STEPS.length}
                  </span>
                  <button onClick={handleFinish} className="text-xs text-[#A1A1AA] hover:text-[#52525B]">
                    Skip tour
                  </button>
                </div>

                <div className="my-6 flex justify-center">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-2xl"
                    style={{ background: currentTour.bg }}
                  >
                    <currentTour.icon className="h-10 w-10" style={{ color: currentTour.color }} />
                  </div>
                </div>

                <h2 className="font-display text-2xl tracking-tight text-[#18181B] text-center">
                  {currentTour.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#52525B] text-center">
                  {currentTour.description}
                </p>

                {/* Dot progress */}
                <div className="mt-7 flex items-center justify-center gap-1.5">
                  {TOUR_STEPS.map((_, i) => (
                    <div key={i} className={cn("h-1.5 rounded-full transition-all",
                      i === tourStep ? "w-5 bg-[#4F46E5]" : i < tourStep ? "w-1.5 bg-[#4F46E5]/40" : "w-1.5 bg-[#E8E6E1]"
                    )} />
                  ))}
                </div>

                <div className="mt-6 flex justify-between">
                  {tourStep > 0 ? (
                    <button onClick={() => setTourStep(tourStep - 1)}
                      className="flex items-center gap-1.5 text-sm text-[#52525B] hover:text-[#18181B]">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                  ) : <div />}

                  {tourStep < TOUR_STEPS.length - 1 ? (
                    <button onClick={() => setTourStep(tourStep + 1)}
                      className="flex items-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4338CA]">
                      Next <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button onClick={handleFinish}
                      className="flex items-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4338CA]">
                      Go to my dashboard <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
