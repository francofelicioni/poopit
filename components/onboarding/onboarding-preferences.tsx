"use client"

import { motion } from "framer-motion"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Moon, Sun, TableIcon as Toilet, Tag, AlignLeft, Lock, Users } from "lucide-react"

interface OnboardingPreferencesProps {
  preferences: {
    theme: string
    foodLoggingStyle: string
    privacyLevel: string
  }
  updatePreferences: (key: string, value: string) => void
}

export function OnboardingPreferences({ preferences, updatePreferences }: OnboardingPreferencesProps) {
  return (
    <div className="flex flex-col">
      <motion.h2
        className="text-center text-2xl font-bold"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Your Preferences
      </motion.h2>

      <motion.p
        className="mt-2 text-center text-muted-foreground"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Customize your PoopIt experience
      </motion.p>

      <motion.div
        className="mt-6 space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div>
          <h3 className="mb-3 font-medium">Theme</h3>
          <RadioGroup
            defaultValue={preferences.theme}
            onValueChange={(value) => updatePreferences("theme", value)}
            className="flex flex-wrap gap-3"
          >
            <div>
              <RadioGroupItem value="light" id="light" className="peer sr-only" />
              <Label
                htmlFor="light"
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-muted bg-background p-3 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              >
                <Sun className="h-5 w-5" />
                <span>Light</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
              <Label
                htmlFor="dark"
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-muted bg-background p-3 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              >
                <Moon className="h-5 w-5" />
                <span>Dark</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="toilet" id="toilet" className="peer sr-only" />
              <Label
                htmlFor="toilet"
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-muted bg-background p-3 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              >
                <Toilet className="h-5 w-5" />
                <span>Toilet</span>
                <EmojiIcon emoji="🚽" label="toilet" size="xs" />
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="mb-3 font-medium">Food Logging Style</h3>
          <RadioGroup
            defaultValue={preferences.foodLoggingStyle}
            onValueChange={(value) => updatePreferences("foodLoggingStyle", value)}
            className="flex gap-3"
          >
            <div>
              <RadioGroupItem value="tags" id="tags" className="peer sr-only" />
              <Label
                htmlFor="tags"
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-muted bg-background p-3 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              >
                <Tag className="h-5 w-5" />
                <span>Tags</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="text" id="text" className="peer sr-only" />
              <Label
                htmlFor="text"
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-muted bg-background p-3 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              >
                <AlignLeft className="h-5 w-5" />
                <span>Text</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="mb-3 font-medium">Privacy Level</h3>
          <RadioGroup
            defaultValue={preferences.privacyLevel}
            onValueChange={(value) => updatePreferences("privacyLevel", value)}
            className="flex gap-3"
          >
            <div>
              <RadioGroupItem value="private" id="private" className="peer sr-only" />
              <Label
                htmlFor="private"
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-muted bg-background p-3 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              >
                <Lock className="h-5 w-5" />
                <span>Private</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="social" id="social" className="peer sr-only" />
              <Label
                htmlFor="social"
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-muted bg-background p-3 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              >
                <Users className="h-5 w-5" />
                <span>Social</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </motion.div>
    </div>
  )
}
