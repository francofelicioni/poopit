"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FoodItemButtonProps {
  emoji: string
  label: string
  selected: boolean
  onClick: () => void
}

export function FoodItemButton({ emoji, label, selected, onClick }: FoodItemButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-colors",
        selected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 hover:bg-primary/5",
      )}
      aria-pressed={selected}
    >
      <span className="text-2xl mb-1">{emoji}</span>
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  )
}
