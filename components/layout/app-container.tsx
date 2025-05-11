import type React from "react"
interface AppContainerProps {
  children: React.ReactNode
  className?: string
}

export function AppContainer({ children, className = "" }: AppContainerProps) {
  return <div className={`container mx-auto px-4 py-6 ${className}`}>{children}</div>
}
