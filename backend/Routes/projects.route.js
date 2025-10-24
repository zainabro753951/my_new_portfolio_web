import { Router } from 'express'
import { addProject, AddProjectValidation } from '../Controllers/project.controller.js'
import { upload } from '../middlewares/multerUpload.js'
const router = Router()
import { SecureRoute } from '../middlewares/SecureRoute.js'

// Add Project
router.post(
  '/project/add',
  upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'ogProjectImage', maxCount: 1 },
    { name: 'gallery', maxCount: 12 },
  ]),
  SecureRoute,
  AddProjectValidation,
  addProject
)

export default router
