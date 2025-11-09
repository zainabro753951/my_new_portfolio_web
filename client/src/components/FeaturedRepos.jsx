import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { colorGuess } from '../Utils/Utils'
import GardientButton from './GardientButton'
import { useSelector } from 'react-redux'
import FeaturedReposSkeleton from './FeaturedRepoSkeleton'
import { Link } from 'react-router-dom'

// Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: 'easeOut',
      duration: 0.6,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.6,
    },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.6,
    },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.6,
    },
  },
}

const FeaturedRepos = () => {
  const { projects, isLoading } = useSelector(state => state.projects)
  const [isPageReady, setIsPageReady] = useState(false)

  // ⏳ Wait until loading finishes before animating
  useEffect(() => {
    if (!isLoading && projects?.length > 0) {
      // Small delay for smooth transition after skeleton disappears
      const timeout = setTimeout(() => setIsPageReady(true), 200)
      return () => clearTimeout(timeout)
    }
  }, [isLoading, projects])
  const repos = [
    {
      img: '/imgs/projects/project1.jpg',
      title: 'Inventory System',
      desc: 'A comprehensive real-time inventory tracking system built for a mid-sized logistics company, reducing manual errors by 85% and improving operational efficiency.',
      techStack: 'JavaScript',
      liveLink: 'http://mainassistant-1.onrender.com',
      repoLink: 'https://github.com',
    },
    {
      img: '/imgs/projects/project2.jpg',
      title: 'Task Manager',
      desc: 'A collaborative task management app with real-time updates and notifications, designed to streamline team workflows.',
      techStack: 'TypeScript',
      liveLink: 'http://mainassistant-1.onrender.com',
      repoLink: 'https://github.com',
    },
    {
      img: '/imgs/projects/project3.jpg',
      title: 'Social Dashboard',
      desc: 'A dashboard for tracking social media analytics and engagement, providing actionable insights for marketing teams.',
      techStack: 'Python',
      liveLink: 'http://mainassistant-1.onrender.com',
      repoLink: 'https://github.com',
    },
  ]

  if (isLoading || !isPageReady) return <FeaturedReposSkeleton />
  console.log(projects)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="md:py-[8vw] sm:py-[9vw] xs:py-[10vw] md:px-[2.5vw] sm:px-[3vw] xs:px-[3.5vw] bg-theme-dark w-full min-h-screen text-white font-inter"
    >
      <motion.h2
        variants={titleVariants}
        className="md:text-[2.9vw] sm:text-[3.9vw] xs:text-[5.9vw] font-fira-code font-semibold text-center"
      >
        Featured <span className="gradient-text">Repositories</span>
      </motion.h2>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        className="md:my-[1.5vw] sm:my-[2.5vw] xs:my-[3.5vw] grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw] place-items-start"
      >
        {projects.map((item, idx) => {
          console.log(item)
          const color = colorGuess(item.techStack[0]?.name)

          return (
            <>
              <Link key={idx} to={`/projects/${item?.slug}/${item?.id}`}>
                <motion.div
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: '0 0 10px #06b5d46c, 0 0 20px #06b5d463, 0 0 30px #06b5d442',
                  }}
                  transition={{ duration: 0.3 }}
                  variants={cardVariants}
                  className="md:p-[0.2vw] sm:p-[0.4vw] xs:p-[0.8vw] md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] gradient-button "
                >
                  <div className="w-full h-full md:p-[1.5vw] sm:p-[2vw] xs:p-[2.5vw] bg-theme-dark md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw] flex flex-col md:gap-[1vw] sm:gap-[1.5vw] xs:gap-[2vw]">
                    <motion.div
                      className="md:w-full md:h-[20vw] sm:h-[30vw] xs:h-[40vw]"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <img
                        src={item?.heroImage?.url || '/imgs/elementor-placeholder-image.png'}
                        className="w-full h-full object-cover"
                        alt={item?.title || 'Default Image'}
                      />
                    </motion.div>

                    <h2 className="md:text-[1.6vw] sm:text-[2.6vw] xs:text-[4.6vw] font-semibold font-fira-code">
                      {item.title}
                    </h2>

                    <p className="md:text-[1.2vw] sm:text-[2.2vw] xs:text-[4.2vw] text-gray-400">
                      {item.shortDesc}
                    </p>

                    <div className="w-full h-full flex flex-col justify-between md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]">
                      <div className="md:text-[1.2vw] sm:text-[2.2vw] xs:text-[4.2vw] text-gray-400 flex items-center gap-2">
                        <div
                          className="md:w-[1.2vw] md:h-[1.2vw] sm:w-[2.2vw] sm:h-[2.2vw] xs:w-[3.3vw] xs:h-[3.3vw] rounded-full"
                          style={{ backgroundColor: color }}
                        ></div>
                        <p>{item.techStack[0]?.name}</p>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <a
                          href={item.liveLink}
                          target="_blank"
                          className="md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] hover:text-theme-purple"
                        >
                          Live Demo
                        </a>
                        <a
                          href={item.repoLink}
                          target="_blank"
                          className="md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] hover:text-theme-purple"
                        >
                          Repository
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </>
          )
        })}
      </motion.div>

      {/* Button */}
      <motion.div
        variants={buttonVariants}
        className="w-full flex items-center justify-center md:mt-[2.5vw] sm:mt-[3.5vw] xs:mt-[4.5vw] md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw]"
      >
        <GardientButton text="See All Projects" />
      </motion.div>
    </motion.div>
  )
}

export default FeaturedRepos
