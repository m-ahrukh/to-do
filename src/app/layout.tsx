"use client";

import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

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
  const [theme, setTheme] = useState("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const [headerHeight, setHeaderHeight] = useState(0); // To store header height
  const headerRef = useRef<HTMLDivElement>(null); // Reference to the header
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);

    const checkUserStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user); // Set isAuthenticated to true if user exists
    };

    checkUserStatus();

    // Listen for changes in authentication state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event);
        setIsAuthenticated(!!session?.user);
      }
    );

    // Cleanup listener on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Set header height after component mounts
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("logout Error:", error.message);
    } else {
      setIsAuthenticated(false); // Set the authentication state to false after logout
      console.log("User logged out successfully.");
      router.push("/");
    }
  };

  return (
    <html lang="en">
      <head>
        <title>To Do Application</title>
        <meta name="description" content="Creating To Do Application using NextJs" />
        <link rel="icon" href="/app_icon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Header Section */}
        <header ref={headerRef} className={`w-full py-4 px-6 ${theme === "dark" ? "bg-gray-800" : "bg-blue-500"}`}>
          <div className="flex justify-between items-center">

            {/* Logo */}
            <div className={`font-bold text-2xl ${theme === "dark" ? "text-gray-100" : "text-white"}`}>
              <Link href="/">
                <img
                  src={theme === "dark" ? "/logo_Dark_BG.png" : "/logo_Light_BG.png"}
                  alt="Logo"
                  className="h-10 w-10 inline-block mr-2"
                />
                To Do App
              </Link>
            </div>

            {/* Desktop Theme Toggle and Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Theme Toggle */}
              <label className="relative inline-flex items-center cursor-pointer mr-4">
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                  className="sr-only"
                />
                <div
                  className={`w-14 h-8 ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} relative rounded-full`}
                >
                  <span
                    className={`absolute left-1 top-1 w-6 h-6 transition-transform duration-300 ${theme === "dark" ? "transform translate-x-6" : ""
                      }`}
                  ></span>
                </div>
                {/* Moon Image */}
                <img
                  src="/moon.png"
                  alt="Moon"
                  className={`absolute left-1 top-1 w-6 h-6 transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-100"
                    }`}
                />
                {/* Sun Image */}
                <img
                  src="/sun.png"
                  alt="Sun"
                  className={`absolute left-8 top-1 w-6 h-6 transition-opacity duration-300 ${theme === "dark" ? "opacity-100" : "opacity-0"
                    }`}
                />
              </label>

              {/* Desktop Navigation Links */}
              <nav>
                <ul className={`flex space-x-6 ${theme === "dark" ? "text-gray-300" : "text-white"}`}>
                  {isAuthenticated ? (
                    <>
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

            {/* Mobile Menu Icon */}
            <div className="lg:hidden flex items-center">
              {/* Theme Toggle */}
              <label className="relative inline-flex items-center cursor-pointer mr-4">
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                  className="sr-only"
                />
                <div
                  className={`w-14 h-8 ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} relative rounded-full`}
                >
                  <span
                    className={`absolute left-1 top-1 w-6 h-6 transition-transform duration-300 ${theme === "dark" ? "transform translate-x-6" : ""
                      }`}
                  ></span>
                </div>
                {/* Moon Image */}
                <img
                  src="/moon.png"
                  alt="Moon"
                  className={`absolute left-1 top-1 w-6 h-6 transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-100"
                    }`}
                />
                {/* Sun Image */}
                <img
                  src="/sun.png"
                  alt="Sun"
                  className={`absolute left-8 top-1 w-6 h-6 transition-opacity duration-300 ${theme === "dark" ? "opacity-100" : "opacity-0"
                    }`}
                />
              </label>

              {/* Hamburger Menu */}
              <button className="text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Links */}
          {menuOpen && (
            <div className={`lg:hidden fixed right-0 w-1/2 h-full p-4 shadow-lg transition-transform duration-300 bg-yellow-50`}
              style={{ top: `${headerHeight}px` }} // Setting the top position
            >
              {/* <div className="lg:hidden mt-4 space-y-2"> */}
              <ul className={`flex flex-col space-y-4 text-black`}>
                {isAuthenticated ? (
                  <>
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
              {/* </div> */}
            </div>
          )}
        </header>

        <main className="flex-grow">{children}</main>

        <footer
          className={`w-full p-4 mt-4 bg-blue-500 text-white text-center ${theme === "dark" ? "bg-gray-800" : "bg-blue-500"
            }`}
        >
          <p className="text-sm">
            Start organizing your tasks with ease and increase your productivity. <br />
            Stay on top of your to-do list, no matter where you are!
          </p>
          <p>© 2024 To-Do Application</p>
        </footer>
      </body>
    </html>
  );
}
