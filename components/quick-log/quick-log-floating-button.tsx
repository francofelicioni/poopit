"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { QuickLogDialog } from "./quick-log-dialog"
import { motion } from "framer-motion"

export function QuickLogFloatingButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="lg"
            className="rounded-full h-14 w-14 bg-primary hover:bg-primary-hover shadow-lg"
            onClick={() => setOpen(true)}
          >
            <Zap className="h-6 w-6" />
            <span className="sr-only">Quick Log</span>
          </Button>
        </motion.div>
      </motion.div>
      <QuickLogDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
