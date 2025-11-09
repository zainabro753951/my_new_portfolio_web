import React, { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'
import BorderedButton from '../../../components/BorderedButton'
import GardientButton from '../../../components/GardientButton'
import { useSelector } from 'react-redux'
import PricingFaqSkeleton from './PriceSkeleton'

// ===== Animation Variants =====
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: 'easeOut', duration: 0.6 },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: 'easeOut', duration: 0.6 },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { ease: 'easeOut', duration: 0.5 },
  },
}

const PricingPlan = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const { plans, isLoading: isPlanLoading } = useSelector(state => state.plan)
  const { FAQs, isLoading: isFAQLoading } = useSelector(state => state.FAQ)
  const isPageReady = isFAQLoading || isPlanLoading
  console.log(plans)

  const pricePlan = [
    {
      title: 'Starter Plan',
      price: '$199',
      duration: 'month',
      caption: 'Perfect for startups and personal brands ready to go online.',
      availPoinst: [
        'Responsive single-page website (Home + Contact)',
        'Modern UI with Tailwind CSS',
        'Basic animations using GSAP',
        'SEO-friendly structure',
        'Free deployment support',
      ],
    },
    {
      title: 'Growth Plan',
      tag: '(Most Popular)',
      price: '$399',
      duration: 'month',
      caption: 'Designed for growing businesses that need a strong web presence.',
      availPoinst: [
        'Up to 5 dynamic pages (React + Node.js backend)',
        'API integration & contact form functionality',
        'Custom dashboard or admin panel',
        'Advanced GSAP animations and scroll effects',
        'Free hosting setup & 1-month maintenance',
      ],
    },
    {
      title: 'Premium Plan',
      price: '$699',
      duration: 'month',
      caption: 'Full-scale professional solution for brands that want performance and impact.',
      availPoinst: [
        'Complete MERN stack web app with authentication',
        'CMS or admin system (MongoDB + Express + React)',
        'Custom API development',
        'Cloud deployment (Vercel / Render / AWS)',
        'Performance optimization & security setup',
        'Priority support & regular updates',
      ],
    },
  ]

  const questions = [
    {
      question: 'What technologies do you use for development?',
      ans: 'I specialize in React, Next.js, Node.js, Express, MongoDB, PostgreSQL, AWS, and Docker for modern, scalable solutions.',
    },
    {
      question: 'Do you offer website maintenance after delivery?',
      ans: 'Yes! I provide free maintenance for the first month and optional long-term maintenance plans to keep your site updated and optimized.',
    },
    {
      question: 'Can I upgrade my plan later?',
      ans: 'Absolutely. You can upgrade your plan anytime as your project grows — your existing work remains intact.',
    },
  ]

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  if (isPageReady) return <PricingFaqSkeleton />

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full h-full bg-theme-dark text-white relative bg-circut"
    >
      <div className="w-full h-full bg-theme-dark/80 relative">
        <div className="w-full h-full md:py-[8vw] sm:py-[9vw] xs:py-[10vw] md:px-[2.5vw] sm:px-[3vw] xs:px-[3.5vw] flex flex-col md:gap-[4vw] sm:gap-[5vw] xs:gap-[6vw]">
          {/* ===== Pricing Section ===== */}
          <motion.div variants={sectionVariants}>
            <motion.h2
              variants={buttonVariants}
              className="md:text-[2.9vw] sm:text-[3.9vw] xs:text-[5.9vw] font-fira-code font-semibold text-center"
            >
              Pricing <span className="gradient-text">Plan</span>
            </motion.h2>

            <motion.div
              variants={containerVariants}
              className="md:mt-[1.5vw] sm:mt-[2.5vw] xs:mt-[3.5vw] grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]"
            >
              {plans?.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: '0 0 10px #06b5d46c, 0 0 20px #06b5d463, 0 0 30px #06b5d442',
                  }}
                  transition={{ duration: 0.3 }}
                  className="md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] gradient-button"
                >
                  <div className="w-full h-full md:p-[1.5vw] sm:p-[2vw] xs:p-[2.5vw] bg-theme-dark md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] flex flex-col md:gap-[0.5vw] sm:gap-[1vw] xs:gap-[1.5vw]">
                    <h2 className="md:text-[1.5vw] sm:text-[2.5vw] xs:text-[4.5vw] font-fira-code font-semibold capitalize">
                      {item?.planName}
                      {/* <span className="gradient-text">{item.tag}</span> */}
                    </h2>
                    <h3 className="md:text-[2.5vw] sm:text-[3.5vw] xs:text-[5.5vw] font-bold text-theme-cyan pb-1">
                      {item?.price}
                      {item?.currency}/{item?.billingCycle}
                    </h3>
                    <p className="md:text-[1.15vw] sm:text-[2.15vw] xs:text-[4.15vw] text-gray-400 md:pb-[1vw] sm:pb-[1.5vw] xs:pb-[2vw]">
                      {item?.shortDesc}
                    </p>

                    <div className="w-full h-full flex flex-col justify-between">
                      <ul className="w-full flex flex-col md:text-[1.2vw] sm:text-[2.2vw] xs:text-[4.2vw] text-gray-300 list-tick">
                        {item?.featurePoints?.map((pt, i) => (
                          <li
                            key={i}
                            className="relative md:pl-[2vw] sm:pl-[3vw] xs:pl-[4vw] md:mb-[1vw] sm:mb-[2vw] xs:mb-[3vw]"
                          >
                            {pt?.name}
                          </li>
                        ))}
                      </ul>

                      <motion.div
                        variants={buttonVariants}
                        className="md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] flex flex-col w-full"
                      >
                        {item.tag ? (
                          <BorderedButton text="Choose Plan" />
                        ) : (
                          <GardientButton text="Choose Plan" />
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ===== FAQ Section ===== */}
          <motion.div variants={sectionVariants}>
            <h2 className="md:text-[2.9vw] sm:text-[3.9vw] xs:text-[5.9vw] font-fira-code font-semibold text-center">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>

            <motion.div
              variants={containerVariants}
              className="md:max-w-[60%] h-full mx-auto md:mt-[2.5vw] sm:mt-[3.5vw] xs:mt-[4.5vw] flex flex-col gap-[1vw]"
            >
              {FAQs?.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: '0 0 10px #06b5d46c, 0 0 20px #06b5d463, 0 0 30px #06b5d442',
                  }}
                  transition={{ duration: 0.3 }}
                  className="md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] gradient-button "
                >
                  <div
                    onClick={() => toggleFAQ(idx)}
                    className="w-full h-full md:p-[1.5vw] sm:p-[2vw] xs:p-[2.5vw] bg-theme-dark md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] cursor-pointer"
                  >
                    <div className="w-full flex items-center justify-between">
                      <h2 className="md:text-[1.5vw] sm:text-[2.5vw] xs:text-[4.5vw] font-semibold">
                        {item?.question}
                      </h2>
                      <motion.span
                        animate={{ rotate: activeIndex === idx ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:text-[2vw] sm:text-[3vw] xs:text-[5vw] text-theme-cyan"
                      >
                        <IoChevronDown />
                      </motion.span>
                    </div>

                    <AnimatePresence mode="wait">
                      {activeIndex === idx && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                          <p className="md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] text-gray-400 md:mt-[1vw] sm:mt-[2vw] xs:mt-[3vw]">
                            {item?.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default PricingPlan
