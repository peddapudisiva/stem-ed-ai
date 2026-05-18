import type { Metadata } from "next"
import { StatCard } from "@/components/dashboard/stat-card"
import { AiTutorWidget } from "@/components/dashboard/student/ai-tutor-widget"
import { XpLevelCard } from "@/components/dashboard/student/xp-level-card"
import { CourseProgressCard } from "@/components/dashboard/student/course-progress-card"
import { AssignmentFeed } from "@/components/dashboard/student/assignment-feed"
import { BadgeShelf } from "@/components/dashboard/student/badge-shelf"
import { WeeklyChallengeCard } from "@/components/dashboard/student/weekly-challenge-card"
import { LeaderboardWidget } from "@/components/dashboard/student/leaderboard-widget"

export const metadata: Metadata = { title: "Student Dashboard" }

export default function StudentDashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero */}
      <div>
        <h1 className="page-title">{greeting}, Alex</h1>
        <p className="mt-1 text-sm text-[#52525B]">
          Monday, May 19 · 3 assignments due this week
        </p>
      </div>

      {/* KPI strip */}
      <div>
        <p className="section-header mb-3">Your progress</p>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Current GPA" value="3.7" hint="Top 15% of your cohort" variant="success" animationDelay={0} />
          <StatCard label="XP This Week" value={847} unit="xp" delta={{ value: 12, period: "vs last week" }} hint="Level 12 · Senior Scholar" animationDelay={0.05} />
          <StatCard label="Active Courses" value={4} hint="2 assignments pending" animationDelay={0.1} />
          <StatCard label="Day Streak" value={7} unit="days" hint="Keep it going — log in tomorrow" variant="warning" animationDelay={0.15} />
        </div>
      </div>

      {/* Bento grid — Row 1: AI Tutor (2/3) + XP Level (1/3) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AiTutorWidget />
        </div>
        <div>
          <XpLevelCard />
        </div>
      </div>

      {/* Bento grid — Row 2: Courses (2/3) + Assignments (1/3) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CourseProgressCard />
        </div>
        <div>
          <AssignmentFeed />
        </div>
      </div>

      {/* Full-width: Badges */}
      <BadgeShelf />

      {/* Bento grid — Row 3: Weekly Challenges (1/3) + Leaderboard (2/3) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div>
          <WeeklyChallengeCard />
        </div>
        <div className="lg:col-span-2">
          <LeaderboardWidget />
        </div>
      </div>
    </div>
  )
}
