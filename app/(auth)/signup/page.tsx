"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Brain, ArrowRight, ArrowLeft, Check,
  GraduationCap, BookOpen, Building2, BarChart3,
  ScrollText, Globe, Baby, Cpu, Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore, type AuthRole, ROLE_HOME } from "@/lib/auth-store"
import { INSTITUTIONS } from "@/lib/demo-data"
import { AnimatedBackground } from "@/components/ui/animated-background"

type Role = AuthRole

interface RoleOption {
  id: Role
  label: string
  description: string
  icon: React.ElementType
}

const ROLE_OPTIONS: RoleOption[] = [
  { id: "student", label: "Student", description: "Courses, AI tutor & credentials", icon: GraduationCap },
  { id: "teacher", label: "Teacher", description: "Classes, grades & lesson generator", icon: BookOpen },
  { id: "admin", label: "Admin / Principal", description: "School-wide KPIs & faculty tracker", icon: Building2 },
  { id: "district_leader", label: "District Leader", description: "Multi-institution retention & reports", icon: BarChart3 },
  { id: "curriculum_committee", label: "Curriculum Committee", description: "Proposals, approvals & eCatalog", icon: ScrollText },
  { id: "govcon", label: "GovCon / Leadership", description: "SAM.gov opportunities & pipeline", icon: Globe },
  { id: "parent", label: "Parent / Guardian", description: "Child progress, grades & fees", icon: Baby },
  { id: "cyber_it", label: "IT / Cyber", description: "NIST RMF, FERPA & audit logs", icon: Cpu },
]

const GOALS_BY_ROLE: Record<Role, string[]> = {
  student: ["Get better grades", "Stay on track with assignments", "Connect with a mentor", "Earn workforce credentials"],
  teacher: ["Reduce time grading", "Generate better lesson plans", "Identify struggling students earlier", "Track standards mastery"],
  admin: ["Improve retention rates", "Monitor faculty PD compliance", "Generate accreditation reports", "Track at-risk students"],
  district_leader: ["Compare school performance", "Hit 73% retention target", "Track GovCon pipeline", "Streamline reporting"],
  curriculum_committee: ["Speed up proposal approvals", "AI-assisted curriculum review", "Maintain eCatalog accuracy", "ABET alignment checking"],
  govcon: ["Track SAM.gov opportunities", "Manage proposal pipeline", "Monitor CMMC compliance", "Calculate ROI"],
  parent: ["Monitor my child's attendance", "See grades in real time", "Message teachers easily", "Pay fees online"],
  cyber_it: ["Achieve NIST AI RMF score", "Monitor FERPA compliance", "Review AI vendor risk", "Manage audit logs"],
}

const STEPS = ["Role", "Institution", "Details", "Done"]

interface FormState {
  role: Role | null
  institution: string
  firstName: string
  lastName: string
  email: string
  password: string
  goals: string[]
}

export default function SignupPage() {
  const router = useRouter()
  const { signIn, isLoading } = useAuthStore()

  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>({
    role: null, institution: "",
    firstName: "", lastName: "", email: "", password: "", goals: [],
  })

  const canProceed = () => {
    if (step === 0) return !!form.role
    if (step === 1) return !!form.institution
    if (step === 2) return !!form.firstName && !!form.lastName && !!form.email && !!form.password
    return true
  }

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      await signIn(form.email, form.password)
      router.push("/onboarding")
    }
  }

  const toggleGoal = (goal: string) => {
    setForm((f) => ({
      ...f,
      goals: f.goals.includes(goal) ? f.goals.filter((g) => g !== goal) : [...f.goals, goal],
    }))
  }

  const goals = form.role ? GOALS_BY_ROLE[form.role] : []

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAF9] px-4 py-12">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-lg">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4F46E5]">
              <Brain className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-display text-[15px] tracking-tight text-[#18181B]">STEM-ED-AI</span>
          </Link>
          <Link href="/login" className="text-xs text-[#A1A1AA] hover:text-[#52525B] transition-colors">
            Have an account? Sign in →
          </Link>
        </div>

        {/* Progress */}
        <div className="mb-8 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition-all",
                i < step ? "bg-[#059669] text-white" :
                i === step ? "bg-[#4F46E5] text-white" :
                "bg-[#F4F4F2] text-[#A1A1AA]"
              )}>
                {i < step ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span className={cn("text-xs", i === step ? "font-medium text-[#18181B]" : "text-[#A1A1AA]")}>
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={cn("h-px w-6 transition-colors", i < step ? "bg-[#059669]" : "bg-[#E8E6E1]")} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#E8E6E1] bg-white p-8">

          {/* Step 0 — Role */}
          {step === 0 && (
            <div>
              <h1 className="font-display text-2xl tracking-tight text-[#18181B]">Which best describes you?</h1>
              <p className="mt-1.5 text-sm text-[#52525B]">Your role determines your dashboard and AI agents.</p>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {ROLE_OPTIONS.map(({ id, label, description, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setForm({ ...form, role: id })}
                    className={cn(
                      "flex flex-col items-start gap-2 rounded-xl border p-3.5 text-left transition-all",
                      form.role === id
                        ? "border-[#4F46E5] bg-[#EEF2FF] ring-2 ring-[#4F46E5]/20"
                        : "border-[#E8E6E1] hover:border-[#D6D3CC] hover:-translate-y-px"
                    )}
                  >
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg",
                      form.role === id ? "bg-[#4F46E5]" : "bg-[#F4F4F2]"
                    )}>
                      <Icon className={cn("h-4 w-4", form.role === id ? "text-white" : "text-[#52525B]")} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#18181B]">{label}</p>
                      <p className="text-[11px] text-[#A1A1AA]">{description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 — Institution */}
          {step === 1 && (
            <div>
              <h1 className="font-display text-2xl tracking-tight text-[#18181B]">Where do you work or study?</h1>
              <p className="mt-1.5 text-sm text-[#52525B]">Your institution sets your data and compliance config.</p>
              <div className="mt-5 space-y-2">
                {[...INSTITUTIONS, { id: "other", name: "Another institution", shortName: "Other", students: 0, retention: 0, target: 0, state: "GA" } as const].map((inst) => (
                  <button
                    key={inst.id}
                    onClick={() => setForm({ ...form, institution: inst.name })}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all",
                      form.institution === inst.name
                        ? "border-[#4F46E5] bg-[#EEF2FF] ring-2 ring-[#4F46E5]/20"
                        : "border-[#E8E6E1] hover:border-[#D6D3CC]"
                    )}
                  >
                    <div>
                      <p className="text-sm font-medium text-[#18181B]">{inst.name}</p>
                      {inst.students > 0 && (
                        <p className="font-mono text-[11px] text-[#A1A1AA]">{inst.students.toLocaleString()} students · {inst.state}</p>
                      )}
                    </div>
                    {form.institution === inst.name && <Check className="h-4 w-4 text-[#4F46E5]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Details + Goals */}
          {step === 2 && (
            <div>
              <h1 className="font-display text-2xl tracking-tight text-[#18181B]">Create your account</h1>
              <p className="mt-1.5 text-sm text-[#52525B]">Use your institutional email for full access.</p>
              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#18181B]">First name</label>
                    <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="Alex"
                      className="h-10 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm outline-none transition-colors focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#18181B]">Last name</label>
                    <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="Chen"
                      className="h-10 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm outline-none transition-colors focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#18181B]">Institutional email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@institution.edu"
                    className="h-10 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm outline-none transition-colors focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#18181B]">Password</label>
                  <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Min 8 characters"
                    className="h-10 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm outline-none transition-colors focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10" />
                </div>
                {goals.length > 0 && (
                  <div>
                    <label className="mb-2 block text-xs font-medium text-[#18181B]">
                      What do you want to focus on first? <span className="text-[#A1A1AA]">(pick any)</span>
                    </label>
                    <div className="space-y-2">
                      {goals.map((goal) => (
                        <button key={goal} type="button" onClick={() => toggleGoal(goal)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
                            form.goals.includes(goal)
                              ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                              : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
                          )}
                        >
                          <div className={cn("flex h-4 w-4 items-center justify-center rounded border",
                            form.goals.includes(goal) ? "border-[#4F46E5] bg-[#4F46E5]" : "border-[#D6D3CC]"
                          )}>
                            {form.goals.includes(goal) && <Check className="h-2.5 w-2.5 text-white" />}
                          </div>
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3 — Done */}
          {step === 3 && (
            <div className="text-center py-4">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2FF]">
                <Check className="h-8 w-8 text-[#4F46E5]" />
              </div>
              <h1 className="font-display text-2xl tracking-tight text-[#18181B]">You&rsquo;re all set</h1>
              <p className="mt-2 text-sm text-[#52525B]">Welcome to STEM-ED-AI. Let&rsquo;s get you oriented.</p>
              <div className="mt-4 rounded-xl border border-[#E8E6E1] bg-[#FAFAF9] p-3 text-left">
                <p className="text-xs text-[#52525B]">
                  <span className="font-medium text-[#18181B]">{form.firstName} {form.lastName}</span>
                  {" · "}{form.role?.replace(/_/g, " ")}
                  {" · "}{form.institution}
                </p>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className={cn("mt-7 flex", step > 0 && step < 3 ? "justify-between" : "justify-end")}>
            {step > 0 && step < 3 && (
              <button onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 text-sm text-[#52525B] hover:text-[#18181B] transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
              className="flex items-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4338CA] disabled:opacity-40"
            >
              {isLoading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Creating account…</>
              ) : step === 3 ? (
                <>Take the tour <ArrowRight className="h-4 w-4" /></>
              ) : (
                <>Continue <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </div>
        </div>

        <p className="mt-5 text-center font-mono text-[10px] text-[#A1A1AA]">
          SERA Neural Labs · FERPA Compliant · Data stays within your institution
        </p>
      </div>
    </div>
  )
}
