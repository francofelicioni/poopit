import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QuickLogFloatingButton } from "@/components/quick-log/quick-log-floating-button"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PoopIt - Track Your Bathroom Habits",
  description: "A fun app to track and analyze your bathroom habits for better digestive health.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem themes={["light", "dark", "toilet"]}>
          {children}
          <QuickLogFloatingButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
