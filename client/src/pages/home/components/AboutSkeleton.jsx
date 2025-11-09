import React from 'react'
import { motion } from 'motion/react'

const AboutSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="md:py-[8vw] sm:py-[9vw] xs:py-[10vw] md:px-[2.5vw] sm:px-[3vw] xs:px-[3.5vw] bg-theme-dark w-full text-white font-inter overflow-hidden"
    >
      <div className="w-full h-full grid md:grid-cols-2 md:gap-[2.5vw] sm:gap-[3.5vw] xs:gap-[4.5vw] items-center">
        {/* 🦴 Experience Cards Skeleton */}
        <div className="grid md:grid-cols-2 md:gap-[2vw] sm:gap-[3vw] xs:gap-[4vw]">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx}
              className="md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] gradient-button"
            >
              <div className="w-full h-full md:p-[1.5vw] sm:p-[2vw] xs:p-[2.5vw] bg-theme-dark md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] flex flex-col gap-[0.8vw] animate-pulse">
                {/* Icon skeleton */}
                <div className="w-[4vw] h-[4vw] sm:w-[5vw] sm:h-[5vw] xs:w-[7.5vw] xs:h-[7.5vw] bg-gray-700 rounded-full mb-2"></div>

                {/* Counter skeleton */}
                <div className="w-[5vw] sm:w-[7vw] xs:w-[10vw] h-[2vw] sm:h-[3vw] xs:h-[4vw] bg-gray-700 rounded-md"></div>

                {/* Subtitle skeleton */}
                <div className="w-[70%] h-[1.3vw] sm:h-[2.3vw] xs:h-[3.8vw] bg-gray-700 rounded-md mt-1"></div>
              </div>
            </div>
          ))}
        </div>

        {/* 🧠 Code Block Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full h-full bg-theme-dark flex flex-col gap-[0.8vw] animate-pulse"
        >
          <div className="w-[80%] h-[2vw] sm:h-[3vw] xs:h-[4.5vw] bg-gray-700 rounded-md"></div>
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="w-full h-[1.2vw] sm:h-[2vw] xs:h-[3.5vw] bg-gray-700 rounded-md"
            ></div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AboutSkeleton
