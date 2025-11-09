import React from 'react'
import { motion } from 'motion/react'

const PricingFaqSkeleton = () => {
  const cards = [1, 2, 3]
  const faqs = [1, 2, 3]

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="w-full h-full bg-theme-dark text-white relative bg-circut"
    >
      <div className="w-full h-full bg-theme-dark/80 relative">
        <div className="w-full h-full md:py-[8vw] sm:py-[9vw] xs:py-[10vw] md:px-[2.5vw] sm:px-[3vw] xs:px-[3.5vw] flex flex-col md:gap-[4vw] sm:gap-[5vw] xs:gap-[6vw]">
          {/* ===== Pricing Skeleton ===== */}
          <motion.div>
            <div className="md:text-[2.9vw] sm:text-[3.9vw] xs:text-[5.9vw] font-fira-code font-semibold text-center">
              <div className="mx-auto bg-gray-700/50 rounded-md h-[3vw] w-[20vw] animate-pulse"></div>
            </div>

            <div className="md:mt-[1.5vw] sm:mt-[2.5vw] xs:mt-[3.5vw] grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]">
              {cards.map(i => (
                <div
                  key={i}
                  className="md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] bg-gradient-to-r from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f]"
                >
                  <div className="w-full h-full md:p-[1.5vw] sm:p-[2vw] xs:p-[2.5vw] bg-theme-dark md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] flex flex-col md:gap-[1vw] sm:gap-[1.5vw] xs:gap-[2vw] animate-pulse">
                    <div className="bg-gray-700/60 rounded-md h-[2vw] w-[50%]"></div>
                    <div className="bg-gray-700/60 rounded-md h-[3vw] w-[40%]"></div>
                    <div className="bg-gray-700/60 rounded-md h-[1.5vw] w-[90%]"></div>

                    <div className="flex flex-col gap-[0.8vw] mt-[1vw]">
                      {[...Array(5)].map((_, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-700/50 rounded-md h-[1.5vw] w-[85%]"
                        ></div>
                      ))}
                    </div>

                    <div className="mt-[1.5vw] bg-gray-700/60 h-[2.5vw] w-[60%] rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ===== FAQ Skeleton ===== */}
          <motion.div>
            <div className="md:text-[2.9vw] sm:text-[3.9vw] xs:text-[5.9vw] font-fira-code font-semibold text-center">
              <div className="mx-auto bg-gray-700/50 rounded-md h-[3vw] w-[25vw] animate-pulse"></div>
            </div>

            <div className="md:max-w-[60%] h-full mx-auto md:mt-[2.5vw] sm:mt-[3.5vw] xs:mt-[4.5vw] flex flex-col gap-[1vw]">
              {faqs.map(i => (
                <div
                  key={i}
                  className="md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] bg-gradient-to-r from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f]"
                >
                  <div className="w-full h-full md:p-[1.5vw] sm:p-[2vw] xs:p-[2.5vw] bg-theme-dark md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] flex flex-col gap-[1vw] animate-pulse">
                    <div className="bg-gray-700/60 h-[2vw] w-[80%] rounded-md"></div>
                    <div className="bg-gray-700/40 h-[1.5vw] w-[95%] rounded-md"></div>
                    <div className="bg-gray-700/40 h-[1.5vw] w-[85%] rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default PricingFaqSkeleton
