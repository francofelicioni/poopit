import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ActivityLogSummaryProps {
  logs: Array<{
    id: number
    date: string
    parsedDate?: Date | null
    time: string
    consistency: string
    color: string
    comfort: number
    duration: number
    notes?: string
    foods?: string[]
    emoji: string
  }>
}

export function ActivityLogSummary({ logs }: ActivityLogSummaryProps) {
  // Calculate averages
  const totalLogs = logs.length
  const avgComfort = logs.reduce((sum, log) => sum + log.comfort, 0) / totalLogs
  const avgDuration = logs.reduce((sum, log) => sum + log.duration, 0) / totalLogs

  // Count consistencies
  const consistencies = logs.reduce(
    (acc, log) => {
      acc[log.consistency] = (acc[log.consistency] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Get most common consistency
  const mostCommonConsistency = Object.entries(consistencies).sort((a, b) => b[1] - a[1])[0]?.[0] || "Unknown"

  // Get all foods
  const allFoods = logs.flatMap((log) => log.foods || [])
  const uniqueFoods = [...new Set(allFoods)]

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium mb-2">Summary</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total Visits:</span>
                <span className="text-xs font-medium">{totalLogs}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Avg Comfort:</span>
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "text-xs",
                          i < Math.round(avgComfort) ? "text-yellow-500" : "text-muted-foreground opacity-30",
                        )}
                      >
                        ★
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Avg Duration:</span>
                <span className="text-xs font-medium">{Math.round(avgDuration)} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Most Common:</span>
                <Badge variant="outline" className="text-xs capitalize">
                  {mostCommonConsistency}
                </Badge>
              </div>
            </div>
          </div>

          {uniqueFoods.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Foods Consumed</h3>
              <div className="flex flex-wrap gap-1">
                {uniqueFoods.map((food, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-secondary/50">
                    {food}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
