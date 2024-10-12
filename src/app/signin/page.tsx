//responsiveness pending
'use client'

import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async () => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    console.log(data)
    if (error) {
      setError(error.message)
    }
    else {
      setError(null)
      router.push('/home')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white mb-6 text-center">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Sign In
        </button>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}