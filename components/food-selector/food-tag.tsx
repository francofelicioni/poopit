"use client"

import { X } from "lucide-react"
import { motion } from "framer-motion"

interface FoodTagProps {
  emoji?: string
  label: string
  onRemove: () => void
}

export function FoodTag({ emoji, label, onRemove }: FoodTagProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-1 bg-primary/20 text-primary-foreground px-2 py-1 rounded-full m-1"
    >
      {emoji && <span className="text-sm">{emoji}</span>}
      <span className="text-xs font-medium">{label}</span>
      <button onClick={onRemove} className="ml-1 rounded-full hover:bg-primary/30 p-0.5" aria-label={`Remove ${label}`}>
        <X className="h-3 w-3" />
      </button>
    </motion.div>
  )
}
