"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Share2 } from "lucide-react"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ShareBadgeDialog } from "./share-badge-dialog"

export interface BadgeData {
  id: string
  name: string
  description: string
  emoji: string
  category: "consistency" | "color" | "diet" | "tracking" | "special"
  unlocked: boolean
  progress: number
  dateUnlocked?: string
  requirement: string
}

interface BadgeCardProps {
  badge: BadgeData
  size?: "sm" | "md" | "lg"
  showProgress?: boolean
  showShare?: boolean
  isNew?: boolean
}

export function BadgeCard({
  badge,
  size = "md",
  showProgress = true,
  showShare = true,
  isNew = false,
}: BadgeCardProps) {
  const [showShareDialog, setShowShareDialog] = useState(false)

  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-5",
  }

  const emojiSizes = {
    sm: "md",
    md: "lg",
    lg: "xl",
  } as const

  const getCategoryColor = (category: BadgeData["category"]) => {
    switch (category) {
      case "consistency":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "color":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "diet":
        return "bg-green-100 text-green-800 border-green-200"
      case "tracking":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "special":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryName = (category: BadgeData["category"]) => {
    switch (category) {
      case "consistency":
        return "Consistency"
      case "color":
        return "Color"
      case "diet":
        return "Diet"
      case "tracking":
        return "Tracking"
      case "special":
        return "Special"
      default:
        return category
    }
  }

  return (
    <>
      <Card
        className={`relative overflow-hidden transition-all ${
          badge.unlocked ? "border-primary/30" : "opacity-75"
        } hover:shadow-md`}
      >
        {isNew && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -right-8 top-3 rotate-45 bg-primary px-8 py-1 text-xs font-bold text-primary-foreground"
          >
            NEW!
          </motion.div>
        )}
        <CardContent className={`${sizeClasses[size]}`}>
          <div className="flex items-start gap-3">
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                badge.unlocked ? "bg-primary/20" : "bg-muted"
              }`}
            >
              <EmojiIcon emoji={badge.emoji} label={badge.name} size={emojiSizes[size]} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{badge.name}</h3>
                <Badge variant="outline" className={getCategoryColor(badge.category)}>
                  {getCategoryName(badge.category)}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{badge.description}</p>

              {showProgress && (
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{badge.requirement}</span>
                    <span className={badge.unlocked ? "text-primary" : "text-muted-foreground"}>
                      {badge.progress}%{badge.unlocked && " • Complete!"}
                    </span>
                  </div>
                  <Progress value={badge.progress} className="h-2" />
                </div>
              )}

              {badge.unlocked && badge.dateUnlocked && (
                <p className="mt-2 text-xs text-muted-foreground">Unlocked on {badge.dateUnlocked}</p>
              )}

              {badge.unlocked && showShare && (
                <div className="mt-3 flex justify-end">
                  <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setShowShareDialog(true)}>
                    <Share2 className="mr-1 h-3 w-3" />
                    Share
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <ShareBadgeDialog open={showShareDialog} onOpenChange={setShowShareDialog} badge={badge} />
    </>
  )
}
