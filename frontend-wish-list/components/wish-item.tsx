"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Frown } from "lucide-react"

interface WishItemProps {
  wish: {
    id: number
    text: string
    rating: "nice" | "naughty" | null
    isWriting: boolean
  }
  index: number
}

export function WishItem({ wish, index }: WishItemProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [showRating, setShowRating] = useState(false)

  useEffect(() => {
    if (wish.isWriting) {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= wish.text.length) {
          setDisplayedText(wish.text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, 50)

      return () => clearInterval(interval)
    } else {
      setDisplayedText(wish.text)
      setTimeout(() => setShowRating(true), 300)
    }
  }, [wish.isWriting, wish.text])

  return (
    <div className="relative group animate-in fade-in slide-in-from-left duration-500">
      <div className="flex items-start gap-3 p-4 rounded-lg bg-[#fdfbf7] border border-[#e8dcc8] hover:border-[#d4c5a0] transition-all">
        <span className="text-[#8b6f47] font-serif font-bold text-lg shrink-0">{index + 1}.</span>
        <div className="flex-1">
          <p className="text-[#4a3420] font-serif text-lg leading-relaxed">
            {displayedText}
            {wish.isWriting && <span className="inline-block w-0.5 h-5 bg-[#4a3420] ml-1 animate-pulse" />}
          </p>
        </div>
        {showRating && wish.rating && (
          <div className="shrink-0 animate-in zoom-in duration-300">
            {wish.rating === "nice" ? (
              <Badge className="bg-secondary text-secondary-foreground border-secondary font-serif flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Nice!
              </Badge>
            ) : (
              <Badge className="bg-destructive text-destructive-foreground border-destructive font-serif flex items-center gap-1">
                <Frown className="w-3 h-3" />
                Naughty
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
