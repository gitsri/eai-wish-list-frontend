"use client"

import { useEffect, useState } from "react"

interface Snowflake {
  id: number
  left: string
  animationDuration: string
  animationDelay: string
  fontSize: string
}

export function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${Math.random() * 10 + 10}px`,
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            fontSize: flake.fontSize,
          }}
        >
          ❄
        </div>
      ))}
    </>
  )
}
