"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { PoopMascot } from "./poop-mascot"

interface CelebrationMascotProps {
  message: string
  subMessage?: string
  onComplete?: () => void
  duration?: number
}

export function CelebrationMascot({ message, subMessage, onComplete, duration = 5000 }: CelebrationMascotProps) {
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    // Trigger confetti
    const canvas = document.createElement("canvas")
    canvas.style.position = "fixed"
    canvas.style.inset = "0"
    canvas.style.width = "100vw"
    canvas.style.height = "100vh"
    canvas.style.zIndex = "9999"
    canvas.style.pointerEvents = "none"
    document.body.appendChild(canvas)

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })

    myConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#0ea5e9", "#14b8a6", "#8B5A2B", "#A0522D", "#f59e0b"],
    })

    // Set timeout to remove celebration
    const timer = setTimeout(() => {
      setIsActive(false)
      document.body.removeChild(canvas)
      if (onComplete) onComplete()
    }, duration)

    return () => {
      clearTimeout(timer)
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas)
      }
    }
  }, [duration, onComplete])

  if (!isActive) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4 text-center shadow-xl"
      >
        <div className="flex justify-center -mt-16 mb-2">
          <PoopMascot mood="excited" size="lg" />
        </div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-primary-700 mb-2"
        >
          {message}
        </motion.h2>
        {subMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground mb-4"
          >
            {subMessage}
          </motion.p>
        )}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() => {
            setIsActive(false)
            if (onComplete) onComplete()
          }}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
        >
          Awesome!
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
