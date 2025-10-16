import React from 'react'
import CustomCursor from '../../components/CustomCursor'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'
import FeaturedRepos from '../../components/FeaturedRepos'
import Footer from '../../components/Footer'

const ProjectsPage = () => {
  return (
    <>
      <CustomCursor />
      <Header />
      <HeroSection
        title="Featured"
        gardient_title="Projects"
        desc="Explore my portfolio of web applications, open-source contributions, and experimental builds that reflect my passion for creating impactful digital solutions."
      />
      <FeaturedRepos />
      <Footer />
    </>
  )
}

export default ProjectsPage
