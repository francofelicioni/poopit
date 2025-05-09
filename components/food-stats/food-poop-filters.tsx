"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface FoodPoopFiltersProps {
  activeFilters: {
    foodTypes: string[]
    consistency: string[]
    color: string[]
    comfort: number[]
  }
  toggleFilter: (category: keyof typeof activeFilters, value: string | number) => void
  clearFilters: () => void
}

export function FoodPoopFilters({ activeFilters, toggleFilter, clearFilters }: FoodPoopFiltersProps) {
  const foodTypes = [
    { name: "Coffee", emoji: "☕" },
    { name: "Spicy Food", emoji: "🌶️" },
    { name: "Dairy", emoji: "🥛" },
    { name: "Fast Food", emoji: "🍔" },
    { name: "Alcohol", emoji: "🍺" },
    { name: "Fiber", emoji: "🥦" },
  ]

  const consistencyTypes = [
    { name: "Hard", emoji: "💎" },
    { name: "Normal", emoji: "🥖" },
    { name: "Loose", emoji: "💧" },
  ]

  const colorTypes = [
    { name: "light-brown", label: "Light Brown", color: "#D2B48C" },
    { name: "brown", label: "Brown", color: "#8B4513" },
    { name: "dark-brown", label: "Dark Brown", color: "#5D4037" },
    { name: "green", label: "Green", color: "#4CAF50" },
    { name: "red", label: "Red", color: "#F44336" },
  ]

  const comfortLevels = [1, 2, 3, 4, 5]

  const hasActiveFilters = Object.values(activeFilters).some((filters) => filters.length > 0)

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Filter Results</h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8">
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Food Types</h4>
            <div className="flex flex-wrap gap-2">
              {foodTypes.map((food) => (
                <Button
                  key={food.name}
                  variant={activeFilters.foodTypes.includes(food.name) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter("foodTypes", food.name)}
                  className="h-8"
                >
                  <span className="mr-1">{food.emoji}</span>
                  {food.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Consistency</h4>
            <div className="flex flex-wrap gap-2">
              {consistencyTypes.map((type) => (
                <Button
                  key={type.name.toLowerCase()}
                  variant={activeFilters.consistency.includes(type.name.toLowerCase()) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter("consistency", type.name.toLowerCase())}
                  className="h-8"
                >
                  <span className="mr-1">{type.emoji}</span>
                  {type.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Color</h4>
            <div className="flex flex-wrap gap-2">
              {colorTypes.map((color) => (
                <Button
                  key={color.name}
                  variant={activeFilters.color.includes(color.name) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter("color", color.name)}
                  className="h-8"
                >
                  <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: color.color }}></div>
                  {color.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Comfort Level</h4>
            <div className="flex flex-wrap gap-2">
              {comfortLevels.map((level) => (
                <Button
                  key={`comfort-${level}`}
                  variant={activeFilters.comfort.includes(level) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter("comfort", level)}
                  className="h-8"
                >
                  {level} {level === 1 ? "Star" : "Stars"}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {activeFilters.foodTypes.map((food) => (
                <Badge key={`active-${food}`} variant="secondary" className="flex items-center gap-1">
                  {foodTypes.find((f) => f.name === food)?.emoji}
                  {food}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFilter("foodTypes", food)}
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}

              {activeFilters.consistency.map((type) => (
                <Badge key={`active-${type}`} variant="secondary" className="flex items-center gap-1">
                  {consistencyTypes.find((t) => t.name.toLowerCase() === type)?.emoji}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFilter("consistency", type)}
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}

              {activeFilters.color.map((color) => (
                <Badge key={`active-${color}`} variant="secondary" className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: colorTypes.find((c) => c.name === color)?.color }}
                  ></div>
                  {colorTypes.find((c) => c.name === color)?.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFilter("color", color)}
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}

              {activeFilters.comfort.map((level) => (
                <Badge key={`active-comfort-${level}`} variant="secondary" className="flex items-center gap-1">
                  {level} {level === 1 ? "Star" : "Stars"}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFilter("comfort", level)}
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
