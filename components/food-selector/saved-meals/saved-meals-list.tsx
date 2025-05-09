"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Edit2, Trash2 } from "lucide-react"
import type { SavedMeal } from "./saved-meals-button"
import { EmptyStateMascot } from "@/components/mascot/empty-state-mascot"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface SavedMealsListProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectMeal: (meal: SavedMeal) => void
  onEditMeal: (meal: SavedMeal) => void
  onCreateMeal: () => void
}

export function SavedMealsList({ open, onOpenChange, onSelectMeal, onEditMeal, onCreateMeal }: SavedMealsListProps) {
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([])
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [mealToDelete, setMealToDelete] = useState<SavedMeal | null>(null)

  // Load saved meals from localStorage
  useEffect(() => {
    const storedMeals = localStorage.getItem("poopit-saved-meals")
    if (storedMeals) {
      try {
        setSavedMeals(JSON.parse(storedMeals))
      } catch (e) {
        console.error("Failed to parse saved meals", e)
      }
    } else {
      // Add some example meals for demo purposes
      const exampleMeals: SavedMeal[] = [
        {
          id: "breakfast-1",
          name: "Typical Breakfast",
          foods: [
            { id: "coffee", emoji: "☕", label: "Coffee" },
            { id: "bread", emoji: "🍞", label: "Toast", quantity: "2 slices" },
            { id: "eggs", emoji: "🥚", label: "Eggs", quantity: "2" },
          ],
        },
        {
          id: "lunch-1",
          name: "Work Lunch",
          foods: [
            { id: "salad", emoji: "🥗", label: "Salad" },
            { id: "chicken", emoji: "🍗", label: "Chicken", quantity: "4 oz" },
            { id: "rice", emoji: "🍚", label: "Rice", quantity: "1 cup" },
          ],
        },
      ]
      setSavedMeals(exampleMeals)
      localStorage.setItem("poopit-saved-meals", JSON.stringify(exampleMeals))
    }
  }, [])

  const handleSelectMeal = (meal: SavedMeal) => {
    onSelectMeal(meal)
    onOpenChange(false)
  }

  const handleDeleteMeal = (meal: SavedMeal) => {
    setMealToDelete(meal)
    setDeleteConfirmOpen(true)
  }

  const confirmDeleteMeal = () => {
    if (!mealToDelete) return

    const updatedMeals = savedMeals.filter((meal) => meal.id !== mealToDelete.id)
    setSavedMeals(updatedMeals)
    localStorage.setItem("poopit-saved-meals", JSON.stringify(updatedMeals))
    setDeleteConfirmOpen(false)
    setMealToDelete(null)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Saved Meals</DialogTitle>
            <DialogDescription>Select a saved meal to add to your food log or create a new one.</DialogDescription>
          </DialogHeader>

          {savedMeals.length === 0 ? (
            <EmptyStateMascot
              title="No Saved Meals Yet"
              description="Create your first meal preset to quickly add foods you eat regularly."
              mood="neutral"
              action={
                <Button onClick={onCreateMeal}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Meal
                </Button>
              }
            />
          ) : (
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-3">
                {savedMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className="flex flex-col rounded-lg border p-3 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{meal.name}</h3>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEditMeal(meal)}>
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteMeal(meal)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {meal.foods.map((food) => (
                        <div
                          key={`${meal.id}-${food.id}`}
                          className="inline-flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full text-xs"
                        >
                          {food.emoji && <span>{food.emoji}</span>}
                          <span>{food.label}</span>
                          {food.quantity && <span className="text-muted-foreground">({food.quantity})</span>}
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" size="sm" className="self-end" onClick={() => handleSelectMeal(meal)}>
                      Add to Log
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={onOpenChange.bind(null, false)}>
              Cancel
            </Button>
            <Button onClick={onCreateMeal}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Meal
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Saved Meal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{mealToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteMeal} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
