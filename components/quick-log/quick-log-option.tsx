"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface QuickLogOptionProps {
  emoji: string
  label: string
  description: string
  selected: boolean
  onClick: () => void
  details: {
    consistency: string
    color: string
    comfort: number
  }
}

export function QuickLogOption({ emoji, label, description, selected, onClick, details }: QuickLogOptionProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer border-2 transition-colors",
        selected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 hover:bg-primary/5",
      )}
    >
      <div className="text-4xl mb-2">{emoji}</div>
      <h3 className="font-medium text-sm">{label}</h3>
      <p className="text-xs text-muted-foreground text-center mt-1">{description}</p>

      {selected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 text-xs border-t pt-2 w-full"
        >
          <div className="flex justify-between">
            <span>Consistency:</span>
            <span className="font-medium">{details.consistency}</span>
          </div>
          <div className="flex justify-between">
            <span>Color:</span>
            <span className="font-medium">{details.color}</span>
          </div>
          <div className="flex justify-between">
            <span>Comfort:</span>
            <span className="font-medium">{details.comfort}/5</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
