"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FrequencyLineChart } from "@/components/stats/charts/frequency-line-chart"
import { FrequencyHeatmap } from "@/components/stats/charts/frequency-heatmap"
import { FrequencyByDayChart } from "@/components/stats/charts/frequency-by-day-chart"
import { EmojiIcon } from "@/components/ui/emoji-icon"

export function FrequencyAnalysis() {
  const [chartPeriod, setChartPeriod] = useState("month")

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="📈" label="chart increasing" size="md" withBackground />
              <div>
                <CardTitle>Frequency Over Time</CardTitle>
                <CardDescription>How often you visit the bathroom</CardDescription>
              </div>
            </div>
            <Tabs value={chartPeriod} onValueChange={setChartPeriod} className="w-[240px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <FrequencyLineChart period={chartPeriod} />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-sky-50 p-3">
              <p className="text-sm font-medium text-muted-foreground">Peak Day</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-primary-600">Wednesday</p>
                <EmojiIcon emoji="🔝" label="top" size="sm" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Hump day is busy for you!</p>
            </div>
            <div className="rounded-lg bg-sky-50 p-3">
              <p className="text-sm font-medium text-muted-foreground">Slowest Day</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-primary-600">Sunday</p>
                <EmojiIcon emoji="😴" label="sleeping" size="sm" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Even your bowels rest on Sunday</p>
            </div>
            <div className="rounded-lg bg-sky-50 p-3">
              <p className="text-sm font-medium text-muted-foreground">Trend</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-green-600">Improving</p>
                <EmojiIcon emoji="👍" label="thumbs up" size="sm" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">More regular than last month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="🕒" label="clock" size="md" withBackground />
              <div>
                <CardTitle>Daily Distribution</CardTitle>
                <CardDescription>When you go throughout the day</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <FrequencyHeatmap />
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              You're most active between 7-9 AM and 5-7 PM
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="📅" label="calendar" size="md" withBackground />
              <div>
                <CardTitle>Day of Week</CardTitle>
                <CardDescription>Frequency by day of the week</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <FrequencyByDayChart />
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Wednesday is your most productive day! <EmojiIcon emoji="💪" label="muscle" size="xs" />
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
