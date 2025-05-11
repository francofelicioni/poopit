import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import type { BadgeData } from "./badge-card"

interface BadgesProgressProps {
  badges: BadgeData[]
}

export function BadgesProgress({ badges }: BadgesProgressProps) {
  // Calculate overall progress
  const totalBadges = badges.length
  const unlockedBadges = badges.filter((badge) => badge.unlocked).length
  const overallProgress = Math.round((unlockedBadges / totalBadges) * 100)

  // Calculate progress by category
  const categories = ["consistency", "color", "diet", "tracking", "special"] as const

  const categoryProgress = categories.map((category) => {
    const categoryBadges = badges.filter((badge) => badge.category === category)
    const unlockedCategoryBadges = categoryBadges.filter((badge) => badge.unlocked)
    const progress = Math.round((unlockedCategoryBadges.length / categoryBadges.length) * 100)

    return {
      category,
      total: categoryBadges.length,
      unlocked: unlockedCategoryBadges.length,
      progress,
    }
  })

  // Get category display name
  const getCategoryName = (category: string) => {
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

  // Get category emoji
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "consistency":
        return "🕰️"
      case "color":
        return "🎨"
      case "diet":
        return "🥦"
      case "tracking":
        return "📊"
      case "special":
        return "🏆"
      default:
        return "💩"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <EmojiIcon emoji="📈" label="progress" size="md" withBackground />
          <CardTitle>Badge Progress</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium">Overall Progress</h3>
              <span className="text-sm text-muted-foreground">
                {unlockedBadges}/{totalBadges} badges
              </span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            <p className="mt-2 text-sm text-muted-foreground">You've unlocked {overallProgress}% of all badges</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Progress by Category</h3>

            {categoryProgress.map((cat) => (
              <div key={cat.category}>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <EmojiIcon emoji={getCategoryEmoji(cat.category)} label={cat.category} size="xs" />
                    <span className="text-sm">{getCategoryName(cat.category)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {cat.unlocked}/{cat.total}
                  </span>
                </div>
                <Progress value={cat.progress} className="h-1.5" />
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-muted p-4">
            <h3 className="text-sm font-medium mb-2">Badge Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Log consistently to unlock tracking badges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Track your food intake to earn diet badges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Special badges require unique achievements</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
