import { motion } from 'motion/react'
import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import DTestimonialForm from './components/DTestimonialForm'

const DTestimonialPage = () => {
  return (
    <>
      <section className="md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:my-[2vw] sm:my-[3vw] xs:my-[5vw] space-y-[2vw]">
        {/* Testimonial Form */}
        <DTestimonialForm />
      </section>
    </>
  )
}

export default DTestimonialPage
