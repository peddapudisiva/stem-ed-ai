import { create } from "zustand"
import { persist } from "zustand/middleware"

export type AuthRole =
  | "student"
  | "teacher"
  | "admin"
  | "district_leader"
  | "curriculum_committee"
  | "govcon"
  | "parent"
  | "cyber_it"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: AuthRole
  institution: string
  hasOnboarded: boolean
  avatarInitials: string
}

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  setUser: (user: AuthUser) => void
  completeOnboarding: () => void
}

// Mock users per role for demo
const MOCK_USERS: Record<string, AuthUser> = {
  "student@atc.edu": {
    id: "u001", name: "Alex Chen", email: "student@atc.edu",
    role: "student", institution: "Atlanta Technical College",
    hasOnboarded: false, avatarInitials: "AC",
  },
  "teacher@atc.edu": {
    id: "u002", name: "Dr. Marcus Webb", email: "teacher@atc.edu",
    role: "teacher", institution: "Atlanta Technical College",
    hasOnboarded: true, avatarInitials: "MW",
  },
  "admin@atc.edu": {
    id: "u003", name: "Dr. Sandra Lee", email: "admin@atc.edu",
    role: "admin", institution: "Atlanta Technical College",
    hasOnboarded: true, avatarInitials: "SL",
  },
  "district@tcsg.edu": {
    id: "u004", name: "Commissioner Davis", email: "district@tcsg.edu",
    role: "district_leader", institution: "TCSG",
    hasOnboarded: true, avatarInitials: "CD",
  },
  "curriculum@gsu.edu": {
    id: "u005", name: "Dr. Priya Nair", email: "curriculum@gsu.edu",
    role: "curriculum_committee", institution: "Georgia Southern University",
    hasOnboarded: true, avatarInitials: "PN",
  },
  "govcon@sera.ai": {
    id: "u006", name: "James Carter", email: "govcon@sera.ai",
    role: "govcon", institution: "SERA Neural Labs",
    hasOnboarded: true, avatarInitials: "JC",
  },
  "parent@atc.edu": {
    id: "u007", name: "Ms. Thompson", email: "parent@atc.edu",
    role: "parent", institution: "Atlanta Technical College",
    hasOnboarded: true, avatarInitials: "MT",
  },
  "cyber@atc.edu": {
    id: "u008", name: "IT Admin", email: "cyber@atc.edu",
    role: "cyber_it", institution: "Atlanta Technical College",
    hasOnboarded: true, avatarInitials: "IA",
  },
}

const ROLE_HOME: Record<AuthRole, string> = {
  student: "/dashboard/student",
  teacher: "/dashboard/teacher",
  admin: "/dashboard/admin",
  district_leader: "/dashboard/district",
  curriculum_committee: "/dashboard/curriculum",
  govcon: "/dashboard/govcon",
  parent: "/dashboard/parent",
  cyber_it: "/dashboard/cyber",
}

export { ROLE_HOME }

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      signIn: async (email, _password) => {
        set({ isLoading: true })
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 800))
        const user = MOCK_USERS[email] ?? {
          id: "u999", name: "Demo User", email,
          role: "student" as AuthRole,
          institution: "Atlanta Technical College",
          hasOnboarded: false,
          avatarInitials: email.slice(0, 2).toUpperCase(),
        }
        set({ user, isLoading: false })
      },

      signOut: () => set({ user: null }),

      setUser: (user) => set({ user }),

      completeOnboarding: () =>
        set((state) =>
          state.user ? { user: { ...state.user, hasOnboarded: true } } : {}
        ),
    }),
    { name: "stem-ed-ai-auth" }
  )
)
