"use client"

import { motion } from "framer-motion"
import { EmojiIcon } from "@/components/ui/emoji-icon"

export function OnboardingTrackPoops() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        className="relative h-48 w-full overflow-hidden rounded-lg bg-primary/10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-sm">
              <EmojiIcon emoji="💩" label="poop" size="sm" />
              <span className="font-medium">Quick Log</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-background shadow-sm">
                <EmojiIcon emoji="🟤" label="brown" size="md" />
                <span className="text-xs">Brown</span>
              </div>
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-background shadow-sm">
                <EmojiIcon emoji="🧱" label="solid" size="md" />
                <span className="text-xs">Solid</span>
              </div>
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-background shadow-sm">
                <EmojiIcon emoji="😌" label="easy" size="md" />
                <span className="text-xs">Easy</span>
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
        Track Your Bathroom Adventures
      </motion.h2>

      <motion.p
        className="mt-4 text-muted-foreground"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Log color, consistency, and comfort with just a few taps. Our quick-log feature makes tracking as easy as
        1-2-💩!
      </motion.p>

      <motion.div
        className="mt-6 grid grid-cols-3 gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-primary/10 p-3">
            <EmojiIcon emoji="⏱️" label="quick" size="sm" />
          </div>
          <span className="mt-2 text-xs">Quick</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-primary/10 p-3">
            <EmojiIcon emoji="📱" label="easy" size="sm" />
          </div>
          <span className="mt-2 text-xs">Easy</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-primary/10 p-3">
            <EmojiIcon emoji="🔍" label="detailed" size="sm" />
          </div>
          <span className="mt-2 text-xs">Detailed</span>
        </div>
      </motion.div>
    </div>
  )
}
