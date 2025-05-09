"use client"

import { motion } from "framer-motion"
import { PoopMascot } from "@/components/mascot/poop-mascot"
import { EmojiIcon } from "@/components/ui/emoji-icon"

export function OnboardingWelcome() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <PoopMascot mood="excited" size="lg" />
      </motion.div>

      <motion.h2
        className="mt-6 text-2xl font-bold"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Ready to know your <EmojiIcon emoji="💩" label="poop" /> like never before?
      </motion.h2>

      <motion.p
        className="mt-4 text-muted-foreground"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Welcome to PoopIt, the app that turns bathroom visits into valuable health insights!
      </motion.p>

      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          <EmojiIcon emoji="📊" label="chart" size="sm" />
          <span>Track</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          <EmojiIcon emoji="🍎" label="food" size="sm" />
          <span>Connect</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          <EmojiIcon emoji="💡" label="insight" size="sm" />
          <span>Learn</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          <EmojiIcon emoji="🏆" label="trophy" size="sm" />
          <span>Achieve</span>
        </div>
      </motion.div>
    </div>
  )
}
