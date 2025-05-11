"use client"

import type React from "react"

import { useState } from "react"
import { format, isSameDay, isSameMonth, isToday, parseISO } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityLogDetails } from "@/components/calendar/activity-log-details"
import { ActivityLogSummary } from "@/components/calendar/activity-log-summary"
import { mockActivityLogs } from "@/data/mock-activity-logs"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { useMediaQuery } from "@/hooks/use-media-query"

// Helper function to safely parse dates
const safeParseDate = (dateString: string): Date | null => {
  try {
    const date = parseISO(dateString)
    return !isNaN(date.getTime()) ? date : null
  } catch {
    return null
  }
}

// Helper function to safely check if two dates are the same day
const safeIsSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false
  try {
    return isSameDay(date1, date2)
  } catch {
    return false
  }
}

// Helper function to safely check if two dates are in the same month
const safeIsSameMonth = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false
  try {
    return isSameMonth(date1, date2)
  } catch {
    return false
  }
}

// Helper function to safely format dates
const safeFormat = (date: Date, formatString: string): string => {
  try {
    return format(date, formatString)
  } catch {
    return "Invalid date"
  }
}

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date>(new Date())
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Pre-process logs to include parsed dates
  const processedLogs = mockActivityLogs
    .map((log) => ({
      ...log,
      parsedDate: safeParseDate(log.date),
    }))
    .filter((log) => log.parsedDate !== null)

  // Filter logs for the selected date
  const selectedDateLogs = date
    ? processedLogs.filter((log) => log.parsedDate && safeIsSameDay(log.parsedDate, date))
    : []

  // Get all dates with logs for the current month
  const datesWithLogs = processedLogs
    .filter((log) => log.parsedDate && safeIsSameMonth(log.parsedDate, month))
    .map((log) => log.parsedDate)
    .filter((date): date is Date => date !== null)

  const renderDay = (day: Date, selectedDay: Date | undefined, dayProps: React.HTMLAttributes<HTMLDivElement>) => {
    const safeDay = day instanceof Date ? day : new Date(day)
    if (!day || isNaN(safeDay.getTime())) {
      return <div {...dayProps}>Invalid</div>
    }

    try {
      // Check if this day has logs
      const hasLogs = datesWithLogs.some(
        (logDate) => logDate && !isNaN(logDate.getTime()) && safeIsSameDay(logDate, day),
      )

      // Count logs
      const dayLogsCount = processedLogs.filter((log) => log.parsedDate && safeIsSameDay(log.parsedDate, day)).length

      // Get the emoji for this day's log (just use the first log if multiple)
      let emoji = "💩"
      const dayLog = processedLogs.find((log) => log.parsedDate && safeIsSameDay(log.parsedDate, day))
      if (dayLog) {
        emoji = dayLog.emoji || "💩"
      }

      const isCurrentMonth = month && safeIsSameMonth(day, month)
      const isTodayDate = isToday(day)

      return (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div
                {...dayProps}
                className={cn(
                  dayProps.className,
                  "relative",
                  hasLogs && "font-medium",
                  isTodayDate && "bg-primary/10 text-primary",
                  !isCurrentMonth && "text-muted-foreground opacity-50",
                )}
              >
                {safeFormat(day, "d")}
                {hasLogs && (
                  <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 transform justify-center">
                    <div className="flex items-center space-x-0.5">
                      {dayLogsCount > 0 && <span className="text-[0.6rem]">{emoji}</span>}
                    </div>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            {hasLogs && (
              <TooltipContent side="bottom" align="center" className="p-0 overflow-hidden">
                <div className="bg-popover px-3 py-1.5 text-sm">
                  <p className="font-medium">{safeFormat(day, "MMMM d, yyyy")}</p>
                  <p className="text-xs text-muted-foreground">
                    {dayLogsCount} {dayLogsCount === 1 ? "visit" : "visits"} logged
                  </p>
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      )
    } catch (error) {
      // Fallback rendering if there's an error
      return <div {...dayProps}>{safeFormat(day, "d")}</div>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Bathroom Activity</CardTitle>
              <CardDescription>Select a date to view your logs</CardDescription>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <EmojiIcon emoji="📅" label="calendar" size="xs" />
              <span>{month ? safeFormat(month, "MMMM yyyy") : "Current Month"}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              onMonthChange={setMonth}
              month={month}
              className="rounded-md border"
              components={{
                Day: ({ day, selected, ...props }) => renderDay(day, selected, props),
              }}
              showOutsideDays={true}
              fixedWeeks={true}
              disabled={[
                { after: new Date() }, // Disable future dates
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {date && (
        <Card className="animate-fade-in">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span>{safeFormat(date, "MMMM d, yyyy")}</span>
                {isToday(date) && (
                  <Badge variant="secondary" className="ml-2">
                    Today
                  </Badge>
                )}
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    try {
                      const newDate = new Date(date)
                      newDate.setDate(date.getDate() - 1)
                      if (!isNaN(newDate.getTime())) {
                        setDate(newDate)
                      }
                    } catch (error) {
                      console.error("Error navigating to previous day:", error)
                    }
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    try {
                      const newDate = new Date(date)
                      newDate.setDate(date.getDate() + 1)
                      if (!isNaN(newDate.getTime()) && newDate <= new Date()) {
                        setDate(newDate)
                      }
                    } catch (error) {
                      console.error("Error navigating to next day:", error)
                    }
                  }}
                  disabled={isToday(date)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedDateLogs.length > 0 ? (
              <div className="space-y-4">
                <ActivityLogSummary logs={selectedDateLogs} />

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-3">Detailed Logs</h3>
                  <div className="space-y-4">
                    {selectedDateLogs.map((log) => (
                      <ActivityLogDetails key={log.id} log={log} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <EmojiIcon emoji="🔍" label="search" size="lg" />
                <h3 className="mt-4 text-lg font-medium">No logs for this date</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You haven't recorded any bathroom visits on this day.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
