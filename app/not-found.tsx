import Link from "next/link"
import { Brain, Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAF9] px-4 text-center">
      {/* Logo */}
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4F46E5]">
        <Brain className="h-6 w-6 text-white" />
      </div>

      {/* 404 */}
      <p className="font-mono text-7xl font-bold text-[#E8E6E1]">404</p>
      <h1 className="mt-4 text-xl font-semibold text-[#18181B]">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-[#A1A1AA]">
        The page you're looking for doesn't exist or has been moved.
        Check the URL or head back to your dashboard.
      </p>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/dashboard/student"
          className="flex items-center gap-2 rounded-xl bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4338CA] transition-colors">
          <Home className="h-4 w-4" />
          Go to dashboard
        </Link>
        <Link href="/help"
          className="flex items-center gap-2 rounded-xl border border-[#E8E6E1] bg-white px-5 py-2.5 text-sm text-[#52525B] hover:bg-[#FAFAF9] transition-colors">
          <Search className="h-4 w-4" />
          Search help
        </Link>
      </div>

      <p className="mt-12 font-mono text-[11px] text-[#A1A1AA]">SERA Neural Labs · STEM-ED-AI</p>
    </div>
  )
}
