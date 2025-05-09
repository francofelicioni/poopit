"use client"

import { useEffect, useRef } from "react"

interface ChartData {
  name: string
  value: number
}

export function BarChart({ data }: { data: ChartData[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    const barWidth = (width - padding * 2) / data.length - 10

    // Find max value for scaling
    const maxValue = Math.max(...data.map((item) => item.value), 1)

    // Draw bars
    data.forEach((item, index) => {
      const x = padding + index * (barWidth + 10)
      const barHeight = ((height - padding * 2) * item.value) / maxValue
      const y = height - padding - barHeight

      // Draw bar
      ctx.fillStyle = "#92400e" // brown-600
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw label
      ctx.fillStyle = "#525252" // text color
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.name, x + barWidth / 2, height - padding / 2)

      // Draw value
      ctx.fillStyle = "#525252"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5)
    })
  }, [data])

  return <canvas ref={canvasRef} width={400} height={200} className="w-full h-full" />
}

export function LineChart({ data }: { data: ChartData[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Find max value for scaling
    const maxValue = Math.max(...data.map((item) => item.value), 5)

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = "#92400e" // brown-600
    ctx.lineWidth = 2

    data.forEach((item, index) => {
      const x = padding + index * ((width - padding * 2) / (data.length - 1))
      const y = height - padding - ((height - padding * 2) * item.value) / maxValue

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Draw point
      ctx.fillStyle = "#92400e"
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()

      // Draw label
      ctx.fillStyle = "#525252"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.name, x, height - padding / 2)

      // Draw value
      ctx.fillStyle = "#525252"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.value.toString(), x, y - 10)
    })

    ctx.stroke()
  }, [data])

  return <canvas ref={canvasRef} width={400} height={200} className="w-full h-full" />
}
