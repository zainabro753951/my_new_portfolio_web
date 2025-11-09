import React from 'react'
import { motion } from 'motion/react'

const shimmer = 'bg-gradient-to-r from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f] animate-pulse'

const FeaturedReposSkeleton = () => {
  const fakeCards = Array(6).fill(0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="md:py-[8vw] sm:py-[9vw] xs:py-[10vw] md:px-[2.5vw] sm:px-[3vw] xs:px-[3.5vw] bg-theme-dark w-full min-h-screen text-white font-inter"
    >
      {/* Title Skeleton */}
      <div className="flex justify-center">
        <div
          className={`h-[3vw] sm:h-[4vw] xs:h-[6vw] w-[40vw] sm:w-[55vw] xs:w-[70vw] rounded-md ${shimmer}`}
        />
      </div>

      {/* Cards Skeleton */}
      <div className="md:my-[1.5vw] sm:my-[2.5vw] xs:my-[3.5vw] grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]">
        {fakeCards.map((_, idx) => (
          <motion.div
            key={idx}
            className="md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] gradient-button"
          >
            <div className="w-full h-full md:p-[1.5vw] sm:p-[2vw] xs:p-[2.5vw] bg-theme-dark md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] flex flex-col md:gap-[1vw] sm:gap-[1.5vw] xs:gap-[2vw]">
              {/* Image placeholder */}
              <div
                className={`md:w-full md:h-[20vw] sm:h-[30vw] xs:h-[40vw] rounded-lg ${shimmer}`}
              />

              {/* Title placeholder */}
              <div
                className={`h-[1.6vw] sm:h-[2.6vw] xs:h-[4.6vw] w-[65%] rounded-md ${shimmer}`}
              />

              {/* Description placeholder */}
              <div className="flex flex-col gap-[0.6vw]">
                <div
                  className={`h-[1.2vw] sm:h-[2.2vw] xs:h-[4.2vw] w-[90%] rounded-md ${shimmer}`}
                />
                <div
                  className={`h-[1.2vw] sm:h-[2.2vw] xs:h-[4.2vw] w-[75%] rounded-md ${shimmer}`}
                />
              </div>

              {/* Tech stack and links */}
              <div className="w-full flex flex-col justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <div
                    className={`md:w-[1.2vw] md:h-[1.2vw] sm:w-[2.2vw] sm:h-[2.2vw] xs:w-[3.3vw] xs:h-[3.3vw] rounded-full ${shimmer}`}
                  />
                  <div className={`h-[1vw] sm:h-[2vw] xs:h-[4vw] w-[40%] rounded-md ${shimmer}`} />
                </div>

                <div className="w-full flex items-center justify-between mt-[1vw]">
                  <div
                    className={`h-[1.2vw] sm:h-[2.3vw] xs:h-[4.3vw] w-[30%] rounded-md ${shimmer}`}
                  />
                  <div
                    className={`h-[1.2vw] sm:h-[2.3vw] xs:h-[4.3vw] w-[30%] rounded-md ${shimmer}`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button placeholder */}
      <div className="w-full flex items-center justify-center md:mt-[2.5vw] sm:mt-[3.5vw] xs:mt-[4.5vw]">
        <div
          className={`h-[3vw] sm:h-[4vw] xs:h-[6vw] w-[25vw] sm:w-[35vw] xs:w-[50vw] rounded-full ${shimmer}`}
        />
      </div>
    </motion.div>
  )
}

export default FeaturedReposSkeleton
