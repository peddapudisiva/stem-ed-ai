// SERA Neural Labs — STEM-ED-AI demo seed data
// USE THIS DATA. Do not invent alternatives.

export const INSTITUTIONS = [
  { id: "atc", name: "Atlanta Technical College", shortName: "ATC", students: 3493, retention: 60, target: 73, state: "GA" },
  { id: "gsu", name: "Georgia Southern University", shortName: "GSU", students: 26500, retention: 78, target: 85, state: "GA" },
  { id: "kennesaw", name: "Kennesaw State University", shortName: "KSU", students: 43000, retention: 81, target: 88, state: "GA" },
] as const

export const AT_RISK_STUDENTS = [
  { id: "s001", name: "Marcus Thompson", program: "Nursing · Yr1", riskScore: 94, lmsActivity: "0 logins / 7d", aid: "Hold" as const, lastSeen: "8 days ago" },
  { id: "s002", name: "Destiny Williams", program: "IT Support · Yr1", riskScore: 88, lmsActivity: "2 logins / 7d", aid: "Active" as const, lastSeen: "3 days ago" },
  { id: "s003", name: "Jaylen Moore", program: "Business · Yr2", riskScore: 71, lmsActivity: "8 logins / 7d", aid: "Delayed" as const, lastSeen: "1 day ago" },
  { id: "s004", name: "Amara Jackson", program: "ECE · Yr1", riskScore: 68, lmsActivity: "3 logins / 7d", aid: "Active" as const, lastSeen: "2 days ago" },
  { id: "s005", name: "Devon Harris", program: "Welding · Yr1", riskScore: 61, lmsActivity: "5 logins / 7d", aid: "Active" as const, lastSeen: "1 day ago" },
]

export const STUDENTS = [
  { id: "st001", name: "Alex Chen", email: "alex.chen@atc.edu", program: "Computer Science · Yr2", gpa: 3.7, xp: 847, level: 12, streak: 7, institution: "atc" },
  { id: "st002", name: "Jordan Rivera", email: "j.rivera@atc.edu", program: "Data Science · Yr1", gpa: 3.4, xp: 412, level: 7, streak: 3, institution: "atc" },
  { id: "st003", name: "Taylor Washington", email: "t.washington@gsu.edu", program: "Engineering · Yr3", gpa: 3.9, xp: 1240, level: 18, streak: 14, institution: "gsu" },
]

export const PROPOSALS = [
  { id: "CUR-2026-0142", title: "ENGR 4850 — AI Systems Engineering", status: "In Review" as const, step: 3, total: 6, aiScore: 94, author: "Dr. Priya Nair", submittedAt: "2026-05-12" },
  { id: "CUR-2026-0138", title: "CS 3200 — Database Systems (Modified)", status: "Pending Approval" as const, step: 5, total: 6, aiScore: 87, author: "Dr. Marcus Webb", submittedAt: "2026-05-08" },
  { id: "CUR-2026-0131", title: "MBA Core Curriculum Restructure", status: "Committee Review" as const, step: 2, total: 8, aiScore: 91, author: "Dr. Joanna Mitchell", submittedAt: "2026-05-01" },
  { id: "CUR-2026-0127", title: "NURS 2100 — Clinical Fundamentals Update", status: "Draft" as const, step: 1, total: 6, aiScore: 78, author: "Prof. Sandra Lee", submittedAt: "2026-04-28" },
]

export const AGENTS = [
  { id: "tutor", name: "Tutor Agent", role: "Personalized 1:1 student learning", status: "online" as const, boundary: "Does NOT grade work", color: "#4F46E5" },
  { id: "teacher", name: "Teacher Assistant", role: "Reduce teacher workload", status: "online" as const, boundary: "Does NOT make final grade decisions", color: "#059669" },
  { id: "curriculum", name: "Curriculum Architect", role: "Generate standards-aligned curriculum", status: "online" as const, boundary: "Does NOT personalize to individuals", color: "#D97706" },
  { id: "assessment", name: "Assessment Builder", role: "Generate and score assessments", status: "online" as const, boundary: "Does NOT determine final grades", color: "#7C3AED" },
  { id: "district", name: "District Analyst", role: "Executive KPI intelligence", status: "online" as const, boundary: "Read-only, no actions", color: "#0891B2" },
  { id: "govcon", name: "GovCon Intel", role: "Federal RFP tracking & analysis", status: "beta" as const, boundary: "Does NOT submit proposals", color: "#B8860B" },
  { id: "rag", name: "RAG Knowledge", role: "Institutional memory & context retrieval", status: "online" as const, boundary: "Retrieval only, no generation", color: "#6366F1" },
  { id: "workflow", name: "Workflow Orchestrator", role: "Cross-system process orchestration", status: "online" as const, boundary: "Executes defined logic only", color: "#10B981" },
  { id: "reporting", name: "Reporting Engine", role: "Auto-generated compliance reports", status: "online" as const, boundary: "Summarizes only, no recommendations", color: "#F59E0B" },
  { id: "compliance", name: "Compliance Guard", role: "FERPA, CMMC, 508 monitoring", status: "online" as const, boundary: "Flags only, no auto-remediation", color: "#EF4444" },
]

export const BADGES = [
  { id: "first-assignment", name: "First Steps", category: "academic" as const, xp: 10, description: "Submitted your first assignment" },
  { id: "course-complete", name: "Course Complete", category: "academic" as const, xp: 100, description: "Completed a full course" },
  { id: "honor-roll", name: "Honor Roll", category: "academic" as const, xp: 200, description: "Achieved 3.8+ GPA this semester" },
  { id: "helpful-peer", name: "Helpful Peer", category: "social" as const, xp: 50, description: "Helped 5+ classmates in discussion" },
  { id: "study-leader", name: "Study Group Leader", category: "social" as const, xp: 75, description: "Led 3+ study group sessions" },
  { id: "critical-thinker", name: "Critical Thinker", category: "skills" as const, xp: 75, description: "Scored 95%+ on analysis assignments" },
  { id: "ai-literate", name: "AI Literate", category: "skills" as const, xp: 100, description: "Completed AI Ethics & Fundamentals module" },
  { id: "problem-solver", name: "Problem Solver", category: "skills" as const, xp: 60, description: "Solved 10 complex challenge problems" },
  { id: "internship-started", name: "Internship Started", category: "workforce" as const, xp: 150, description: "Began your first internship" },
  { id: "naba-mentor", name: "NABA Mentor Matched", category: "workforce" as const, xp: 100, description: "Matched with a NABA professional mentor" },
]

export const COURSES = [
  { id: "cs101", code: "CS 1010", title: "Introduction to Programming", credits: 3, instructor: "Dr. Marcus Webb", enrolled: 28, capacity: 30, progress: 65, institution: "atc" },
  { id: "math201", code: "MATH 2010", title: "Calculus I", credits: 4, instructor: "Prof. Sandra Lee", enrolled: 24, capacity: 25, progress: 40, institution: "atc" },
  { id: "engr480", code: "ENGR 4850", title: "AI Systems Engineering", credits: 3, instructor: "Dr. Priya Nair", enrolled: 18, capacity: 20, progress: 20, institution: "gsu" },
  { id: "nurs210", code: "NURS 2100", title: "Clinical Fundamentals", credits: 4, instructor: "Prof. Dana Torres", enrolled: 22, capacity: 24, progress: 55, institution: "atc" },
]

export const FACULTY = [
  { id: "f001", name: "Dr. Marcus Webb", title: "Associate Professor", department: "Computer Science", pdCompliant: true, pdModules: 4, pdRequired: 4, lastActive: "Today" },
  { id: "f002", name: "Dr. Priya Nair", title: "Assistant Professor", department: "Engineering", pdCompliant: true, pdModules: 3, pdRequired: 4, lastActive: "Yesterday" },
  { id: "f003", name: "Prof. Sandra Lee", title: "Instructor", department: "Mathematics", pdCompliant: false, pdModules: 1, pdRequired: 4, lastActive: "3 days ago" },
  { id: "f004", name: "Prof. Dana Torres", title: "Clinical Instructor", department: "Nursing", pdCompliant: false, pdModules: 2, pdRequired: 4, lastActive: "1 week ago" },
  { id: "f005", name: "Dr. Joanna Mitchell", title: "Professor", department: "Business", pdCompliant: true, pdModules: 4, pdRequired: 4, lastActive: "Today" },
]

export const GOVCON_OPPORTUNITIES = [
  { id: "opp001", title: "AI-Enhanced STEM Education Initiative", agency: "U.S. Dept. of Education", value: 2400000, dueDate: "2026-06-15", status: "Active" as const, winProbability: 74, solicitation: "ED-OII-26-001" },
  { id: "opp002", title: "Workforce Development AI Platform", agency: "Dept. of Labor", value: 1800000, dueDate: "2026-07-01", status: "Active" as const, winProbability: 61, solicitation: "DOL-ETA-26-142" },
  { id: "opp003", title: "Community College Digital Transformation", agency: "NSF", value: 950000, dueDate: "2026-05-30", status: "Urgent" as const, winProbability: 82, solicitation: "NSF-IUSE-2026-B" },
]

export const NOTIFICATIONS = [
  { id: "n001", type: "alert" as const, title: "Marcus Thompson — Risk score reached 94", description: "0 LMS logins in the past 7 days. Financial aid on hold.", time: "9:42 AM", read: false, link: "/dashboard/admin/students" },
  { id: "n002", type: "update" as const, title: "CUR-2026-0142 moved to Committee Review", description: "ENGR 4850 proposal advanced to step 3 of 6.", time: "8:15 AM", read: false, link: "/dashboard/curriculum/proposals/CUR-2026-0142" },
  { id: "n003", type: "success" as const, title: "Dr. Sandra Lee completed AI Literacy module", description: "Faculty PD compliance updated. 2 of 4 modules done.", time: "8:02 AM", read: true, link: "/dashboard/admin/faculty" },
  { id: "n004", type: "mention" as const, title: "Dr. Mitchell mentioned you in CUR-2026-0142", description: "\"Can you review the ABET alignment section?\"", time: "Yesterday 4:47 PM", read: true, link: "/dashboard/curriculum/proposals/CUR-2026-0142" },
  { id: "n005", type: "alert" as const, title: "Destiny Williams — 2 logins this week", description: "Risk score 88. Recommend intervention check-in.", time: "Yesterday 2:30 PM", read: true, link: "/dashboard/admin/students" },
]

export const STUDENT_ASSIGNMENTS = [
  { id: "a000", title: "Quiz 3 — Functions & Loops", course: "CS 1010", dueDate: "2026-05-22", dueLabel: "Thu, May 22", status: "pending" as const, points: 50, assessmentId: "quiz-001" },
  { id: "a001", title: "Algorithm Design Assignment", course: "CS 1010", dueDate: "2026-05-21", dueLabel: "Wed, May 21", status: "pending" as const, points: 50 },
  { id: "a002", title: "Problem Set 7 — Integration", course: "MATH 2010", dueDate: "2026-05-22", dueLabel: "Thu, May 22", status: "pending" as const, points: 40 },
  { id: "a003", title: "Midterm Exam", course: "CS 1010", dueDate: "2026-05-23", dueLabel: "Fri, May 23", status: "pending" as const, points: 100, assessmentId: "exam-001" },
  { id: "a004", title: "Lab 3 Report — Neural Network", course: "ENGR 4850", dueDate: "2026-05-28", dueLabel: "Wed, May 28", status: "pending" as const, points: 60 },
  { id: "a005", title: "Clinical Case Study Review", course: "NURS 2100", dueDate: "2026-05-30", dueLabel: "Fri, May 30", status: "submitted" as const, points: 80 },
]

export const WEEKLY_CHALLENGES = [
  { id: "wc001", title: "5-Day Login Streak", description: "Log in 5 days this week", xp: 50, current: 3, target: 5, icon: "flame" as const },
  { id: "wc002", title: "Assignment Blitz", description: "Submit 3 assignments this week", xp: 75, current: 2, target: 3, icon: "check" as const },
  { id: "wc003", title: "Tutor Sessions", description: "Complete 2 AI Tutor sessions", xp: 60, current: 1, target: 2, icon: "brain" as const },
]

export const LEADERBOARD = [
  { rank: 1, name: "Taylor Washington", initials: "TW", xp: 1240, level: 18, streak: 14, isMe: false },
  { rank: 2, name: "Alex Chen", initials: "AC", xp: 847, level: 12, streak: 7, isMe: true },
  { rank: 3, name: "Jordan Rivera", initials: "JR", xp: 412, level: 7, streak: 3, isMe: false },
  { rank: 4, name: "Chris Park", initials: "CP", xp: 380, level: 7, streak: 5, isMe: false },
  { rank: 5, name: "Morgan Smith", initials: "MS", xp: 290, level: 5, streak: 2, isMe: false },
]

export const EARNED_BADGE_IDS = ["first-assignment", "honor-roll", "critical-thinker", "ai-literate"]

export const GRADEBOOK_ASSIGNMENTS = [
  { id: "hw1", title: "HW 1 — Variables", points: 20, dueDate: "May 5" },
  { id: "hw2", title: "HW 2 — Loops", points: 20, dueDate: "May 12" },
  { id: "hw3", title: "HW 3 — Functions", points: 20, dueDate: "May 19" },
  { id: "midterm", title: "Midterm Exam", points: 100, dueDate: "May 23" },
]

export const GRADEBOOK_STUDENTS = [
  { id: "gs001", name: "Alex Chen",          hw1: 19, hw2: 18, hw3: null,  midterm: null, attendance: 92, atRisk: false },
  { id: "gs002", name: "Marcus Thompson",    hw1: 12, hw2: 0,  hw3: null,  midterm: null, attendance: 45, atRisk: true  },
  { id: "gs003", name: "Jordan Rivera",      hw1: 16, hw2: 15, hw3: null,  midterm: null, attendance: 88, atRisk: false },
  { id: "gs004", name: "Destiny Williams",   hw1: 10, hw2: 8,  hw3: null,  midterm: null, attendance: 62, atRisk: true  },
  { id: "gs005", name: "Jaylen Moore",       hw1: 20, hw2: 19, hw3: null,  midterm: null, attendance: 95, atRisk: false },
  { id: "gs006", name: "Amara Jackson",      hw1: 17, hw2: null, hw3: null, midterm: null, attendance: 71, atRisk: false },
  { id: "gs007", name: "Devon Harris",       hw1: 15, hw2: 14, hw3: null,  midterm: null, attendance: 85, atRisk: false },
  { id: "gs008", name: "Priya Patel",        hw1: 20, hw2: 20, hw3: null,  midterm: null, attendance: 100, atRisk: false },
  { id: "gs009", name: "Chris Washington",   hw1: 14, hw2: 11, hw3: null,  midterm: null, attendance: 78, atRisk: false },
  { id: "gs010", name: "Morgan Lee",         hw1: 18, hw2: 17, hw3: null,  midterm: null, attendance: 90, atRisk: false },
]

export const RETENTION_TREND = [
  { month: "Oct", rate: 51, target: 73 },
  { month: "Nov", rate: 53, target: 73 },
  { month: "Dec", rate: 54, target: 73 },
  { month: "Jan", rate: 55, target: 73 },
  { month: "Feb", rate: 57, target: 73 },
  { month: "Mar", rate: 58, target: 73 },
  { month: "Apr", rate: 59, target: 73 },
  { month: "May", rate: 60, target: 73 },
]

export const PD_MODULES = [
  { id: "ferpa",         name: "FERPA Compliance",      required: true },
  { id: "ai-literacy",   name: "AI Literacy",           required: true },
  { id: "title-ix",      name: "Title IX Training",     required: true },
  { id: "accessibility", name: "ADA / 508 Accessibility", required: true },
]

export const FACULTY_PD_DETAIL: Record<string, string[]> = {
  f001: ["ferpa", "ai-literacy", "title-ix", "accessibility"],
  f002: ["ferpa", "ai-literacy", "title-ix"],
  f003: ["ferpa"],
  f004: ["ferpa", "ai-literacy"],
  f005: ["ferpa", "ai-literacy", "title-ix", "accessibility"],
}

export const ADMIN_STUDENTS = [
  { id: "s001", name: "Marcus Thompson",  program: "Nursing",        year: 1, gpa: 1.9, riskScore: 94, aid: "Hold" as const,    attendance: 45, lmsLogins: 0,  status: "at-risk" as const },
  { id: "s002", name: "Destiny Williams", program: "IT Support",     year: 1, gpa: 2.3, riskScore: 88, aid: "Active" as const,  attendance: 62, lmsLogins: 2,  status: "at-risk" as const },
  { id: "s003", name: "Jaylen Moore",     program: "Business",       year: 2, gpa: 2.7, riskScore: 71, aid: "Delayed" as const, attendance: 78, lmsLogins: 8,  status: "at-risk" as const },
  { id: "s004", name: "Amara Jackson",    program: "ECE",            year: 1, gpa: 2.8, riskScore: 68, aid: "Active" as const,  attendance: 71, lmsLogins: 3,  status: "at-risk" as const },
  { id: "s005", name: "Devon Harris",     program: "Welding",        year: 1, gpa: 3.1, riskScore: 61, aid: "Active" as const,  attendance: 85, lmsLogins: 5,  status: "watch" as const  },
  { id: "s006", name: "Alex Chen",        program: "Comp. Science",  year: 2, gpa: 3.7, riskScore: 12, aid: "Active" as const,  attendance: 92, lmsLogins: 21, status: "good" as const   },
  { id: "s007", name: "Jordan Rivera",    program: "Data Science",   year: 1, gpa: 3.4, riskScore: 18, aid: "Active" as const,  attendance: 88, lmsLogins: 16, status: "good" as const   },
  { id: "s008", name: "Priya Patel",      program: "Comp. Science",  year: 2, gpa: 3.9, riskScore: 8,  aid: "Active" as const,  attendance: 100, lmsLogins: 28, status: "good" as const  },
  { id: "s009", name: "Chris Washington", program: "Nursing",        year: 2, gpa: 3.2, riskScore: 24, aid: "Active" as const,  attendance: 78, lmsLogins: 11, status: "watch" as const  },
  { id: "s010", name: "Morgan Lee",       program: "Business",       year: 3, gpa: 3.5, riskScore: 15, aid: "Active" as const,  attendance: 90, lmsLogins: 18, status: "good" as const   },
  { id: "s011", name: "Taylor Washington",program: "Engineering",    year: 3, gpa: 3.9, riskScore: 6,  aid: "Active" as const,  attendance: 96, lmsLogins: 25, status: "good" as const   },
  { id: "s012", name: "Sam Torres",       program: "Welding",        year: 1, gpa: 2.5, riskScore: 55, aid: "Pending" as const, attendance: 68, lmsLogins: 4,  status: "watch" as const  },
]

export const LESSON_PLANS = [
  { id: "lp001", title: "Introduction to Recursion", course: "CS 1010", standard: "CS-ALG-3.2", duration: 75, generatedAt: "May 17, 2026", status: "published" as const },
  { id: "lp002", title: "Binary Trees & Traversal", course: "CS 1010", standard: "CS-DSA-4.1", duration: 90, generatedAt: "May 15, 2026", status: "draft" as const },
  { id: "lp003", title: "Integration by Parts", course: "MATH 2010", standard: "MATH-CALC-2.3", duration: 75, generatedAt: "May 14, 2026", status: "published" as const },
  { id: "lp004", title: "Clinical Documentation Standards", course: "NURS 2100", standard: "NURS-CLIN-1.4", duration: 60, generatedAt: "May 12, 2026", status: "published" as const },
]

export const INSTITUTION_DETAILS = [
  { id: "atc",      atRisk: 47,  facultyCompliant: 3,   facultyTotal: 5,   programs: 42,  courses: 186  },
  { id: "gsu",      atRisk: 156, facultyCompliant: 89,  facultyTotal: 112, programs: 127, courses: 1840 },
  { id: "kennesaw", atRisk: 203, facultyCompliant: 145, facultyTotal: 178, programs: 158, courses: 2430 },
]

export const DISTRICT_RETENTION_MONTHLY = [
  { month: "Oct", atc: 51, gsu: 78, kennesaw: 81 },
  { month: "Nov", atc: 53, gsu: 79, kennesaw: 82 },
  { month: "Dec", atc: 54, gsu: 78, kennesaw: 82 },
  { month: "Jan", atc: 55, gsu: 80, kennesaw: 83 },
  { month: "Feb", atc: 57, gsu: 81, kennesaw: 83 },
  { month: "Mar", atc: 58, gsu: 80, kennesaw: 84 },
  { month: "Apr", atc: 59, gsu: 82, kennesaw: 85 },
  { month: "May", atc: 60, gsu: 82, kennesaw: 85 },
]

export const PROPOSAL_ACTIVITY: Record<string, Array<{ id: string; author: string; role: string; action: string; content: string; time: string }>> = {
  "CUR-2026-0142": [
    { id: "a4", author: "Dr. Marcus Webb",          role: "reviewer",  action: "approved", content: "Department review complete. Advancing to committee.",                                          time: "May 14 · 10:00 AM" },
    { id: "a3", author: "Dr. Joanna Mitchell",       role: "committee", action: "comment",  content: "Can you expand the ABET outcomes in Section 3? The AI systems content looks strong.",        time: "May 13 · 2:30 PM" },
    { id: "a1", author: "AI Curriculum Architect",   role: "ai",        action: "scored",   content: "Score: 94/100. Strong ABET outcomes mapping. Minor gap in assessment rubrics.",              time: "May 12 · 9:17 AM" },
    { id: "a2", author: "Dr. Priya Nair",            role: "author",    action: "submitted", content: "Submitted for departmental review.",                                                         time: "May 12 · 9:15 AM" },
  ],
  "CUR-2026-0138": [
    { id: "b3", author: "Prof. Sandra Lee",          role: "committee", action: "comment",  content: "Please cross-reference the updated TCSG standards for CS programs.",                         time: "May 10 · 11:15 AM" },
    { id: "b1", author: "AI Curriculum Architect",   role: "ai",        action: "scored",   content: "Score: 87/100. Good coverage of database normalization. Add security/privacy section.",      time: "May 8 · 4:02 PM" },
    { id: "b2", author: "Dr. Marcus Webb",           role: "author",    action: "submitted", content: "Submitted CS 3200 modification for review.",                                                 time: "May 8 · 4:00 PM" },
  ],
  "CUR-2026-0131": [
    { id: "c1", author: "AI Curriculum Architect",   role: "ai",        action: "scored",   content: "Score: 91/100. Comprehensive MBA restructure. Verify AACSB alignment.",                     time: "May 1 · 3:11 PM" },
    { id: "c2", author: "Dr. Joanna Mitchell",       role: "author",    action: "submitted", content: "Submitting MBA restructure. Aligned to 2025 AACSB standards.",                              time: "May 1 · 3:10 PM" },
  ],
  "CUR-2026-0127": [
    { id: "d2", author: "AI Curriculum Architect",   role: "ai",        action: "scored",   content: "Score: 78/100. Clinical competency mapping needs expansion. Good patient safety coverage.", time: "Apr 28 · 9:02 AM" },
    { id: "d1", author: "Prof. Sandra Lee",          role: "author",    action: "draft",    content: "Draft started for NURS 2100 clinical update.",                                               time: "Apr 28 · 9:00 AM" },
  ],
}

export const CURRICULUM_STANDARDS = [
  { id: "abet-1", category: "ABET",     label: "Outcome 1 — Problem Analysis" },
  { id: "abet-2", category: "ABET",     label: "Outcome 2 — Design Solutions" },
  { id: "abet-3", category: "ABET",     label: "Outcome 3 — Communication" },
  { id: "abet-4", category: "ABET",     label: "Outcome 4 — Ethics & Society" },
  { id: "acm-1",  category: "ACM/IEEE", label: "CS2023 — Software Engineering" },
  { id: "acm-2",  category: "ACM/IEEE", label: "CS2023 — Data Management" },
  { id: "acm-3",  category: "ACM/IEEE", label: "CS2023 — Intelligent Systems" },
  { id: "tcsg-1", category: "TCSG",     label: "Standard 4.2 — Program Outcomes" },
  { id: "tcsg-2", category: "TCSG",     label: "Standard 5.1 — Assessment" },
  { id: "tcsg-3", category: "TCSG",     label: "Standard 6.3 — Workforce Alignment" },
]

export const CATALOG_EXTENDED = [
  { id: "cs201",  code: "CS 2010",   title: "Data Structures",            credits: 3, department: "Computer Science", level: "200", instructor: "Dr. Marcus Webb",    enrolled: 22, capacity: 25, status: "Active" as const },
  { id: "cs301",  code: "CS 3010",   title: "Algorithms",                 credits: 3, department: "Computer Science", level: "300", instructor: "Dr. Marcus Webb",    enrolled: 19, capacity: 22, status: "Active" as const },
  { id: "cs320",  code: "CS 3200",   title: "Database Systems",           credits: 3, department: "Computer Science", level: "300", instructor: "Dr. Priya Nair",     enrolled: 17, capacity: 20, status: "Active" as const },
  { id: "math101",code: "MATH 1010", title: "Pre-Calculus",               credits: 3, department: "Mathematics",      level: "100", instructor: "Prof. Sandra Lee",   enrolled: 28, capacity: 30, status: "Active" as const },
  { id: "math301",code: "MATH 3010", title: "Differential Equations",     credits: 3, department: "Mathematics",      level: "300", instructor: "Prof. Sandra Lee",   enrolled: 14, capacity: 18, status: "Active" as const },
  { id: "engr101",code: "ENGR 1010", title: "Introduction to Engineering",credits: 3, department: "Engineering",      level: "100", instructor: "Dr. Priya Nair",     enrolled: 26, capacity: 28, status: "Active" as const },
  { id: "nurs101",code: "NURS 1010", title: "Foundations of Nursing",     credits: 4, department: "Nursing",          level: "100", instructor: "Prof. Dana Torres",   enrolled: 24, capacity: 24, status: "Full" as const },
  { id: "bus101", code: "BUS 1010",  title: "Intro to Business",          credits: 3, department: "Business",         level: "100", instructor: "Dr. Joanna Mitchell", enrolled: 30, capacity: 30, status: "Full" as const },
  { id: "bus301", code: "BUS 3010",  title: "Strategic Management",       credits: 3, department: "Business",         level: "300", instructor: "Dr. Joanna Mitchell", enrolled: 22, capacity: 25, status: "Active" as const },
  { id: "engr485",code: "ENGR 4850", title: "AI Systems Engineering",     credits: 3, department: "Engineering",      level: "400", instructor: "Dr. Priya Nair",     enrolled: 18, capacity: 20, status: "Active" as const },
]

export const GOVCON_TEAM = [
  { name: "James Carter", role: "Capture Manager",  opportunityId: "opp001" },
  { name: "Lisa Grant",   role: "Technical Writer",  opportunityId: "opp003" },
  { name: "David Park",   role: "Pricing Analyst",   opportunityId: "opp002" },
]

export const GOVCON_COMPLIANCE = [
  { label: "SAM.gov Registration", status: "Current",     expires: "2027-01-15" },
  { label: "UEI / DUNS",           status: "Active",      expires: null },
  { label: "NAICS Codes",          status: "Current",     expires: null },
  { label: "CMMC Level 2",         status: "In Progress", expires: null },
  { label: "GSA Schedule",         status: "Pending",     expires: null },
]

export const NIST_CONTROLS = [
  { id: "ac", family: "Access Control",             controls: 25, passed: 22, score: 88 },
  { id: "au", family: "Audit & Accountability",     controls: 16, passed: 14, score: 87 },
  { id: "cm", family: "Config Management",          controls: 11, passed: 10, score: 91 },
  { id: "ia", family: "Identification & Auth",      controls: 12, passed: 11, score: 92 },
  { id: "ir", family: "Incident Response",          controls: 10, passed: 7,  score: 70 },
  { id: "ma", family: "Maintenance",                controls: 6,  passed: 6,  score: 100 },
  { id: "mp", family: "Media Protection",           controls: 8,  passed: 7,  score: 87 },
  { id: "pe", family: "Physical Protection",        controls: 20, passed: 19, score: 95 },
  { id: "pl", family: "Planning",                   controls: 9,  passed: 7,  score: 78 },
  { id: "ps", family: "Personnel Security",         controls: 8,  passed: 8,  score: 100 },
  { id: "ra", family: "Risk Assessment",            controls: 9,  passed: 7,  score: 78 },
  { id: "sc", family: "System & Comm Protection",   controls: 44, passed: 38, score: 86 },
  { id: "si", family: "System & Info Integrity",    controls: 17, passed: 13, score: 76 },
]

export const AUDIT_LOG = [
  { id: "al001", timestamp: "2026-05-18 09:42:15", user: "system",         agent: "SKORA",              action: "risk_score_update",  resource: "student/s001",             details: "Risk score updated: 91 → 94",                            severity: "medium" as const },
  { id: "al002", timestamp: "2026-05-18 09:41:33", user: "dr.lee@atc.edu", agent: null,                 action: "login",              resource: "auth",                     details: "Admin login from 192.168.1.45",                           severity: "low"    as const },
  { id: "al003", timestamp: "2026-05-18 08:15:02", user: "curriculum-agent", agent: "Curriculum Architect", action: "proposal_analyzed", resource: "proposal/CUR-2026-0142", details: "AI analysis completed. Score: 94/100",                   severity: "low"    as const },
  { id: "al004", timestamp: "2026-05-18 08:02:11", user: "system",         agent: "Compliance Guard",   action: "compliance_flag",    resource: "ferpa/student-data",       details: "PII access pattern flagged for review",                   severity: "high"   as const },
  { id: "al005", timestamp: "2026-05-17 16:45:30", user: "m.webb@atc.edu", agent: null,                 action: "grade_update",       resource: "gradebook/cs101",          details: "Grades updated for CS 1010 — 10 students",               severity: "low"    as const },
  { id: "al006", timestamp: "2026-05-17 15:22:08", user: "tutor-agent",    agent: "Tutor Agent",        action: "session_start",      resource: "student/st001",            details: "Tutor session started: Recursion topic",                  severity: "low"    as const },
  { id: "al007", timestamp: "2026-05-17 14:30:55", user: "reporting-agent", agent: "Reporting Engine",  action: "report_generated",   resource: "report/tcsg-q1",           details: "TCSG Q1 2026 report compiled — 24 pages",                severity: "low"    as const },
  { id: "al008", timestamp: "2026-05-17 11:00:00", user: "admin@atc.edu",  agent: null,                 action: "export",             resource: "students/export",          details: "Student directory export (FERPA authorized)",             severity: "medium" as const },
  { id: "al009", timestamp: "2026-05-17 09:15:44", user: "system",         agent: "Compliance Guard",   action: "ferpa_check",        resource: "data-access/bulk",         details: "Bulk data access verified — within policy bounds",        severity: "low"    as const },
  { id: "al010", timestamp: "2026-05-16 22:03:17", user: "system",         agent: "SKORA",              action: "batch_score_run",    resource: "students/all",             details: "Nightly risk score batch completed — 3,493 students",    severity: "low"    as const },
]

export const PARENT_CHILDREN = [
  { id: "ch001", name: "Marcus Thompson",  grade: "Year 1",  school: "Atlanta Technical College", gpa: 1.9, attendance: 45, status: "at-risk" as const, program: "Nursing",          aid: "Hold" as const,   advisor: "Prof. Dana Torres",  nextClass: "Clinical Fundamentals · Mon 9:00 AM",   riskScore: 94 },
  { id: "ch002", name: "Destiny Thompson", grade: "Year 1",  school: "Atlanta Technical College", gpa: 3.4, attendance: 89, status: "good"    as const, program: "Computer Science", aid: "Active" as const, advisor: "Dr. Marcus Webb",    nextClass: "Data Structures · Tue 10:30 AM",          riskScore: 18 },
]

export const PARENT_MESSAGES = [
  { id: "pm001", from: "Prof. Dana Torres",     subject: "Marcus — Missing Assignments",      preview: "Marcus has missed 3 assignments this week and has not attended Thursday's clinical lab.",                     time: "Today · 8:15 AM",    read: false, childId: "ch001" },
  { id: "pm002", from: "Financial Aid Office",  subject: "Aid Hold — Action Required",        preview: "Marcus's financial aid has been placed on hold pending verification. Please submit Form FA-20 by May 25.",   time: "Yesterday · 2:30 PM", read: false, childId: "ch001" },
  { id: "pm003", from: "Dr. Marcus Webb",       subject: "Destiny — Outstanding Work",        preview: "I wanted to let you know that Destiny scored 98% on the Data Structures midterm. She is excelling.",          time: "May 15 · 4:00 PM",   read: true,  childId: "ch002" },
  { id: "pm004", from: "Office of the Registrar", subject: "Spring 2026 Grades Posted",      preview: "Final grades for Spring 2026 have been posted. You may view them in the student portal.",                     time: "May 14 · 9:00 AM",   read: true,  childId: "ch002" },
]

export const CALENDAR_EVENTS = [
  { id: "e001", title: "CS 1010 — Lecture", start: "2026-05-19T09:00:00", end: "2026-05-19T10:15:00", category: "class" as const, location: "Room 204" },
  { id: "e002", title: "MATH 2010 — Lab", start: "2026-05-19T11:00:00", end: "2026-05-19T12:30:00", category: "class" as const, location: "Math Lab B" },
  { id: "e003", title: "CUR-2026-0142 Committee Review", start: "2026-05-20T14:00:00", end: "2026-05-20T15:30:00", category: "meeting" as const, location: "Conf Room 3A" },
  { id: "e004", title: "Assignment 4 Due — CS 1010", start: "2026-05-21T23:59:00", end: "2026-05-21T23:59:00", category: "deadline" as const, location: "" },
  { id: "e005", title: "Dr. Webb Office Hours", start: "2026-05-22T13:00:00", end: "2026-05-22T15:00:00", category: "officehours" as const, location: "Office 318" },
]

// ─── Messaging ────────────────────────────────────────────────────────────────

export interface Conversation {
  id: string
  with: { name: string; role: string; initials: string }
  subject: string
  lastMessage: string
  lastTime: string
  unread: number
  type: "direct" | "class" | "advisory"
  courseCode?: string
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "conv-001",
    with: { name: "Dr. Marcus Webb", role: "Teacher", initials: "MW" },
    subject: "Clinical Fundamentals — Midterm Feedback",
    lastMessage: "Your revised submission looks much better. Let's discuss during office hours.",
    lastTime: "10:42 AM",
    unread: 1,
    type: "direct",
    courseCode: "NUR-101",
  },
  {
    id: "conv-002",
    with: { name: "Academic Advisor Kim", role: "Advisor", initials: "AK" },
    subject: "Spring 2026 Registration — Prerequisite Check",
    lastMessage: "You're all set for next semester. I've cleared the hold on your account.",
    lastTime: "Yesterday",
    unread: 0,
    type: "advisory",
  },
  {
    id: "conv-003",
    with: { name: "Financial Aid Office", role: "Staff", initials: "FA" },
    subject: "Form FA-20 — Action Required",
    lastMessage: "Please submit the completed FA-20 form by May 25 to restore your aid.",
    lastTime: "May 16",
    unread: 2,
    type: "direct",
  },
  {
    id: "conv-004",
    with: { name: "Ms. Thompson", role: "Parent", initials: "MT" },
    subject: "Re: Attendance concern — Alex Chen",
    lastMessage: "Thank you for reaching out. I'll make sure Alex attends all remaining sessions.",
    lastTime: "May 15",
    unread: 0,
    type: "direct",
  },
  {
    id: "conv-005",
    with: { name: "CIS-150 Class Group", role: "Class Thread", initials: "CG" },
    subject: "Project 2 Group — Final submission checklist",
    lastMessage: "I've uploaded my section. Someone verify the README before we submit.",
    lastTime: "May 14",
    unread: 3,
    type: "class",
    courseCode: "CIS-150",
  },
  {
    id: "conv-006",
    with: { name: "Dr. Sandra Lee", role: "Admin", initials: "SL" },
    subject: "Academic Probation Warning",
    lastMessage: "Please schedule a meeting with Student Services as soon as possible.",
    lastTime: "May 12",
    unread: 1,
    type: "direct",
  },
  {
    id: "conv-007",
    with: { name: "Dr. Priya Nair", role: "Faculty", initials: "PN" },
    subject: "Medical Terminology — Extra Credit Opportunity",
    lastMessage: "The extra credit paper is due May 28. Topic must relate to pharmacology.",
    lastTime: "May 10",
    unread: 0,
    type: "direct",
    courseCode: "MED-110",
  },
  {
    id: "conv-008",
    with: { name: "IT Help Desk", role: "Staff", initials: "IT" },
    subject: "Blackboard access issue resolved",
    lastMessage: "Your login credentials have been reset. Please use the temporary password.",
    lastTime: "May 8",
    unread: 0,
    type: "direct",
  },
]

export interface DmMessage {
  id: string
  senderName: string
  senderInitials: string
  content: string
  timestamp: string
  read: boolean
  fromMe: boolean
}

export const MESSAGES_BY_THREAD: Record<string, DmMessage[]> = {
  "conv-001": [
    { id: "m-001-1", senderName: "Alex Chen",       senderInitials: "AC", content: "Hi Dr. Webb, I wanted to follow up on the midterm feedback. I wasn't sure which lab section you were referring to on the rubric.",                                                                                    timestamp: "May 17, 9:12 AM",  read: true,  fromMe: true  },
    { id: "m-001-2", senderName: "Dr. Marcus Webb",  senderInitials: "MW", content: "Hi Alex — I was referring to the sterile technique section, specifically the hand-washing sequence in step 4. You mixed up the order with the gown procedure.",                                                    timestamp: "May 17, 9:28 AM",  read: true,  fromMe: false },
    { id: "m-001-3", senderName: "Alex Chen",        senderInitials: "AC", content: "Ah, I see. I re-read the protocol guide and I think I understand now. Would it be possible to do a reassessment on that section?",                                                                                  timestamp: "May 17, 10:05 AM", read: true,  fromMe: true  },
    { id: "m-001-4", senderName: "Dr. Marcus Webb",  senderInitials: "MW", content: "Your revised submission looks much better. Let's discuss it during office hours on Wednesday at 2 PM. Come prepared with your lab notes.",                                                                           timestamp: "May 17, 10:42 AM", read: false, fromMe: false },
  ],
  "conv-003": [
    { id: "m-003-1", senderName: "Financial Aid Office", senderInitials: "FA", content: "Dear Alex, our records show your Spring 2026 financial aid is currently on hold due to an attendance compliance issue. You must submit Form FA-20 to resolve this before May 25.",                              timestamp: "May 16, 8:00 AM",  read: true,  fromMe: false },
    { id: "m-003-2", senderName: "Financial Aid Office", senderInitials: "FA", content: "Please submit the completed FA-20 form by May 25 to restore your aid. Contact us at ext. 4102 or visit our office in Building C, Room 102 if you have questions.",                                            timestamp: "May 16, 8:01 AM",  read: false, fromMe: false },
  ],
  "conv-005": [
    { id: "m-005-1", senderName: "Jordan M.",   senderInitials: "JM", content: "Hey team — I've finished sections 1–3 of the report. Who's handling the conclusion and the bibliography?",                                                                                                               timestamp: "May 14, 3:10 PM",  read: true,  fromMe: false },
    { id: "m-005-2", senderName: "Alex Chen",   senderInitials: "AC", content: "I'll take the conclusion. Give me until tomorrow morning.",                                                                                                                                                               timestamp: "May 14, 3:15 PM",  read: true,  fromMe: true  },
    { id: "m-005-3", senderName: "Mei L.",      senderInitials: "ML", content: "I've uploaded my section to the shared drive. Someone verify the README before we submit — last time it had the wrong title header.",                                                                                    timestamp: "May 14, 4:22 PM",  read: false, fromMe: false },
  ],
  "conv-002": [
    { id: "m-002-1", senderName: "Alex Chen",          senderInitials: "AC", content: "Hi, I wanted to check whether I can enroll in CHEM-201 next semester. I completed CHEM-101 with a B+ last term.",                                                                                              timestamp: "May 13, 11:00 AM", read: true,  fromMe: true  },
    { id: "m-002-2", senderName: "Academic Advisor Kim", senderInitials: "AK", content: "Hi Alex! Yes, CHEM-101 satisfies the prerequisite. I can see your transcript. I'll process the prerequisite waiver by end of day. You should be able to register by tomorrow morning.",                      timestamp: "May 13, 2:45 PM",  read: true,  fromMe: false },
    { id: "m-002-3", senderName: "Academic Advisor Kim", senderInitials: "AK", content: "You're all set for next semester. I've cleared the hold on your account. Go ahead and register — just make sure you pick a section that doesn't conflict with your clinical lab time.",                        timestamp: "May 14, 9:10 AM",  read: true,  fromMe: false },
  ],
}

export const AUTO_REPLIES: Record<string, string> = {
  "conv-001": "Thanks for your message, Alex. I'll review this and get back to you shortly.",
  "conv-002": "Got it — I'll take a look and update your records. Check back tomorrow.",
  "conv-003": "We have received your message. Please call ext. 4102 for immediate assistance during office hours.",
  "conv-004": "Thank you for your message. I'll pass this along and follow up with you.",
  "conv-005": "Message received! I'll check the shared drive and confirm.",
  "default":  "Thank you for your message. I'll respond as soon as possible.",
}

// ─── Announcements ────────────────────────────────────────────────────────────

export interface Announcement {
  id: string
  title: string
  body: string
  author: string
  authorRole: string
  authorInitials: string
  scope: "school" | "class" | "program"
  course?: string
  program?: string
  priority: "normal" | "urgent"
  timestamp: string
  views: number
  pinned?: boolean
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-001",
    title: "Campus Closed — Memorial Day, May 25",
    body: "Atlanta Technical College will be closed on Monday, May 25 in observance of Memorial Day. All classes, labs, and administrative offices will be closed. Online coursework deadlines falling on May 25 are automatically extended to May 26.",
    author: "Office of the President",
    authorRole: "Admin",
    authorInitials: "OP",
    scope: "school",
    priority: "urgent",
    timestamp: "May 18, 8:00 AM",
    views: 1842,
    pinned: true,
  },
  {
    id: "ann-002",
    title: "FAFSA Priority Deadline — May 30",
    body: "Students who have not yet completed their 2026–27 FAFSA should do so by May 30 to be considered for maximum aid eligibility. Visit the Financial Aid office in Building C or call ext. 4102. Students with existing holds must resolve them before funds can be disbursed.",
    author: "Financial Aid Office",
    authorRole: "Staff",
    authorInitials: "FA",
    scope: "school",
    priority: "urgent",
    timestamp: "May 17, 10:00 AM",
    views: 1204,
  },
  {
    id: "ann-003",
    title: "NUR-101: Lab Schedule Change — Week of May 19",
    body: "Due to an equipment upgrade in Simulation Lab A, the NUR-101 clinical lab on Tuesday May 20 has been moved to Simulation Lab B (Building D, Room 210). All other details remain unchanged. Please update your calendars.",
    author: "Dr. Marcus Webb",
    authorRole: "Teacher",
    authorInitials: "MW",
    scope: "class",
    course: "NUR-101",
    priority: "urgent",
    timestamp: "May 17, 9:15 AM",
    views: 312,
  },
  {
    id: "ann-004",
    title: "New Simulation Lab Open — Healthcare Programs",
    body: "The SERA-funded high-fidelity simulation lab in Building D is now open for scheduled use. Healthcare program students can book practice slots through the Student Portal under Resources → Simulation Lab. Each booking is 90 minutes. Faculty must approve bookings.",
    author: "Dean of Health Sciences",
    authorRole: "Admin",
    authorInitials: "DH",
    scope: "program",
    program: "Healthcare",
    priority: "normal",
    timestamp: "May 16, 3:00 PM",
    views: 589,
  },
  {
    id: "ann-005",
    title: "CIS-150: Project 2 Deadline Extended to May 23",
    body: "Given the complexity of the final deliverable requirements added last week, the Project 2 submission deadline has been extended from May 21 to May 23 at 11:59 PM. No further extensions will be granted. All team members must submit the peer-evaluation form.",
    author: "Dr. James Okafor",
    authorRole: "Teacher",
    authorInitials: "JO",
    scope: "class",
    course: "CIS-150",
    priority: "normal",
    timestamp: "May 15, 5:30 PM",
    views: 228,
  },
  {
    id: "ann-006",
    title: "CompTIA Exam Vouchers Available — IT/Cybersecurity",
    body: "ATC has partnered with CompTIA to offer discounted exam vouchers for A+, Network+, and Security+ to currently enrolled IT and Cybersecurity students. Vouchers cover 75% of the exam cost. Apply through the IT Department office by May 31. Limited to 20 vouchers per certification.",
    author: "IT Department",
    authorRole: "Staff",
    authorInitials: "IT",
    scope: "program",
    program: "IT/Cybersecurity",
    priority: "normal",
    timestamp: "May 14, 11:00 AM",
    views: 441,
  },
  {
    id: "ann-007",
    title: "Library Hours Extended Through Finals",
    body: "The ATC Main Library will extend hours through the May 27–31 finals period: Monday–Thursday 7 AM–11 PM, Friday 7 AM–8 PM, Saturday–Sunday 9 AM–6 PM. Study rooms can be reserved up to 48 hours in advance through the Library portal.",
    author: "Library Services",
    authorRole: "Staff",
    authorInitials: "LS",
    scope: "school",
    priority: "normal",
    timestamp: "May 13, 2:00 PM",
    views: 978,
  },
  {
    id: "ann-008",
    title: "STEM-ED-AI Platform — New AI Workspace Features",
    body: "The AI Workspace (/assistant) now supports multi-agent mode, allowing you to query multiple specialized AI agents in a single session. New agents added: Assessment Builder (for practice quizzes) and Compliance Guard (for FERPA questions). Access from the sidebar or Cmd+K.",
    author: "SERA Neural Labs",
    authorRole: "System",
    authorInitials: "SN",
    scope: "school",
    priority: "normal",
    timestamp: "May 12, 9:00 AM",
    views: 1337,
  },
]

// ─── Discussion Boards ────────────────────────────────────────────────────────

export interface DiscussionThread {
  id: string
  courseCode: string
  courseName: string
  title: string
  author: string
  authorInitials: string
  authorRole: "student" | "teacher"
  preview: string
  replies: number
  lastActivity: string
  tags: string[]
  pinned?: boolean
  resolved?: boolean
}

export interface DiscussionReply {
  id: string
  threadId: string
  author: string
  authorInitials: string
  authorRole: "student" | "teacher"
  content: string
  timestamp: string
  upvotes: number
}

export const DISCUSSION_THREADS: DiscussionThread[] = [
  {
    id: "dt-001",
    courseCode: "NUR-101",
    courseName: "Clinical Fundamentals",
    title: "Study group for Week 8 practicals — anyone interested?",
    author: "Alex Chen",
    authorInitials: "AC",
    authorRole: "student",
    preview: "I'm struggling with the sterile technique sequence and want to form a study group before the practical exam on May 22. Proposing Thursday evening 6–8 PM in the sim lab.",
    replies: 7,
    lastActivity: "2h ago",
    tags: ["study-group", "practicals"],
    pinned: false,
  },
  {
    id: "dt-002",
    courseCode: "NUR-101",
    courseName: "Clinical Fundamentals",
    title: "Clarification on Lab 7 rubric — sterile field criterion",
    author: "Dr. Marcus Webb",
    authorInitials: "MW",
    authorRole: "teacher",
    preview: "Several students have asked about criterion 4b on the Lab 7 rubric. To clarify: the sterile field must be maintained throughout the entire gown procedure, not just during the initial set-up.",
    replies: 12,
    lastActivity: "Yesterday",
    tags: ["rubric", "clarification"],
    pinned: true,
  },
  {
    id: "dt-003",
    courseCode: "CIS-150",
    courseName: "Introduction to Programming",
    title: "Project 2 — anyone else getting a segfault on the linked list implementation?",
    author: "Jordan M.",
    authorInitials: "JM",
    authorRole: "student",
    preview: "My delete_node function is throwing a segfault when removing the tail. I've checked the pointer reassignment but it still crashes. Anyone solved this? Happy to share code snippets.",
    replies: 5,
    lastActivity: "3h ago",
    tags: ["debugging", "project-2", "c++"],
    pinned: false,
  },
  {
    id: "dt-004",
    courseCode: "CIS-150",
    courseName: "Introduction to Programming",
    title: "Office hours this week — extra sessions added",
    author: "Dr. James Okafor",
    authorInitials: "JO",
    authorRole: "teacher",
    preview: "Given the extended Project 2 deadline, I'm adding two extra office hour sessions: Tuesday May 20 from 1–3 PM and Thursday May 22 from 2–4 PM in Room 318. No appointment needed.",
    replies: 3,
    lastActivity: "May 15",
    tags: ["office-hours"],
    pinned: true,
  },
  {
    id: "dt-005",
    courseCode: "MED-110",
    courseName: "Medical Terminology",
    title: "Mnemonics for cardiovascular prefixes — share yours",
    author: "Priya S.",
    authorInitials: "PS",
    authorRole: "student",
    preview: "I came up with 'Cats Always Breathe Deeply' for cardio/angio/brady/dys prefixes. Would love to collect more from the class before the Chapter 5 quiz.",
    replies: 19,
    lastActivity: "May 14",
    tags: ["study-tips", "mnemonics"],
    pinned: false,
  },
  {
    id: "dt-006",
    courseCode: "MED-110",
    courseName: "Medical Terminology",
    title: "Extra credit paper — topic ideas?",
    author: "Alex Chen",
    authorInitials: "AC",
    authorRole: "student",
    preview: "Dr. Nair confirmed the extra credit topic must relate to pharmacology. I'm thinking about covering drug suffix patterns (-olol, -pril, -sartan). Anyone else working on this?",
    replies: 4,
    lastActivity: "May 13",
    tags: ["extra-credit", "pharmacology"],
    pinned: false,
  },
]

export const DISCUSSION_REPLIES: Record<string, DiscussionReply[]> = {
  "dt-001": [
    { id: "dr-001-1", threadId: "dt-001", author: "Mei L.",         authorInitials: "ML", authorRole: "student", content: "Count me in! Thursday works. Can we use Sim Lab B instead — it has the extra mannequins.",               timestamp: "1h ago",     upvotes: 3 },
    { id: "dr-001-2", threadId: "dt-001", author: "Jordan M.",      authorInitials: "JM", authorRole: "student", content: "I'll join. My weakest area is the hand hygiene sequencing. Does anyone have the WHO protocol PDF?",         timestamp: "2h ago",     upvotes: 1 },
    { id: "dr-001-3", threadId: "dt-001", author: "Dr. Marcus Webb", authorInitials: "MW", authorRole: "teacher", content: "Great initiative! I can pop in for the first 15 minutes to walk through the key assessment criteria.",       timestamp: "Yesterday",  upvotes: 8 },
  ],
  "dt-003": [
    { id: "dr-003-1", threadId: "dt-003", author: "Mei L.",     authorInitials: "ML", authorRole: "student", content: "Same issue here. I fixed it by checking if node->next == NULL before reassigning the prev pointer. Try that.", timestamp: "2h ago",    upvotes: 4 },
    { id: "dr-003-2", threadId: "dt-003", author: "Alex Chen",  authorInitials: "AC", authorRole: "student", content: "Seconding Mei's fix. Also make sure you're not freeing the node before updating head/tail.",                  timestamp: "3h ago",    upvotes: 2 },
  ],
}

// ─── Enrollment ───────────────────────────────────────────────────────────────

export interface StudentEnrollment {
  courseId:    string
  code:        string
  title:       string
  credits:     number
  section:     string
  schedule:    string
  room:        string
  instructor:  string
  grade:       string
  gradePoints: number
  attendance:  number
  progress:    number
  nextClass:   string
}

export const STUDENT_ENROLLMENTS: StudentEnrollment[] = [
  { courseId: "cs101",   code: "CS 1010",   title: "Introduction to Programming", credits: 3, section: "01", schedule: "MWF 9:00–9:50 AM",     room: "Room 204",     instructor: "Dr. Marcus Webb",   grade: "B+", gradePoints: 87, attendance: 94, progress: 65, nextClass: "Mon, May 19 · 9:00 AM"   },
  { courseId: "math201", code: "MATH 2010", title: "Calculus I",                  credits: 4, section: "02", schedule: "TTh 11:00 AM–12:15 PM", room: "Math Lab B",   instructor: "Prof. Sandra Lee",  grade: "C+", gradePoints: 77, attendance: 72, progress: 48, nextClass: "Tue, May 20 · 11:00 AM"  },
  { courseId: "nurs210", code: "NURS 2100", title: "Clinical Fundamentals",       credits: 4, section: "01", schedule: "MWF 8:00–8:50 AM",      room: "Sim Lab A",    instructor: "Prof. Dana Torres", grade: "D",  gradePoints: 64, attendance: 45, progress: 55, nextClass: "Mon, May 19 · 8:00 AM"   },
  { courseId: "engr480", code: "ENGR 4850", title: "AI Systems Engineering",      credits: 3, section: "01", schedule: "TTh 2:00–3:15 PM",      room: "Eng Hall 310", instructor: "Dr. Priya Nair",    grade: "A-", gradePoints: 92, attendance: 89, progress: 20, nextClass: "Tue, May 20 · 2:00 PM"   },
]

export interface CatalogCourse {
  id:          string
  code:        string
  title:       string
  credits:     number
  department:  string
  instructor:  string
  schedule:    string
  room:        string
  enrolled:    number
  capacity:    number
  waitlist:    number
  prereqs:     string[]
  prereqMet:   boolean
  description: string
  level:       string
  status:      "enrolled" | "open" | "waitlist" | "full" | "prereq-not-met"
}

export const ENROLLMENT_CATALOG: CatalogCourse[] = [
  { id: "cat-001", code: "CS 1010",   title: "Introduction to Programming",  credits: 3, department: "Computer Science", instructor: "Dr. Marcus Webb",   schedule: "MWF 9:00–9:50 AM",      room: "Room 204",       enrolled: 28, capacity: 30, waitlist: 0,  prereqs: [],           prereqMet: true,  description: "Fundamental programming concepts using Python. No prior experience required.", level: "100", status: "enrolled"      },
  { id: "cat-002", code: "CS 2010",   title: "Data Structures",              credits: 3, department: "Computer Science", instructor: "Dr. Marcus Webb",   schedule: "TTh 10:30–11:45 AM",    room: "Room 205",       enrolled: 22, capacity: 25, waitlist: 0,  prereqs: ["CS 1010"],  prereqMet: true,  description: "Arrays, linked lists, stacks, queues, trees, graphs, and sorting algorithms.", level: "200", status: "open"          },
  { id: "cat-003", code: "CS 3020",   title: "Algorithms & Complexity",      credits: 3, department: "Computer Science", instructor: "Dr. A. Patel",      schedule: "MWF 1:00–1:50 PM",      room: "Room 301",       enrolled: 19, capacity: 20, waitlist: 3,  prereqs: ["CS 2010"],  prereqMet: false, description: "Algorithm design paradigms, complexity analysis, NP-completeness.", level: "300", status: "prereq-not-met" },
  { id: "cat-004", code: "MATH 2010", title: "Calculus I",                   credits: 4, department: "Mathematics",      instructor: "Prof. Sandra Lee",  schedule: "TTh 11:00 AM–12:15 PM", room: "Math Lab B",     enrolled: 24, capacity: 25, waitlist: 0,  prereqs: [],           prereqMet: true,  description: "Limits, derivatives, integrals, and applications of differential calculus.", level: "200", status: "enrolled"      },
  { id: "cat-005", code: "MATH 2020", title: "Calculus II",                  credits: 4, department: "Mathematics",      instructor: "Prof. Sandra Lee",  schedule: "MWF 10:00–10:50 AM",    room: "Math Lab A",     enrolled: 20, capacity: 25, waitlist: 0,  prereqs: ["MATH 2010"],prereqMet: true,  description: "Integration techniques, sequences, series, and polar coordinates.", level: "200", status: "open"          },
  { id: "cat-006", code: "NURS 2100", title: "Clinical Fundamentals",        credits: 4, department: "Nursing",          instructor: "Prof. Dana Torres", schedule: "MWF 8:00–8:50 AM",      room: "Sim Lab A",      enrolled: 22, capacity: 24, waitlist: 0,  prereqs: [],           prereqMet: true,  description: "Core clinical nursing skills: patient assessment, sterile technique, medication admin.", level: "200", status: "enrolled"      },
  { id: "cat-007", code: "NURS 3100", title: "Advanced Patient Care",        credits: 4, department: "Nursing",          instructor: "Dr. Nia Osei",      schedule: "TTh 1:00–2:15 PM",      room: "Sim Lab B",      enrolled: 18, capacity: 20, waitlist: 2,  prereqs: ["NURS 2100"],prereqMet: true,  description: "Complex patient care scenarios, critical thinking, and inter-professional collaboration.", level: "300", status: "waitlist"      },
  { id: "cat-008", code: "ENGR 4850", title: "AI Systems Engineering",       credits: 3, department: "Engineering",      instructor: "Dr. Priya Nair",    schedule: "TTh 2:00–3:15 PM",      room: "Eng Hall 310",   enrolled: 18, capacity: 20, waitlist: 0,  prereqs: ["CS 2010"],  prereqMet: true,  description: "Design and deployment of AI/ML systems in engineering contexts.", level: "400", status: "enrolled"      },
  { id: "cat-009", code: "BUS 1010",  title: "Introduction to Business",     credits: 3, department: "Business",         instructor: "Dr. J. Mitchell",   schedule: "MWF 2:00–2:50 PM",      room: "Business 101",   enrolled: 30, capacity: 30, waitlist: 4,  prereqs: [],           prereqMet: true,  description: "Overview of business functions, entrepreneurship, and organizational behavior.", level: "100", status: "full"          },
  { id: "cat-010", code: "CIS-150",   title: "Information Systems",          credits: 3, department: "Computer Science", instructor: "Dr. James Okafor",  schedule: "MWF 11:00–11:50 AM",    room: "Room 210",       enrolled: 26, capacity: 28, waitlist: 0,  prereqs: [],           prereqMet: true,  description: "Fundamentals of information systems, databases, and enterprise applications.", level: "100", status: "open"          },
]

// ─── Attendance ───────────────────────────────────────────────────────────────

export type AttendanceStatus = "present" | "absent" | "tardy" | "excused" | "unmarked"

export interface RosterStudent {
  id:                  string
  name:                string
  initials:            string
  email:               string
  totalPresent:        number
  totalAbsent:         number
  totalTardy:          number
  consecutiveAbsences: number
}

export const CLASS_ROSTER: RosterStudent[] = [
  { id: "st001", name: "Alex Chen",          initials: "AC", email: "achen@atc.edu",     totalPresent: 20, totalAbsent: 1,  totalTardy: 1, consecutiveAbsences: 0 },
  { id: "st002", name: "Marcus Thompson",     initials: "MT", email: "mthompson@atc.edu", totalPresent: 12, totalAbsent: 9,  totalTardy: 1, consecutiveAbsences: 4 },
  { id: "st003", name: "Destiny Williams",    initials: "DW", email: "dwilliams@atc.edu", totalPresent: 19, totalAbsent: 2,  totalTardy: 1, consecutiveAbsences: 0 },
  { id: "st004", name: "Jaylen Moore",        initials: "JM", email: "jmoore@atc.edu",    totalPresent: 15, totalAbsent: 6,  totalTardy: 1, consecutiveAbsences: 3 },
  { id: "st005", name: "Amara Jackson",       initials: "AJ", email: "ajackson@atc.edu",  totalPresent: 21, totalAbsent: 0,  totalTardy: 1, consecutiveAbsences: 0 },
  { id: "st006", name: "Jordan Rivera",       initials: "JR", email: "jrivera@atc.edu",   totalPresent: 22, totalAbsent: 0,  totalTardy: 0, consecutiveAbsences: 0 },
  { id: "st007", name: "Taylor Washington",   initials: "TW", email: "twash@atc.edu",     totalPresent: 20, totalAbsent: 2,  totalTardy: 0, consecutiveAbsences: 0 },
  { id: "st008", name: "Mei Lin",             initials: "ML", email: "mlin@atc.edu",      totalPresent: 22, totalAbsent: 0,  totalTardy: 0, consecutiveAbsences: 0 },
  { id: "st009", name: "Devon Carter",        initials: "DC", email: "dcarter@atc.edu",   totalPresent: 17, totalAbsent: 4,  totalTardy: 1, consecutiveAbsences: 2 },
  { id: "st010", name: "Priya Sharma",        initials: "PS", email: "psharma@atc.edu",   totalPresent: 22, totalAbsent: 0,  totalTardy: 0, consecutiveAbsences: 0 },
]

export interface AttendanceSession {
  id:    string
  date:  string
  label: string
  records: Record<string, AttendanceStatus>
}

export const ATTENDANCE_SESSIONS: AttendanceSession[] = [
  {
    id: "sess-001", date: "2026-05-18", label: "Mon, May 18 (Today)",
    records: { st001: "present", st002: "absent", st003: "present", st004: "absent", st005: "present", st006: "present", st007: "present", st008: "present", st009: "tardy",  st010: "present" },
  },
  {
    id: "sess-002", date: "2026-05-15", label: "Fri, May 15",
    records: { st001: "present", st002: "absent", st003: "present", st004: "tardy",  st005: "present", st006: "present", st007: "absent", st008: "present", st009: "absent", st010: "present" },
  },
  {
    id: "sess-003", date: "2026-05-14", label: "Thu, May 14",
    records: { st001: "present", st002: "absent", st003: "present", st004: "absent", st005: "present", st006: "present", st007: "present", st008: "excused", st009: "present", st010: "present" },
  },
]

// ─── Assessments ──────────────────────────────────────────────────────────────

export type AssessmentType   = "quiz" | "exam" | "homework"
export type AssessmentStatus = "draft" | "active" | "closed" | "graded"
export type QuestionType     = "mcq" | "short_answer"

export interface Assessment {
  id:             string
  courseId:       string
  courseCode:     string
  title:          string
  type:           AssessmentType
  timeLimit:      number   // minutes, 0 = no limit
  totalQuestions: number
  maxPoints:      number
  dueDate:        string
  status:         AssessmentStatus
  submissions:    number
}

export const ASSESSMENTS: Assessment[] = [
  { id: "quiz-001", courseId: "cs101",   courseCode: "CS 1010",   title: "Quiz 3 — Functions & Loops",          type: "quiz",     timeLimit: 20, totalQuestions: 10, maxPoints: 50,  dueDate: "2026-05-22", status: "active",  submissions: 14 },
  { id: "exam-001", courseId: "cs101",   courseCode: "CS 1010",   title: "Midterm Exam",                        type: "exam",     timeLimit: 90, totalQuestions: 30, maxPoints: 100, dueDate: "2026-05-23", status: "active",  submissions: 2  },
  { id: "hw-001",   courseId: "cs101",   courseCode: "CS 1010",   title: "Assignment 4 — Recursion",            type: "homework", timeLimit: 0,  totalQuestions: 5,  maxPoints: 50,  dueDate: "2026-05-21", status: "active",  submissions: 19 },
  { id: "quiz-002", courseId: "math201", courseCode: "MATH 2010", title: "Quiz 7 — Integration by Parts",       type: "quiz",     timeLimit: 15, totalQuestions: 8,  maxPoints: 40,  dueDate: "2026-05-20", status: "draft",   submissions: 0  },
  { id: "exam-002", courseId: "nurs210", courseCode: "NURS 2100", title: "Clinical Skills Practical Exam",      type: "exam",     timeLimit: 60, totalQuestions: 20, maxPoints: 100, dueDate: "2026-05-27", status: "draft",   submissions: 0  },
]

export interface QuizQuestion {
  id:            string
  assessmentId:  string
  number:        number
  type:          QuestionType
  text:          string
  options?:      string[]
  correctIndex?: number
  points:        number
  rubric?:       string
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: "q001", assessmentId: "quiz-001", number: 1,  type: "mcq",          text: "Which keyword is used to define a function in Python?",                                                                         options: ["func", "def", "function", "define"],                                                        correctIndex: 1, points: 5 },
  { id: "q002", assessmentId: "quiz-001", number: 2,  type: "mcq",          text: "What is the output of: print(type(3.14))?",                                                                                    options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],                 correctIndex: 1, points: 5 },
  { id: "q003", assessmentId: "quiz-001", number: 3,  type: "mcq",          text: "Which loop is guaranteed to execute at least once?",                                                                           options: ["for loop", "while loop", "do-while loop", "foreach loop"],                                  correctIndex: 2, points: 5 },
  { id: "q004", assessmentId: "quiz-001", number: 4,  type: "mcq",          text: "What does the 'return' statement do inside a function?",                                                                       options: ["Prints a value", "Exits the program", "Sends a value back to the caller", "Defines a variable"], correctIndex: 2, points: 5 },
  { id: "q005", assessmentId: "quiz-001", number: 5,  type: "mcq",          text: "What is the correct syntax to call a function named 'greet' with argument 'Alex'?",                                          options: ["greet.Alex()", "greet('Alex')", "call greet('Alex')", "function greet('Alex')"],             correctIndex: 1, points: 5 },
  { id: "q006", assessmentId: "quiz-001", number: 6,  type: "mcq",          text: "In Python, which of the following correctly defines a list?",                                                                  options: ["{1, 2, 3}", "(1, 2, 3)", "[1, 2, 3]", "<1, 2, 3>"],                                         correctIndex: 2, points: 5 },
  { id: "q007", assessmentId: "quiz-001", number: 7,  type: "mcq",          text: "What is the index of the first element in a Python list?",                                                                     options: ["1", "0", "-1", "undefined"],                                                                 correctIndex: 1, points: 5 },
  { id: "q008", assessmentId: "quiz-001", number: 8,  type: "mcq",          text: "Which operator is used for integer division in Python 3?",                                                                     options: ["/", "÷", "//", "%"],                                                                         correctIndex: 2, points: 5 },
  { id: "q009", assessmentId: "quiz-001", number: 9,  type: "short_answer", text: "Explain in one or two sentences what a recursive function is and give a simple example of when you would use one.",          points: 5, rubric: "Must define recursion (function calling itself) and provide a valid use case (e.g., factorial, Fibonacci)." },
  { id: "q010", assessmentId: "quiz-001", number: 10, type: "short_answer", text: "Write a Python function called 'is_even' that takes an integer 'n' and returns True if n is even, False otherwise.",          points: 5, rubric: "Must use 'def', return a boolean, use modulo operator (%). Partial credit for correct logic with syntax error." },
]

// ─── Sprint 14: File Management ──────────────────────────────────────────────

export type CourseFileType = "pdf" | "pptx" | "docx" | "mp4" | "youtube" | "zip" | "xlsx"

export interface CourseFile {
  id:           string
  courseId:     string
  name:         string
  type:         CourseFileType
  size?:        string
  uploadedBy:   string
  uploadedAt:   string
  youtubeId?:   string
  week?:        number
}

export const COURSE_FILES: CourseFile[] = [
  { id: "cf001", courseId: "cs101",   name: "CS 1010 Syllabus — Spring 2026.pdf",          type: "pdf",     size: "184 KB",  uploadedBy: "Dr. Marcus Webb",  uploadedAt: "Jan 13, 2026", week: 1 },
  { id: "cf002", courseId: "cs101",   name: "Week 1 — Intro to Python Slides.pptx",         type: "pptx",    size: "3.2 MB",  uploadedBy: "Dr. Marcus Webb",  uploadedAt: "Jan 15, 2026", week: 1 },
  { id: "cf003", courseId: "cs101",   name: "Week 3 — Control Flow & Loops.pptx",           type: "pptx",    size: "2.8 MB",  uploadedBy: "Dr. Marcus Webb",  uploadedAt: "Jan 29, 2026", week: 3 },
  { id: "cf004", courseId: "cs101",   name: "Lecture Recording — Functions & Scope",        type: "youtube", youtubeId: "rfscVS0vtbw", uploadedBy: "Dr. Marcus Webb", uploadedAt: "May 5, 2026",  week: 8 },
  { id: "cf005", courseId: "cs101",   name: "Assignment 4 — Recursion Starter Code.zip",   type: "zip",     size: "45 KB",   uploadedBy: "Dr. Marcus Webb",  uploadedAt: "May 10, 2026", week: 9 },
  { id: "cf006", courseId: "cs101",   name: "Midterm Study Guide.pdf",                      type: "pdf",     size: "890 KB",  uploadedBy: "Dr. Marcus Webb",  uploadedAt: "May 12, 2026", week: 10 },
  { id: "cf007", courseId: "math201", name: "Calculus II Syllabus.pdf",                     type: "pdf",     size: "156 KB",  uploadedBy: "Prof. Sandra Lee", uploadedAt: "Jan 13, 2026", week: 1 },
  { id: "cf008", courseId: "math201", name: "Week 3 — Integration Techniques.pdf",          type: "pdf",     size: "2.1 MB",  uploadedBy: "Prof. Sandra Lee", uploadedAt: "Feb 3, 2026",  week: 3 },
  { id: "cf009", courseId: "math201", name: "Problem Set 6 — Solutions.pdf",                type: "pdf",     size: "1.4 MB",  uploadedBy: "Prof. Sandra Lee", uploadedAt: "Feb 24, 2026", week: 6 },
  { id: "cf010", courseId: "engr480", name: "ENGR 4850 Course Overview.pptx",              type: "pptx",    size: "5.6 MB",  uploadedBy: "Dr. Priya Nair",   uploadedAt: "Jan 13, 2026", week: 1 },
  { id: "cf011", courseId: "engr480", name: "Neural Networks Lab Manual.pdf",              type: "pdf",     size: "3.8 MB",  uploadedBy: "Dr. Priya Nair",   uploadedAt: "Apr 15, 2026", week: 7 },
  { id: "cf012", courseId: "engr480", name: "AI Ethics Required Reading.pdf",              type: "pdf",     size: "720 KB",  uploadedBy: "Dr. Priya Nair",   uploadedAt: "Mar 10, 2026", week: 5 },
  { id: "cf013", courseId: "nurs210", name: "NURS 2100 Clinical Skills Handbook.pdf",      type: "pdf",     size: "4.2 MB",  uploadedBy: "Prof. Dana Torres", uploadedAt: "Jan 13, 2026", week: 1 },
  { id: "cf014", courseId: "nurs210", name: "Week 4 — Medication Administration.pptx",     type: "pptx",    size: "6.1 MB",  uploadedBy: "Prof. Dana Torres", uploadedAt: "Feb 10, 2026", week: 4 },
  { id: "cf015", courseId: "nurs210", name: "Clinical Simulation Lab Recording",           type: "youtube", youtubeId: "9bZkp7q19f0",  uploadedBy: "Prof. Dana Torres", uploadedAt: "Apr 28, 2026", week: 9 },
]

// ─── Sprint 14: PD Catalog ────────────────────────────────────────────────────

export interface PdCatalogItem {
  id:           string
  title:        string
  description:  string
  provider:     string
  duration:     string
  format:       "online" | "in-person" | "hybrid"
  required:     boolean
  dueDate?:     string
  completedBy:  string[]
  credits:      number
}

export const PD_CATALOG: PdCatalogItem[] = [
  { id: "ferpa",          title: "FERPA Compliance Training",           description: "Federal student privacy law requirements for faculty and staff. Annual mandatory recertification.", provider: "TCSG Central",             duration: "1h 45min", format: "online",    required: true,  dueDate: "May 31, 2026", completedBy: ["f001", "f002", "f005"],             credits: 2 },
  { id: "ai-literacy",    title: "AI Literacy for Educators",           description: "Practical guide to using AI tools in the classroom responsibly. Covers prompt engineering and bias.", provider: "SERA Neural Labs",        duration: "2h 30min", format: "online",    required: true,  dueDate: "May 31, 2026", completedBy: ["f001", "f005"],                     credits: 3 },
  { id: "title-ix",       title: "Title IX & Campus Safety",            description: "Mandatory training on sexual misconduct prevention, reporting obligations, and supportive measures.", provider: "ATC HR Department",       duration: "1h 15min", format: "online",    required: true,  dueDate: "May 31, 2026", completedBy: ["f001", "f002", "f004", "f005"],     credits: 1 },
  { id: "accessibility",  title: "Accessible Course Design",            description: "ADA/Section 508 compliance for course materials, digital content, and online learning environments.", provider: "GSU Center for Teaching", duration: "3h 00min", format: "hybrid",    required: true,  dueDate: "May 31, 2026", completedBy: ["f001", "f002", "f004", "f005"],     credits: 3 },
  { id: "data-privacy",   title: "Data Privacy & Cybersecurity Basics", description: "Best practices for handling student data, password hygiene, phishing awareness, and incident reporting.", provider: "TCSG IT Security",       duration: "1h 00min", format: "online",    required: false, completedBy: ["f001"],                             credits: 1 },
  { id: "trauma-inform",  title: "Trauma-Informed Teaching Practices",  description: "Strategies for recognizing and supporting students experiencing trauma. Evidence-based classroom approaches.", provider: "ATC Counseling",         duration: "2h 00min", format: "in-person", required: false, completedBy: ["f001", "f005"],                     credits: 2 },
  { id: "dei-classroom",  title: "DEI in the Classroom",                description: "Building culturally responsive syllabi and inclusive assessment practices for diverse student populations.", provider: "GSU Diversity Office",   duration: "2h 30min", format: "hybrid",    required: false, completedBy: [],                                   credits: 2 },
  { id: "active-learn",   title: "Active Learning Strategies",          description: "Move beyond lectures. Hands-on techniques: think-pair-share, flipped classroom, project-based learning.", provider: "ATC Faculty Dev",        duration: "3h 30min", format: "in-person", required: false, completedBy: ["f002", "f003"],                     credits: 4 },
]

// ─── Sprint 14: NABA Mentor Matching ─────────────────────────────────────────

export type MentorAvailability = "weekly" | "biweekly" | "monthly"

export interface MentorProfile {
  id:                 string
  name:               string
  initials:           string
  title:              string
  company:            string
  field:              string
  location:           string
  availability:       MentorAvailability
  availabilityLabel:  string
  matchScore:         number
  bio:                string
  expertise:          string[]
  sessionsCompleted:  number
  rating:             number
  connected:          boolean
}

export const MENTORS: MentorProfile[] = [
  { id: "m001", name: "Dr. Keisha Johnson",  initials: "KJ", title: "VP of Data Science",      company: "NCR Atleos",         field: "Data Science",       location: "Atlanta, GA",     availability: "biweekly", availabilityLabel: "Every other week", matchScore: 96, bio: "20+ years in data engineering and ML. HBCU alum (Spelman '04). Passionate about growing Black engineers in tech.", expertise: ["Python", "Machine Learning", "Career Dev", "Women in Tech"], sessionsCompleted: 47, rating: 4.9, connected: true  },
  { id: "m002", name: "Marcus Dunlap",       initials: "MD", title: "Senior Software Engineer", company: "Google",             field: "Software Engineering",location: "Remote",          availability: "weekly",   availabilityLabel: "Weekly",           matchScore: 91, bio: "Full-stack engineer at Google. FAANG interview prep specialist and open source contributor.", expertise: ["System Design", "JavaScript", "Interview Prep", "Open Source"], sessionsCompleted: 33, rating: 4.8, connected: false },
  { id: "m003", name: "Aisha Okonkwo",       initials: "AO", title: "Cybersecurity Architect",  company: "Deloitte",           field: "Cybersecurity",      location: "Washington, DC",  availability: "biweekly", availabilityLabel: "Every other week", matchScore: 84, bio: "Federal cybersecurity consultant. Former NSA. Helping students break into federal tech and earn certs.", expertise: ["NIST RMF", "FedRAMP", "Zero Trust", "Certifications"], sessionsCompleted: 21, rating: 4.7, connected: false },
  { id: "m004", name: "James Osei",          initials: "JO", title: "AI Research Scientist",    company: "Microsoft Research", field: "Artificial Intelligence", location: "Seattle, WA", availability: "monthly",  availabilityLabel: "Once a month",     matchScore: 88, bio: "Research scientist on LLMs and responsible AI. PhD from Georgia Tech. Supporter of STEM diversity.", expertise: ["LLMs", "NLP", "Research Methods", "PhD Prep"], sessionsCompleted: 15, rating: 5.0, connected: false },
  { id: "m005", name: "Tanya Williams",      initials: "TW", title: "Product Manager",          company: "Salesforce",         field: "Product Management", location: "Atlanta, GA",     availability: "biweekly", availabilityLabel: "Every other week", matchScore: 79, bio: "PM at Salesforce with EdTech background. Helps technical students transition to product roles.", expertise: ["Product Strategy", "Agile", "EdTech", "Career Pivots"], sessionsCompleted: 28, rating: 4.6, connected: false },
  { id: "m006", name: "Robert Chen",         initials: "RC", title: "Founder & CTO",            company: "EduVentures",        field: "Entrepreneurship",   location: "Remote",          availability: "monthly",  availabilityLabel: "Once a month",     matchScore: 72, bio: "Serial EdTech founder with two exits. Now advising early-stage startups and student entrepreneurs.", expertise: ["Startups", "Fundraising", "EdTech", "Leadership"], sessionsCompleted: 19, rating: 4.5, connected: false },
]

export interface MentorSession {
  id:        string
  mentorId:  string
  date:      string
  duration:  number
  topic:     string
  notes:     string
  status:    "completed" | "scheduled" | "cancelled"
}

export const MENTOR_SESSIONS: MentorSession[] = [
  { id: "ms001", mentorId: "m001", date: "May 12, 2026", duration: 45, topic: "Python career paths in data science",   notes: "Discussed portfolio projects. Recommended Kaggle competitions. Next: mock interview.",  status: "completed" },
  { id: "ms002", mentorId: "m001", date: "May 26, 2026", duration: 45, topic: "Mock technical interview prep",        notes: "",                                                                                    status: "scheduled"  },
]

// ─── Sprint 15: Multi-Tenancy ─────────────────────────────────────────────────

export type TenantStatus = "healthy" | "warning" | "critical"
export type TenantPlan   = "starter" | "professional" | "enterprise"

export interface Tenant {
  id:            string
  name:          string
  shortName:     string
  subdomain:     string
  accentColor:   string
  students:      number
  faculty:       number
  storageUsedMb: number
  storageLimitMb:number
  activeUsers:   number
  lastSync:      string
  status:        TenantStatus
  ferpaIsolated: boolean
  plan:          TenantPlan
  complianceScore: number
}

export const TENANTS: Tenant[] = [
  { id: "atc", name: "Atlanta Technical College",    shortName: "ATC", subdomain: "atc.stem-ed.ai",  accentColor: "#4F46E5", students: 3493,  faculty: 47,  storageUsedMb: 2840,  storageLimitMb: 10000, activeUsers: 1247,  lastSync: "May 18 · 9:42 AM",  status: "healthy",  ferpaIsolated: true, plan: "enterprise",    complianceScore: 97 },
  { id: "gsu", name: "Georgia Southern University",  shortName: "GSU", subdomain: "gsu.stem-ed.ai",  accentColor: "#059669", students: 26500, faculty: 312, storageUsedMb: 18400, storageLimitMb: 50000, activeUsers: 8934,  lastSync: "May 18 · 9:40 AM",  status: "healthy",  ferpaIsolated: true, plan: "enterprise",    complianceScore: 94 },
  { id: "ksu", name: "Kennesaw State University",    shortName: "KSU", subdomain: "ksu.stem-ed.ai",  accentColor: "#D97706", students: 43000, faculty: 521, storageUsedMb: 31200, storageLimitMb: 50000, activeUsers: 14218, lastSync: "May 18 · 8:15 AM",  status: "warning",  ferpaIsolated: true, plan: "enterprise",    complianceScore: 81 },
]

// ─── Sprint 15: Integrations ──────────────────────────────────────────────────

export type IntegrationStatus   = "connected" | "disconnected" | "error" | "syncing"
export type IntegrationCategory = "sis" | "lms" | "sso" | "communication" | "federal" | "productivity"

export interface Integration {
  id:            string
  name:          string
  description:   string
  category:      IntegrationCategory
  status:        IntegrationStatus
  lastSync?:     string
  syncFrequency?:string
  recordsSync?:  number
  docsUrl?:      string
}

export const INTEGRATIONS: Integration[] = [
  { id: "banner",      name: "Banner SIS",          description: "Ellucian Banner — student records, enrollment, grades, and financial aid passback.",                  category: "sis",           status: "connected",    lastSync: "May 18 · 9:42 AM",  syncFrequency: "Every 4 hours",  recordsSync: 3493 },
  { id: "canvas",      name: "Canvas LMS",           description: "Instructure Canvas — course content import, assignment sync, and grade passback.",                    category: "lms",           status: "connected",    lastSync: "May 18 · 8:00 AM",  syncFrequency: "Daily",          recordsSync: 847  },
  { id: "blackboard",  name: "Blackboard",           description: "Anthology Blackboard — course materials, grade sync, and content migration.",                         category: "lms",           status: "disconnected"                                                              },
  { id: "google",      name: "Google Workspace",     description: "SSO via Google OAuth, Gmail notifications, Drive storage, and Google Calendar sync.",                 category: "sso",           status: "connected",    lastSync: "May 18 · 9:00 AM",  syncFrequency: "Real-time"                },
  { id: "microsoft",   name: "Microsoft 365",        description: "Azure AD SAML SSO, Outlook email alerts, OneDrive, and Teams/Outlook Calendar sync.",                 category: "sso",           status: "connected",    lastSync: "May 18 · 9:05 AM",  syncFrequency: "Real-time"                },
  { id: "samgov",      name: "SAM.gov",              description: "Federal contract opportunities, DUNS/UEI verification, RFP tracking, and award data.",                category: "federal",       status: "connected",    lastSync: "May 18 · 6:00 AM",  syncFrequency: "Daily at 6 AM", recordsSync: 142  },
  { id: "zoom",        name: "Zoom",                 description: "Embedded Zoom links in calendar events, virtual office hours, and class session recordings.",         category: "communication", status: "connected"                                                                 },
  { id: "teams",       name: "Microsoft Teams",      description: "Teams meeting links embedded in calendar events, class sessions, and advisor appointments.",          category: "communication", status: "error",        lastSync: "May 15 · 10:00 AM"                             },
  { id: "touchnet",    name: "Touchnet / Nelnet",    description: "Fee payment portal integration — tuition, housing, and meal plan payments with history.",             category: "productivity",  status: "disconnected"                                                              },
  { id: "turnitin",    name: "Turnitin",             description: "Plagiarism detection for student submissions via LTI integration with Canvas/Blackboard.",            category: "lms",           status: "connected",    lastSync: "May 17 · 11:30 PM", syncFrequency: "On submission"            },
]

export const WEBHOOKS = [
  { id: "wh001", name: "Banner Grade Passback",       url: "https://banner.atc.edu/api/grades/ingest",     events: ["assessment.graded", "grade.final"],   active: true,  lastTriggered: "May 18 · 9:42 AM",  deliveries: 247 },
  { id: "wh002", name: "Risk Alert — Slack",          url: "https://hooks.slack.com/services/T00/B00/xxx",  events: ["student.risk_score_changed"],          active: true,  lastTriggered: "May 18 · 8:31 AM",  deliveries: 89  },
  { id: "wh003", name: "Enrollment → Salesforce CRM", url: "https://crm.seratrust.org/webhooks/enroll",    events: ["student.enrolled", "student.dropped"],  active: false, lastTriggered: "May 10 · 3:12 PM",  deliveries: 34  },
]

// Custom report builder options
export const REPORT_PROGRAMS = ["All Programs", "Computer Science", "Mathematics", "Nursing", "Engineering", "Business", "Information Technology", "Welding Technology"] as const
export const REPORT_COHORTS  = ["All Cohorts", "Fall 2024", "Spring 2025", "Fall 2025", "Spring 2026"] as const

export interface SavedReport {
  id:          string
  name:        string
  filters:     string
  generatedAt: string
  rows:        number
  format:      "pdf" | "xlsx"
}

export const SAVED_REPORTS: SavedReport[] = [
  { id: "sr001", name: "CS Program Retention — Fall 2025",      filters: "Computer Science · Fall 2025 · All demographics", generatedAt: "May 15, 2026", rows: 143,  format: "xlsx" },
  { id: "sr002", name: "At-Risk Students by Aid Status",        filters: "All Programs · Spring 2026 · Hold/Delayed aid",   generatedAt: "May 12, 2026", rows: 67,   format: "pdf"  },
  { id: "sr003", name: "Faculty PD Compliance — Spring 2026",   filters: "All Departments · Spring 2026",                   generatedAt: "May 18, 2026", rows: 5,    format: "pdf"  },
]
