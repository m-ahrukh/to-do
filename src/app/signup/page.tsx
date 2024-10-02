'use client'

import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: '/',
      },
    })

    if (error) {
      setError(error.message)
    }
    else {
      setError(null)
      router.push('/signin')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">
        Sign Up
      </h2>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" required />
        <button type='submit' className="bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <p className="mt-4">
        Already have an account? <a href="/signin" className="text-blue-600">Sign in here</a>.
      </p>
    </div>
  )
}