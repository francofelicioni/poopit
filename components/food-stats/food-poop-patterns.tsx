import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { Badge } from "@/components/ui/badge"

export function FoodPoopPatterns() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <EmojiIcon emoji="🔄" label="patterns" size="md" withBackground />
          <CardTitle>Common Patterns</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Foods to Watch</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                Spicy Food 🌶️
              </Badge>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                Dairy 🥛
              </Badge>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                Coffee ☕
              </Badge>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                Alcohol 🍺
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Beneficial Foods</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Fiber 🥦
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Yogurt 🥄
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Fruits 🍎
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Water 💧
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Time Patterns</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Morning (6-9 AM)</span>
                <Badge>Most Regular</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>After Meals</span>
                <Badge>Common Trigger</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Late Evening</span>
                <Badge>Least Common</Badge>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
