"use client"

import { motion } from "framer-motion"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { ArrowRight } from "lucide-react"

export function OnboardingFoodLink() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        className="relative h-48 w-full overflow-hidden rounded-lg bg-primary/10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 rounded-lg bg-background px-3 py-2 shadow-sm">
                    <EmojiIcon emoji="🥦" label="broccoli" size="sm" />
                    <span className="text-sm">Broccoli</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-background px-3 py-2 shadow-sm">
                    <EmojiIcon emoji="🌮" label="taco" size="sm" />
                    <span className="text-sm">Tacos</span>
                  </div>
                </div>
              </div>

              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
                <ArrowRight className="h-8 w-8 text-primary" />
              </motion.div>

              <div className="flex flex-col items-center">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 rounded-lg bg-background px-3 py-2 shadow-sm">
                    <EmojiIcon emoji="💩" label="poop" size="sm" />
                    <span className="text-sm">Perfect!</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-background px-3 py-2 shadow-sm">
                    <EmojiIcon emoji="💩" label="poop" size="sm" />
                    <span className="text-sm">Gassy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.h2
        className="mt-6 text-2xl font-bold"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Connect Food to Results
      </motion.h2>

      <motion.p
        className="mt-4 text-muted-foreground"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Discover which foods make your gut happy or angry. We'll help you spot patterns between what you eat and how you
        poop!
      </motion.p>

      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
          <EmojiIcon emoji="✅" label="good" size="xs" />
          <span>Gut-friendly foods</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs text-red-800">
          <EmojiIcon emoji="⚠️" label="warning" size="xs" />
          <span>Trigger foods</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">
          <EmojiIcon emoji="📊" label="stats" size="xs" />
          <span>Digestive patterns</span>
        </div>
      </motion.div>
    </div>
  )
}
