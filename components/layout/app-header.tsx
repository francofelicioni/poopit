import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface AppHeaderProps {
  title?: string
  showBackButton?: boolean
  showLogo?: boolean
  children?: React.ReactNode
}

export function AppHeader({ title, showBackButton = false, showLogo = false, children }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <Link href="/" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}

          {showLogo && (
            <Link href="/" className="mr-4 flex items-center">
              <span className="text-xl font-bold text-primary">Poop</span>
              <span className="text-xl font-bold">It</span>
            </Link>
          )}

          {title && <h1 className="text-xl font-bold">{title}</h1>}
        </div>

        <div className="flex items-center gap-2">
          {children}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
