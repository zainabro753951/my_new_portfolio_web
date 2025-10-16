import React from 'react'
import CustomCursor from '../../components/CustomCursor'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'
import Testimonial from '../../components/Testimonial'
import Footer from '../../components/Footer'

const ReviewsPage = () => {
  return (
    <>
      <CustomCursor />
      <Header />
      <HeroSection
        title="Client"
        gardient_title="Testimonials"
        desc="As a Full Stack Developer, I offer end-to-end solutions to build scalable, user-focused web applications using modern technologies like React, Node.js, AWS, and more."
      />
      <Testimonial />
      <Footer />
    </>
  )
}

export default ReviewsPage
