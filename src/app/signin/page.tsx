'use client'

import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
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
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {/* Toggle Password Visibility Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14zM10 4a6 6 0 015.618 3.95A6 6 0 0010 16a5.983 5.983 0 01-4.617-2.282l-1.41 1.41A8 8 0 0018 10a8 8 0 00-7.823-6.246l-.848-.847zM7.73 5.728a6.017 6.017 0 012.537-.453l1.24 1.24a4.978 4.978 0 00-3.775 4.368l-1.064 1.065A6.017 6.017 0 017.73 5.728z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

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