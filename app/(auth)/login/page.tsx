"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Brain, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuthStore, ROLE_HOME } from "@/lib/auth-store"
import { AnimatedBackground } from "@/components/ui/animated-background"

const DEMO_ACCOUNTS = [
  { label: "Student",    email: "student@atc.edu" },
  { label: "Teacher",    email: "teacher@atc.edu" },
  { label: "Admin",      email: "admin@atc.edu" },
  { label: "District",   email: "district@tcsg.edu" },
  { label: "Curriculum", email: "curriculum@gsu.edu" },
  { label: "GovCon",     email: "govcon@sera.ai" },
  { label: "Parent",     email: "parent@atc.edu" },
  { label: "Cyber/IT",   email: "cyber@atc.edu" },
]

const QUOTES = [
  {
    text: "We can see a student trending toward dropout before the midterm. That changes everything.",
    author: "Dr. J. Mitchell · VP Academic Affairs, ATC",
  },
  {
    text: "The AI curriculum workflow alone saved our committee 40 hours per semester.",
    author: "Dr. M. Webb · Faculty Senate Chair, GSU",
  },
]

export default function LoginPage() {
  const router = useRouter()
  const { signIn, isLoading } = useAuthStore()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const quoteIndex = 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email) { setError("Email is required."); return }
    try {
      await signIn(email, password)
      const user = useAuthStore.getState().user
      if (user && !user.hasOnboarded) {
        router.push("/onboarding")
      } else if (user) {
        router.push(ROLE_HOME[user.role])
      }
    } catch {
      setError("Couldn't sign you in. Check your credentials and try again.")
    }
  }

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail)
    setError("")
    await signIn(demoEmail, "demo")
    const user = useAuthStore.getState().user
    if (user && !user.hasOnboarded) {
      router.push("/onboarding")
    } else if (user) {
      router.push(ROLE_HOME[user.role])
    }
  }

  const quote = QUOTES[quoteIndex]

  return (
    <div className="relative flex min-h-screen">
      <AnimatedBackground />

      {/* Left panel — editorial */}
      <div className="relative z-10 hidden w-1/2 flex-col justify-between bg-[#18181B] p-12 lg:flex">
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise-login">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-login)" />
          </svg>
        </div>
        {/* Indigo orb */}
        <div
          className="absolute -right-20 top-1/4 h-80 w-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #4F46E5, transparent)", filter: "blur(60px)" }}
        />

        <Link href="/" className="relative flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5]">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-[16px] tracking-tight text-white">STEM-ED-AI</span>
        </Link>

        <div className="relative">
          <blockquote className="font-display text-2xl leading-relaxed text-white lg:text-3xl">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <p className="mt-5 font-mono text-xs text-white/40">{quote.author}</p>
        </div>

        <div className="relative flex items-center gap-6">
          <div className="text-center">
            <p className="font-display text-2xl text-white">3,493</p>
            <p className="mt-0.5 font-mono text-[10px] text-white/40 uppercase tracking-widest">Students</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="font-display text-2xl text-white">73%</p>
            <p className="mt-0.5 font-mono text-[10px] text-white/40 uppercase tracking-widest">Retention target</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="font-display text-2xl text-white">10</p>
            <p className="mt-0.5 font-mono text-[10px] text-white/40 uppercase tracking-widest">AI agents</p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4F46E5]">
            <Brain className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-display text-[15px] tracking-tight text-[#18181B]">STEM-ED-AI</span>
        </Link>

        <div className="w-full max-w-sm">
          <h1 className="font-display text-[28px] tracking-tight text-[#18181B]">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-[#52525B]">
            Sign in to your institution&rsquo;s workspace
          </p>

          {/* Demo quick-access */}
          <div className="mt-6 rounded-xl border border-[#E8E6E1] bg-[#FAFAF9] p-3">
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
              Demo accounts
            </p>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_ACCOUNTS.map((d) => (
                <button
                  key={d.email}
                  onClick={() => handleDemoLogin(d.email)}
                  disabled={isLoading}
                  className="rounded-lg border border-[#E8E6E1] bg-white px-3 py-1.5 text-xs font-medium text-[#52525B] transition-colors hover:border-[#4F46E5] hover:text-[#4F46E5] disabled:opacity-50"
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E8E6E1]" />
            <span className="text-xs text-[#A1A1AA]">or sign in with email</span>
            <div className="h-px flex-1 bg-[#E8E6E1]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#18181B]">
                Institutional email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@institution.edu"
                className="h-10 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 text-sm text-[#18181B] placeholder:text-[#A1A1AA] outline-none transition-colors focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-medium text-[#18181B]">Password</label>
                <Link href="#" className="text-xs text-[#4F46E5] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-10 w-full rounded-lg border border-[#E8E6E1] bg-white px-3 pr-10 text-sm text-[#18181B] placeholder:text-[#A1A1AA] outline-none transition-colors focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#52525B]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-xs text-[#DC2626]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] text-sm font-medium text-white transition-colors hover:bg-[#4338CA] disabled:opacity-60"
            >
              {isLoading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</>
              ) : (
                <>Sign in <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-[#A1A1AA]">
            Don&rsquo;t have an account?{" "}
            <Link href="/signup" className="text-[#4F46E5] hover:underline">
              Request access
            </Link>
          </p>

          <p className="mt-8 text-center font-mono text-[10px] text-[#A1A1AA]">
            SERA Neural Labs · FERPA Compliant
          </p>
        </div>
      </div>
    </div>
  )
}
