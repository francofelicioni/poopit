"use client"

import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { QuickLogDialog } from "./quick-log-dialog"
import { useState } from "react"
import { motion } from "framer-motion"

export function QuickLogButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary-hover"
          onClick={() => setOpen(true)}
        >
          <Zap className="h-4 w-4" />
          <span>Quick Log</span>
        </Button>
      </motion.div>
      <QuickLogDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
