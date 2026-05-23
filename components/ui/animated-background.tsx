"use client"

import { useEffect, useRef } from "react"
import { useThemeStore } from "@/lib/theme-store"

export function AnimatedBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const theme = useThemeStore((s) => s.theme)
  const isDark = theme === "dark"

  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return

    const color = isDark ? "rgba(99,102,241,0.06)" : "rgba(79,70,229,0.04)"
    const onMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, ${color}, transparent 70%)`
    }

    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [isDark])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: isDark ? "#0F0F0F" : "#FAFAF9" }}
    >
      {/* Layer 2: SVG noise texture */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.015]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Layer 3: Drifting gradient orbs — only on non-reduced-motion, non-mobile */}
      <div className="motion-safe:block hidden sm:block absolute inset-0">
        {/* Orb 1 — Indigo */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: "10%",
            left: "15%",
            background: isDark
              ? "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)",
            filter: "blur(120px)",
            animation: "orb-drift-1 28s ease-in-out infinite",
          }}
        />
        {/* Orb 2 — Gold */}
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: "55%",
            right: "10%",
            background: isDark
              ? "radial-gradient(circle, rgba(212,160,23,0.09) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(184,134,11,0.06) 0%, transparent 70%)",
            filter: "blur(120px)",
            animation: "orb-drift-2 35s ease-in-out infinite",
          }}
        />
        {/* Orb 3 — Emerald */}
        <div
          className="absolute rounded-full"
          style={{
            width: 450,
            height: 450,
            bottom: "5%",
            left: "40%",
            background: isDark
              ? "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(5,150,105,0.05) 0%, transparent 70%)",
            filter: "blur(120px)",
            animation: "orb-drift-3 42s ease-in-out infinite",
          }}
        />
      </div>

      {/* Layer 4: Faint grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Layer 5: Cursor spotlight — desktop only */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 hidden sm:block motion-safe:block transition-none"
        style={{ background: "transparent" }}
      />
    </div>
  )
}
