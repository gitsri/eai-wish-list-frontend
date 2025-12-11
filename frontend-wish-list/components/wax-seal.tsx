"use client"

export function WaxSeal() {
  return (
    <div className="flex justify-center my-8 animate-[stampSeal_0.8s_ease-out]">
      <div className="relative">
        {/* Wax seal */}
        <div className="w-24 h-24 rounded-full bg-[#8B2635] shadow-xl flex items-center justify-center border-4 border-[#6B1423]">
          <div className="text-center">
            <div className="text-3xl font-serif font-bold text-[#f8f4e8] leading-none">SC</div>
            <div className="text-[10px] font-serif text-[#f8f4e8] tracking-wider">APPROVED</div>
          </div>
        </div>

        {/* Wax drips */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-[#8B2635] rounded-full blur-sm opacity-70" />

        {/* Sparkles around seal */}
        <div className="absolute -top-2 -left-2 text-2xl animate-pulse">✨</div>
        <div className="absolute -top-2 -right-2 text-2xl animate-pulse delay-100">✨</div>
        <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse delay-200">✨</div>
        <div className="absolute -bottom-2 -right-2 text-2xl animate-pulse delay-300">✨</div>
      </div>
    </div>
  )
}
