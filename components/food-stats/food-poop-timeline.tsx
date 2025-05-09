"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { EmptyStateMascot } from "@/components/mascot/empty-state-mascot"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { DateRange } from "react-day-picker"

interface FoodPoopTimelineProps {
  dateRange?: DateRange
  filters: {
    foodTypes: string[]
    consistency: string[]
    color: string[]
    comfort: number[]
  }
}

// Mock data for the timeline
const generateMockData = () => {
  const today = new Date()
  const data = []

  for (let i = 14; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Food entries
    const foodEntry = {
      date: new Date(date),
      type: "food",
      items: [
        { name: "Coffee", emoji: "☕", time: "8:30 AM" },
        { name: i % 3 === 0 ? "Spicy Food" : "Salad", emoji: i % 3 === 0 ? "🌶️" : "🥗", time: "12:30 PM" },
        { name: i % 4 === 0 ? "Dairy" : "Chicken", emoji: i % 4 === 0 ? "🥛" : "🍗", time: "7:00 PM" },
      ],
    }

    data.push(foodEntry)

    // Poop entries (offset by 1-2 days to show correlation)
    if (i <= 12) {
      const poopDate = new Date(date)
      poopDate.setDate(poopDate.getDate() + 1)

      const isSpicy = data.find(
        (entry) =>
          entry.type === "food" &&
          entry.date.toDateString() === date.toDateString() &&
          entry.items.some((item) => item.name === "Spicy Food"),
      )

      const isDairy = data.find(
        (entry) =>
          entry.type === "food" &&
          entry.date.toDateString() === date.toDateString() &&
          entry.items.some((item) => item.name === "Dairy"),
      )

      const poopEntry = {
        date: new Date(poopDate),
        type: "poop",
        consistency: isSpicy ? "loose" : isDairy ? "hard" : "normal",
        color: isSpicy ? "dark-brown" : "brown",
        comfort: isSpicy ? 2 : isDairy ? 3 : 4,
        time: "9:15 AM",
        relatedFoods: [
          { name: "Coffee", emoji: "☕", impact: "high" },
          { name: isSpicy ? "Spicy Food" : "Salad", emoji: isSpicy ? "🌶️" : "🥗", impact: isSpicy ? "high" : "low" },
          { name: isDairy ? "Dairy" : "Chicken", emoji: isDairy ? "🥛" : "🍗", impact: isDairy ? "medium" : "low" },
        ],
      }

      data.push(poopEntry)
    }
  }

  return data.sort((a, b) => b.date.getTime() - a.date.getTime())
}

const mockData = generateMockData()

export function FoodPoopTimeline({ dateRange, filters }: FoodPoopTimelineProps) {
  const [viewMode, setViewMode] = useState<"timeline" | "table">("timeline")

  // Filter data based on date range and filters
  const filteredData = mockData.filter((entry) => {
    // Date range filter
    if (dateRange?.from && entry.date < dateRange.from) return false
    if (dateRange?.to) {
      const endDate = new Date(dateRange.to)
      endDate.setHours(23, 59, 59, 999)
      if (entry.date > endDate) return false
    }

    // Apply other filters
    if (entry.type === "poop") {
      const poopEntry = entry as any

      if (filters.consistency.length > 0 && !filters.consistency.includes(poopEntry.consistency)) {
        return false
      }

      if (filters.color.length > 0 && !filters.color.includes(poopEntry.color)) {
        return false
      }

      if (filters.comfort.length > 0 && !filters.comfort.includes(poopEntry.comfort)) {
        return false
      }

      if (filters.foodTypes.length > 0) {
        const hasRelatedFood = poopEntry.relatedFoods.some((food: any) => filters.foodTypes.includes(food.name))
        if (!hasRelatedFood) return false
      }
    }

    if (entry.type === "food" && filters.foodTypes.length > 0) {
      const foodEntry = entry as any
      const hasFood = foodEntry.items.some((item: any) => filters.foodTypes.includes(item.name))
      if (!hasFood) return false
    }

    return true
  })

  // Group data by date for timeline view
  const groupedByDate = filteredData.reduce(
    (acc, entry) => {
      const dateStr = entry.date.toDateString()
      if (!acc[dateStr]) {
        acc[dateStr] = []
      }
      acc[dateStr].push(entry)
      return acc
    },
    {} as Record<string, typeof filteredData>,
  )

  // Get consistency emoji
  const getConsistencyEmoji = (consistency: string) => {
    switch (consistency) {
      case "hard":
        return "💎"
      case "normal":
        return "🥖"
      case "loose":
        return "💧"
      default:
        return "💩"
    }
  }

  // Get color display
  const getColorDisplay = (color: string) => {
    switch (color) {
      case "light-brown":
        return { name: "Light Brown", color: "#D2B48C" }
      case "brown":
        return { name: "Brown", color: "#8B4513" }
      case "dark-brown":
        return { name: "Dark Brown", color: "#5D4037" }
      case "green":
        return { name: "Green", color: "#4CAF50" }
      case "red":
        return { name: "Red", color: "#F44336" }
      default:
        return { name: color, color: "#9E9E9E" }
    }
  }

  // Get impact color
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-amber-500"
      case "low":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  // Format date
  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <EmojiIcon emoji="🔄" label="correlation" size="md" withBackground />
            <CardTitle>Food & Poop Correlation</CardTitle>
          </div>
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "timeline" | "table")}>
            <TabsList className="grid w-[180px] grid-cols-2">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {filteredData.length === 0 ? (
          <EmptyStateMascot
            title="No data found"
            description="Try adjusting your filters or date range to see food and poop correlations."
            mood="neutral"
            action={<Button onClick={() => window.location.reload()}>Reset Filters</Button>}
          />
        ) : (
          <TabsContent value="timeline" className="mt-0">
            <div className="space-y-6">
              {Object.entries(groupedByDate).map(([dateStr, entries]) => (
                <div key={dateStr} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(new Date(dateStr))}
                  </h3>

                  <div className="space-y-3">
                    {entries.map((entry, index) => (
                      <div key={`${dateStr}-${index}`} className="pl-6">
                        {entry.type === "food" ? (
                          <div className="flex items-start">
                            <div className="w-20 text-sm text-muted-foreground pt-1">
                              {(entry as any).items[0].time}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">Food Consumed</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {(entry as any).items.map((item: any, i: number) => (
                                  <div
                                    key={`${dateStr}-${index}-${i}`}
                                    className="inline-flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full text-xs"
                                  >
                                    <span>{item.emoji}</span>
                                    <span>{item.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start">
                            <div className="w-20 text-sm text-muted-foreground pt-1">{(entry as any).time}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-sm">Bathroom Visit</h4>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground">
                                        <Info className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs">
                                        This visit may be related to food consumed 1-2 days prior
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>

                              <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                  <EmojiIcon
                                    emoji={getConsistencyEmoji((entry as any).consistency)}
                                    label={(entry as any).consistency}
                                    size="sm"
                                  />
                                  <span className="text-sm capitalize">{(entry as any).consistency}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <div
                                    className="h-4 w-4 rounded-full"
                                    style={{ backgroundColor: getColorDisplay((entry as any).color).color }}
                                  ></div>
                                  <span className="text-sm">{getColorDisplay((entry as any).color).name}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <span className="text-sm">Comfort:</span>
                                  <div className="flex">
                                    {Array(5)
                                      .fill(0)
                                      .map((_, i) => (
                                        <span
                                          key={`star-${i}`}
                                          className={i < (entry as any).comfort ? "text-yellow-500" : "text-gray-300"}
                                        >
                                          ★
                                        </span>
                                      ))}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3">
                                <div className="text-sm font-medium flex items-center gap-1">
                                  <ArrowRight className="h-3 w-3" />
                                  <span>Likely caused by:</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {(entry as any).relatedFoods.map((food: any, i: number) => (
                                    <div
                                      key={`${dateStr}-${index}-food-${i}`}
                                      className={`inline-flex items-center gap-1 border px-2 py-1 rounded-full text-xs ${getImpactColor(
                                        food.impact,
                                      )}`}
                                    >
                                      <span>{food.emoji}</span>
                                      <span>{food.name}</span>
                                      <span className="text-[10px] opacity-80">({food.impact} impact)</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        )}

        <TabsContent value="table" className="mt-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium">Date</th>
                  <th className="text-left py-2 px-3 font-medium">Type</th>
                  <th className="text-left py-2 px-3 font-medium">Details</th>
                  <th className="text-left py-2 px-3 font-medium">Related Items</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry, index) => (
                  <tr key={index} className="border-b last:border-b-0 hover:bg-muted/20">
                    <td className="py-2 px-3 align-top">
                      <div className="font-medium">{formatDate(entry.date)}</div>
                      <div className="text-xs text-muted-foreground">
                        {entry.type === "food" ? (entry as any).items[0].time : (entry as any).time}
                      </div>
                    </td>
                    <td className="py-2 px-3 align-top">
                      {entry.type === "food" ? (
                        <div className="inline-flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full text-xs">
                          <EmojiIcon emoji="🍽️" label="food" size="xs" />
                          <span>Food</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-full text-xs">
                          <EmojiIcon emoji="🚽" label="poop" size="xs" />
                          <span>Poop</span>
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-3 align-top">
                      {entry.type === "food" ? (
                        <div className="flex flex-wrap gap-1">
                          {(entry as any).items.map((item: any, i: number) => (
                            <div
                              key={`item-${index}-${i}`}
                              className="inline-flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full text-xs"
                            >
                              <span>{item.emoji}</span>
                              <span>{item.name}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <EmojiIcon
                              emoji={getConsistencyEmoji((entry as any).consistency)}
                              label={(entry as any).consistency}
                              size="xs"
                            />
                            <span className="text-xs capitalize">{(entry as any).consistency}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: getColorDisplay((entry as any).color).color }}
                            ></div>
                            <span className="text-xs">{getColorDisplay((entry as any).color).name}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <span className="text-xs">Comfort:</span>
                            <div className="flex">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <span
                                    key={`table-star-${index}-${i}`}
                                    className={`text-xs ${i < (entry as any).comfort ? "text-yellow-500" : "text-gray-300"}`}
                                  >
                                    ★
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-3 align-top">
                      {entry.type === "poop" ? (
                        <div className="flex flex-wrap gap-1">
                          {(entry as any).relatedFoods.map((food: any, i: number) => (
                            <div
                              key={`related-${index}-${i}`}
                              className={`inline-flex items-center gap-1 border px-2 py-1 rounded-full text-xs ${getImpactColor(
                                food.impact,
                              )}`}
                            >
                              <span>{food.emoji}</span>
                              <span>{food.name}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  )
}
