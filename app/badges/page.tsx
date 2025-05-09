"use client"

import { useState, useEffect } from "react"
import { BadgesGrid } from "@/components/badges/badges-grid"
import { BadgesProgress } from "@/components/badges/badges-progress"
import { PoopMascot } from "@/components/mascot/poop-mascot"
import { mockBadges } from "@/data/mock-badges"
import type { BadgeData } from "@/components/badges/badge-card"
import { AppHeader } from "@/components/layout/app-header"
import { AppContainer } from "@/components/layout/app-container"
import { AppFooter } from "@/components/layout/app-footer"
import { SectionHeader } from "@/components/layout/section-header"

export default function BadgesPage() {
  const [badges, setBadges] = useState<BadgeData[]>([])
  const [newBadgeIds, setNewBadgeIds] = useState<string[]>([])

  // In a real app, this would fetch from an API or database
  useEffect(() => {
    // Simulate loading badges
    setBadges(mockBadges)

    // Simulate newly unlocked badges (for demo purposes)
    const storedNewBadges = localStorage.getItem("poopit-new-badges")
    if (storedNewBadges) {
      setNewBadgeIds(JSON.parse(storedNewBadges))
    } else {
      // For demo, mark a random badge as new
      const randomBadge = mockBadges.filter((b) => b.unlocked)[
        Math.floor(Math.random() * mockBadges.filter((b) => b.unlocked).length)
      ]
      if (randomBadge) {
        const newIds = [randomBadge.id]
        setNewBadgeIds(newIds)
        localStorage.setItem("poopit-new-badges", JSON.stringify(newIds))
      }
    }

    // Clear new badges after 1 minute
    const timer = setTimeout(() => {
      setNewBadgeIds([])
      localStorage.removeItem("poopit-new-badges")
    }, 60000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader title="Badges & Achievements" showBackButton />

      <main className="flex-1">
        <AppContainer>
          <SectionHeader title="Your Achievements" description="Collect badges by tracking your bathroom habits">
            <PoopMascot mood="proud" size="md" message="Show off your poop prowess!" />
          </SectionHeader>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <BadgesGrid badges={badges} newBadgeIds={newBadgeIds} />
            </div>
            <div>
              <BadgesProgress badges={badges} />
            </div>
          </div>
        </AppContainer>
      </main>

      <AppFooter />
    </div>
  )
}
