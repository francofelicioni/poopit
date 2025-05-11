import type React from "react"
interface SectionHeaderProps {
  title: string
  description?: string
  icon?: string
  children?: React.ReactNode
}

export function SectionHeader({ title, description, icon, children }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-2xl" role="img" aria-label={title}>
            {icon}
          </span>
        )}
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>
      {children && <div>{children}</div>}
    </div>
  )
}
