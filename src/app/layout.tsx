"use client";

import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { supabase } from "@/utils/supabase/client";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [theme, setTheme] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Retrieve theme from local storage and check user authentication status
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);

    const checkUserStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsAuthenticated(!!user); // Set isAuthenticated to true if user exists
      console.log("user: ", user)
      console.log("authenticatd: ", isAuthenticated)
    }

    checkUserStatus()
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  // Function to handle user logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("logout Error:", error.message)
    } else {
      setIsAuthenticated(false) // Set the authentication state to false after logout
      console.log("User logged out successfully.");
    }
  }
  return (
    <html lang="en">
      <head>
        <title>To Do Application</title>
        <meta name="description" content="Creating To Do Application using NextJs" />
        <link rel="icon" href="/app_icon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Header Section */}
        <header className={`w-full py-4 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-500'}`}>
          <div className="flex justify-between items-center">

            {/* Logo */}
            <div className={`font-bold text-2xl ${theme === 'dark' ? 'text-gray-100' : 'text-white'}`}>
              <Link href="/">
                <img src={theme === 'dark' ? "/logo_Dark_BG.png" : "/logo_Light_BG.png"} alt="Logo" className="h-10 w-10 inline-block mr-2" />
                To Do App
              </Link>
            </div>

            {/* Theme Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className="sr-only"
              />
              <div className={`w-14 h-8 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} relative rounded-full`}>
                <span className={`absolute left-1 top-1 w-6 h-6 transition-transform duration-300 ${theme === 'dark' ? 'transform translate-x-6' : ''}`}></span>
              </div>
              {/* Moon Image */}
              <img
                src="/moon.png"
                alt="Moon"
                className={`absolute left-1 top-1 w-6 h-6 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}
              />
              {/* Sun Image */}
              <img
                src="/sun.png"
                alt="Sun"
                className={`absolute left-8 top-1 w-6 h-6 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
              />
            </label>

            {/* Navigation Links */}
            <nav>
              <ul className={`flex space-x-6 ${theme === 'dark' ? 'text-gray-300' : 'text-white'}`}>
                {isAuthenticated ? (
                  <>
                    {/* If the user is authenticated, show About and Contact Us */}
                    <li>
                      <Link href="/about">
                        <button className="hover:underline">About</button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        <button className="hover:underline">Contact Us</button>
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="hover:underline">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    {/* If the user is not authenticated, show Sign In and Sign Up */}
                    <li>
                      <Link href="/signin">
                        <button className="hover:underline">Sign In</button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/signup">
                        <button className="hover:underline">Sign Up</button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className={`w-full p-4 bg-blue-500 text-white text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-500'}`}>
          <p className='text-sm'>
            Start organizing your tasks with ease and increase your productivity. <br />
            Stay on top of your to-do list, no matter where you are!
          </p>
          <p>
            © 2024 To-Do Application
          </p>
        </footer>
      </body>
    </html>
  );
}