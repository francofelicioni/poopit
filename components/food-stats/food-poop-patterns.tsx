"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { Badge } from "@/components/ui/badge"

export function FoodPoopPatterns() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <EmojiIcon emoji="🔍" label="patterns" size="md" withBackground />
          <CardTitle>Detected Patterns</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="☕" label="coffee" size="sm" />
              <span className="font-medium">Coffee</span>
            </div>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              High Impact
            </Badge>
          </div>
          <div className="pl-6 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Response Time:</span>
              <span className="font-medium">30-60 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Consistency Effect:</span>
              <span className="font-medium">Looser</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Comfort Impact:</span>
              <span className="font-medium">Moderate</span>
            </div>
          </div>

          <div className="border-t pt-4"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="🌶️" label="spicy" size="sm" />
              <span className="font-medium">Spicy Food</span>
            </div>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              High Impact
            </Badge>
          </div>
          <div className="pl-6 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Response Time:</span>
              <span className="font-medium">12-24 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Consistency Effect:</span>
              <span className="font-medium">Much Looser</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Comfort Impact:</span>
              <span className="font-medium">Significant</span>
            </div>
          </div>

          <div className="border-t pt-4"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="🥛" label="dairy" size="sm" />
              <span className="font-medium">Dairy</span>
            </div>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Medium Impact
            </Badge>
          </div>
          <div className="pl-6 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Response Time:</span>
              <span className="font-medium">6-12 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Consistency Effect:</span>
              <span className="font-medium">Harder</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Comfort Impact:</span>
              <span className="font-medium">Moderate</span>
            </div>
          </div>

          <div className="border-t pt-4"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="🥦" label="fiber" size="sm" />
              <span className="font-medium">Fiber</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Positive Impact
            </Badge>
          </div>
          <div className="pl-6 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Response Time:</span>
              <span className="font-medium">24-48 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Consistency Effect:</span>
              <span className="font-medium">More Normal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Comfort Impact:</span>
              <span className="font-medium">Improved</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
