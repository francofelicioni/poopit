export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string | null
          created_at: string
          updated_at: string
          display_name: string | null
          avatar_url: string | null
          preferences: Json | null
        }
        Insert: {
          id?: string
          email?: string | null
          created_at?: string
          updated_at?: string
          display_name?: string | null
          avatar_url?: string | null
          preferences?: Json | null
        }
        Update: {
          id?: string
          email?: string | null
          created_at?: string
          updated_at?: string
          display_name?: string | null
          avatar_url?: string | null
          preferences?: Json | null
        }
      }
      poop_logs: {
        Row: {
          id: string
          user_id: string
          timestamp: string
          color: string | null
          texture: string | null
          smell: string | null
          duration: number | null
          comfort_level: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          timestamp?: string
          color?: string | null
          texture?: string | null
          smell?: string | null
          duration?: number | null
          comfort_level?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          timestamp?: string
          color?: string | null
          texture?: string | null
          smell?: string | null
          duration?: number | null
          comfort_level?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      food_logs: {
        Row: {
          id: string
          user_id: string
          timestamp: string
          food_name: string
          food_category: string | null
          quantity: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          timestamp?: string
          food_name: string
          food_category?: string | null
          quantity?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          timestamp?: string
          food_name?: string
          food_category?: string | null
          quantity?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      badges: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string | null
          icon: string | null
          requirements: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: string | null
          icon?: string | null
          requirements?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string | null
          icon?: string | null
          requirements?: Json | null
          created_at?: string
        }
      }
      user_badges: {
        Row: {
          id: string
          user_id: string
          badge_id: string
          earned_at: string
          progress: number | null
          is_completed: boolean | null
        }
        Insert: {
          id?: string
          user_id: string
          badge_id: string
          earned_at?: string
          progress?: number | null
          is_completed?: boolean | null
        }
        Update: {
          id?: string
          user_id?: string
          badge_id?: string
          earned_at?: string
          progress?: number | null
          is_completed?: boolean | null
        }
      }
      saved_meals: {
        Row: {
          id: string
          user_id: string
          name: string
          foods: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          foods: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          foods?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]
export type InsertTables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"]
export type UpdateTables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"]
