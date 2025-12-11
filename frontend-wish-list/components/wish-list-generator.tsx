"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WishItem } from "@/components/wish-item"
import { WaxSeal } from "@/components/wax-seal"
import { Sparkles, Send } from "lucide-react"
import Image from "next/image"

interface Wish {
  id: number
  text: string
  rating: "nice" | "naughty" | null
  isWriting: boolean
}

export function WishListGenerator() {
  const [wishInput, setWishInput] = useState("")
  const [wishes, setWishes] = useState<Wish[]>([])
  const [showSeal, setShowSeal] = useState(false)
  const [santaMessage, setSantaMessage] = useState("")

  const playSound = (type: "bell" | "hohoho") => {
    // Create a simple bell sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

    if (type === "bell") {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }

  const getRating = (wish: string): "nice" | "naughty" => {
    const naughtyWords = ["destroy", "break", "steal", "hurt", "evil", "mean", "bad"]
    const lowerWish = wish.toLowerCase()

    for (const word of naughtyWords) {
      if (lowerWish.includes(word)) {
        return "naughty"
      }
    }

    return "nice"
  }

  const getSantaResponse = (rating: "nice" | "naughty") => {
    if (rating === "nice") {
      const niceResponses = [
        "Ho Ho Ho! What a wonderful wish!",
        "Santa approves! You're on the Nice List!",
        "Marvelous! The elves are taking notes!",
        "Splendid wish! Keep being good!",
        "Ho Ho! That's the Christmas spirit!",
      ]
      return niceResponses[Math.floor(Math.random() * niceResponses.length)]
    } else {
      const naughtyResponses = [
        "Ho Ho Hmm... Let's reconsider this one!",
        "Perhaps a nicer wish instead?",
        "Santa thinks you can do better!",
        "Careful! The Naughty List is watching!",
        "Let's wish for something kinder!",
      ]
      return naughtyResponses[Math.floor(Math.random() * naughtyResponses.length)]
    }
  }

  const addWish = () => {
    if (!wishInput.trim()) return

    const newWish: Wish = {
      id: Date.now(),
      text: wishInput,
      rating: null,
      isWriting: true,
    }

    setWishes((prev) => [...prev, newWish])
    setWishInput("")

    // Simulate writing effect, then show rating
    setTimeout(
      () => {
        const rating = getRating(newWish.text)
        setWishes((prev) => prev.map((w) => (w.id === newWish.id ? { ...w, isWriting: false, rating } : w)))

        // Play sound and show Santa's message
        playSound("bell")
        setSantaMessage(getSantaResponse(rating))

        // Clear message after 3 seconds
        setTimeout(() => setSantaMessage(""), 3000)
      },
      newWish.text.length * 50 + 1000,
    )
  }

  const completeList = () => {
    if (wishes.length === 0) return
    setShowSeal(true)
    playSound("bell")
    setSantaMessage("Ho Ho Ho! Your wish list is complete! Santa will review it carefully!")

    setTimeout(() => setSantaMessage(""), 4000)
  }

  const resetList = () => {
    setWishes([])
    setShowSeal(false)
    setSantaMessage("")
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image src="/cool_santa.png" alt="Cool Santa" fill className="object-contain drop-shadow-2xl" priority />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-[#f8f4e8] mb-4 tracking-tight drop-shadow-lg text-balance">
          Santa's Magical Wish List
        </h1>
        <p className="text-lg md:text-xl text-[#d4c5a0] font-sans max-w-2xl mx-auto text-balance">
          Write your Christmas wishes on the enchanted parchment and let Santa judge if you've been naughty or nice
        </p>
      </div>

      {/* Santa's Message */}
      {santaMessage && (
        <div className="max-w-2xl mx-auto mb-6 animate-in fade-in slide-in-from-top duration-500">
          <Card className="bg-primary/90 border-primary p-4 text-center backdrop-blur">
            <p className="text-primary-foreground font-serif text-lg md:text-xl font-medium">{santaMessage}</p>
          </Card>
        </div>
      )}

      {/* Parchment Scroll */}
      <div className="max-w-3xl mx-auto relative">
        <Card className="bg-[#f5ead6] border-[#d4c5a0] border-4 shadow-2xl p-6 md:p-10 parchment-texture relative">
          {/* Decorative scroll edges */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl">✨</div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-4xl">✨</div>

          {/* Title on parchment */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4a3420] mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              My Christmas Wishes
              <Sparkles className="w-6 h-6 text-accent" />
            </h2>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#8b6f47] to-transparent" />
          </div>

          {/* Wish input */}
          <div className="mb-8">
            <div className="flex gap-2">
              <Input
                value={wishInput}
                onChange={(e) => setWishInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addWish()}
                placeholder="Type your wish here..."
                className="flex-1 bg-[#fdfbf7] border-[#c4b5a0] text-[#4a3420] placeholder:text-[#8b7355] font-serif text-lg"
                disabled={showSeal}
              />
              <Button
                onClick={addWish}
                disabled={!wishInput.trim() || showSeal}
                variant="outline"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-secondary font-serif"
              >
                <Send className="w-4 h-4 mr-2" />
                Add Wish
              </Button>
            </div>
          </div>

          {/* Wishes list */}
          <div className="space-y-4 mb-8 min-h-[200px]">
            {wishes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#8b7355] font-serif text-lg italic">Your magical parchment awaits your wishes...</p>
              </div>
            ) : (
              wishes.map((wish, index) => <WishItem key={wish.id} wish={wish} index={index} />)
            )}
          </div>

          {/* Wax Seal */}
          {showSeal && <WaxSeal />}

          {/* Action buttons */}
          {!showSeal && wishes.length > 0 && (
            <div className="flex justify-center gap-4">
              <Button
                onClick={completeList}
                variant="outline"
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary font-serif text-lg px-8"
              >
                Complete List & Seal
              </Button>
            </div>
          )}

          {showSeal && (
            <div className="flex justify-center gap-4 mt-6">
              <Button
                onClick={resetList}
                variant="outline"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-secondary font-serif"
              >
                Start New List
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-[#d4c5a0] font-serif text-sm md:text-base">
          Remember: Santa is always watching! Be good for goodness sake! 🎅
        </p>
      </div>
    </div>
  )
}
