"use client"

import { useEffect, useRef } from "react"
import { useTooltip } from "@/hooks/use-tooltip"

export function ComfortTrendChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip(tooltipRef)

  const data = [
    { date: "Apr 1", value: 2.8 },
    { date: "Apr 5", value: 3.1 },
    { date: "Apr 10", value: 2.9 },
    { date: "Apr 15", value: 3.2 },
    { date: "Apr 20", value: 3.5 },
    { date: "Apr 25", value: 3.7 },
    { date: "May 1", value: 3.8 },
    { date: "May 5", value: 3.6 },
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

    // Find min and max values for scaling
    const minValue = Math.min(...data.map((item) => item.value))
    const maxValue = Math.max(...data.map((item) => item.value))
    const valueRange = maxValue - minValue

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0" // slate-200
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
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
      const y = height - padding - ((item.value - minValue) / valueRange) * chartHeight

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
      const y = height - padding - ((item.value - minValue) / valueRange) * chartHeight
      ctx.lineTo(x, y)
    })

    // Complete the path to the bottom right
    ctx.lineTo(width - padding, height - padding)
    ctx.closePath()
    ctx.fill()

    // Draw points
    data.forEach((item, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1)
      const y = height - padding - ((item.value - minValue) / valueRange) * chartHeight

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
          const pointY = height - padding - ((dataPoint.value - minValue) / valueRange) * chartHeight

          const distance = Math.sqrt(Math.pow(mouseX - pointX, 2) + Math.pow(mouseY - pointY, 2))

          if (distance < 15) {
            showTooltip()
            moveTooltip(e.clientX, e.clientY)

            if (tooltipRef.current) {
              tooltipRef.current.innerHTML = `
                <div class="font-medium">${dataPoint.date}</div>
                <div>Comfort: ${dataPoint.value.toFixed(1)}/5</div>
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
    const labelStep = data.length > 10 ? Math.ceil(data.length / 5) : 1

    data.forEach((item, index) => {
      if (index % labelStep === 0 || index === data.length - 1) {
        const x = padding + (index * chartWidth) / (data.length - 1)
        ctx.fillText(item.date, x, height - padding + 15)
      }
    })

    // Draw y-axis labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight * (5 - i)) / 5
      const value = minValue + (valueRange * i) / 5
      ctx.fillText(value.toFixed(1), padding - 10, y + 5)
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
