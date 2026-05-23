import type { Metadata, Viewport } from "next"
import { Inter, Outfit, JetBrains_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ServiceWorkerRegister } from "@/components/ui/service-worker-register"
import { PwaInstallPrompt } from "@/components/ui/pwa-install-prompt"
import { ChangelogModal } from "@/components/ui/changelog-modal"
import { ThemeProvider } from "@/components/ui/theme-provider"
import "./globals.css"

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
})

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-custom",
  subsets: ["latin"],
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#4F46E5",
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: {
    default: "STEM-ED-AI · SERA Neural Labs",
    template: "%s · STEM-ED-AI",
  },
  description:
    "AI-native education operating system for student retention, learning management, and curriculum governance.",
  keywords: ["EdTech", "AI", "LMS", "Student Retention", "SKORA", "SERA Neural Labs"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "STEM-ED-AI",
  },
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/icon.svg",
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <TooltipProvider delay={300}>
          <ThemeProvider />
          {children}
          <Toaster richColors position="bottom-right" />
          <PwaInstallPrompt />
          <ChangelogModal />
        </TooltipProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
