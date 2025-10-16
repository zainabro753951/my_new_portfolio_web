import React from 'react'
import Header from '../../components/Header'
import HomeHero from './components/HomeHero'
import CustomCursor from '../../components/CustomCursor'
import About from './components/About'
import Skills from '../../components/Skills'
import Working from './components/Working'
import FeaturedRepos from '../../components/FeaturedRepos'
import PricingPlan from './components/PricingPlan'
import Testimonial from '../../components/Testimonial'
import Contact from './components/Contact'
import Footer from '../../components/Footer'

const HomePage = () => {
  return (
    <>
      <CustomCursor />
      <Header />
      <HomeHero />
      <About />
      <Skills />
      <Working />
      <FeaturedRepos />
      <PricingPlan />
      <Testimonial />
      <Contact />
      <Footer />

      {/* <CodeBlock code={myCode} /> */}
    </>
  )
}

export default HomePage
