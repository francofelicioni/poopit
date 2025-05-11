"use server"

import { createServerSupabaseClient } from "../supabase/server"

export async function getRecentPoopLogs(limit = 5) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("poop_logs")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching poop logs:", error)
    throw new Error("Failed to fetch poop logs")
  }

  return data
}

export async function getRecentFoodLogs(limit = 5) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("food_logs")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching food logs:", error)
    throw new Error("Failed to fetch food logs")
  }

  return data
}

export async function getUserBadges(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("user_badges")
    .select(`
      *,
      badges (*)
    `)
    .eq("user_id", userId)

  if (error) {
    console.error("Error fetching user badges:", error)
    throw new Error("Failed to fetch user badges")
  }

  return data
}

export async function getTestUser() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("users").select("*").eq("email", "test@example.com").single()

  if (error) {
    console.error("Error fetching test user:", error)
    throw new Error("Failed to fetch test user")
  }

  return data
}
