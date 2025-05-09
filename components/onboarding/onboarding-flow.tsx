"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OnboardingWelcome } from "./onboarding-welcome"
import { OnboardingTrackPoops } from "./onboarding-track-poops"
import { OnboardingFoodLink } from "./onboarding-food-link"
import { OnboardingPreferences } from "./onboarding-preferences"
import { OnboardingComplete } from "./onboarding-complete"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

interface OnboardingFlowProps {
  onComplete: () => void
  onSkip?: () => void
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [step, setStep] = useState(0)
  const [preferences, setPreferences] = useState({
    theme: "light",
    foodLoggingStyle: "tags",
    privacyLevel: "private",
  })
  const { setTheme } = useTheme()
  const { toast } = useToast()

  const totalSteps = 5
  const progress = ((step + 1) / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleSkip = () => {
    toast({
      title: "Onboarding skipped",
      description: "You can always access this guide from settings",
    })
    if (onSkip) onSkip()
    else completeOnboarding()
  }

  const updatePreferences = (key: string, value: string) => {
    setPreferences({
      ...preferences,
      [key]: value,
    })
  }

  const completeOnboarding = () => {
    // Apply user preferences
    setTheme(preferences.theme)

    // Save preferences to localStorage
    localStorage.setItem("poopitPreferences", JSON.stringify(preferences))
    localStorage.setItem("onboardingComplete", "true")

    // Notify parent component
    onComplete()

    toast({
      title: "Welcome to PoopIt!",
      description: "Your preferences have been saved. Let's poop smarter!",
    })
  }

  const steps = [
    <OnboardingWelcome key="welcome" />,
    <OnboardingTrackPoops key="track" />,
    <OnboardingFoodLink key="food" />,
    <OnboardingPreferences key="preferences" preferences={preferences} updatePreferences={updatePreferences} />,
    <OnboardingComplete key="complete" />,
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-lg md:p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute right-4 top-4">
          <Button variant="ghost" size="sm" onClick={handleSkip}>
            Skip
          </Button>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <div className="mt-2 text-xs text-muted-foreground">
            Step {step + 1} of {totalSteps}
          </div>
        </div>

        <div className="min-h-[320px] md:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 0}
            className={step === 0 ? "invisible" : ""}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button onClick={handleNext}>
            {step === totalSteps - 1 ? (
              "Let's poop smarter!"
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
