"use client"

import { useState, useEffect } from "react"
import { WishListGenerator } from "@/components/wish-list-generator"
import { Snowfall } from "@/components/snowfall"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1a3a2e] via-[#2d5a4a] to-[#1a3a2e]">
      {/* Snowfall effect */}
      <Snowfall />

      {/* Candle glow effects */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full animate-[candleGlow_3s_ease-in-out_infinite]" />
      <div className="absolute top-10 right-10 w-20 h-20 rounded-full animate-[candleGlow_3.5s_ease-in-out_infinite]" />
      <div className="absolute bottom-10 left-1/4 w-16 h-16 rounded-full animate-[candleGlow_4s_ease-in-out_infinite]" />
      <div className="absolute bottom-10 right-1/4 w-16 h-16 rounded-full animate-[candleGlow_3.2s_ease-in-out_infinite]" />

      {/* Main content */}
      <div className="relative z-10">
        <WishListGenerator />
      </div>
    </div>
  )
}
