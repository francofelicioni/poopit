import type React from "react"
import { cn } from "@/lib/utils"

interface AppContainerProps {
  children: React.ReactNode
  className?: string
}

export function AppContainer({ children, className }: AppContainerProps) {
  return <div className={cn("container mx-auto px-4 py-6", className)}>{children}</div>
}
