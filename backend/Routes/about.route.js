import { Router } from 'express'
import { AddAbout, AddAboutValidator, getAbout } from '../Controllers/about.controller.js'
import { SecureRoute } from '../middlewares/SecureRoute.js'
const router = Router()
import { upload } from '../middlewares/multerUpload.js'

// Add About
router.post('/about/add', upload.single('aboutImage'), AddAboutValidator, SecureRoute, AddAbout)

// Get About
router.get('/about/get', getAbout)

export default router
