"use client"

import { Card, CardContent } from "@/components/ui/card"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { TrendingUp, TrendingDown } from "lucide-react"

export function StatsOverview() {
  // In a real app, this would be fetched from a database
  const stats = [
    {
      title: "Total Entries",
      value: 87,
      change: "+12%",
      trend: "up",
      emoji: "📝",
      description: "Logs in selected period",
    },
    {
      title: "Average Frequency",
      value: "1.3",
      unit: "per day",
      change: "+8%",
      trend: "up",
      emoji: "🔄",
      description: "Visits per day",
    },
    {
      title: "Most Common Color",
      value: "Brown",
      percentage: "68%",
      emoji: "🟤",
      description: "Healthy normal color",
    },
    {
      title: "Most Common Texture",
      value: "Normal",
      percentage: "72%",
      emoji: "🥖",
      description: "Well-formed consistency",
    },
    {
      title: "Average Comfort",
      value: "3.8",
      unit: "/5",
      change: "+0.5",
      trend: "up",
      emoji: "😌",
      description: "Comfort rating",
    },
    {
      title: "Average Duration",
      value: "6.2",
      unit: "min",
      change: "-0.8",
      trend: "down",
      emoji: "⏱️",
      description: "Time spent per visit",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center border-l-4 border-primary-600 bg-white p-4">
              <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100">
                <EmojiIcon emoji={stat.emoji} label={stat.title} size="lg" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold text-primary-700">{stat.value}</p>
                  {stat.unit && <span className="text-sm text-muted-foreground">{stat.unit}</span>}
                  {stat.percentage && <span className="text-sm text-muted-foreground">({stat.percentage})</span>}
                </div>
                <div className="flex items-center gap-1">
                  {stat.change && (
                    <span className={`text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.trend === "up" ? (
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="inline h-3 w-3 mr-1" />
                      )}
                      {stat.change}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">{stat.description}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
