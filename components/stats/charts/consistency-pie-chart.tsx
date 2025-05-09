"use client"

import { useEffect, useRef } from "react"
import { useTooltip } from "@/hooks/use-tooltip"

export function ConsistencyPieChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip(tooltipRef)

  const data = [
    { label: "Normal", value: 68, color: "#38bdf8" }, // sky-400
    { label: "Hard", value: 18, color: "#14b8a6" }, // teal-500
    { label: "Loose", value: 14, color: "#facc15" }, // yellow-400
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
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 40

    // Calculate total value
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw pie chart
    let startAngle = -Math.PI / 2 // Start from top

    data.forEach((item, index) => {
      const sliceAngle = (2 * Math.PI * item.value) / total
      const endAngle = startAngle + sliceAngle

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      // Draw slice border
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Calculate position for label
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + labelRadius * Math.cos(midAngle)
      const labelY = centerY + labelRadius * Math.sin(midAngle)

      // Draw label
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${item.value}%`, labelX, labelY)

      startAngle = endAngle
    })

    // Add hover detection
    canvas.onmousemove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Calculate distance from center
      const dx = mouseX - centerX
      const dy = mouseY - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Check if mouse is within the pie
      if (distance <= radius) {
        // Calculate angle
        let angle = Math.atan2(dy, dx)
        if (angle < -Math.PI / 2) angle += 2 * Math.PI // Adjust angle to match our starting point

        // Find which slice the angle corresponds to
        let startAngle = -Math.PI / 2

        for (let i = 0; i < data.length; i++) {
          const sliceAngle = (2 * Math.PI * data[i].value) / total
          const endAngle = startAngle + sliceAngle

          if (angle >= startAngle && angle < endAngle) {
            showTooltip()
            moveTooltip(e.clientX, e.clientY)

            if (tooltipRef.current) {
              tooltipRef.current.innerHTML = `
                <div class="font-medium">${data[i].label}</div>
                <div>${data[i].value}% of visits</div>
              `
            }

            // Highlight the slice by drawing it slightly larger
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Redraw all slices
            let currentStartAngle = -Math.PI / 2

            data.forEach((item, index) => {
              const currentSliceAngle = (2 * Math.PI * item.value) / total
              const currentEndAngle = currentStartAngle + currentSliceAngle

              ctx.beginPath()
              ctx.moveTo(centerX, centerY)

              // If this is the hovered slice, make it larger
              const sliceRadius = index === i ? radius + 10 : radius

              ctx.arc(centerX, centerY, sliceRadius, currentStartAngle, currentEndAngle)
              ctx.closePath()

              ctx.fillStyle = item.color
              ctx.fill()

              ctx.strokeStyle = "#ffffff"
              ctx.lineWidth = 2
              ctx.stroke()

              // Redraw label
              const midAngle = currentStartAngle + currentSliceAngle / 2
              const labelRadius = sliceRadius * 0.7
              const labelX = centerX + labelRadius * Math.cos(midAngle)
              const labelY = centerY + labelRadius * Math.sin(midAngle)

              ctx.fillStyle = "#ffffff"
              ctx.font = "bold 14px sans-serif"
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
              ctx.fillText(`${item.value}%`, labelX, labelY)

              currentStartAngle = currentEndAngle
            })

            break
          }

          startAngle = endAngle
        }
      } else {
        hideTooltip()
      }
    }

    canvas.onmouseleave = () => {
      hideTooltip()
    }
  }, [data, showTooltip, hideTooltip, moveTooltip])

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={400} height={250} className="w-full h-full" />
      <div
        ref={tooltipRef}
        className="absolute hidden rounded-md bg-white p-2 text-sm shadow-md"
        style={{ pointerEvents: "none" }}
      ></div>
    </div>
  )
}
