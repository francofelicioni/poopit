import type React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function SectionHeader({ title, description, children, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between", className)}>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && <p className="mt-1 text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="mt-4 sm:mt-0">{children}</div>}
    </div>
  )
}
