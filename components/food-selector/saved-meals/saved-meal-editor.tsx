"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X, Save } from "lucide-react"
import type { SavedMeal } from "./saved-meals-button"
import { FoodItemSelector } from "./food-item-selector"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

interface SavedMealEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  meal: SavedMeal | null
}

export function SavedMealEditor({ open, onOpenChange, meal }: SavedMealEditorProps) {
  const { toast } = useToast()
  const [mealName, setMealName] = useState("")
  const [foods, setFoods] = useState<Array<{ id: string; emoji?: string; label: string; quantity?: string }>>([])
  const [newFoodName, setNewFoodName] = useState("")
  const [newFoodQuantity, setNewFoodQuantity] = useState("")
  const [newFoodEmoji, setNewFoodEmoji] = useState("")
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([])

  // Load saved meals from localStorage
  useEffect(() => {
    const storedMeals = localStorage.getItem("poopit-saved-meals")
    if (storedMeals) {
      try {
        setSavedMeals(JSON.parse(storedMeals))
      } catch (e) {
        console.error("Failed to parse saved meals", e)
      }
    }
  }, [])

  // Initialize form when editing an existing meal
  useEffect(() => {
    if (meal) {
      setMealName(meal.name)
      setFoods([...meal.foods])
    } else {
      setMealName("")
      setFoods([])
    }
  }, [meal, open])

  const handleAddFood = () => {
    if (!newFoodName.trim()) return

    const newFood = {
      id: `food-${Date.now()}`,
      label: newFoodName.trim(),
      quantity: newFoodQuantity.trim() || undefined,
      emoji: newFoodEmoji || undefined,
    }

    setFoods([...foods, newFood])
    setNewFoodName("")
    setNewFoodQuantity("")
    setNewFoodEmoji("")
  }

  const handleRemoveFood = (id: string) => {
    setFoods(foods.filter((food) => food.id !== id))
  }

  const handleSelectCommonFood = (food: { id: string; emoji?: string; label: string }) => {
    setNewFoodName(food.label)
    setNewFoodEmoji(food.emoji || "")
  }

  const handleSaveMeal = () => {
    if (!mealName.trim()) {
      toast({
        title: "Meal name required",
        description: "Please enter a name for your meal",
        variant: "destructive",
      })
      return
    }

    if (foods.length === 0) {
      toast({
        title: "No foods added",
        description: "Please add at least one food item to your meal",
        variant: "destructive",
      })
      return
    }

    const newMeal: SavedMeal = {
      id: meal?.id || `meal-${Date.now()}`,
      name: mealName.trim(),
      foods,
    }

    let updatedMeals: SavedMeal[]
    if (meal) {
      // Update existing meal
      updatedMeals = savedMeals.map((m) => (m.id === meal.id ? newMeal : m))
    } else {
      // Add new meal
      updatedMeals = [...savedMeals, newMeal]
    }

    localStorage.setItem("poopit-saved-meals", JSON.stringify(updatedMeals))

    toast({
      title: meal ? "Meal updated" : "Meal created",
      description: `"${mealName}" has been ${meal ? "updated" : "saved"} to your meals`,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{meal ? "Edit Saved Meal" : "Create New Meal"}</DialogTitle>
          <DialogDescription>
            {meal
              ? "Update your saved meal with a name and list of foods."
              : "Create a new meal preset to quickly add foods you eat regularly."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meal-name">Meal Name</Label>
            <Input
              id="meal-name"
              placeholder="e.g., Breakfast, Post-Workout Snack"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Foods in this meal</Label>
            <ScrollArea className="h-[200px] rounded-md border p-2">
              {foods.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-8">
                  No foods added yet. Add some foods below.
                </p>
              ) : (
                <div className="space-y-2">
                  {foods.map((food) => (
                    <div key={food.id} className="flex items-center justify-between rounded-md border p-2">
                      <div className="flex items-center gap-2">
                        {food.emoji && <span className="text-lg">{food.emoji}</span>}
                        <span>{food.label}</span>
                        {food.quantity && <span className="text-xs text-muted-foreground">({food.quantity})</span>}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveFood(food.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          <div className="space-y-2">
            <Label>Add Food Item</Label>
            <div className="flex gap-2 mb-2">
              <div className="flex-1">
                <Input placeholder="Food name" value={newFoodName} onChange={(e) => setNewFoodName(e.target.value)} />
              </div>
              <div className="w-24">
                <Input
                  placeholder="Quantity"
                  value={newFoodQuantity}
                  onChange={(e) => setNewFoodQuantity(e.target.value)}
                />
              </div>
              <Button type="button" onClick={handleAddFood} disabled={!newFoodName.trim()}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add</span>
              </Button>
            </div>

            <FoodItemSelector onSelectFood={handleSelectCommonFood} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveMeal}>
            <Save className="mr-2 h-4 w-4" />
            {meal ? "Update Meal" : "Save Meal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
