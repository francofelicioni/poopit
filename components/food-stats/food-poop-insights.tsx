import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmojiIcon } from "@/components/ui/emoji-icon"

export function FoodPoopInsights() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <EmojiIcon emoji="💡" label="insights" size="md" withBackground />
          <CardTitle>Quick Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <p className="text-sm">
              <span className="font-medium">Spicy foods</span> tend to result in looser stools within 24 hours
            </p>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <p className="text-sm">
              <span className="font-medium">Coffee</span> typically triggers bathroom visits within 30-60 minutes
            </p>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <p className="text-sm">
              <span className="font-medium">Dairy products</span> may be causing discomfort and harder stools
            </p>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <p className="text-sm">
              <span className="font-medium">High-fiber foods</span> are associated with your most comfortable visits
            </p>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <p className="text-sm">
              <span className="font-medium">Morning visits</span> (6-9 AM) tend to be more regular and comfortable
            </p>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
