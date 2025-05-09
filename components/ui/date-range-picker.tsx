"use client"

import type * as React from "react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

interface DatePickerWithRangeProps {
  date: DateRange | undefined
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  className?: string
}

export function DatePickerWithRange({ date, setDate, className }: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        className="rounded-md border"
      />
      <div className="flex gap-2 px-4 pb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            const today = new Date()
            setDate({
              from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
              to: today,
            })
          }}
        >
          Last 7 days
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            const today = new Date()
            setDate({
              from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30),
              to: today,
            })
          }}
        >
          Last 30 days
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            const today = new Date()
            setDate({
              from: new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()),
              to: today,
            })
          }}
        >
          Last 3 months
        </Button>
      </div>
    </div>
  )
}
