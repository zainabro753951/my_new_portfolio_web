import React from 'react'
import { motion } from 'motion/react'

const DAddProjectHeader = ({ handleSaveDraft, handlePublish }) => {
  // framer variants
  const fadeIn = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.45 } },
  }

  return (
    <motion.header
      variants={fadeIn}
      className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw] md:mb-[1.5vw] sm:mb-[2.5vw] xs:mb-[3.5vw] "
    >
      <div>
        <h1 className="md:text-[1.7vw] sm:text-[2.7vw] xs:text-[4.7vw] font-semibold">
          Add / Edit Project
        </h1>
        <p className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300 mt-1">
          Create or update project details, SEO and assets.
        </p>
      </div>

      <div className="flex md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw] items-center">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveDraft}
          className="md:py-[0.7vw] sm:py-[1.2vw] xs:py-[1.7vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-white/6 border border-white/8 text-white hover:bg-white/8 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw]"
        >
          Save Draft
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handlePublish}
          className="md:py-[0.7vw] sm:py-[1.2vw] xs:py-[1.7vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-cyan-500 text-black font-semibold hover:brightness-110 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw] "
        >
          Publish
        </motion.button>
      </div>
    </motion.header>
  )
}

export default DAddProjectHeader
