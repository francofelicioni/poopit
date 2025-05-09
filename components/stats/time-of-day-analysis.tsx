"use client"

import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { useTooltip } from "@/hooks/use-tooltip"
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

Chart.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend)

export function TimeOfDayAnalysis() {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip(tooltipRef)

  // Time of day data
  const timeData = {
    labels: ["6-8 AM", "8-10 AM", "10-12 PM", "12-2 PM", "2-4 PM", "4-6 PM", "6-8 PM", "8-10 PM", "10-12 AM"],
    datasets: [
      {
        label: "Number of Visits",
        data: [18, 25, 12, 8, 5, 7, 10, 6, 2],
        backgroundColor: "#0ea5e9",
        borderColor: "#0284c7",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }

  // Time emoji mapping
  const timeEmojis = {
    "6-8 AM": "🌅",
    "8-10 AM": "☕",
    "10-12 PM": "🕙",
    "12-2 PM": "🍽️",
    "2-4 PM": "🕝",
    "4-6 PM": "🕓",
    "6-8 PM": "🍽️",
    "8-10 PM": "🌙",
    "10-12 AM": "😴",
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: ({ chart, tooltip }) => {
          if (!tooltipRef.current || !tooltip.body) {
            hideTooltip()
            return
          }

          const label = tooltip.title[0]
          const value = tooltip.body[0].lines[0].split(": ")[1]
          const emoji = timeEmojis[label as keyof typeof timeEmojis] || "⏰"
          const percentage = Math.round((Number.parseInt(value) / 93) * 100)

          showTooltip()
          if (tooltipRef.current) {
            tooltipRef.current.innerHTML = `
              <div class="font-medium flex items-center gap-2">
                <span>${emoji}</span>
                <span>${label}</span>
              </div>
              <div class="text-sm mt-1">Visits: ${value} (${percentage}%)</div>
            `
          }

          const { left, top } = chart.canvas.getBoundingClientRect()
          moveTooltip(left + tooltip.caretX, top + tooltip.caretY)
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Visits",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time of Day",
        },
      },
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Time of Day Distribution</h3>
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="⏰" label="clock" size="md" />
            </div>
          </div>
          <div className="relative h-[300px]">
            <Bar data={timeData} options={options} />
            <div
              ref={tooltipRef}
              className="absolute hidden rounded-md bg-white p-2 text-sm shadow-md"
              style={{ pointerEvents: "none" }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Time Insights</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-sky-50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <EmojiIcon emoji="☕" label="coffee" size="md" />
                <p className="font-medium">Morning Peak</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Your most active time is 8-10 AM, likely due to your morning coffee routine.
              </p>
            </div>

            <div className="rounded-lg bg-sky-50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <EmojiIcon emoji="🍽️" label="meal" size="md" />
                <p className="font-medium">Post-Meal Patterns</p>
              </div>
              <p className="text-sm text-muted-foreground">
                You show smaller peaks after lunch (12-2 PM) and dinner (6-8 PM).
              </p>
            </div>

            <div className="rounded-lg bg-sky-50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <EmojiIcon emoji="🌙" label="night" size="md" />
                <p className="font-medium">Evening Decline</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Activity decreases significantly after 8 PM, which is good for sleep quality.
              </p>
            </div>

            <div className="rounded-lg bg-sky-50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <EmojiIcon emoji="💡" label="lightbulb" size="md" />
                <p className="font-medium">Pro Tip</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Morning bowel movements are a sign of a healthy digestive system. Keep it up!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
