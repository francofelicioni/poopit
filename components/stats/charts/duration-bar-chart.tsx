"use client"

import { useEffect, useRef } from "react"
import { useTooltip } from "@/hooks/use-tooltip"

export function DurationBarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip(tooltipRef)

  const data = [
    { range: "0-2 min", value: 15, color: "#38bdf8" }, // sky-400
    { range: "2-5 min", value: 32, color: "#0ea5e9" }, // sky-500
    { range: "5-10 min", value: 28, color: "#0284c7" }, // sky-600
    { range: "10-15 min", value: 18, color: "#0369a1" }, // sky-700
    { range: "15+ min", value: 7, color: "#075985" }, // sky-800
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
    const barWidth = (width - padding * 2) / data.length - 20

    // Find max value for scaling
    const maxValue = Math.max(...data.map((item) => item.value), 1)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0" // slate-200
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw grid lines
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0" // slate-200
    for (let i = 1; i <= 5; i++) {
      const y = padding + (height - padding * 2) * (1 - i / 5)
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
    }
    ctx.stroke()

    // Draw bars
    data.forEach((item, index) => {
      const x = padding + index * ((width - padding * 2) / data.length) + 10
      const barHeight = (height - padding * 2) * (item.value / maxValue)
      const y = height - padding - barHeight

      // Draw bar
      ctx.fillStyle = item.color
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0])
      ctx.fill()

      // Draw value on top of bar
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${item.value}%`, x + barWidth / 2, y + 15)

      // Draw range label
      ctx.fillStyle = "#64748b" // slate-500
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.range, x + barWidth / 2, height - padding + 15)

      // Add hover detection
      canvas.onmousemove = (e) => {
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        if (mouseX >= x && mouseX <= x + barWidth && mouseY >= y && mouseY <= height - padding) {
          showTooltip()
          moveTooltip(e.clientX, e.clientY)

          if (tooltipRef.current) {
            tooltipRef.current.innerHTML = `
              <div class="font-medium">${item.range}</div>
              <div>${item.value}% of visits</div>
            `
          }

          // Highlight the bar
          ctx.fillStyle = "#0c4a6e" // sky-900
          ctx.beginPath()
          ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0])
          ctx.fill()

          // Redraw value
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 12px sans-serif"
          ctx.textAlign = "center"
          ctx.fillText(`${item.value}%`, x + barWidth / 2, y + 15)
        }
      }

      canvas.onmouseleave = () => {
        hideTooltip()
      }
    })

    // Draw y-axis labels
    ctx.fillStyle = "#64748b" // slate-500
    ctx.font = "12px sans-serif"
    ctx.textAlign = "right"

    for (let i = 0; i <= 5; i++) {
      const y = height - padding - (i * (height - padding * 2)) / 5
      const value = (maxValue * i) / 5
      ctx.fillText(`${value.toFixed(0)}%`, padding - 10, y + 5)
    }
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
