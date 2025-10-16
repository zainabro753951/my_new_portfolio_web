import AboutPage from '../pages/About/AboutPage'
import HomePage from '../pages/home/HomePage'
import ProjectsPage from '../pages/Projects/ProjectsPage'
import ReviewsPage from '../pages/Reviews/ReviewsPage'
import ServicesPage from '../pages/Services/ServicesPage'

const allRoutes = [
  {
    element: <HomePage />,
    path: '/',
  },
  {
    element: <AboutPage />,
    path: '/about',
  },
  {
    element: <ServicesPage />,
    path: '/services',
  },
  {
    element: <ProjectsPage />,
    path: '/projects',
  },
  {
    element: <ReviewsPage />,
    path: '/reviews',
  },
]

export default allRoutes
