"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SavedMealsList } from "./saved-meals-list"
import { SavedMealEditor } from "./saved-meal-editor"
import { BookmarkIcon } from "lucide-react"

export interface SavedMeal {
  id: string
  name: string
  foods: Array<{
    id: string
    emoji?: string
    label: string
    quantity?: string
  }>
}

interface SavedMealsButtonProps {
  onSelectMeal: (meal: SavedMeal) => void
}

export function SavedMealsButton({ onSelectMeal }: SavedMealsButtonProps) {
  const [showMealsList, setShowMealsList] = useState(false)
  const [showMealEditor, setShowMealEditor] = useState(false)
  const [editingMeal, setEditingMeal] = useState<SavedMeal | null>(null)

  const handleEditMeal = (meal: SavedMeal) => {
    setEditingMeal(meal)
    setShowMealEditor(true)
    setShowMealsList(false)
  }

  const handleCreateMeal = () => {
    setEditingMeal(null)
    setShowMealEditor(true)
    setShowMealsList(false)
  }

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setShowMealsList(true)}
        type="button"
      >
        <BookmarkIcon className="h-4 w-4" />
        <span>Saved Meals</span>
      </Button>

      <SavedMealsList
        open={showMealsList}
        onOpenChange={setShowMealsList}
        onSelectMeal={onSelectMeal}
        onEditMeal={handleEditMeal}
        onCreateMeal={handleCreateMeal}
      />

      <SavedMealEditor open={showMealEditor} onOpenChange={setShowMealEditor} meal={editingMeal} />
    </>
  )
}
