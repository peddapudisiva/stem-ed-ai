import { redirect } from "next/navigation"

export default function DashboardPage() {
  // TODO Sprint 2: redirect based on authenticated user role
  redirect("/dashboard/student")
}
