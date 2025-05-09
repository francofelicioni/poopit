"use client"

import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { useTooltip } from "@/hooks/use-tooltip"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(ArcElement, Tooltip, Legend)

export function TextureAnalysis() {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip(tooltipRef)

  // Texture data
  const textureData = {
    labels: ["Normal", "Hard", "Loose", "Very Hard", "Watery"],
    datasets: [
      {
        data: [68, 12, 14, 3, 3],
        backgroundColor: ["#0ea5e9", "#14b8a6", "#facc15", "#6366f1", "#f59e0b"],
        borderColor: ["#FFF", "#FFF", "#FFF", "#FFF", "#FFF"],
        borderWidth: 2,
      },
    ],
  }

  // Texture emoji mapping
  const textureEmojis = {
    Normal: "🥖",
    Hard: "💎",
    Loose: "💧",
    "Very Hard": "🪨",
    Watery: "🌊",
  }

  // Texture health indicators
  const textureHealth = {
    Normal: "Well-formed, easy to pass - ideal consistency",
    Hard: "May indicate dehydration or lack of fiber",
    Loose: "May indicate mild digestive upset or diet changes",
    "Very Hard": "Indicates significant dehydration or constipation",
    Watery: "May indicate digestive illness or significant diet issues",
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
          const emoji = textureEmojis[label as keyof typeof textureEmojis] || "⚪"
          const health = textureHealth[label as keyof typeof textureHealth] || ""

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
            <h3 className="text-lg font-medium">Poop Texture Distribution</h3>
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="🧱" label="texture" size="md" />
            </div>
          </div>
          <div className="relative h-[300px]">
            <Pie data={textureData} options={options} />
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
          <h3 className="text-lg font-medium mb-4">Texture Insights</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-sky-50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <EmojiIcon emoji="🥖" label="normal" size="md" />
                <p className="font-medium">Mostly Normal</p>
              </div>
              <p className="text-sm text-muted-foreground">
                68% of your logs show normal consistency, indicating good digestive health.
              </p>
            </div>

            <div className="rounded-lg bg-sky-50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <EmojiIcon emoji="💎" label="hard" size="md" />
                <p className="font-medium">Hard Occurrences</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Hard stools (15%) often appear after days with lower water intake. Try drinking more water!
              </p>
            </div>

            <div className="rounded-lg bg-sky-50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <EmojiIcon emoji="💧" label="loose" size="md" />
                <p className="font-medium">Loose Patterns</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Loose stools (14%) correlate with spicy food consumption and coffee intake.
              </p>
            </div>

            <div className="rounded-lg bg-sky-50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <EmojiIcon emoji="💡" label="lightbulb" size="md" />
                <p className="font-medium">Bristol Scale</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Your average Bristol Stool Scale score is 3.8, which falls in the healthy range (3-4).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
