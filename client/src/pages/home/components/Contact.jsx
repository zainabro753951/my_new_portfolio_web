import React from 'react'
import { MdEmail, MdPhone } from 'react-icons/md'
import { FaGithub, FaLinkedin, FaUpwork } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import { useCursorHoverContext } from '../../../context/CursorHover'
import GardientButton from '../../../components/GardientButton'

const Contact = () => {
  const { onCursorEnter, onCursorLeave } = useCursorHoverContext()

  // ✅ Optimized Framer Motion Variants (Less Overhead)
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
  }

  const slideIn = (direction = 'left') => ({
    hidden: { opacity: 0, x: direction === 'left' ? -40 : 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  })

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full h-full bg-theme-dark text-white relative bg-circut overflow-hidden"
    >
      {/* ✅ Background simplified & GPU accelerated */}
      <div className="absolute inset-0 overflow-hidden bg-theme-dark/70 will-change-transform">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="md:w-[20vw] md:h-[20vw] sm:w-[40vw] sm:h-[40vw] rounded-full bg-theme-purple/25 blur-3xl absolute md:-left-20 md:-bottom-20"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:w-[20vw] md:h-[20vw] sm:w-[40vw] sm:h-[40vw] rounded-full bg-theme-cyan/25 blur-3xl absolute md:-right-20 md:-top-20"
        />
      </div>

      {/* ✅ Content */}
      <div className="relative z-10 w-full h-full md:py-[8vw] sm:py-[9vw] xs:py-[10vw] md:px-[2.5vw] sm:px-[3vw] xs:px-[3.5vw] flex flex-col md:gap-[4vw] sm:gap-[5vw] xs:gap-[6vw]">
        {/* Heading */}
        <motion.h2
          variants={fadeInUp}
          className="md:text-[2.9vw] sm:text-[3.9vw] xs:text-[5.9vw] font-fira-code font-semibold text-center"
        >
          Connect With Me <span className="gradient-text">Today</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 xs:grid-cols-1 md:gap-[5vw] sm:gap-[10vw] xs:gap-[15vw] mt-[2vw]">
          {/* ---------- LEFT ---------- */}
          <motion.div variants={slideIn('left')} className="flex flex-col gap-[2vw]">
            {/* Text */}
            <motion.div variants={fadeInUp}>
              <h3 className="md:text-[2vw] sm:text-[3vw] xs:text-[4vw] font-semibold font-fira-code text-theme-cyan">
                Let's Talk
              </h3>
              <p className="md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] text-gray-300 md:w-[75%] mt-[1vw]">
                I'm excited to collaborate on innovative projects or discuss your next big idea.
                Reach out via email, phone, or social media!
              </p>
            </motion.div>

            {/* Contact Details */}
            <motion.div variants={fadeInUp}>
              <h4 className="md:text-[1.7vw] sm:text-[3vw] xs:text-[4vw] font-semibold font-fira-code mb-[1vw]">
                Contact Details
              </h4>
              <div className="flex flex-col gap-[1vw]">
                <div className="flex items-center gap-[1.5vw]">
                  <MdEmail className="md:text-[2vw] sm:text-[3vw] xs:text-[5vw] text-theme-cyan" />
                  <p
                    onMouseEnter={onCursorEnter}
                    onMouseLeave={onCursorLeave}
                    className="text-gray-300 hover:text-theme-cyan transition-colors cursor-pointer md:text-[1.3vw]"
                  >
                    zainabro886@gmail.com
                  </p>
                </div>
                <div className="flex items-center gap-[1.5vw]">
                  <MdPhone className="md:text-[2vw] sm:text-[3vw] xs:text-[5vw] text-theme-cyan" />
                  <p
                    onMouseEnter={onCursorEnter}
                    onMouseLeave={onCursorLeave}
                    className="text-gray-300 hover:text-theme-cyan transition-colors cursor-pointer md:text-[1.3vw]"
                  >
                    +92 303 2150993
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={fadeInUp}>
              <h4 className="md:text-[1.7vw] sm:text-[3vw] xs:text-[4vw] font-semibold font-fira-code mb-[1vw]">
                Stay Connected
              </h4>
              <div className="flex items-center gap-[1.5vw]">
                {[FaGithub, FaLinkedin, FaUpwork].map((Icon, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    onMouseEnter={onCursorEnter}
                    onMouseLeave={onCursorLeave}
                    className="md:text-[2.5vw] sm:text-[3.5vw] xs:text-[5.5vw] text-gray-300 hover:text-theme-cyan cursor-pointer"
                  >
                    <Icon />
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ---------- RIGHT (FORM) ---------- */}
          <motion.div variants={slideIn('right')} className="w-full h-full">
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] gradient-button rounded-[1vw] w-full h-full"
            >
              <div className="w-full h-full md:p-[2vw] sm:p-[2.5vw] xs:p-[3vw] bg-theme-dark rounded-[1vw] flex flex-col gap-[1.5vw]">
                <h2 className="md:text-[1.7vw] sm:text-[2.7vw] xs:text-[4.7vw] font-semibold font-fira-code">
                  Send a Message
                </h2>

                {['Full name', 'Email', 'Your Message'].map((label, i) => (
                  <motion.div key={i} variants={fadeInUp} custom={i}>
                    <label className="text-gray-400">{label}</label>
                    {label === 'Your Message' ? (
                      <textarea
                        rows={4}
                        className="w-full p-3 mt-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-4 ring-theme-cyan/40 focus:border-theme-cyan transition-all duration-200 resize-none outline-none"
                        placeholder="Write your message here"
                      ></textarea>
                    ) : (
                      <input
                        type="text"
                        className="w-full p-3 mt-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-4 ring-theme-cyan/40 focus:border-theme-cyan transition-all duration-200 outline-none"
                        placeholder={`Enter your ${label.toLowerCase()}`}
                      />
                    )}
                  </motion.div>
                ))}

                <motion.div variants={fadeInUp} custom={4}>
                  <GardientButton text="Send Message" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
