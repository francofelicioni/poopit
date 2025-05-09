"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import type { BadgeData } from "./badge-card"

interface BadgesProgressProps {
  badges: BadgeData[]
}

export function BadgesProgress({ badges }: BadgesProgressProps) {
  const totalBadges = badges.length
  const unlockedBadges = badges.filter((badge) => badge.unlocked).length
  const progressPercentage = Math.round((unlockedBadges / totalBadges) * 100) || 0

  // Calculate category progress
  const categories = ["consistency", "color", "diet", "tracking", "special"] as const
  const categoryProgress = categories.map((category) => {
    const categoryBadges = badges.filter((badge) => badge.category === category)
    const unlockedCategoryBadges = categoryBadges.filter((badge) => badge.unlocked)
    const progress = Math.round((unlockedCategoryBadges.length / categoryBadges.length) * 100) || 0

    return {
      category,
      total: categoryBadges.length,
      unlocked: unlockedCategoryBadges.length,
      progress,
    }
  })

  // Get category emoji
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "consistency":
        return "🥖"
      case "color":
        return "🎨"
      case "diet":
        return "🥗"
      case "tracking":
        return "📊"
      case "special":
        return "✨"
      default:
        return "🏆"
    }
  }

  // Get category name
  const getCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <EmojiIcon emoji="📈" label="progress" size="md" withBackground />
          Badges Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">Overall Progress</h3>
              <span className="text-sm font-medium">
                {unlockedBadges} / {totalBadges} ({progressPercentage}%)
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="space-y-3">
            {categoryProgress.map((cat) => (
              <div key={cat.category}>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <EmojiIcon emoji={getCategoryEmoji(cat.category)} label={cat.category} size="xs" />
                    <span className="text-sm">{getCategoryName(cat.category)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {cat.unlocked} / {cat.total}
                  </span>
                </div>
                <Progress value={cat.progress} className="h-1.5" />
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-primary/10 p-3">
            <p className="text-sm">
              <span className="font-medium">Next milestone:</span> Unlock 5 more badges to reach the "Poop Enthusiast"
              level!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
