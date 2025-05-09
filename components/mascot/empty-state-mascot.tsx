import type React from "react"
import { PoopMascot, type MascotMood } from "./poop-mascot"

interface EmptyStateMascotProps {
  title: string
  description?: string
  mood?: MascotMood
  action?: React.ReactNode
  className?: string
}

export function EmptyStateMascot({ title, description, mood = "sad", action, className = "" }: EmptyStateMascotProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <PoopMascot mood={mood} size="lg" className="mb-4" />
      <h3 className="text-lg font-medium text-primary-700 mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mb-4 max-w-xs">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
