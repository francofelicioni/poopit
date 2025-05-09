"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { useTooltip } from "@/hooks/use-tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FrequencyCalendar() {
  const [month, setMonth] = useState("May")
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip(tooltipRef)

  // Generate calendar data for the selected month
  // In a real app, this would come from the database
  const generateCalendarData = () => {
    const days = month === "May" ? 31 : 30 // Simplified
    const data = []

    for (let i = 1; i <= days; i++) {
      // Random data for demonstration
      const count = Math.floor(Math.random() * 3) // 0-2 visits per day
      const consistency = ["normal", "hard", "loose"][Math.floor(Math.random() * 3)]
      const color = ["brown", "light-brown", "dark-brown"][Math.floor(Math.random() * 3)]

      data.push({
        day: i,
        count,
        consistency: count > 0 ? consistency : null,
        color: count > 0 ? color : null,
      })
    }

    return data
  }

  const calendarData = generateCalendarData()

  // Get emoji for consistency
  const getConsistencyEmoji = (consistency: string | null) => {
    if (!consistency) return ""
    switch (consistency) {
      case "normal":
        return "🥖"
      case "hard":
        return "💎"
      case "loose":
        return "💧"
      default:
        return "💩"
    }
  }

  // Get color class based on count
  const getColorClass = (count: number) => {
    switch (count) {
      case 0:
        return "bg-gray-100"
      case 1:
        return "bg-sky-200"
      case 2:
        return "bg-sky-400"
      default:
        return "bg-sky-600"
    }
  }

  // Handle day hover
  const handleDayHover = (e: React.MouseEvent, day: any) => {
    if (day.count === 0) {
      hideTooltip()
      return
    }

    showTooltip()
    moveTooltip(e.clientX, e.clientY)

    if (tooltipRef.current) {
      tooltipRef.current.innerHTML = `
        <div class="font-medium">${month} ${day.day}</div>
        <div class="flex items-center gap-1 mt-1">
          <span>Visits: ${day.count}</span>
        </div>
        ${
          day.consistency
            ? `<div class="flex items-center gap-1 mt-1">
                <span>${getConsistencyEmoji(day.consistency)}</span>
                <span>Consistency: ${day.consistency}</span>
              </div>`
            : ""
        }
        ${
          day.color
            ? `<div class="flex items-center gap-1 mt-1">
                <span>Color: ${day.color}</span>
              </div>`
            : ""
        }
      `
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Monthly Frequency Calendar</h3>
          <div className="flex items-center gap-2">
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="June">June</SelectItem>
                <SelectItem value="July">July</SelectItem>
                <SelectItem value="August">August</SelectItem>
                <SelectItem value="September">September</SelectItem>
                <SelectItem value="October">October</SelectItem>
                <SelectItem value="November">November</SelectItem>
                <SelectItem value="December">December</SelectItem>
              </SelectContent>
            </Select>
            <EmojiIcon emoji="📅" label="calendar" size="md" />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Add empty cells for the first day of the month */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square rounded-md bg-gray-50"></div>
          ))}

          {/* Calendar days */}
          {calendarData.map((day) => (
            <div
              key={day.day}
              className={`aspect-square rounded-md ${getColorClass(
                day.count,
              )} flex flex-col items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all`}
              onMouseEnter={(e) => handleDayHover(e, day)}
              onMouseLeave={() => hideTooltip()}
            >
              <span className="text-xs font-medium">{day.day}</span>
              {day.count > 0 && <span className="text-xs mt-1">{getConsistencyEmoji(day.consistency)}</span>}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-100"></div>
            <span className="text-xs text-muted-foreground">No visits</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-sky-200"></div>
            <span className="text-xs text-muted-foreground">1 visit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-sky-400"></div>
            <span className="text-xs text-muted-foreground">2 visits</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-sky-600"></div>
            <span className="text-xs text-muted-foreground">3+ visits</span>
          </div>
        </div>

        <div
          ref={tooltipRef}
          className="absolute hidden rounded-md bg-white p-2 text-sm shadow-md"
          style={{ pointerEvents: "none" }}
        ></div>
      </CardContent>
    </Card>
  )
}
