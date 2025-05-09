"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { useTooltip } from "@/hooks/use-tooltip"
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

Chart.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend)

export function FoodCorrelations() {
  const [foodFilter, setFoodFilter] = useState("")
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip(tooltipRef)

  // Food impact data
  const foodItems = [
    { name: "Coffee", impact: 8.5, effect: "Speeds things up", emoji: "☕" },
    { name: "Dairy", impact: 6.8, effect: "Can cause discomfort", emoji: "🥛" },
    { name: "Spicy Food", impact: 7.2, effect: "Increases urgency", emoji: "🌶️" },
    { name: "Fast Food", impact: 6.5, effect: "Causes irregularity", emoji: "🍔" },
    { name: "Bananas", impact: 4.2, effect: "Improves consistency", emoji: "🍌" },
    { name: "Fiber", impact: 3.8, effect: "Improves regularity", emoji: "🥦" },
    { name: "Alcohol", impact: 6.2, effect: "Causes dehydration", emoji: "🍺" },
    { name: "Yogurt", impact: 4.5, effect: "Improves gut health", emoji: "🥣" },
  ]

  const filteredFoods = foodFilter
    ? foodItems.filter((food) => food.name.toLowerCase().includes(foodFilter.toLowerCase()))
    : foodItems

  // Chart data
  const chartData = {
    labels: filteredFoods.map((food) => food.name),
    datasets: [
      {
        label: "Impact Score",
        data: filteredFoods.map((food) => food.impact),
        backgroundColor: filteredFoods.map((food) =>
          food.impact > 6 ? "#ef4444" : food.impact > 5 ? "#f59e0b" : "#10b981",
        ),
        borderColor: filteredFoods.map((food) =>
          food.impact > 6 ? "#dc2626" : food.impact > 5 ? "#d97706" : "#059669",
        ),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }

  const options = {
    indexAxis: "y" as const,
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

          const index = tooltip.dataPoints[0].dataIndex
          const food = filteredFoods[index]

          showTooltip()
          if (tooltipRef.current) {
            tooltipRef.current.innerHTML = `
              <div class="font-medium flex items-center gap-2">
                <span>${food.emoji}</span>
                <span>${food.name}</span>
              </div>
              <div class="text-sm mt-1">Impact Score: ${food.impact}/10</div>
              <div class="text-sm mt-1">Effect: ${food.effect}</div>
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
      },
      x: {
        beginAtZero: true,
        max: 10,
        title: {
          display: true,
          text: "Impact Score (0-10)",
        },
      },
    },
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Food Impact Analysis</h3>
          <div className="flex items-center gap-2">
            <EmojiIcon emoji="🍽️" label="food" size="md" />
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search foods..."
            className="max-w-sm"
            value={foodFilter}
            onChange={(e) => setFoodFilter(e.target.value)}
          />
        </div>

        <div className="relative h-[400px]">
          <Bar data={chartData} options={options} />
          <div
            ref={tooltipRef}
            className="absolute hidden rounded-md bg-white p-2 text-sm shadow-md"
            style={{ pointerEvents: "none" }}
          ></div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-sky-50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <EmojiIcon emoji="☕" label="coffee" size="md" />
              <p className="font-medium">Coffee Effect</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Coffee has the strongest impact on your digestive system, typically triggering a visit within 30 minutes.
            </p>
          </div>

          <div className="rounded-lg bg-sky-50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <EmojiIcon emoji="🌶️" label="spicy" size="md" />
              <p className="font-medium">Spicy Food Impact</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Spicy foods show a strong correlation with looser consistency and increased urgency.
            </p>
          </div>

          <div className="rounded-lg bg-sky-50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <EmojiIcon emoji="🥦" label="fiber" size="md" />
              <p className="font-medium">Fiber Benefits</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Fiber-rich foods improve consistency and regularity. Consider adding more to your diet.
            </p>
          </div>

          <div className="rounded-lg bg-sky-50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <EmojiIcon emoji="💡" label="lightbulb" size="md" />
              <p className="font-medium">Pro Tip</p>
            </div>
            <p className="text-sm text-muted-foreground">
              For optimal digestive health, balance high-impact foods with fiber-rich options and stay hydrated.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
