import { motion } from 'motion/react'
import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

const glassClass = `md:p-[1.5vw] sm:p-[2vw] xs:p-[2.5vw] md:rounded-[1.5vw] sm:rounded-[2vw] xs:rounded-[2.5vw]
      bg-gradient-to-br from-[#0a0a2a]/60 to-[#101040]/30
                 border border-white/20 backdrop-blur-2xl shadow-[0_0_20px_rgba(34,211,238,0.2)]
       w-full`

const actionButtonClass = `md:w-[2vw] md:h-[2vw] sm:w-[4.5vw] sm:h-[4.5vw] xs:w-[7vw] xs:h-[7vw] md:rounded-[0.5vw] sm:rounded-[1vw] xs:rounded-[1.5vw] flex items-center justify-center bg-gradient-to-r border  transition-all duration-300`

const plan = [
  {
    planName: 'Basic',
    price: 99,
    currency: '$',
    billingCycle: 'Monthly',
  },
  {
    planName: 'Standard',
    price: 919,
    currency: '$',
    billingCycle: 'Monthly',
  },
]

const DPricingPlanTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={glassClass}
    >
      <h3 className="md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] font-semibold">All Plans</h3>

      <div
        className="w-full md:rounded-[1.5vw] sm:rounded-[2vw] xs:rounded-[2.5vw]
        border border-cyan-400/20 bg-gradient-to-br from-[#0a0a2a]/60 to-[#101040]/30
        backdrop-blur-2xl shadow-[0_0_20px_rgba(34,211,238,0.2)]
        md:mt-[2vw] sm:mt-[3vw] xs:mt-[4vw]"
      >
        {/* ✅ Scrollable Wrapper for Mobile */}
        <div className="overflow-x-auto custom-scrollbar ">
          <div className="md:min-w-[15vw] sm:min-w-[50vw] xs:min-w-[85vw]">
            {' '}
            {/* 👈 Force width so scrollbar appears on small screens */}
            {/* Header */}
            <div className="w-full grid grid-cols-5 items-center md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] font-semibold text-cyan-300 border-b border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-lg">
              {['Plan Name', 'Price', 'Currency', 'Billing cycle', 'Action'].map((head, i) => (
                <div
                  key={i}
                  className={` md:py-[1.5vw] sm:py-[2.5vw] xs:py-[3.5vw] text-center tracking-wide uppercase`}
                >
                  {head}
                </div>
              ))}
            </div>
            {/* Scrollable Table Body */}
            <div className="md:max-h-[25vw] sm:max-h-[55vw] xs:max-h-[75vw] overflow-y-auto custom-scrollbar divide-y divide-cyan-400/20 ">
              {plan.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 items-center text-cyan-100 md:text-[0.95vw] sm:text-[1.9vw] xs:text-[3.5vw]
                          hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10
                          transition-all duration-300 ease-in-out"
                >
                  <div
                    className={`md:py-[1.5vw] sm:py-[2.5vw] xs:py-[3.5vw] text-center font-medium`}
                  >
                    {item.planName}
                  </div>
                  <div
                    className={`md:py-[1.5vw] sm:py-[2.5vw] xs:py-[3.5vw] text-center font-medium`}
                  >
                    {item.price}
                  </div>
                  <div
                    className={`md:py-[1.5vw] sm:py-[2.5vw] xs:py-[3.5vw] text-center font-medium`}
                  >
                    {item.currency}
                  </div>
                  <div
                    className={`md:py-[1.5vw] sm:py-[2.5vw] xs:py-[3.5vw] text-center font-medium`}
                  >
                    {item.billingCycle}
                  </div>
                  <div className="md:py-[1.5vw] sm:py-[2.5vw] xs:py-[3.5vw] flex justify-center md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
                    <button
                      className={
                        actionButtonClass +
                        'from-purple-600/30 to-indigo-600/30 border border-purple-500/40 text-purple-200 hover:from-purple-500/50 hover:to-indigo-500/40 shadow-[0_0_10px_rgba(147,51,234,0.3)]'
                      }
                    >
                      <FaEdit className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw]" />
                    </button>

                    <button
                      className={
                        actionButtonClass +
                        'from-cyan-600/30 to-blue-600/30 border border-cyan-500/40 text-cyan-200 hover:from-cyan-500/50 hover:to-blue-500/40 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                      }
                    >
                      <FaTrashAlt className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DPricingPlanTable
