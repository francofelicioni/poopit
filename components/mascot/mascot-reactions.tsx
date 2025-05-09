"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PoopMascot, type MascotMood } from "./poop-mascot"

interface MascotReactionsProps {
  reactions: {
    mood: MascotMood
    message: string
    condition: boolean
  }[]
  defaultMood?: MascotMood
  defaultMessage?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function MascotReactions({
  reactions,
  defaultMood = "neutral",
  defaultMessage = "",
  size = "md",
  className = "",
}: MascotReactionsProps) {
  const [currentReaction, setCurrentReaction] = useState({
    mood: defaultMood,
    message: defaultMessage,
    isActive: false,
  })

  useEffect(() => {
    // Find the first matching reaction
    const matchingReaction = reactions.find((reaction) => reaction.condition)

    if (matchingReaction) {
      setCurrentReaction({
        mood: matchingReaction.mood,
        message: matchingReaction.message,
        isActive: true,
      })
    } else {
      setCurrentReaction({
        mood: defaultMood,
        message: defaultMessage,
        isActive: defaultMessage !== "",
      })
    }
  }, [reactions, defaultMood, defaultMessage])

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentReaction.mood}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <PoopMascot mood={currentReaction.mood} size={size} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {currentReaction.isActive && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="relative bg-white p-3 rounded-lg shadow-md max-w-xs"
          >
            <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-[10px] border-r-white border-b-8 border-b-transparent" />
            <p className="text-sm text-primary-800">{currentReaction.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
