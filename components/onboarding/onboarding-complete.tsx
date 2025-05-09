"use client"

import { motion } from "framer-motion"
import { PoopMascot } from "@/components/mascot/poop-mascot"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

export function OnboardingComplete() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti after a short delay
    const timer = setTimeout(() => {
      setShowConfetti(true)

      // Create confetti effect
      const duration = 2000
      const end = Date.now() + duration

      const colors = ["#1e88e5", "#43a047", "#ffb300", "#e53935"]
      ;(function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        })

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <PoopMascot mood="proud" size="lg" />
      </motion.div>

      <motion.h2
        className="mt-6 text-2xl font-bold"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        You're All Set!
      </motion.h2>

      <motion.p
        className="mt-4 text-muted-foreground"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Time to start your journey to better digestive health. Remember, knowledge is power... and so is poop!
      </motion.p>

      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          <EmojiIcon emoji="🚀" label="rocket" size="sm" />
          <span>Let's get started!</span>
        </div>
      </motion.div>
    </div>
  )
}
