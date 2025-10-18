import DAddProjectPage from '../Pages/DAddProject/DAddProjectPage'
import DHomePage from '../Pages/DHome/DHomePage'
import DProjectsPage from '../Pages/DProjects/DProjectsPage'

export const NRoutes = [
  {
    path: '/',
    elem: <DHomePage />,
  },
  {
    path: '/projects',
    elem: <DProjectsPage />,
  },
  {
    path: '/add-project',
    elem: <DAddProjectPage />,
  },
]
