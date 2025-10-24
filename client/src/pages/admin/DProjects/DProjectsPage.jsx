import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import ProjectSortBar from './components/ProjectSortBar'
import ProjectStatsCards from './components/ProjectStatsCard'
import ProjectTable from './components/ProjectTable'
import ProjectPagination from './components/ProjectPagination'
import ProjectActivity from './components/ProjectActivity'
import { motion } from 'motion/react'

const DProjectsPage = () => {
  return (
    <>
      <section className="md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:my-[2vw] sm:my-[3vw] xs:my-[5vw] space-y-[2vw]">
        <ProjectSortBar />
        <ProjectStatsCards />
        <ProjectTable />
        <ProjectPagination />
        <ProjectActivity />
      </section>
    </>
  )
}

export default DProjectsPage
