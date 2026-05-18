"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Brain, RefreshCw, Home, AlertTriangle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAF9] px-4 text-center font-sans">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEE2E2]">
            <AlertTriangle className="h-6 w-6 text-[#DC2626]" />
          </div>

          <h1 className="text-xl font-semibold text-[#18181B]">Something went wrong</h1>
          <p className="mt-2 max-w-sm text-sm text-[#A1A1AA]">
            An unexpected error occurred. This has been logged and our team has been notified.
          </p>

          {error.digest && (
            <p className="mt-3 font-mono text-[11px] text-[#A1A1AA]">Error ID: {error.digest}</p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => reset()}
              className="flex items-center gap-2 rounded-xl bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4338CA] transition-colors">
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
            <Link href="/dashboard/student"
              className="flex items-center gap-2 rounded-xl border border-[#E8E6E1] bg-white px-5 py-2.5 text-sm text-[#52525B] hover:bg-[#FAFAF9] transition-colors">
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#4F46E5]">
              <Brain className="h-3.5 w-3.5 text-white" />
            </div>
            <p className="font-mono text-[11px] text-[#A1A1AA]">SERA Neural Labs · STEM-ED-AI</p>
          </div>
        </div>
      </body>
    </html>
  )
}
