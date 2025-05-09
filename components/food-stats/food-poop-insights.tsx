"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { LightbulbIcon, AlertTriangle } from "lucide-react"

export function FoodPoopInsights() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <EmojiIcon emoji="💡" label="insights" size="md" withBackground />
          <CardTitle>Food Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg bg-sky-50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <LightbulbIcon className="h-4 w-4 text-amber-500" />
              <p className="font-medium">Coffee Effect</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Coffee appears to trigger bathroom visits within 30-60 minutes of consumption for you.
            </p>
          </div>

          <div className="rounded-lg bg-sky-50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="font-medium">Spicy Food Warning</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Spicy foods consistently lead to loose stools and lower comfort ratings the following day.
            </p>
          </div>

          <div className="rounded-lg bg-sky-50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <LightbulbIcon className="h-4 w-4 text-amber-500" />
              <p className="font-medium">Dairy Sensitivity</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Dairy consumption appears to correlate with harder stools and moderate discomfort.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <EmojiIcon emoji="✅" label="good" size="sm" />
              <p className="font-medium">Fiber Benefits</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Days with higher fiber intake show improved consistency and comfort levels.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
