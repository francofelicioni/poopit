"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QuickLogOption } from "./quick-log-option"
import { CelebrationMascot } from "@/components/mascot/celebration-mascot"

interface QuickLogDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickLogDialog({ open, onOpenChange }: QuickLogDialogProps) {
  const router = useRouter()
  const [showCelebration, setShowCelebration] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    if (!selectedOption) return

    // In a real app, we would save the data here based on the selected option
    setShowCelebration(true)

    // Close dialog after a short delay
    setTimeout(() => {
      onOpenChange(false)
      // Reset selection after dialog closes
      setTimeout(() => setSelectedOption(null), 300)
    }, 300)
  }

  return (
    <>
      {showCelebration && (
        <CelebrationMascot
          message="Quick Log Saved!"
          subMessage="That was fast! Keep up the great tracking."
          onComplete={() => {
            setShowCelebration(false)
            // In a real app, we might redirect to the dashboard or refresh data
          }}
          duration={3000}
        />
      )}

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Quick Log Your Visit</DialogTitle>
            <DialogDescription className="text-center">How was your bathroom experience today?</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-2 py-4">
            <QuickLogOption
              emoji="🤔"
              label="Weird"
              description="Something unusual"
              selected={selectedOption === "weird"}
              onClick={() => handleOptionSelect("weird")}
              details={{
                consistency: "loose",
                color: "unusual",
                comfort: 2,
              }}
            />

            <QuickLogOption
              emoji="💩"
              label="Just Okay"
              description="Normal, nothing special"
              selected={selectedOption === "okay"}
              onClick={() => handleOptionSelect("okay")}
              details={{
                consistency: "normal",
                color: "brown",
                comfort: 3,
              }}
            />

            <QuickLogOption
              emoji="✨"
              label="Glorious"
              description="Perfect experience"
              selected={selectedOption === "glorious"}
              onClick={() => handleOptionSelect("glorious")}
              details={{
                consistency: "normal",
                color: "brown",
                comfort: 5,
              }}
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="w-full bg-primary-600 hover:bg-primary-700"
            >
              Save Quick Log
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
