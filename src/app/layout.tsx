"use client";

import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  return (
    <html lang="en">
      <head>
        <title>To Do Application</title>
        <meta name="description" content="Creating To Do Application using NextJs" />
        <link rel="icon" href="/app_icon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-blue-500 w-full py-4 px-6">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <div className="text-white font-bold text-2xl">
              <Link href="/">
                <img src="/logo_Dark_BG.png" alt="Logo" className="h-10 w-10 inline-block mr-2" />
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
              <div className="w-14 h-8 bg-gray-300 relative">
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
              <ul className="flex space-x-6 text-white">
                <li>
                  <Link href="/about">
                    <button className="hover:text-gray-300">About</button>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <button className="hover:text-gray-300">Contact Us</button>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
