import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight, Brain, TrendingUp, BookOpen, ScrollText,
  Shield, ChevronRight, Star, Building2, GraduationCap,
  BarChart3, Cpu, CheckCircle2
} from "lucide-react"
import { AnimatedBackground } from "@/components/ui/animated-background"

export const metadata: Metadata = {
  title: "STEM-ED-AI — AI-Native Education Platform by SERA Neural Labs",
  description:
    "Unify student retention intelligence, learning management, and curriculum governance in one platform. Built for Georgia's technical colleges and universities.",
}

const STATS = [
  { value: "73%", label: "Retention target for ATC" },
  { value: "10", label: "AI agents across all roles" },
  { value: "3,493", label: "Students at pilot institution" },
  { value: "6", label: "Compliance frameworks supported" },
]

const PRODUCTS = [
  {
    id: "skora",
    badge: "SKORA",
    headline: "Spot at-risk students 3 weeks before they drop out.",
    description:
      "SKORA's retention intelligence engine monitors LMS activity, financial aid status, and attendance in real time — surfacing exactly who needs intervention before it's too late.",
    icon: TrendingUp,
    color: "#4F46E5",
    bg: "#EEF2FF",
    features: [
      "Risk scoring on 14 behavioral signals",
      "Auto-intervention routing to advisors",
      "TCSG & SACSCOC compliance reports",
      "Multi-institution comparison dashboard",
    ],
  },
  {
    id: "lms",
    badge: "LMS",
    headline: "An LMS that actually helps teachers teach.",
    description:
      "AI-generated lesson plans, smart gradebooks, and a 10-agent AI layer that handles the repetitive work — so faculty spend time teaching, not administrating.",
    icon: BookOpen,
    color: "#059669",
    bg: "#ECFDF5",
    features: [
      "AI lesson generator (standards-mapped)",
      "Gradebook with Banner SIS passback",
      "Student gamification (XP, badges, streaks)",
      "Per-role dashboards for 8 user types",
    ],
  },
  {
    id: "cms",
    badge: "CMS",
    headline: "Curriculum governance that moves at the speed of industry.",
    description:
      "A structured 6-step approval workflow with AI impact analysis — so new courses and program changes move from proposal to catalog in weeks, not semesters.",
    icon: ScrollText,
    color: "#B8860B",
    bg: "#FEFCE8",
    features: [
      "AI curriculum impact scoring",
      "6-step approval pipeline with audit trail",
      "eCatalog browser with version history",
      "ABET, SACSCOC alignment checking",
    ],
  },
]

const TESTIMONIALS = [
  {
    quote:
      "We've been trying to solve the retention problem for years. SKORA gives us visibility we never had — we can see a student trending toward dropout before the midterm.",
    name: "Dr. Joanna Mitchell",
    title: "VP Academic Affairs, Atlanta Technical College",
    initials: "JM",
  },
  {
    quote:
      "The curriculum proposal workflow alone saved our committee 40 hours per semester. The AI impact analysis is genuinely useful — not just a gimmick.",
    name: "Dr. Marcus Webb",
    title: "Faculty Senate Chair, Georgia Southern University",
    initials: "MW",
  },
  {
    quote:
      "When we showed this to district leadership, they asked when they could deploy it. That never happens with EdTech demos.",
    name: "Commissioner T. Davis",
    title: "Technical College System of Georgia",
    initials: "TD",
  },
]

const ROLES = [
  { icon: GraduationCap, label: "Students" },
  { icon: BookOpen, label: "Teachers" },
  { icon: Building2, label: "Admins" },
  { icon: BarChart3, label: "District Leaders" },
  { icon: ScrollText, label: "Curriculum Committees" },
  { icon: Shield, label: "GovCon Teams" },
  { icon: Cpu, label: "IT / Cyber" },
  { icon: Brain, label: "Parents" },
]

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FAFAF9]">
      <AnimatedBackground />

      {/* Nav */}
      <nav className="relative z-10 flex h-16 items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5]">
            <Brain className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-display text-[16px] tracking-[0.08em] text-[#18181B]">STEM-ED-AI</span>
          <span className="hidden rounded-full border border-[#E8E6E1] px-2 py-0.5 font-mono text-[10px] text-[#A1A1AA] sm:inline">
            by SERA Neural Labs
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-[#52525B] transition-colors hover:text-[#18181B]"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="flex h-9 items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
          >
            Request access <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-20 text-center lg:px-12 lg:pt-28">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#E8E6E1] bg-white px-3 py-1.5 text-xs text-[#52525B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
          Now in pilot — Atlanta Technical College · Georgia Southern University
        </div>

        <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-[0.08em] text-[#18181B] lg:text-6xl">
          The education OS that
          <br />
          <span className="text-[#4F46E5]">closes the retention gap.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#52525B]">
          STEM-ED-AI unifies student retention intelligence, multi-role learning
          management, and curriculum governance under one platform — with 10 AI
          agents working across every role, every decision.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="flex h-11 items-center gap-2 rounded-xl bg-[#4F46E5] px-6 text-sm font-medium text-white shadow-[0_1px_4px_rgba(79,70,229,0.3)] transition-all hover:bg-[#4338CA] hover:-translate-y-px"
          >
            Request early access <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="flex h-11 items-center gap-2 rounded-xl border border-[#E8E6E1] bg-white px-6 text-sm font-medium text-[#18181B] transition-all hover:border-[#D6D3CC] hover:-translate-y-px"
          >
            Sign in to demo
          </Link>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[#E8E6E1] bg-white p-4 text-left">
              <p className="font-display text-3xl tracking-tight text-[#18181B]">{stat.value}</p>
              <p className="mt-1 text-xs text-[#A1A1AA]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Product Surfaces */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 lg:px-12">
        <p className="section-header mb-2">Three products. One platform.</p>
        <h2 className="font-display text-3xl tracking-tight text-[#18181B] lg:text-4xl">
          Everything your institution needs,
          <br />
          <span className="text-[#52525B]">finally in one place.</span>
        </h2>

        <div className="mt-12 space-y-6">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon
            return (
              <div
                key={product.id}
                className="group flex flex-col gap-8 rounded-2xl border border-[#E8E6E1] bg-white p-8 transition-all hover:border-[#D6D3CC] hover:-translate-y-px lg:flex-row lg:items-start"
              >
                {/* Left */}
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: product.bg }}
                    >
                      <Icon className="h-5 w-5" style={{ color: product.color }} />
                    </div>
                    <span
                      className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-widest"
                      style={{ background: product.bg, color: product.color }}
                    >
                      {product.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl tracking-tight text-[#18181B]">
                    {product.headline}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#52525B]">
                    {product.description}
                  </p>
                  <Link
                    href="/signup"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                    style={{ color: product.color }}
                  >
                    See {product.badge} in action <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Right — features list */}
                <div className="w-full lg:w-72">
                  <ul className="space-y-2.5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#52525B]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: product.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Roles */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 lg:px-12">
        <p className="section-header mb-2 text-center">Built for every seat in the institution</p>
        <h2 className="font-display text-center text-3xl tracking-tight text-[#18181B]">
          8 role-specific experiences.
          <br />
          <span className="text-[#52525B]">One login.</span>
        </h2>
        <div className="mt-10 grid grid-cols-4 gap-3 sm:grid-cols-8">
          {ROLES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-xl border border-[#E8E6E1] bg-white p-3 transition-all hover:border-[#D6D3CC] hover:-translate-y-px"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F4F4F2]">
                <Icon className="h-4 w-4 text-[#52525B]" />
              </div>
              <span className="text-center text-[11px] text-[#52525B]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 lg:px-12">
        <p className="section-header mb-8 text-center">From the field</p>
        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-[#E8E6E1] bg-white p-6 transition-all hover:border-[#D6D3CC] hover:-translate-y-px"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#B8860B] text-[#B8860B]" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-[#52525B]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF2FF] font-mono text-xs font-semibold text-[#4F46E5]">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#18181B]">{t.name}</p>
                  <p className="text-xs text-[#A1A1AA]">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center lg:px-12">
        <div className="rounded-2xl border border-[#E8E6E1] bg-white px-8 py-16">
          <h2 className="font-display text-4xl tracking-tight text-[#18181B]">
            Ready to close your retention gap?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#52525B]">
            Atlanta Technical College is already using STEM-ED-AI to track 3,493 students
            and target 73% retention. Join the pilot.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="flex h-11 items-center gap-2 rounded-xl bg-[#4F46E5] px-8 text-sm font-medium text-white transition-all hover:bg-[#4338CA] hover:-translate-y-px"
            >
              Request access <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="text-sm text-[#52525B] transition-colors hover:text-[#18181B]"
            >
              Already have an account? Sign in →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#E8E6E1] px-6 py-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#4F46E5]">
              <Brain className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-mono text-[11px] text-[#A1A1AA]">
              SERA Neural Labs · v1.0.0
            </span>
          </div>
          <p className="font-mono text-[11px] text-[#A1A1AA]">
            © {new Date().getFullYear()} SERA Neural Labs · FERPA Compliant · SOC 2 Type II
          </p>
        </div>
      </footer>
    </div>
  )
}
