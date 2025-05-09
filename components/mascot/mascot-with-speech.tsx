"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PoopMascot, type MascotMood } from "./poop-mascot"

interface MascotWithSpeechProps {
  mood?: MascotMood
  messages: string[]
  interval?: number
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function MascotWithSpeech({
  mood = "happy",
  messages,
  interval = 5000,
  size = "md",
  className = "",
}: MascotWithSpeechProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (messages.length <= 1) return

    const messageInterval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
        setIsVisible(true)
      }, 500)
    }, interval)

    return () => clearInterval(messageInterval)
  }, [messages, interval])

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <PoopMascot mood={mood} size={size} />
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="relative bg-white p-3 rounded-lg shadow-md max-w-xs"
          >
            {/* Speech bubble pointer */}
            <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-[10px] border-r-white border-b-8 border-b-transparent" />
            <p className="text-sm text-primary-800">{messages[currentMessageIndex]}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
