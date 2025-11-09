import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearProject, projectFindById } from '../../../features/projectSlice'
import Header from '../../../components/Header'
import ProjectHero from './ProjectHero'
import ProjectContent from './ProjectContent'
import Footer from '../../../components/Footer'

const ProjectPage = () => {
  const { projectSlug, id } = useParams()
  const { project, isLoading: projectLoading } = useSelector(state => state.projects)
  const [isLoading, setIsLoading] = useState(false)
  const [projectData, setProjectData] = useState({})
  const [projectContent, setProjectContent] = useState('')
  const dispatch = useDispatch()

  // Load project when projectSlug or id changes
  useEffect(() => {
    if (!projectSlug || !id) {
      setIsLoading(false)
      dispatch(clearProject())
      return
    }

    setIsLoading(true)
    dispatch(projectFindById(Number(id)))
    setIsLoading(false)
  }, [projectSlug, id, dispatch, projectLoading])

  // Update local state when project changes
  useEffect(() => {
    if (!project) {
      setProjectData({})
      setProjectContent('')
      return
    }

    const { content = '', ...rest } = project
    setProjectData(rest)
    setProjectContent(content)
  }, [project])

  return (
    <>
      <Header />
      <ProjectHero isLoading={isLoading || projectLoading} projectData={projectData} />
      <ProjectContent isLoading={isLoading || projectLoading} projectContent={projectContent} />
      <Footer />
    </>
  )
}

export default ProjectPage
