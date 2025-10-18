import React from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const RecentActivity = () => {
  const activities = [
    { id: 1, type: 'Project', content: 'E-commerce UI published', date: '2 days ago' },
    { id: 2, type: 'Project', content: 'Landing page draft created', date: '3 days ago' },
    { id: 3, type: 'Message', content: 'New message from Ali Khan', date: '5 days ago' },
  ]

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 0 10px #06b5d46c,0 0 20px #06b5d463,0 0 30px #06b5d442',
      }}
      transition={{ duration: 0.3 }}
      className="md:w-full md:p-[2vw] sm:p-[3vw] xs:p-[4vw] md:rounded-[1vw] sm:rounded-[1.5vw] xs:rounded-[2vw]
                        bg-gradient-to-br from-[#0a0a2a]/60 to-[#101040]/30
                 border border-white/20 backdrop-blur-2xl overflow-auto max-h-[70vh]"
    >
      <h4 className="md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] font-semibold md:mb-[1vw] sm:mb-[2vw] xs:mb-[3vw]">
        Recent Activity
      </h4>
      <ul className="flex flex-col gap-1">
        {activities.map(act => (
          <li
            key={act.id}
            className="flex justify-between items-center md:text-[1vw] sm:text-[2vw] xs:text-[4vw] text-gray-300 hover:bg-white/10 p-2 rounded-md transition-all"
          >
            <div>
              <span className="font-semibold">{act.type}:</span> {act.content}
            </div>
            <span className="text-gray-400 text-xs md:text-[0.8vw] sm:text-[1.5vw] xs:text-[3vw]">
              {act.date}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default RecentActivity
