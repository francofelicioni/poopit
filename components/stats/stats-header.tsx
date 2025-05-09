"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Download, Share2, Filter } from "lucide-react"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { ThemeToggle } from "@/components/theme-toggle"

export function StatsHeader() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  return (
    <header className="sticky top-0 z-10 border-b bg-sky-100 px-4 py-3">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <EmojiIcon emoji="📊" label="chart" size="lg" />
            <h1 className="text-xl font-bold text-primary-600">Poop Analytics</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    "Select date range"
                  )}
                </span>
                <span className="sm:hidden">Date Range</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <DatePickerWithRange date={date} setDate={setDate} />
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>

          <ThemeToggle />

          <div className="hidden sm:flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
