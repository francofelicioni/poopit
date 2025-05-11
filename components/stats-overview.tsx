"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/charts"

export function StatsOverview() {
  // In a real app, this would be fetched from a database
  const weeklyData = [
    { name: "Mon", value: 1 },
    { name: "Tue", value: 2 },
    { name: "Wed", value: 1 },
    { name: "Thu", value: 0 },
    { name: "Fri", value: 1 },
    { name: "Sat", value: 1 },
    { name: "Sun", value: 2 },
  ]

  const consistencyData = [
    { name: "Hard", value: 3 },
    { name: "Normal", value: 12 },
    { name: "Loose", value: 2 },
  ]

  const colorData = [
    { name: "Light Brown", value: 5 },
    { name: "Brown", value: 8 },
    { name: "Dark Brown", value: 3 },
    { name: "Other", value: 1 },
  ]

  return (
    <div className="space-y-4">
      <Tabs defaultValue="frequency">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="frequency">Frequency</TabsTrigger>
          <TabsTrigger value="consistency">Consistency</TabsTrigger>
          <TabsTrigger value="color">Color</TabsTrigger>
        </TabsList>

        <TabsContent value="frequency" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 text-center font-medium">Weekly Frequency</h3>
              <div className="h-[200px] w-full">
                <BarChart data={weeklyData} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-sky-100 p-3 text-center">
                  <p className="text-sm text-muted-foreground">Daily Average</p>
                  <p className="text-2xl font-bold text-primary-600">1.1</p>
                </div>
                <div className="rounded-lg bg-sky-100 p-3 text-center">
                  <p className="text-sm text-muted-foreground">Weekly Total</p>
                  <p className="text-2xl font-bold text-primary-600">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consistency" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 text-center font-medium">Consistency Distribution</h3>
              <div className="h-[200px] w-full">
                <BarChart data={consistencyData} />
              </div>
              <div className="mt-4 rounded-lg bg-sky-100 p-3">
                <p className="text-sm text-muted-foreground">Most Common</p>
                <p className="text-xl font-bold text-primary-600">Normal (70%)</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your consistency is mostly normal, which is a good sign of healthy digestion.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="color" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 text-center font-medium">Color Distribution</h3>
              <div className="h-[200px] w-full">
                <BarChart data={colorData} />
              </div>
              <div className="mt-4 rounded-lg bg-sky-100 p-3">
                <p className="text-sm text-muted-foreground">Most Common</p>
                <p className="text-xl font-bold text-primary-600">Brown (47%)</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Brown is the most common and healthy color, indicating normal digestion.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-center font-medium">Comfort Level Trend</h3>
          <div className="h-[200px] w-full">
            <LineChart
              data={[
                { name: "Week 1", value: 2.5 },
                { name: "Week 2", value: 3.2 },
                { name: "Week 3", value: 3.8 },
                { name: "Week 4", value: 3.5 },
              ]}
            />
          </div>
          <div className="mt-4 rounded-lg bg-sky-100 p-3">
            <p className="text-sm text-muted-foreground">Insight</p>
            <p className="text-xl font-bold text-primary-600">Improving Trend</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Your comfort level has improved by 40% over the last month, possibly due to dietary changes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
