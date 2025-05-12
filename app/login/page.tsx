"use client"

import { useState } from "react"
import { getBrowserSupabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const supabase = getBrowserSupabaseClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Login failed: " + error.message)
    } else {
      router.push("/")
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto mt-10">
      <h1 className="text-xl font-semibold">Login</h1>
      <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}
