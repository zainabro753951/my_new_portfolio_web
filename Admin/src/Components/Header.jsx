import React from 'react'
import { motion } from 'motion/react'

const Header = () => {
  return (
    <div className=" md:py-[0.5vw] sm:py-[1.5vw] xs:py-[2.5vw] w-full flex items-center justify-between backdrop-blur-xl bg-white/10 border-b border-white/10 md:px-[1vw] sm:px-[1.5vw] xs:px-[2vw]">
      <div>
        <h2 className="md:text-[1.4vw] sm:text-[2.4vw] xs:text-[4.4vw] font-semibold text-theme-cyan ">
          Portfolio - Dashboard
        </h2>
        <p className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-gray-400 sm:block xs:hidden">
          Manage content — projects, about, skills & more
        </p>
      </div>

      <div className="flex items-center md:gap-[1vw] sm:gap-[1.5vw] xs:gap-[2vw]">
        <input
          type="search"
          className="md:py-[0.5vw] sm:py-[1vw] xs:py-[1.5vw]  md:px-[1vw] sm:px-[1.5vw] xs:px-[2vw]  outline-none bg-gradient-to-r from-cyan-500/30 to-blue-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)] rounded-full md:text-[1vw] sm:text-[2vw] xs:text-[4vw] md:block xs:hidden"
          placeholder="Search here"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="md:py-[0.5vw] sm:py-[1vw] xs:py-[1.5vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[4.5vw] bg-gradient-to-r from-cyan-500 to-blue-500 text-cyan-100 border border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.25)] rounded-full md:text-[1vw] sm:text-[2vw] xs:text-[4vw] md:block xs:hidden"
        >
          New Project
        </motion.button>
        <motion.div
          whileHover={{ rotate: 10, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="md:w-[2.7vw] md:h-[2.7vw] sm:w-[5vw] sm:h-[5vw] xs:w-[7vw] xs:h-[7vw] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.4)] overflow-hidden"
        >
          <img
            src="https://images.saymedia-content.com/.image/t_share/MTk4OTEyNDE2Mzg0Mjk2Mjk5/songs-about-men.jpg"
            className="w-full h-full object-cover object-center"
            alt=""
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Header
