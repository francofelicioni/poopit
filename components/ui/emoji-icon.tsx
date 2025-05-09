import { cn } from "@/lib/utils"

interface EmojiIconProps {
  emoji: string
  label: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  withBackground?: boolean
  backgroundClass?: string
}

export function EmojiIcon({
  emoji,
  label,
  size = "md",
  className = "",
  withBackground = false,
  backgroundClass = "bg-primary/10",
}: EmojiIconProps) {
  const sizeClasses = {
    xs: "text-sm",
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }

  const containerSizes = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  if (withBackground) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          containerSizes[size],
          backgroundClass,
          className,
        )}
        role="img"
        aria-label={label}
      >
        <span className={sizeClasses[size]}>{emoji}</span>
      </div>
    )
  }

  return (
    <span className={cn(sizeClasses[size], className)} role="img" aria-label={label}>
      {emoji}
    </span>
  )
}
