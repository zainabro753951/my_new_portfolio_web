import React from 'react'
import CustomCursor from '../../components/CustomCursor'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Skills from '../../components/Skills'
import Experience from './components/Experience'

const AboutPage = () => {
  return (
    <>
      <CustomCursor />
      <Header />
      <Skills />
      <Experience />
      <Footer />
    </>
  )
}

export default AboutPage
