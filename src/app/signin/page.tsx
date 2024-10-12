'use client'

import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 lg:p-10 rounded-md shadow-md max-w-sm sm:max-w-md lg:max-w-lg  w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-700 dark:text-white mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {error && <p className="text-red-500 text-sm sm:text-base mb-4">{error}</p>}
          <button type="submit"
            className="w-full p-3 sm:p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-4 text-center">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}