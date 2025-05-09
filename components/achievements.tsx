import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, Clock, Zap } from "lucide-react"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { PoopMascot } from "@/components/mascot/poop-mascot"

export function Achievements() {
  // In a real app, this would be fetched from a database
  const achievements = [
    {
      id: 1,
      title: "Regular Routine",
      description: "Maintained a consistent schedule for 5 days in a row",
      icon: <Calendar className="h-5 w-5" />,
      emoji: "🗓️",
      unlocked: true,
      date: "May 5, 2025",
    },
    {
      id: 2,
      title: "Fiber Friend",
      description: "Logged 10 visits with normal consistency",
      icon: <Zap className="h-5 w-5" />,
      emoji: "🥦",
      unlocked: true,
      date: "April 28, 2025",
    },
    {
      id: 3,
      title: "Tracking Pro",
      description: "Logged bathroom visits for 30 consecutive days",
      icon: <Award className="h-5 w-5" />,
      emoji: "📊",
      unlocked: false,
    },
    {
      id: 4,
      title: "Speed Demon",
      description: "Completed a visit in under 2 minutes",
      icon: <Clock className="h-5 w-5" />,
      emoji: "⚡",
      unlocked: false,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-center mb-2">
        <PoopMascot mood="proud" size="md" message="Collect them all!" />
      </div>

      {achievements.map((achievement) => (
        <Card key={achievement.id} className={`overflow-hidden ${!achievement.unlocked ? "opacity-60" : ""}`}>
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <div
                className={`mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                  achievement.unlocked ? "bg-sky-100 text-primary-600" : "bg-gray-100 text-gray-400"
                }`}
              >
                <EmojiIcon emoji={achievement.emoji} label={achievement.title} size="lg" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{achievement.title}</h3>
                  {achievement.unlocked ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Unlocked
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-500">
                      Locked
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && (
                  <p className="mt-1 text-xs text-muted-foreground">Achieved on {achievement.date}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
