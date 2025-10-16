import React from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaDatabase, FaUserLock } from 'react-icons/fa6'
import { FiCpu } from 'react-icons/fi'

// 🎬 Animation Variants (Highly optimized & reusable)
const fadeUp = {
  initial: { y: 40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const containerVariant = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const Working = () => {
  const cards = [
    {
      icon: <FaCode />,
      title: 'Web Development',
      desc: 'Crafting responsive and scalable web applications using modern frameworks like React and Next.js.',
    },
    {
      icon: <FaDatabase />,
      title: 'Backend Development',
      desc: 'Designing secure and optimized APIs with Node.js, Express, and MongoDB for efficient data handling.',
    },
    {
      icon: <FaUserLock />,
      title: 'Authentication & Security',
      desc: 'Implementing JWT, OAuth, and security best practices to safeguard applications and users.',
    },
    {
      icon: <FiCpu />,
      title: 'Performance Optimization',
      desc: 'Enhancing web performance through lazy loading, caching, and code optimization for a smooth UX.',
    },
  ]

  return (
    <motion.div
      className="w-full text-white bg-circut font-inter"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-full h-full bg-theme-dark/80">
        <div className="w-full h-full md:py-[8vw] sm:py-[9vw] xs:py-[10vw] md:px-[2.5vw] sm:px-[3vw] xs:px-[3.5vw] bg-theme-purple/10">
          {/* Section Heading */}
          <motion.h2
            variants={fadeUp}
            className="md:text-[2.9vw] sm:text-[3.9vw] xs:text-[5.9vw] font-fira-code font-semibold text-center"
          >
            How <span className="gradient-text">I Can Help</span>
          </motion.h2>

          {/* Cards Container */}
          <motion.div
            variants={containerVariant}
            className="md:mt-[1.5vw] sm:mt-[2.5vw] xs:mt-[3.5vw] grid md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]"
          >
            {cards.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 0 10px #06b5d46c, 0 0 20px #06b5d463, 0 0 30px #06b5d442',
                }}
                transition={{ duration: 0.3 }}
                className="md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] gradient-button "
              >
                <div className="w-full h-full md:p-[1.5vw] sm:p-[2vw] xs:p-[2.5vw] bg-theme-dark md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] flex flex-col md:gap-[1.5vw] sm:gap-[2vw] xs:gap-[2.5vw]">
                  <span className="md:text-[3vw] sm:text-[4vw] xs:text-[6vw] text-theme-cyan">
                    {item.icon}
                  </span>
                  <h2 className="md:text-[1.6vw] sm:text-[2.6vw] xs:text-[4.6vw] md:leading-[2.1vw] sm:leading-[3.1vw] xs:leading-[5.1vw] font-semibold font-fira-code">
                    {item.title}
                  </h2>
                  <p className="md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Working
