"use client"

import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { useTooltip } from "@/hooks/use-tooltip"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

Chart.register(ArcElement, Tooltip, Legend)

export function ColorAnalysis() {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip(tooltipRef)

  // Color data
  const colorData = {
    labels: ["Light Brown", "Brown", "Dark Brown", "Green", "Red", "Other"],
    datasets: [
      {
        data: [25, 45, 15, 8, 2, 5],
        backgroundColor: ["#D2B48C", "#8B4513", "#5D4037", "#4CAF50", "#F44336", "#9E9E9E"],
        borderColor: ["#FFF", "#FFF", "#FFF", "#FFF", "#FFF", "#FFF"],
        borderWidth: 2,
      },
    ],
  }

  // Color emoji mapping
  const colorEmojis = {
    "Light Brown": "🟤",
    Brown: "🟫",
    "Dark Brown": "🟫",
    Green: "🟢",
    Red: "🔴",
    Other: "⚪",
  }

  // Color health indicators
  const colorHealth = {
    "Light Brown": "Normal, may indicate faster transit time",
    Brown: "Healthy normal color",
    "Dark Brown": "Normal, may indicate slower transit time",
    Green: "May indicate diet or faster transit time",
    Red: "May indicate bleeding, consult a doctor",
    Other: "Varies based on specific color",
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
          const value = tooltip.body[0].lines[0]
          const emoji = colorEmojis[label as keyof typeof colorEmojis] || "⚪"
          const health = colorHealth[label as keyof typeof colorHealth] || ""

          showTooltip()
          if (tooltipRef.current) {
            tooltipRef.current.innerHTML = `
              <div class="font-medium flex items-center gap-2">
                <span>${emoji}</span>
                <span>${label}: ${value}</span>
              </div>
              <div class="text-xs text-muted-foreground mt-1">${health}</div>
            `
          }

          const { left, top } = chart.canvas.getBoundingClientRect()
          moveTooltip(left + tooltip.caretX, top + tooltip.caretY)
        },
      },
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Poop Color Distribution</h3>
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="🎨" label="color palette" size="md" />
            </div>
          </div>
          <div className="relative h-[300px]">
            <Doughnut data={colorData} options={options} />
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
          <h3 className="text-lg font-medium mb-4">Color Insights</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-sky-50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <EmojiIcon emoji="🟫" label="brown" size="md" />
                <p className="font-medium">Brown Dominates</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Brown colors make up 85% of your logs, indicating healthy digestion.
              </p>
            </div>

            <div className="rounded-lg bg-sky-50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <EmojiIcon emoji="🟢" label="green" size="md" />
                <p className="font-medium">Green Occurrences</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Green appears after consuming leafy vegetables or when food moves quickly through your system.
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <EmojiIcon emoji="🔴" label="red" size="md" />
                <p className="font-medium">Red Flags</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Red appearances are rare (2%) but should be monitored. Could be from beets or tomatoes.
              </p>
            </div>

            <div className="rounded-lg bg-sky-50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <EmojiIcon emoji="💡" label="lightbulb" size="md" />
                <p className="font-medium">Pro Tip</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Color changes lasting more than 2-3 days may warrant a conversation with your doctor.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
