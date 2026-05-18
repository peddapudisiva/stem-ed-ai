// SERA Neural Labs — UI copy constants (i18n-ready)
// All user-facing strings live here. Never hardcode strings in components.

export const NAV = {
  home: "Home",
  courses: "Courses",
  tutor: "AI Tutor",
  calendar: "Calendar",
  credentials: "Credentials",
  community: "Community",
  classes: "Classes",
  gradebook: "Gradebook",
  curriculum: "Curriculum",
  assistant: "AI Assistant",
  students: "Students",
  faculty: "Faculty",
  reports: "Reports",
  retention: "Retention Intel",
  schools: "All Schools",
  proposals: "Proposals",
  catalog: "eCatalog",
  risk: "Risk Assessment",
  compliance: "Compliance",
  audit: "Audit Log",
  messages: "Messages",
  settings: "Settings",
  profile: "Profile",
  notifications: "Notifications",
  billing: "Billing",
  signOut: "Sign out",
} as const

export const ROLES = {
  student: "Student",
  teacher: "Teacher",
  admin: "Principal / Admin",
  district_leader: "District Leader",
  curriculum_committee: "Curriculum Committee",
  govcon: "GovCon / Leadership",
  parent: "Parent",
  cyber_it: "IT / Cyber",
} as const

export const EMPTY_STATES = {
  courses: { title: "No courses yet", description: "Your enrolled courses will appear here. Contact your advisor to get started." },
  proposals: { title: "No proposals yet", description: "Nothing here yet. Create your first proposal →" },
  notifications: { title: "All caught up", description: "You're up to date. No new notifications." },
  students: { title: "No students match", description: "Try adjusting your filters or search terms." },
  reports: { title: "No reports generated", description: "Run your first report to see it here." },
  messages: { title: "No messages yet", description: "Start a conversation with a student, teacher, or advisor." },
  grades: { title: "No grades submitted", description: "Grades will appear here after the first assignment deadline." },
  badges: { title: "No badges earned yet", description: "Complete assignments and courses to earn your first badge." },
  opportunities: { title: "No opportunities found", description: "Check back soon — new RFPs are synced from SAM.gov daily." },
  calendar: { title: "Nothing scheduled", description: "Drag to create an event or sync your external calendar." },
} as const

export const ACTIONS = {
  createProposal: "New proposal",
  generateLesson: "Generate lesson plan",
  createAssessment: "Create assessment",
  sendIntervention: "Send intervention",
  exportReport: "Export report",
  addStudent: "Add student",
  inviteFaculty: "Invite faculty",
  syncCalendar: "Sync calendar",
  saveDraft: "Save draft",
  sendForReview: "Send for review",
  publishCatalog: "Publish to catalog",
  approveProposal: "Approve",
  requestChanges: "Request changes",
  markComplete: "Mark complete",
  viewDetails: "View details",
  runReport: "Run report",
} as const

export const STATUS = {
  online: "Online",
  beta: "Beta",
  offline: "Offline",
  active: "Active",
  hold: "Hold",
  delayed: "Delayed",
  pending: "Pending",
  inReview: "In Review",
  approved: "Approved",
  rejected: "Rejected",
  draft: "Draft",
  urgent: "Urgent",
  compliant: "Compliant",
  nonCompliant: "Non-compliant",
} as const

export const ERRORS = {
  generic: "Something didn't go through. The team's been notified.",
  network: "Can't reach the server. Check your connection and try again.",
  samGov: "Couldn't reach SAM.gov. Trying again in 5s…",
  supabase: "Database connection lost. Reconnecting…",
  unauthorized: "You don't have permission to view this.",
  notFound: "This page doesn't exist or was moved.",
  loadFail: (resource: string) => `Couldn't load ${resource}. Pull to refresh.`,
} as const

export const LOADING = {
  students: "Pulling student records…",
  proposals: "Loading proposals…",
  reports: "Generating report…",
  dashboard: "Loading your dashboard…",
  agents: "Connecting to AI agents…",
  calendar: "Syncing calendar…",
  banner: "Pulling records from Banner…",
  opportunities: "Fetching opportunities from SAM.gov…",
} as const

export const TOPBAR = {
  searchPlaceholder: "Search students, courses, proposals… (⌘K)",
  notificationsLabel: "Notifications",
  profileLabel: "My profile",
} as const

export const FOOTER = {
  brand: "SERA Neural Labs",
  version: "v1.0.0",
  rights: `© ${new Date().getFullYear()} SERA Neural Labs`,
} as const
