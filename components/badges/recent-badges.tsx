"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCard, type BadgeData } from "./badge-card"
import { Button } from "@/components/ui/button"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { Trophy } from "lucide-react"
import Link from "next/link"

interface RecentBadgesProps {
  badges: BadgeData[]
  limit?: number
}

export function RecentBadges({ badges, limit = 3 }: RecentBadgesProps) {
  // Filter only unlocked badges and sort by date (most recent first)
  const unlockedBadges = badges
    .filter((badge) => badge.unlocked && badge.dateUnlocked)
    .sort((a, b) => {
      if (!a.dateUnlocked || !b.dateUnlocked) return 0
      return new Date(b.dateUnlocked).getTime() - new Date(a.dateUnlocked).getTime()
    })
    .slice(0, limit)

  if (unlockedBadges.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <EmojiIcon emoji="🏆" label="trophy" size="xl" withBackground />
            <h3 className="mt-4 font-medium">No badges unlocked yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep tracking your bathroom visits to earn badges and achievements!
            </p>
            <Link href="/badges" className="mt-4">
              <Button variant="outline">View All Badges</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Recent Achievements
          </CardTitle>
          <Link href="/badges">
            <Button variant="link" size="sm" className="h-8">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {unlockedBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} size="sm" showProgress={false} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
