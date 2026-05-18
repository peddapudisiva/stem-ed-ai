import { create } from "zustand"
import { NOTIFICATIONS as SEED } from "@/lib/demo-data"

export interface Notification {
  id: string
  type: "alert" | "update" | "success" | "mention"
  title: string
  description: string
  time: string
  read: boolean
  link: string
}

interface NotificationState {
  notifications: Notification[]
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  unreadCount: () => number
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: SEED,

  markAsRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),

  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}))
