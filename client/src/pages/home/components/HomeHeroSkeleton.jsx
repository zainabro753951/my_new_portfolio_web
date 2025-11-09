import React from 'react'

const HomeHeroSkeleton = () => {
  return (
    <div className="w-full h-full bg-theme-dark/80 relative overflow-hidden">
      {/* Purple Shadow Circle */}
      <div className="purple-shadow-circle md:w-[20vw] md:h-[20vw] sm:w-[40vw] sm:h-[40vw] xs:w-[60vw] xs:h-[60vw] rounded-full bg-theme-purple/20 blur-3xl absolute md:-left-36 md:-top-20"></div>

      {/* Content Wrapper */}
      <div className="w-full md:h-screen md:py-[4vw] sm:py-[7vw] xs:py-[16vw] grid xs:grid-cols-1 md:grid-cols-2 md:gap-[6vw] sm:gap-[10vw] xs:gap-[20vw] md:place-items-center items-center md:px-[2.5vw] sm:px-[3vw] xs:px-[3.5vw]">
        {/* Bio Skeleton */}
        <div className="flex flex-col md:gap-[1.5vw] sm:gap-[2vw] xs:gap-[2.5vw] animate-pulse w-full">
          {/* Title */}
          <div className="bg-gradient-to-r from-[#5b2eff]/20 to-[#08f7fe]/20 h-[4vw] sm:h-[5vw] xs:h-[8vw] w-[70%] rounded-md"></div>

          {/* Description */}
          <div className="space-y-[1vw] md:w-[95%]">
            <div className="bg-gray-500/20 h-[1.5vw] sm:h-[2.5vw] xs:h-[4vw] w-full rounded-md"></div>
            <div className="bg-gray-500/20 h-[1.5vw] sm:h-[2.5vw] xs:h-[4vw] w-[85%] rounded-md"></div>
            <div className="bg-gray-500/20 h-[1.5vw] sm:h-[2.5vw] xs:h-[4vw] w-[75%] rounded-md"></div>
          </div>

          {/* Buttons */}
          <div className="grid md:grid-cols-2 md:w-[70%] md:gap-[2vw] sm:gap-[2.5vw] xs:gap-[3vw]">
            <div className="h-[3vw] sm:h-[5vw] xs:h-[8vw] w-full bg-theme-purple/20 rounded-md"></div>
            <div className="h-[3vw] sm:h-[5vw] xs:h-[8vw] w-full bg-theme-cyan/20 rounded-md"></div>
          </div>
        </div>

        {/* Circular Badge Skeleton */}
        <div className="flex items-center justify-center relative animate-pulse">
          <div className="flex items-center absolute">
            <div className="w-[10vw] h-[10vw] sm:w-[20vw] sm:h-[20vw] xs:w-[30vw] xs:h-[30vw] rounded-full border-[0.8vw] border-theme-purple/30 blur-md"></div>
            <div className="w-[10vw] h-[10vw] sm:w-[20vw] sm:h-[20vw] xs:w-[30vw] xs:h-[30vw] rounded-full border-[0.8vw] border-theme-cyan/30 blur-md rotate-45"></div>
          </div>
          <div className="w-[12vw] h-[12vw] sm:w-[25vw] sm:h-[25vw] xs:w-[40vw] xs:h-[40vw] rounded-full bg-gray-500/20 border border-gray-400/10"></div>
        </div>
      </div>
    </div>
  )
}

export default HomeHeroSkeleton
