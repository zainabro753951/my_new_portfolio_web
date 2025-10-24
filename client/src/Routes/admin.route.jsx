import DEducPage from '../pages/admin/DEducation/DEducPage'
import DPricingPlanPage from '../pages/admin/DPricingPlan/DPricingPlanPage'
import DSiteSettingsPage from '../pages/admin/DSiteSettings/DSiteSettingsPage'
import DTestimonialPage from '../pages/admin/DTestimonial/DTestimonialPage'
import DAboutPage from '../pages/admin/DAbout/DAboutPage'
import DProjectsPage from '../pages/admin/DProjects/DProjectsPage'
import DAddProjectPage from '../pages/admin/DAddProject/DAddProjectPage'
import DSkillsPage from '../pages/admin/DSkills/DSkillsPage'

export const adminRoutes = [
  {
    path: 'projects',
    elem: <DProjectsPage />,
  },
  {
    path: 'add-project',
    elem: <DAddProjectPage />,
  },
  {
    path: 'about',
    elem: <DAboutPage />,
  },
  {
    path: 'skills',
    elem: <DSkillsPage />,
  },
  {
    path: 'education',
    elem: <DEducPage />,
  },
  {
    path: 'testimonials',
    elem: <DTestimonialPage />,
  },
  {
    path: 'pricing-plan',
    elem: <DPricingPlanPage />,
  },
  {
    path: 'site-settings',
    elem: <DSiteSettingsPage />,
  },
]
