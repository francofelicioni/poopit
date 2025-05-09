"use client"

import { useEffect, useRef } from "react"
import { useTooltip } from "@/hooks/use-tooltip"

export function FoodTimingChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip(tooltipRef)

  const data = [
    { food: "Coffee", delay: 0.5, effect: "Strong", color: "#ef4444" }, // red-500
    { food: "Spicy Food", delay: 5, effect: "Medium", color: "#f97316" }, // orange-500
    { food: "Dairy", delay: 2, effect: "Medium", color: "#eab308" }, // yellow-500
    { food: "Fast Food", delay: 8, effect: "Medium", color: "#84cc16" }, // lime-500
    { food: "Fiber", delay: 12, effect: "Mild", color: "#10b981" }, // green-500
  ]

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
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Draw timeline (x-axis)
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0" // slate-200
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw timeline labels
    ctx.fillStyle = "#64748b" // slate-500
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    for (let hour = 0; hour <= 24; hour += 4) {
      const x = padding + (chartWidth * hour) / 24
      ctx.fillText(`${hour}h`, x, height - padding + 15)
    }

    // Draw food items on timeline
    data.forEach((item, index) => {
      const x = padding + (chartWidth * item.delay) / 24
      const y = padding + index * (chartHeight / (data.length + 1))

      // Draw circle for food
      ctx.beginPath()
      ctx.fillStyle = item.color
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.fill()

      // Draw food label
      ctx.fillStyle = "#334155" // slate-700
      ctx.font = "14px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(item.food, x - 20, y + 5)

      // Draw line to timeline
      ctx.beginPath()
      ctx.strokeStyle = item.color
      ctx.setLineDash([5, 3])
      ctx.moveTo(x, y)
      ctx.lineTo(x, height - padding)
      ctx.stroke()
      ctx.setLineDash([])

      // Draw effect marker
      const markerSize = item.effect === "Strong" ? 8 : item.effect === "Medium" ? 6 : 4
      ctx.beginPath()
      ctx.fillStyle = item.color
      ctx.arc(x, height - padding, markerSize, 0, Math.PI * 2)
      ctx.fill()

      // Add hover detection
      canvas.onmousemove = (e) => {
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2))

        if (distance < 15) {
          showTooltip()
          moveTooltip(e.clientX, e.clientY)

          if (tooltipRef.current) {
            tooltipRef.current.innerHTML = `
              <div class="font-medium">${item.food}</div>
              <div>Delay: ${item.delay} hours</div>
              <div>Effect: ${item.effect}</div>
            `
          }

          // Highlight the circle
          ctx.beginPath()
          ctx.fillStyle = item.color
          ctx.arc(x, y, 12, 0, Math.PI * 2)
          ctx.fill()

          // Draw white border
          ctx.beginPath()
          ctx.strokeStyle = "#ffffff"
          ctx.lineWidth = 2
          ctx.arc(x, y, 12, 0, Math.PI * 2)
          ctx.stroke()
          ctx.lineWidth = 1
        }
      }

      canvas.onmouseleave = () => {
        hideTooltip()
      }
    })

    // Draw title
    ctx.fillStyle = "#334155" // slate-700
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Time Delay Between Consumption and Effect", width / 2, padding - 20)
  }, [data, showTooltip, hideTooltip, moveTooltip])

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={800} height={250} className="w-full h-full" />
      <div
        ref={tooltipRef}
        className="absolute hidden rounded-md bg-white p-2 text-sm shadow-md"
        style={{ pointerEvents: "none" }}
      ></div>
    </div>
  )
}
