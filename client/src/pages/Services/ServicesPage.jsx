import React from 'react'
import CustomCursor from '../../components/CustomCursor'
import Header from '../../components/Header'
import ServicesHero from './components/ServicesHero'
import AllServices from './components/AllServices'
import HowIWork from './components/HowIWork'
import NextProject from './components/NextProject'
import Footer from '../../components/Footer'
import HeroSection from '../../components/HeroSection'

const ServicesPage = () => {
  return (
    <>
      <CustomCursor />
      <Header />
      <HeroSection
        title="Our"
        gardient_title="Services"
        desc="As a Full Stack Developer, I offer end-to-end solutions to build scalable, user-focused
            web applications using modern technologies like React, Node.js, AWS, and more."
      />
      <AllServices />
      <HowIWork />
      <NextProject />
      <Footer />
    </>
  )
}

export default ServicesPage
