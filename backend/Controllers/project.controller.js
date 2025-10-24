import { body, validationResult } from 'express-validator'
import pool from '../db.config.js'
import { uploadToS3, deleteFromS3 } from '../Utils/UploadToS3.js'

export const AddProjectValidation = [
  // 🔹 Title
  body('title')
    .notEmpty()
    .withMessage('Project title is required')
    .isLength({ min: 5 })
    .withMessage('Project title must be at least 5 characters long'),

  // 🔹 Slug
  body('slug')
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug must contain only lowercase letters, numbers, and hyphens'),

  // 🔹 Short Description
  body('shortDesc')
    .notEmpty()
    .withMessage('Short description is required')
    .isLength({ min: 10, max: 200 })
    .withMessage('Short description must be between 10 and 200 characters'),

  // 🔹 Long Description
  body('longDesc')
    .notEmpty()
    .withMessage('Long description is required')
    .isLength({ min: 50 })
    .withMessage('Long description must be at least 50 characters long'),

  // 🔹 Repository Link
  body('repoLink').optional().isURL().withMessage('Repository link must be a valid URL'),

  // 🔹 Category
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isString()
    .withMessage('Category must be a string'),

  // 🔹 Visibility
  body('visibility')
    .notEmpty()
    .withMessage('Visibility is required')
    .isIn(['public', 'private', 'unlisted'])
    .withMessage('Visibility must be either "public" or "private"'),

  // 🔹 Estimated Time
  body('estTime')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Estimated time must be a positive integer'),

  body('metaTitle')
    .optional()
    .isLength({ min: 5, max: 60 })
    .withMessage('Meta title must be between 5 and 60 characters'),

  // 🔹 Meta Description
  body('metaDesc')
    .optional()
    .isLength({ min: 60, max: 160 })
    .withMessage('Meta description must be between 10 and 160 characters'),

  // 🔹 Canonical URL
  body('canonicalUrl').optional().isURL().withMessage('Canonical URL must be a valid URL'),
]

export const addProject = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errorCode: 'VALIDATION_ERROR',
      errors: errors.array(),
    })
  }

  const uploadedKeys = []

  try {
    const {
      title,
      slug,
      shortDesc,
      longDesc,
      repoLink,
      liveDemo,
      techStack,
      tag,
      metaKeywords,
      category,
      status,
      featured,
      visibility,
      estTime,
      seoTitle,
      metaDesc,
      canonicalUrl,
    } = req.body

    // 🧠 1️⃣ Check for duplicate title or slug before uploading files
    const [existing] = await pool.query(
      `SELECT id FROM projects WHERE title = ? OR slug = ? LIMIT 1`,
      [title, slug]
    )

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        errorCode: 'DUPLICATE_PROJECT',
        message: 'A project with this title or slug already exists!',
      })
    }

    // 🖼 Parallel uploads (FAST ⚡)
    const [heroImageResult, ogImageResult, galleryResults] = await Promise.all([
      req.files?.heroImage?.[0] ? uploadToS3(req.files.heroImage[0], 'projects/hero') : null,
      req.files?.ogProjectImage?.[0]
        ? uploadToS3(req.files.ogProjectImage[0], 'projects/og')
        : null,
      req.files?.gallery?.length
        ? Promise.all(req.files.gallery.map(img => uploadToS3(img, 'projects/gallery')))
        : [],
    ])

    const heroImageUrl = heroImageResult?.url || null
    const ogImageUrl = ogImageResult?.url || null
    const galleryUrls = galleryResults.map(item => item.url)

    uploadedKeys.push(
      heroImageResult?.key,
      ogImageResult?.key,
      ...galleryResults.map(item => item.key)
    )

    // --- 🗃️ Insert project data ---
    const query = `
      INSERT INTO projects (
        title, slug, shortDesc, longDesc, repoLink, liveDemo,
        techStack, tag, metaKeywords, category, status, featured,
        visibility, estTime, seoTitle, metaDesc, canonicalUrl,
        heroImage, ogProjectImage, gallery
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const values = [
      title,
      slug,
      shortDesc,
      longDesc,
      repoLink || null,
      liveDemo || null,
      JSON.stringify(techStack || []),
      JSON.stringify(tag || []),
      JSON.stringify(metaKeywords || []),
      category,
      status,
      featured === 'true' || false,
      visibility,
      estTime || null,
      seoTitle || null,
      metaDesc || null,
      canonicalUrl || null,
      heroImageUrl,
      ogImageUrl,
      JSON.stringify(galleryUrls),
    ]

    await pool.query(query, values)

    return res.status(201).json({
      success: true,
      message: '🚀 Project added successfully!',
    })
  } catch (error) {
    console.error('❌ Error adding project:', error)

    // 🔥 Rollback files if failed
    for (const key of uploadedKeys.filter(Boolean)) {
      await deleteFromS3(key).catch(err => console.error('Rollback delete failed:', err))
    }

    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}
