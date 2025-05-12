"use client"

import type React from "react"

import { FoodSelector } from "@/components/food-selector/food-selector"
import { AppContainer } from "@/components/layout/app-container"
import { AppFooter } from "@/components/layout/app-footer"
import { AppHeader } from "@/components/layout/app-header"
import { CelebrationMascot } from "@/components/mascot/celebration-mascot"
import { MascotReactions } from "@/components/mascot/mascot-reactions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LogVisit() {
  const router = useRouter()
  const [comfort, setComfort] = useState([3])
  const [consistency, setConsistency] = useState("normal")
  const [quantity, setQuantity] = useState([3])
  const [color, setColor] = useState("brown")
  const [foodConsumed, setFoodConsumed] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)
  const supabase = getBrowserSupabaseClient()

  const session = useSession()
  useEffect(() => {
    if (!session) {
      router.push("/login")
    }
  }, [session])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setShowCelebration(false)
    const user = session?.user
    if (!user) {
      alert("You must be logged in to save a log.")
      return
    }

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const timestamp = formData.get("date") as string
    const notes = formData.get("notes") as string

    const { error } = await supabase.from("poop_logs").insert({
      user_id: user.id,
      timestamp: new Date(timestamp).toISOString(),
      color,
      texture: consistency,
      comfort_level: comfort[0],
      notes: notes || null,
    })

    if (error) {
      console.error("Insert failed", error)
      alert("Failed to save log")
      return
    }

    setShowCelebration(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {showCelebration && (
        <CelebrationMascot
          message="Log Successfully Saved!"
          subMessage="Keep up the great tracking. Your digestive health thanks you!"
          onComplete={() => router.push("/")}
        />
      )}

      <AppHeader title="Log New Visit" showBackButton />

      <main className="flex-1">
        <AppContainer className="max-w-3xl">
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle>Log Your Bathroom Visit</CardTitle>
                  <CardDescription>Record the details of your bathroom experience.</CardDescription>
                </div>
                <MascotReactions
                  reactions={[
                    {
                      mood: "happy",
                      message: "Looking good! Regular consistency is a sign of good health.",
                      condition: consistency === "normal" && comfort[0] >= 4,
                    },
                    {
                      mood: "sad",
                      message: "Feeling uncomfortable? Try adding more fiber to your diet.",
                      condition: comfort[0] <= 2,
                    },
                    {
                      mood: "surprised",
                      message: "Unusual color? Make sure you're staying hydrated!",
                      condition: color === "green" || color === "red",
                    },
                    {
                      mood: "sick",
                      message: "Hard consistency can indicate dehydration. Drink more water!",
                      condition: consistency === "hard",
                    },
                  ]}
                  defaultMood="neutral"
                  defaultMessage="Tell me about your bathroom visit!"
                  size="md"
                />
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date & Time</Label>
                  <Input id="date" type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} />
                </div>

                {/* Consistency */}
                <div className="space-y-2">
                  <Label>Consistency</Label>
                  <RadioGroup
                    defaultValue="normal"
                    value={consistency}
                    onValueChange={setConsistency}
                    className="grid grid-cols-3 gap-2"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value="loose" id="loose" className="sr-only" />
                      <Label
                        htmlFor="loose"
                        className="flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-card p-2 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <EmojiIcon emoji="💧" label="loose" size="lg" />
                        <span className="text-xs">Loose</span>
                      </Label>
                    </div>

                    <div className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value="normal" id="normal" className="sr-only" />
                      <Label
                        htmlFor="normal"
                        className="flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-card p-2 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <EmojiIcon emoji="🥖" label="normal" size="lg" />
                        <span className="text-xs">Normal</span>
                      </Label>
                    </div>

                    <div className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value="hard" id="hard" className="sr-only" />
                      <Label
                        htmlFor="hard"
                        className="flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-card p-2 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <EmojiIcon emoji="💎" label="hard" size="lg" />
                        <span className="text-xs">Hard</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <FoodSelector value={foodConsumed} onChange={setFoodConsumed} />

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any other observations or comments?" className="min-h-[80px]" />
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Quantity</Label>
                    <span className="text-sm">{quantity[0]}/5</span>
                  </div>
                  <Slider value={quantity} min={1} max={5} step={1} onValueChange={setQuantity} className="py-4" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <EmojiIcon emoji="💩" label="a little" size="xs" className="mr-1" />
                      A little
                    </span>
                    <span className="flex items-center">
                      <EmojiIcon emoji="💩💩💩💩💩" label="a lot" size="xs" className="mr-1" />
                      A lot
                    </span>
                  </div>
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Select defaultValue="brown" value={color} onValueChange={setColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light-brown">
                        <div className="flex items-center">
                          <div className="mr-2 h-4 w-4 rounded-full bg-amber-300"></div>
                          Light Brown
                        </div>
                      </SelectItem>
                      <SelectItem value="brown">
                        <div className="flex items-center">
                          <div className="mr-2 h-4 w-4 rounded-full bg-amber-700"></div>
                          Brown
                        </div>
                      </SelectItem>
                      <SelectItem value="dark-brown">
                        <div className="flex items-center">
                          <div className="mr-2 h-4 w-4 rounded-full bg-amber-900"></div>
                          Dark Brown
                        </div>
                      </SelectItem>
                      <SelectItem value="green">
                        <div className="flex items-center">
                          <div className="mr-2 h-4 w-4 rounded-full bg-green-600"></div>
                          Green
                        </div>
                      </SelectItem>
                      <SelectItem value="red">
                        <div className="flex items-center">
                          <div className="mr-2 h-4 w-4 rounded-full bg-red-600"></div>
                          Red (Concerning)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Comfort Level */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Comfort Level</Label>
                    <span className="text-sm">{comfort[0]}/5</span>
                  </div>
                  <Slider value={comfort} min={1} max={5} step={1} onValueChange={setComfort} className="py-4" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <EmojiIcon emoji="😖" label="uncomfortable" size="xs" className="mr-1" />
                      Uncomfortable
                    </span>
                    <span className="flex items-center">
                      <EmojiIcon emoji="😌" label="comfortable" size="xs" className="mr-1" />
                      Very Comfortable
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </CardFooter>
            </form>
          </Card>
        </AppContainer>
      </main>

      <AppFooter />
    </div >
  )
}
