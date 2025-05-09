"use client"

import { useEffect, useRef } from "react"
import { useTooltip } from "@/hooks/use-tooltip"

interface FrequencyLineChartProps {
  period: string
}

export function FrequencyLineChart({ period }: FrequencyLineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip(tooltipRef)

  // Generate data based on the selected period
  const getData = () => {
    if (period === "week") {
      return [
        { day: "Mon", value: 1 },
        { day: "Tue", value: 2 },
        { day: "Wed", value: 3 },
        { day: "Thu", value: 1 },
        { day: "Fri", value: 2 },
        { day: "Sat", value: 1 },
        { day: "Sun", value: 0 },
      ]
    } else if (period === "month") {
      return Array.from({ length: 30 }, (_, i) => ({
        day: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 3) + 1,
      }))
    } else {
      // Year view - monthly aggregates
      return [
        { day: "Jan", value: 35 },
        { day: "Feb", value: 28 },
        { day: "Mar", value: 34 },
        { day: "Apr", value: 32 },
        { day: "May", value: 40 },
        { day: "Jun", value: 35 },
        { day: "Jul", value: 38 },
        { day: "Aug", value: 33 },
        { day: "Sep", value: 36 },
        { day: "Oct", value: 34 },
        { day: "Nov", value: 37 },
        { day: "Dec", value: 39 },
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
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

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
      const y = padding + (chartHeight * (5 - i)) / 5
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
    }
    ctx.stroke()

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = "#0ea5e9" // sky-500
    ctx.lineWidth = 3

    // Draw points and connect them
    data.forEach((item, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1)
      const y = height - padding - (chartHeight * item.value) / maxValue

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw area under the line
    ctx.beginPath()
    ctx.fillStyle = "rgba(14, 165, 233, 0.2)" // sky-500 with opacity

    // Start from the bottom left
    ctx.moveTo(padding, height - padding)

    // Draw the line again
    data.forEach((item, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1)
      const y = height - padding - (chartHeight * item.value) / maxValue
      ctx.lineTo(x, y)
    })

    // Complete the path to the bottom right
    ctx.lineTo(width - padding, height - padding)
    ctx.closePath()
    ctx.fill()

    // Draw points
    data.forEach((item, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1)
      const y = height - padding - (chartHeight * item.value) / maxValue

      ctx.beginPath()
      ctx.fillStyle = "#0ea5e9" // sky-500
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()

      // Add hover detection
      canvas.onmousemove = (e) => {
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        // Check if mouse is near any point
        data.forEach((dataPoint, i) => {
          const pointX = padding + (i * chartWidth) / (data.length - 1)
          const pointY = height - padding - (chartHeight * dataPoint.value) / maxValue

          const distance = Math.sqrt(Math.pow(mouseX - pointX, 2) + Math.pow(mouseY - pointY, 2))

          if (distance < 15) {
            showTooltip()
            moveTooltip(e.clientX, e.clientY)

            if (tooltipRef.current) {
              tooltipRef.current.innerHTML = `
                <div class="font-medium">${dataPoint.day}</div>
                <div>Visits: ${dataPoint.value}</div>
              `
            }

            // Highlight the point
            ctx.beginPath()
            ctx.fillStyle = "#0369a1" // sky-700
            ctx.arc(pointX, pointY, 7, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      }

      canvas.onmouseleave = () => {
        hideTooltip()
      }
    })

    // Draw x-axis labels
    ctx.fillStyle = "#64748b" // slate-500
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    // Only show a subset of labels if there are too many
    const labelStep = data.length > 15 ? Math.ceil(data.length / 10) : 1

    data.forEach((item, index) => {
      if (index % labelStep === 0 || index === data.length - 1) {
        const x = padding + (index * chartWidth) / (data.length - 1)
        ctx.fillText(item.day, x, height - padding + 20)
      }
    })

    // Draw y-axis labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight * (5 - i)) / 5
      const value = (maxValue * i) / 5
      ctx.fillText(value.toFixed(0), padding - 10, y + 5)
    }
  }, [data, period, showTooltip, hideTooltip, moveTooltip])

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
      <div
        ref={tooltipRef}
        className="absolute hidden rounded-md bg-white p-2 text-sm shadow-md"
        style={{ pointerEvents: "none" }}
      ></div>
    </div>
  )
}
