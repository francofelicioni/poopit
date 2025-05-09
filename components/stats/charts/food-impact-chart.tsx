"use client"

import { useEffect, useRef } from "react"
import { useTooltip } from "@/hooks/use-tooltip"

interface FoodImpactChartProps {
  type: string
}

export function FoodImpactChart({ type }: FoodImpactChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip(tooltipRef)

  // Generate data based on the selected impact type
  const getData = () => {
    if (type === "consistency") {
      return [
        { food: "Coffee", impact: 8.2 },
        { food: "Dairy", impact: 6.5 },
        { food: "Spicy Food", impact: 7.8 },
        { food: "Fast Food", impact: 7.1 },
        { food: "Alcohol", impact: 6.9 },
        { food: "Fiber", impact: 4.2, positive: true },
        { food: "Bananas", impact: 3.8, positive: true },
        { food: "Yogurt", impact: 4.5, positive: true },
      ]
    } else if (type === "comfort") {
      return [
        { food: "Spicy Food", impact: 7.9 },
        { food: "Dairy", impact: 7.2 },
        { food: "Fast Food", impact: 6.8 },
        { food: "Alcohol", impact: 6.5 },
        { food: "Coffee", impact: 5.8 },
        { food: "Yogurt", impact: 4.1, positive: true },
        { food: "Fiber", impact: 3.9, positive: true },
        { food: "Bananas", impact: 3.5, positive: true },
      ]
    } else {
      // Frequency
      return [
        { food: "Coffee", impact: 8.5 },
        { food: "Fiber", impact: 7.8, positive: true },
        { food: "Spicy Food", impact: 7.2 },
        { food: "Fast Food", impact: 6.5 },
        { food: "Alcohol", impact: 6.2 },
        { food: "Dairy", impact: 5.8 },
        { food: "Yogurt", impact: 4.5, positive: true },
        { food: "Bananas", impact: 3.2, positive: true },
      ]
    }
  }

  const data = getData()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 60
    const barHeight = 25
    const chartHeight = data.length * (barHeight + 15)
    const chartWidth = width - padding * 2

    // Find max value for scaling
    const maxValue = 10 // Using a fixed scale of 0-10

    // Draw horizontal bars
    data.forEach((item, index) => {
      const y = padding + index * (barHeight + 15)
      const barWidth = (chartWidth * item.impact) / maxValue

      // Choose color based on whether it's positive or negative
      const color = item.positive ? "#10b981" : "#ef4444" // green-500 or red-500

      // Draw bar
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.roundRect(padding, y, barWidth, barHeight, [4])
      ctx.fill()

      // Draw food label
      ctx.fillStyle = "#334155" // slate-700
      ctx.font = "14px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(item.food, padding - 10, y + barHeight / 2 + 5)

      // Draw impact value
      ctx.fillStyle = "#64748b" // slate-500
      ctx.textAlign = "left"
      ctx.fillText(item.impact.toFixed(1), padding + barWidth + 10, y + barHeight / 2 + 5)

      // Add hover detection
      canvas.onmousemove = (e) => {
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        if (mouseX >= padding && mouseX <= padding + barWidth && mouseY >= y && mouseY <= y + barHeight) {
          showTooltip()
          moveTooltip(e.clientX, e.clientY)

          if (tooltipRef.current) {
            tooltipRef.current.innerHTML = `
              <div class="font-medium">${item.food}</div>
              <div>Impact: ${item.impact.toFixed(1)}/10</div>
              <div class="text-xs ${item.positive ? "text-green-600" : "text-red-600"}">
                ${item.positive ? "Positive Effect" : "Negative Effect"}
              </div>
            `
          }

          // Highlight the bar
          ctx.fillStyle = item.positive ? "#059669" : "#dc2626" // green-600 or red-600
          ctx.beginPath()
          ctx.roundRect(padding, y, barWidth, barHeight, [4])
          ctx.fill()
        }
      }

      canvas.onmouseleave = () => {
        hideTooltip()
      }
    })

    // Draw x-axis
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0" // slate-200
    ctx.moveTo(padding, padding + chartHeight + 10)
    ctx.lineTo(width - padding, padding + chartHeight + 10)
    ctx.stroke()

    // Draw x-axis labels
    ctx.fillStyle = "#64748b" // slate-500
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    for (let i = 0; i <= 10; i += 2) {
      const x = padding + (chartWidth * i) / maxValue
      ctx.fillText(i.toString(), x, padding + chartHeight + 25)
    }

    // Draw title
    ctx.fillStyle = "#334155" // slate-700
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(`Impact on ${type.charAt(0).toUpperCase() + type.slice(1)} (0-10 scale)`, width / 2, padding - 20)
  }, [data, type, showTooltip, hideTooltip, moveTooltip])

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
      <div
        ref={tooltipRef}
        className="absolute hidden rounded-md bg-white p-2 text-sm shadow-md"
        style={{ pointerEvents: "none" }}
      ></div>
    </div>
  )
}
