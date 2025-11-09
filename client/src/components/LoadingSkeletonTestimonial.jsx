import React from 'react'

const LoadingSkeletonTestimonials = () => {
  return (
    <div className="relative md:py-[8vw] sm:py-[9vw] xs:py-[10vw] md:px-[2.5vw] sm:px-[3vw] xs:px-[3.5vw] bg-theme-purple/10 w-full font-inter">
      <div className="md:max-w-[75%] mx-auto relative flex justify-center">
        {/* Skeleton Card */}
        <div className="bg-gradient-to-r from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f] md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] w-[90%] md:w-[70%]">
          <div className="w-full h-full md:p-[1.5vw] sm:p-[2vw] xs:p-[2.5vw] bg-theme-dark md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] flex flex-col md:gap-[1.5vw] sm:gap-[2vw] xs:gap-[2.5vw] animate-pulse">
            {/* Skeleton Message */}
            <div className="bg-gray-700 md:h-[6vw] sm:h-[10vw] xs:h-[18vw] w-full rounded"></div>

            {/* Client Section */}
            <div className="flex items-center md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]">
              {/* Image Skeleton */}
              <div className="rounded-full bg-gray-700 md:w-[3.5vw] md:h-[3.5vw] sm:w-[5.5vw] sm:h-[5.5vw] xs:w-[7.5vw] xs:h-[7.5vw]"></div>

              <div className="flex flex-col md:gap-[0.5vw] sm:gap-[1vw] xs:gap-[2vw]">
                <div className="bg-gray-700 md:h-[1.2vw] sm:h-[2vw] xs:h-[3.5vw] md:w-[10vw] sm:w-[18vw] xs:w-[25vw] rounded"></div>
                <div className="bg-gray-800 md:h-[0.9vw] sm:h-[1.8vw] xs:h-[3vw] md:w-[8vw] sm:w-[14vw] xs:w-[20vw] rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Button Skeleton */}
        <div className="absolute left-[3%] top-1/2 -translate-y-1/2 z-10">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 opacity-40 md:p-[1vw] sm:p-[2vw] xs:p-[4vw] rounded-full animate-pulse"></div>
        </div>

        {/* Right Button Skeleton */}
        <div className="absolute right-[3%] top-1/2 -translate-y-1/2 z-10">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 opacity-40 md:p-[1vw] sm:p-[2vw] xs:p-[4vw] rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Pagination Dots Skeleton */}
      <div className="flex justify-center md:gap-[1vw] sm:gap-[1.5vw] xs:gap-[2vw] md:mt-[3vw] sm:mt-[4vw] xs:mt-[5vw]">
        <div className="w-[10px] h-[10px] bg-gray-700 rounded-full animate-pulse"></div>
        <div className="w-[10px] h-[10px] bg-gray-700 rounded-full animate-pulse"></div>
        <div className="w-[10px] h-[10px] bg-gray-700 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

export default LoadingSkeletonTestimonials
