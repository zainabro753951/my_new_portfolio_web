import { configDotenv } from 'dotenv'
configDotenv()
import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
import morgan from 'morgan'

// Route Imports
import adminRoute from './Routes/admin.route.js'
import projectsRoute from './Routes/projects.route.js'
import aboutRoute from './Routes/about.route.js'
import skillsRoute from './Routes/skills.route.js'
import educationRoute from './Routes/education.route.js'
import testiRoute from './Routes/testimonials.route.js'
import pricePlanRoute from './Routes/pricePlan.route.js'
import siteSettingsRoute from './Routes/siteSettings.route.js'
import contactMsgRoute from './Routes/contactMsg.route.js'
import expRoute from './Routes/experience.route.js'
import serviceRoute from './Routes/services.route.js'
import faqsRoute from './Routes/faqs.route.js'

const app = express()
const PORT = process.env.PORT || 2500
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProduction = process.env.NODE_ENV === 'production'

/* ----------------------------------------
   ✅ 0. Trust Proxy Configuration
---------------------------------------- */
// Only trust first proxy if behind reverse proxy (like Render, Cloudflare, Heroku)
app.set('trust proxy', isProduction ? 1 : 0)

/* ----------------------------------------
   🧠 1. Helmet (Security Headers)
---------------------------------------- */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  })
)
app.disable('x-powered-by')

/* ----------------------------------------
   🚦 2. Rate Limiter (Prevent DDoS / Brute Force)
---------------------------------------- */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // max requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again after 15 minutes.',
  },
  keyGenerator: (req, res) => {
    // Use req.ip to prevent anyone bypassing with X-Forwarded-For
    return req.ip
  },
})
app.use(limiter)

/* ----------------------------------------
   🌀 3. Compression (Speed Optimization)
---------------------------------------- */
app.use(compression())

/* ----------------------------------------
   🧾 4. Morgan (HTTP Request Logger)
---------------------------------------- */
if (!isProduction) {
  app.use(morgan('dev'))
} else {
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
}

/* ----------------------------------------
   🌐 5. CORS Configuration
---------------------------------------- */
const corsOptions = {
  origin: isProduction
    ? process.env.FRONTEND_URLS?.split(',') || []
    : ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-custom-header'],
  credentials: true,
  exposedHeaders: ['x-custom-header'],
  optionsSuccessStatus: 204,
  maxAge: 86400,
}
app.use(cors(corsOptions))

/* ----------------------------------------
   ⚙️ 6. Middleware Setup
---------------------------------------- */
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

/* ----------------------------------------
   🧭 7. Routes
---------------------------------------- */
app.use(adminRoute)
app.use(projectsRoute)
app.use(aboutRoute)
app.use(skillsRoute)
app.use(educationRoute)
app.use(testiRoute)
app.use(pricePlanRoute)
app.use(siteSettingsRoute)
app.use(contactMsgRoute)
app.use(expRoute)
app.use(serviceRoute)
app.use(faqsRoute)

/* ----------------------------------------
   🩵 8. 404 + Error Handling
---------------------------------------- */
if (isProduction) {
  const clientBuildPath = path.join(__dirname, 'client', 'dist')
  app.use(express.static(clientBuildPath))

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'))
  })
}

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
})

/* ----------------------------------------
   🚀 9. Server Start
---------------------------------------- */
app.listen(PORT, () => {
  console.log(`✅ Server running securely on port ${PORT}`)
})
