import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LightbulbIcon } from "lucide-react"
import { EmojiIcon } from "@/components/ui/emoji-icon"

export function HumorousInsights() {
  const insights = [
    {
      text: "You've spent approximately 14.2 hours on the toilet this month. That's enough time to watch 7 episodes of your favorite show!",
      emoji: "📺",
    },
    {
      text: "Your most productive day is Wednesday. Hump day indeed!",
      emoji: "🐪",
    },
    {
      text: "Based on your data, if you were a superhero, your power would be 'Predictable Pooping'",
      emoji: "🦸‍♂️",
    },
    {
      text: "You're 32% more regular than the average PoopIt user. Congratulations on your superior digestive system!",
      emoji: "🏆",
    },
    {
      text: "At your current rate, you'll flush approximately 2,190 times this year. That's a lot of water!",
      emoji: "💧",
    },
  ]

  const randomInsight = insights[Math.floor(Math.random() * insights.length)]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <LightbulbIcon className="h-5 w-5 text-yellow-500" />
          Fun Fact
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-start gap-3">
        <EmojiIcon emoji={randomInsight.emoji} label="fun fact" size="lg" withBackground />
        <p className="text-sm">{randomInsight.text}</p>
      </CardContent>
    </Card>
  )
}
