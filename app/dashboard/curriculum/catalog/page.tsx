"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter, BookOpen, Users, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import { COURSES, CATALOG_EXTENDED } from "@/lib/demo-data"

type DeptFilter = "All" | "Computer Science" | "Engineering" | "Mathematics" | "Nursing" | "Business"
type LevelFilter = "All" | "100" | "200" | "300" | "400"

const ALL_COURSES = [
  ...COURSES.map((c) => ({
    id: c.id,
    code: c.code,
    title: c.title,
    credits: c.credits,
    department: c.instructor.includes("Webb") ? "Computer Science"
      : c.instructor.includes("Lee")    ? "Mathematics"
      : c.instructor.includes("Nair")   ? "Engineering"
      : c.instructor.includes("Torres") ? "Nursing"
      : "Business",
    level: (c.code.match(/\d/)?.[0] ?? "1") + "00",
    instructor: c.instructor,
    enrolled: c.enrolled,
    capacity: c.capacity,
    status: (c.enrolled >= c.capacity ? "Full" : "Active") as "Full" | "Active",
  })),
  ...CATALOG_EXTENDED,
]

const DEPT_FILTERS: DeptFilter[] = ["All", "Computer Science", "Engineering", "Mathematics", "Nursing", "Business"]
const LEVEL_FILTERS: LevelFilter[] = ["All", "100", "200", "300", "400"]

const DEPT_COLOR: Record<string, { color: string; bg: string }> = {
  "Computer Science": { color: "#4F46E5", bg: "#EEF2FF" },
  "Engineering":      { color: "#D97706", bg: "#FEF3C7" },
  "Mathematics":      { color: "#059669", bg: "#D1FAE5" },
  "Nursing":          { color: "#DC2626", bg: "#FEE2E2" },
  "Business":         { color: "#B8860B", bg: "#FEF9EE" },
}

export default function CatalogPage() {
  const [search, setSearch]   = useState("")
  const [dept, setDept]       = useState<DeptFilter>("All")
  const [level, setLevel]     = useState<LevelFilter>("All")

  const filtered = useMemo(() => {
    let list = ALL_COURSES
    if (dept  !== "All")    list = list.filter((c) => c.department === dept)
    if (level !== "All")    list = list.filter((c) => c.level === level)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((c) => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q))
    }
    return list
  }, [search, dept, level])

  const uniqueCodes   = new Set(ALL_COURSES.map((c) => c.code)).size
  const fullCount     = ALL_COURSES.filter((c) => c.status === "Full").length

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Course eCatalog</h1>
          <p className="mt-1 text-sm text-[#52525B]">
            {uniqueCodes} courses · Spring 2026 · {fullCount} sections full
          </p>
        </div>
        <Link
          href="/assistant"
          className="flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
        >
          <Brain className="h-3.5 w-3.5" /> Curriculum AI
        </Link>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A1A1AA]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, code, or instructor…"
            className="h-9 w-full rounded-lg border border-[#E8E6E1] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <Filter className="h-3 w-3 text-[#A1A1AA]" />
            <span className="text-[11px] text-[#A1A1AA]">Dept:</span>
          </div>
          {DEPT_FILTERS.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-all",
                dept === d ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
              )}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <Filter className="h-3 w-3 text-[#A1A1AA]" />
            <span className="text-[11px] text-[#A1A1AA]">Level:</span>
          </div>
          {LEVEL_FILTERS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-all",
                level === l ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "border-[#E8E6E1] text-[#52525B] hover:border-[#D6D3CC]"
              )}
            >
              {l === "All" ? "All Levels" : `${l}-level`}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-[#A1A1AA]">{filtered.length} course{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Course grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course, i) => {
          const { color, bg } = DEPT_COLOR[course.department] ?? { color: "#52525B", bg: "#F4F4F2" }
          const fillPct = Math.round((course.enrolled / course.capacity) * 100)

          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-xl border border-[#E8E6E1] bg-white p-4 transition-shadow hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: bg }}>
                    <BookOpen className="h-3.5 w-3.5" style={{ color }} />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] font-semibold" style={{ color }}>{course.code}</p>
                    <p className="text-[10px] text-[#A1A1AA]">{course.credits} cr · {course.department}</p>
                  </div>
                </div>
                <span className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  course.status === "Full" ? "bg-[#FEE2E2] text-[#DC2626]" : "bg-[#D1FAE5] text-[#059669]"
                )}>
                  {course.status}
                </span>
              </div>

              <p className="mt-2.5 font-medium text-[#18181B] text-sm leading-snug">{course.title}</p>
              <p className="mt-0.5 text-[11px] text-[#52525B]">{course.instructor}</p>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="flex items-center gap-1 text-[#A1A1AA]">
                    <Users className="h-3 w-3" /> {course.enrolled}/{course.capacity}
                  </span>
                  <span className="text-[#A1A1AA]">{fillPct}% full</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-[#F4F4F2]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${fillPct}%`, background: fillPct >= 100 ? "#DC2626" : fillPct >= 80 ? "#D97706" : color }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Link
                  href="/dashboard/curriculum/proposals/new"
                  className="flex-1 rounded-lg border border-[#E8E6E1] py-1.5 text-center text-[11px] font-medium text-[#52525B] transition-colors hover:border-[#4F46E5] hover:text-[#4F46E5]"
                >
                  Propose Update
                </Link>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-[#E8E6E1] bg-white py-12 text-center text-sm text-[#A1A1AA]">
          No courses match your filters.
        </div>
      )}

      <p className="text-[11px] text-[#A1A1AA]">
        eCatalog reflects Spring 2026 enrollment · Use &ldquo;Propose Update&rdquo; to submit a modification request
      </p>
    </div>
  )
}
