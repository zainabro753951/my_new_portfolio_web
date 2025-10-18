import React from 'react'
import CustomSelect from '../../../Components/CustomSelect'
import { motion } from 'motion/react'

const ProjectSortBar = () => {
  return (
    <div className="w-full flex items-center justify-between flex-wrap md:gap-0 sm:gap-[2vw] xs:gap-[3vw]">
      {/* Project Info */}
      <div>
        <h3 className="md:text-[1.5vw] sm:text-[2.5vw] xs:text-[4.5vw] font-semibold">Projects</h3>
        <p className="md:text-[1vw] sm:text-[2vw] xs:text-[4vw] text-gray-400">
          Manage all project entries
        </p>
      </div>
      {/* Project Sorting */}
      <div className="flex items-center md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
        <CustomSelect />
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="md:py-[0.5vw] sm:py-[1vw] xs:py-[1.5vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[4.5vw] bg-gradient-to-r from-cyan-500 to-blue-500 text-cyan-100 border border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.25)] rounded-full md:text-[1vw] sm:text-[2vw] xs:text-[4vw] "
        >
          Add Project
        </motion.button>
      </div>
    </div>
  )
}

export default ProjectSortBar
