"use client"

import { useState } from "react"
import { BadgeCard, type BadgeData } from "./badge-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { EmptyStateMascot } from "@/components/mascot/empty-state-mascot"

interface BadgesGridProps {
  badges: BadgeData[]
  showProgress?: boolean
  showShare?: boolean
  newBadgeIds?: string[]
}

export function BadgesGrid({ badges, showProgress = true, showShare = true, newBadgeIds = [] }: BadgesGridProps) {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBadges = badges.filter((badge) => {
    // Filter by tab
    if (activeTab !== "all" && badge.category !== activeTab) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !badge.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !badge.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Sort badges: unlocked first, then by progress
  const sortedBadges = [...filteredBadges].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1
    if (!a.unlocked && b.unlocked) return 1
    return b.progress - a.progress
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-3 sm:grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="consistency">Consistency</TabsTrigger>
            <TabsTrigger value="color">Color</TabsTrigger>
            <TabsTrigger value="diet">Diet</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="special">Special</TabsTrigger>
          </TabsList>

          {/* Move TabsContent inside the Tabs component */}
          <TabsContent value={activeTab} className="mt-4">
            {sortedBadges.length === 0 ? (
              <EmptyStateMascot
                title="No badges found"
                description="Try adjusting your search or filter criteria."
                mood="sad"
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedBadges.map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                    showProgress={showProgress}
                    showShare={showShare}
                    isNew={newBadgeIds.includes(badge.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search badges..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
