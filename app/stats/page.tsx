import { StatsHeader } from "@/components/stats/stats-header"
import { StatsOverview } from "@/components/stats/stats-overview"
import { ColorAnalysis } from "@/components/stats/color-analysis"
import { TextureAnalysis } from "@/components/stats/texture-analysis"
import { FrequencyCalendar } from "@/components/stats/frequency-calendar"
import { TimeOfDayAnalysis } from "@/components/stats/time-of-day-analysis"
import { FoodCorrelations } from "@/components/stats/food-correlations"
import { PoopMascot } from "@/components/mascot/poop-mascot"

export default function StatsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sky-50">
      <StatsHeader />

      <main className="container mx-auto flex-1 px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary-700">Poop Analytics Dashboard</h1>
            <p className="text-muted-foreground">Visualizing your bathroom habits with detailed insights</p>
          </div>
          <PoopMascot mood="happy" size="md" message="Your poop data looks great!" />
        </div>

        {/* Summary Stats Cards */}
        <StatsOverview />

        {/* Color Analysis */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-primary-700">Color Analysis</h2>
          <ColorAnalysis />
        </div>

        {/* Texture Analysis */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-primary-700">Texture Analysis</h2>
          <TextureAnalysis />
        </div>

        {/* Frequency Calendar */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-primary-700">Frequency Calendar</h2>
          <FrequencyCalendar />
        </div>

        {/* Time of Day Analysis */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-primary-700">Time of Day Patterns</h2>
          <TimeOfDayAnalysis />
        </div>

        {/* Food Correlations */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-primary-700">Food Correlations</h2>
          <FoodCorrelations />
        </div>
      </main>
    </div>
  )
}
