"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { FoodItemButton } from "./food-item-button"
import { FoodTag } from "./food-tag"
import { AnimatePresence } from "framer-motion"
import { SavedMealsButton, type SavedMeal } from "./saved-meals/saved-meals-button"

interface FoodItem {
  id: string
  emoji?: string
  label: string
  quantity?: string
}

const COMMON_FOODS: FoodItem[] = [
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
]

interface FoodSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function FoodSelector({ value, onChange }: FoodSelectorProps) {
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([])
  const [customFood, setCustomFood] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Parse initial value if provided
  useEffect(() => {
    if (value) {
      try {
        const parsedFoods = JSON.parse(value)
        if (Array.isArray(parsedFoods)) {
          setSelectedFoods(parsedFoods)
        }
      } catch (e) {
        // If value is not JSON, treat it as comma-separated text
        const foodItems = value.split(",").map((item) => ({
          id: item.trim().toLowerCase().replace(/\s+/g, "-"),
          label: item.trim(),
        }))
        setSelectedFoods(foodItems)
      }
    }
  }, [])

  const toggleFood = (food: FoodItem) => {
    let newSelectedFoods: FoodItem[]

    if (selectedFoods.some((item) => item.id === food.id)) {
      newSelectedFoods = selectedFoods.filter((item) => item.id !== food.id)
    } else {
      newSelectedFoods = [...selectedFoods, food]
    }

    setSelectedFoods(newSelectedFoods)
    onChange(JSON.stringify(newSelectedFoods))
  }

  const addCustomFood = () => {
    if (!customFood.trim()) return

    const newFood: FoodItem = {
      id: `custom-${Date.now()}`,
      label: customFood.trim(),
    }

    const newSelectedFoods = [...selectedFoods, newFood]
    setSelectedFoods(newSelectedFoods)
    onChange(JSON.stringify(newSelectedFoods))
    setCustomFood("")

    // Focus back on input for quick consecutive entries
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const removeFood = (id: string) => {
    const newSelectedFoods = selectedFoods.filter((item) => item.id !== id)
    setSelectedFoods(newSelectedFoods)
    onChange(JSON.stringify(newSelectedFoods))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addCustomFood()
    }
  }

  const handleAddSavedMeal = (meal: SavedMeal) => {
    // Add all foods from the meal that aren't already selected
    const newFoods = meal.foods.filter(
      (mealFood) => !selectedFoods.some((selectedFood) => selectedFood.id === mealFood.id),
    )

    if (newFoods.length > 0) {
      const newSelectedFoods = [...selectedFoods, ...newFoods]
      setSelectedFoods(newSelectedFoods)
      onChange(JSON.stringify(newSelectedFoods))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="food-grid">Recent Food Consumed</Label>
        <SavedMealsButton onSelectMeal={handleAddSavedMeal} />
      </div>

      <div id="food-grid" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {COMMON_FOODS.map((food) => (
          <FoodItemButton
            key={food.id}
            emoji={food.emoji || ""}
            label={food.label}
            selected={selectedFoods.some((item) => item.id === food.id)}
            onClick={() => toggleFood(food)}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            ref={inputRef}
            placeholder="Other food or drink..."
            value={customFood}
            onChange={(e) => setCustomFood(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button type="button" onClick={addCustomFood} disabled={!customFood.trim()} variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      <div className="min-h-[60px] p-2 border rounded-md bg-background/50">
        {selectedFoods.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-2">
            No foods selected. What have you eaten in the last 24 hours?
          </p>
        ) : (
          <div className="flex flex-wrap">
            <AnimatePresence>
              {selectedFoods.map((food) => (
                <FoodTag key={food.id} emoji={food.emoji} label={food.label} onRemove={() => removeFood(food.id)} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
