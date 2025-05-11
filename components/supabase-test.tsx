"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getRecentPoopLogs, getRecentFoodLogs, getUserBadges, getTestUser } from "@/lib/actions/supabase-actions"
import type { Tables } from "@/lib/supabase/types"
import { format } from "date-fns"

export function SupabaseTest() {
  const [poopLogs, setPoopLogs] = useState<Tables<"poop_logs">[]>([])
  const [foodLogs, setFoodLogs] = useState<Tables<"food_logs">[]>([])
  const [badges, setBadges] = useState<any[]>([])
  const [user, setUser] = useState<Tables<"users"> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        // Fetch test user
        const userData = await getTestUser()
        setUser(userData)

        // Fetch recent logs
        const poopLogsData = await getRecentPoopLogs()
        setPoopLogs(poopLogsData)

        const foodLogsData = await getRecentFoodLogs()
        setFoodLogs(foodLogsData)

        // Fetch badges if we have a user
        if (userData) {
          const badgesData = await getUserBadges(userData.id)
          setBadges(badgesData)
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to fetch data from Supabase")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supabase Test</CardTitle>
          <CardDescription>Loading data from Supabase...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supabase Test</CardTitle>
          <CardDescription className="text-red-500">{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supabase Integration Test</CardTitle>
        <CardDescription>Displaying data from Supabase for user: {user?.display_name || "Unknown"}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="poop-logs">
          <TabsList className="mb-4">
            <TabsTrigger value="poop-logs">Poop Logs</TabsTrigger>
            <TabsTrigger value="food-logs">Food Logs</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="poop-logs">
            <h3 className="text-lg font-medium mb-2">Recent Poop Logs</h3>
            {poopLogs.length === 0 ? (
              <p className="text-muted-foreground">No poop logs found</p>
            ) : (
              <div className="space-y-2">
                {poopLogs.map((log) => (
                  <div key={log.id} className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">{format(new Date(log.timestamp), "MMM d, yyyy h:mm a")}</span>
                      <span className="text-muted-foreground">{log.duration} min</span>
                    </div>
                    <div className="mt-1 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Color:</span> {log.color}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Texture:</span> {log.texture}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Comfort:</span> {log.comfort_level}/5
                      </div>
                    </div>
                    {log.notes && (
                      <div className="mt-1 text-sm">
                        <span className="text-muted-foreground">Notes:</span> {log.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="food-logs">
            <h3 className="text-lg font-medium mb-2">Recent Food Logs</h3>
            {foodLogs.length === 0 ? (
              <p className="text-muted-foreground">No food logs found</p>
            ) : (
              <div className="space-y-2">
                {foodLogs.map((log) => (
                  <div key={log.id} className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">{log.food_name}</span>
                      <span className="text-muted-foreground">
                        {format(new Date(log.timestamp), "MMM d, yyyy h:mm a")}
                      </span>
                    </div>
                    <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span> {log.food_category}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quantity:</span> {log.quantity}
                      </div>
                    </div>
                    {log.notes && (
                      <div className="mt-1 text-sm">
                        <span className="text-muted-foreground">Notes:</span> {log.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="badges">
            <h3 className="text-lg font-medium mb-2">User Badges</h3>
            {badges.length === 0 ? (
              <p className="text-muted-foreground">No badges found</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge) => (
                  <div key={badge.id} className="border rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{badge.badges.icon}</span>
                      <span className="font-medium">{badge.badges.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{badge.badges.description}</p>
                    <div className="mt-2 text-sm">
                      <span className="text-muted-foreground">Progress:</span> {badge.progress}/
                      {badge.badges.requirements?.count || badge.badges.requirements?.days || "?"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
