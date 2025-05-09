"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter, Download, Calendar } from "lucide-react"
import { FoodPoopTimeline } from "@/components/food-stats/food-poop-timeline"
import { FoodPoopFilters } from "@/components/food-stats/food-poop-filters"
import { FoodPoopInsights } from "@/components/food-stats/food-poop-insights"
import { FoodPoopPatterns } from "@/components/food-stats/food-poop-patterns"
import { PoopMascot } from "@/components/mascot/poop-mascot"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { AppHeader } from "@/components/layout/app-header"
import { AppContainer } from "@/components/layout/app-container"
import { AppFooter } from "@/components/layout/app-footer"
import { SectionHeader } from "@/components/layout/section-header"

export default function FoodStatsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -14),
    to: new Date(),
  })
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    foodTypes: [] as string[],
    consistency: [] as string[],
    color: [] as string[],
    comfort: [] as number[],
  })

  const toggleFilter = (category: keyof typeof activeFilters, value: string | number) => {
    setActiveFilters((prev) => {
      const currentFilters = [...prev[category]]
      const index = currentFilters.indexOf(value as never)

      if (index >= 0) {
        currentFilters.splice(index, 1)
      } else {
        currentFilters.push(value as never)
      }

      return {
        ...prev,
        [category]: currentFilters,
      }
    })
  }

  const clearFilters = () => {
    setActiveFilters({
      foodTypes: [],
      consistency: [],
      color: [],
      comfort: [],
    })
  }

  const headerActions = (
    <>
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

      <Button variant={showFilters ? "default" : "outline"} size="icon" onClick={() => setShowFilters(!showFilters)}>
        <Filter className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" className="hidden sm:flex">
        <Download className="h-4 w-4" />
      </Button>
    </>
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader title="Food & Poop Stats" showBackButton>
        {headerActions}
      </AppHeader>

      <main className="flex-1">
        <AppContainer>
          <SectionHeader
            title="Food & Poop Correlation"
            description="Discover how your diet affects your digestive health"
          >
            <PoopMascot mood="happy" size="md" message="Let's see what's cooking... and pooping!" />
          </SectionHeader>

          {showFilters && (
            <FoodPoopFilters activeFilters={activeFilters} toggleFilter={toggleFilter} clearFilters={clearFilters} />
          )}

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <FoodPoopTimeline dateRange={date} filters={activeFilters} />
            </div>
            <div className="space-y-6">
              <FoodPoopInsights />
              <FoodPoopPatterns />
            </div>
          </div>
        </AppContainer>
      </main>

      <AppFooter />
    </div>
  )
}
