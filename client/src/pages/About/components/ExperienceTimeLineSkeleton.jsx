import React from 'react'

const ExperienceTimelineSkeleton = () => {
  return (
    <div className="relative md:w-[80%] mx-auto md:py-[8vw] sm:py-[12vw] xs:py-[14vw] animate-pulse">
      {/* ✅ Vertical Line Skeleton */}
      <div className="absolute left-1/2 top-0 bottom-0 md:w-[0.25vw] bg-theme-cyan/30 transform -translate-x-1/2 md:block xs:hidden" />

      <div className="flex flex-col xs:items-center md:items-start md:gap-[2vw] sm:gap-[3vw] xs:gap-[4vw]">
        {[1, 2, 3, 4].map((_, idx) => (
          <div
            key={idx}
            className={`relative md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] gradient-button opacity-50 md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] md:w-[45%] sm:w-[80%] xs:w-[90%]
              ${
                idx % 2 === 0
                  ? 'md:self-start md:ml-0 sm:ml-[10%]'
                  : 'md:self-end md:mr-0 sm:mr-[10%]'
              }`}
          >
            {/* ✅ Dot on the line */}
            <span
              className={`absolute md:block xs:hidden top-[50%] w-[1vw] h-[1vw] sm:w-[1.5vw] sm:h-[1.5vw] xs:w-[2vw] xs:h-[2vw]
                bg-theme-cyan/40 rounded-full transform -translate-y-1/2
                ${
                  idx % 2 === 0
                    ? 'md:right-[-0.7vw] sm:right-[-1vw]'
                    : 'md:left-[-0.7vw] sm:left-[-1vw]'
                }`}
            />

            {/* ✅ Inner Card */}
            <div className="w-full h-full md:p-[1.5vw] sm:p-[2vw] xs:p-[2.5vw] bg-theme-dark rounded-[1vw] flex flex-col md:gap-[1.5vw] sm:gap-[2vw] xs:gap-[2.5vw]">
              {/* Title Skeleton */}
              <div className="w-[60%] h-[2vw] sm:h-[3vw] xs:h-[5vw] bg-gray-700 rounded" />

              {/* Duration Skeleton */}
              <div className="w-[40%] h-[1.5vw] sm:h-[2.5vw] xs:h-[4vw] bg-gray-800 rounded" />

              {/* Description Skeleton */}
              <div className="w-full h-[4vw] sm:h-[6vw] xs:h-[10vw] bg-gray-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceTimelineSkeleton
