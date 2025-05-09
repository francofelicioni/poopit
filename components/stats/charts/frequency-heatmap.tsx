"use client"

import { useEffect, useRef } from "react"
import { useTooltip } from "@/hooks/use-tooltip"

export function FrequencyHeatmap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip(tooltipRef)

  // Sample data for the heatmap
  // Hours of the day (0-23) vs frequency (0-10)
  const data = [
    [0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 1, 1, 2, 1, 1, 1, 2, 3, 2, 1, 1, 0, 0, 0], // Monday
    [0, 0, 0, 0, 0, 1, 3, 2, 1, 1, 2, 1, 1, 1, 1, 2, 3, 2, 1, 1, 0, 0, 0, 0], // Tuesday
    [0, 0, 0, 0, 0, 2, 3, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 3, 1, 1, 0, 0, 0, 0], // Wednesday
    [0, 0, 0, 0, 0, 1, 2, 3, 1, 1, 2, 1, 1, 1, 1, 2, 3, 2, 1, 0, 0, 0, 0, 0], // Thursday
    [0, 0, 0, 0, 0, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0], // Friday
    [0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], // Saturday
    [0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], // Sunday
  ]

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

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
    const cellWidth = (width - padding * 2) / 24 // 24 hours
    const cellHeight = (height - padding * 2) / 7 // 7 days

    // Draw heatmap cells
    data.forEach((row, dayIndex) => {
      row.forEach((value, hourIndex) => {
        const x = padding + hourIndex * cellWidth
        const y = padding + dayIndex * cellHeight

        // Color based on value
        let color = "#f1f5f9" // slate-100 (default/0)
        if (value === 1)
          color = "#bae6fd" // sky-200
        else if (value === 2)
          color = "#38bdf8" // sky-400
        else if (value === 3) color = "#0284c7" // sky-600

        ctx.fillStyle = color
        ctx.fillRect(x, y, cellWidth, cellHeight)

        // Add border
        ctx.strokeStyle = "#f8fafc" // slate-50
        ctx.strokeRect(x, y, cellWidth, cellHeight)
      })
    })

    // Draw y-axis labels (days)
    ctx.fillStyle = "#64748b" // slate-500
    ctx.font = "12px sans-serif"
    ctx.textAlign = "right"

    days.forEach((day, index) => {
      const y = padding + index * cellHeight + cellHeight / 2 + 4
      ctx.fillText(day, padding - 10, y)
    })

    // Draw x-axis labels (hours)
    ctx.textAlign = "center"
    for (let hour = 0; hour < 24; hour += 3) {
      const x = padding + hour * cellWidth + cellWidth / 2
      const label = hour === 0 ? "12am" : hour === 12 ? "12pm" : hour > 12 ? `${hour - 12}pm` : `${hour}am`
      ctx.fillText(label, x, height - padding + 15)
    }

    // Add hover interaction
    canvas.onmousemove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Check if mouse is within the heatmap area
      if (mouseX >= padding && mouseX <= width - padding && mouseY >= padding && mouseY <= height - padding) {
        const hourIndex = Math.floor((mouseX - padding) / cellWidth)
        const dayIndex = Math.floor((mouseY - padding) / cellHeight)

        if (hourIndex >= 0 && hourIndex < 24 && dayIndex >= 0 && dayIndex < 7) {
          const value = data[dayIndex][hourIndex]

          showTooltip()
          moveTooltip(e.clientX, e.clientY)

          if (tooltipRef.current) {
            const hour =
              hourIndex === 0
                ? "12am"
                : hourIndex === 12
                  ? "12pm"
                  : hourIndex > 12
                    ? `${hourIndex - 12}pm`
                    : `${hourIndex}am`

            tooltipRef.current.innerHTML = `
              <div class="font-medium">${days[dayIndex]} at ${hour}</div>
              <div>Frequency: ${value} visits</div>
            `
          }

          // Highlight the cell
          ctx.strokeStyle = "#0c4a6e" // sky-900
          ctx.lineWidth = 2
          const x = padding + hourIndex * cellWidth
          const y = padding + dayIndex * cellHeight
          ctx.strokeRect(x, y, cellWidth, cellHeight)
          ctx.lineWidth = 1
        }
      } else {
        hideTooltip()
      }
    }

    canvas.onmouseleave = () => {
      hideTooltip()
    }
  }, [showTooltip, hideTooltip, moveTooltip])

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
