"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

interface FoodItemSelectorProps {
  onSelectFood: (food: { id: string; emoji?: string; label: string }) => void
}

export function FoodItemSelector({ onSelectFood }: FoodItemSelectorProps) {
  const commonFoods = [
    { id: "pizza", emoji: "🍕", label: "Pizza" },
    { id: "broccoli", emoji: "🥦", label: "Broccoli" },
    { id: "spicy", emoji: "🌶️", label: "Spicy" },
    { id: "soda", emoji: "🥤", label: "Soda" },
    { id: "bread", emoji: "🍞", label: "Bread" },
    { id: "cheese", emoji: "🧀", label: "Cheese" },
    { id: "coffee", emoji: "☕", label: "Coffee" },
    { id: "dairy", emoji: "🥛", label: "Dairy" },
    { id: "fastfood", emoji: "🍔", label: "Fast Food" },
    { id: "alcohol", emoji: "🍺", label: "Alcohol" },
    { id: "fruit", emoji: "🍎", label: "Fruit" },
    { id: "salad", emoji: "🥗", label: "Salad" },
    { id: "eggs", emoji: "🥚", label: "Eggs" },
    { id: "chicken", emoji: "🍗", label: "Chicken" },
    { id: "rice", emoji: "🍚", label: "Rice" },
    { id: "pasta", emoji: "🍝", label: "Pasta" },
    { id: "fish", emoji: "🐟", label: "Fish" },
    { id: "yogurt", emoji: "🥣", label: "Yogurt" },
    { id: "nuts", emoji: "🥜", label: "Nuts" },
    { id: "chocolate", emoji: "🍫", label: "Chocolate" },
    { id: "banana", emoji: "🍌", label: "Banana" },
    { id: "apple", emoji: "🍎", label: "Apple" },
    { id: "water", emoji: "💧", label: "Water" },
  ]

  return (
    <div className="rounded-md border">
      <p className="px-3 py-2 text-sm font-medium border-b">Common Foods</p>
      <ScrollArea className="h-[150px]">
        <div className="grid grid-cols-4 gap-1 p-2">
          {commonFoods.map((food) => (
            <button
              key={food.id}
              type="button"
              className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-primary/10 transition-colors"
              onClick={() => onSelectFood(food)}
            >
              <span className="text-xl mb-1">{food.emoji}</span>
              <span className="text-xs">{food.label}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
