import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock } from "lucide-react"
import { EmojiIcon } from "@/components/ui/emoji-icon"

export function RecentLogs() {
  // In a real app, this would be fetched from a database
  const logs = [
    {
      id: 1,
      date: "Today",
      time: "9:30 AM",
      consistency: "Normal",
      color: "Brown",
      comfort: 4,
      emoji: "🥖",
    },
    {
      id: 2,
      date: "Yesterday",
      time: "8:15 AM",
      consistency: "Hard",
      color: "Dark Brown",
      comfort: 2,
      emoji: "💎",
    },
    {
      id: 3,
      date: "May 6",
      time: "10:45 AM",
      consistency: "Normal",
      color: "Brown",
      comfort: 3,
      emoji: "🥖",
    },
  ]

  // Map consistency to emoji
  const getConsistencyEmoji = (consistency: string) => {
    switch (consistency.toLowerCase()) {
      case "hard":
        return "💎"
      case "normal":
        return "🥖"
      case "loose":
        return "💧"
      default:
        return "💩"
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Recent Logs</h3>
      {logs.map((log) => (
        <Card key={log.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center border-l-4 border-primary-600 bg-white p-3">
              <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-100">
                <EmojiIcon emoji={log.emoji} label={log.consistency.toLowerCase()} size="md" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    {log.consistency} • {log.color}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {log.date}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Comfort:{" "}
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <span key={i} className={i < log.comfort ? "text-yellow-500" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {log.time}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
