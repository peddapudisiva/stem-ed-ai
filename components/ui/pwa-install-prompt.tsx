"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, X, Download } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PwaInstallPrompt() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Don't show if already installed / running as PWA
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error — iOS Safari
      window.navigator.standalone === true
    ) {
      setIsStandalone(true)
      return
    }

    // Check if user already dismissed
    if (localStorage.getItem("pwa-install-dismissed")) {
      setDismissed(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === "accepted") setPrompt(null)
  }

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem("pwa-install-dismissed", "1")
  }

  const visible = !!prompt && !dismissed && !isStandalone

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-sm lg:bottom-6 lg:left-auto lg:right-6 lg:max-w-xs"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-[#E8E6E1] bg-white p-4 shadow-xl shadow-black/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4F46E5]">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#18181B]">Install STEM-ED-AI</p>
              <p className="text-xs text-[#A1A1AA]">Add to home screen for quick access</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleInstall}
                className="flex items-center gap-1 rounded-lg bg-[#4F46E5] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#4338CA]"
              >
                <Download className="h-3 w-3" />
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#A1A1AA] transition-colors hover:bg-[#F4F4F2] hover:text-[#52525B]"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
