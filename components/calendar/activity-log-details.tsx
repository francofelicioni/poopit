import { Card, CardContent } from "@/components/ui/card"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { format, parseISO, isValid } from "date-fns"
import { Clock, CalendarDays, FileText, Utensils } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface ActivityLogDetailsProps {
  log: {
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
  }
}

export function ActivityLogDetails({ log }: ActivityLogDetailsProps) {
  // Safely format the date
  const formattedDate = (() => {
    try {
      // Use the pre-parsed date if available
      if (log.parsedDate && !isNaN(log.parsedDate.getTime())) {
        return format(log.parsedDate, "MMM d")
      }

      // Otherwise try to parse it
      const date = parseISO(log.date)
      return isValid(date) ? format(date, "MMM d") : "Invalid date"
    } catch {
      return "Invalid date"
    }
  })()

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex border-l-4 border-primary bg-card p-4">
          <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <EmojiIcon emoji={log.emoji} label={log.consistency.toLowerCase()} size="md" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{log.consistency}</h4>
                <Badge variant="outline" className="capitalize">
                  {log.color}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {log.time}
                </div>
                <div className="flex items-center">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  {formattedDate}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground mr-2">Comfort:</span>
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "text-xs",
                          i < log.comfort ? "text-yellow-500" : "text-muted-foreground opacity-30",
                        )}
                      >
                        ★
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-xs text-muted-foreground mr-2">Duration:</span>
                <span className="text-xs">{log.duration} min</span>
              </div>
            </div>

            {log.notes && (
              <div className="flex items-start gap-1 text-xs">
                <FileText className="h-3 w-3 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">{log.notes}</span>
              </div>
            )}

            {log.foods && log.foods.length > 0 && (
              <div className="flex flex-wrap items-center gap-1 mt-2">
                <Utensils className="h-3 w-3 text-muted-foreground" />
                <div className="flex flex-wrap gap-1">
                  {log.foods.map((food, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="text-xs bg-secondary/50 hover:bg-secondary">
                            {food}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Eaten 1-2 days before</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
