"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConsistencyPieChart } from "@/components/stats/charts/consistency-pie-chart"
import { DurationBarChart } from "@/components/stats/charts/duration-bar-chart"
import { ComfortTrendChart } from "@/components/stats/charts/comfort-trend-chart"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, AlertTriangle } from "lucide-react"
import { EmojiIcon } from "@/components/ui/emoji-icon"

export function PatternInsights() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="🥖" label="bread" size="md" withBackground />
              <div>
                <CardTitle>Consistency Distribution</CardTitle>
                <CardDescription>Breakdown of your consistency types</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ConsistencyPieChart />
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary-400"></div>
                <span className="text-sm">Normal (68%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-accent-400"></div>
                <span className="text-sm">Hard (18%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <span className="text-sm">Loose (14%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="⏱️" label="stopwatch" size="md" withBackground />
              <div>
                <CardTitle>Duration Patterns</CardTitle>
                <CardDescription>How long you spend in the bathroom</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <DurationBarChart />
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Average duration: 6.2 minutes</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="😌" label="relieved face" size="md" withBackground />
              <div>
                <CardTitle>Comfort Level Trend</CardTitle>
                <CardDescription>How comfortable your bathroom visits have been</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Improving
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ComfortTrendChart />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-sky-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-medium">
                <EmojiIcon emoji="✅" label="check" size="sm" />
                Comfort Insights
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Your comfort level has improved by 28% in the last month</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Morning visits tend to be more comfortable than evening ones</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500"></div>
                  <span>Weekend comfort levels are slightly lower than weekdays</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-amber-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-medium">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Potential Issues
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500"></div>
                  <span>Comfort drops significantly after consuming dairy products</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500"></div>
                  <span>Late night snacks correlate with morning discomfort</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
