import { body, validationResult } from 'express-validator'
import pool from '../db.config.js'
import { uploadToS3, deleteFromS3 } from '../Utils/UploadToS3.js'
import { safeParse } from '../Utils/SafeParser.js'

export const AddProjectValidation = [
  body('title').notEmpty().withMessage('Project title is required'),
  body('slug').notEmpty().withMessage('Slug is required'),
  body('shortDesc').notEmpty().withMessage('Short description is required'),

  body('repoLink').optional().isURL().withMessage('Repository link must be a valid URL'),
  body('category').notEmpty().withMessage('Category is required'),
  body('visibility').notEmpty().withMessage('Visibility is required'),
]

export const UpdateProjectValidation = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('slug').optional().notEmpty().withMessage('Slug cannot be empty'),
  body('shortDesc').optional().notEmpty().withMessage('Short description cannot be empty'),
  body('repoLink').optional().isURL().withMessage('Repository link must be a valid URL'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  body('visibility').optional().notEmpty().withMessage('Visibility cannot be empty'),
]

export const addOrUpdateProject = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errorCode: 'VALIDATION_ERROR',
      errors: errors.array(),
    })
  }

  const uploadedKeys = []
  const isUpdate = Boolean(req.params?.id)
  const projectId = req.params.id

  let {
    title,
    slug,
    shortDesc,
    content,
    repoLink,
    liveDemo,
    heroImageOBJ,
    ogProjectImageOBJ,
    galleryOBJS,
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
    isHeroImageRemoved,
    isOgImageRemoved,
    isGalleryRemoved,
  } = req.body

  try {
    if (typeof techStack === 'string') techStack = safeParse(techStack)
    if (typeof tag === 'string') tag = safeParse(tag)
    if (typeof metaKeywords === 'string') metaKeywords = safeParse(metaKeywords)
    if (typeof galleryOBJS === 'string') galleryOBJS = safeParse(galleryOBJS)
    if (typeof heroImageOBJ === 'string') heroImageOBJ = safeParse(heroImageOBJ)
    if (typeof ogProjectImageOBJ === 'string') ogProjectImageOBJ = safeParse(ogProjectImageOBJ)

    if (typeof isHeroImageRemoved === 'string') isHeroImageRemoved = safeParse(isHeroImageRemoved)
    if (typeof isOgImageRemoved === 'string') isOgImageRemoved = safeParse(isOgImageRemoved)
    if (typeof isGalleryRemoved === 'string') isGalleryRemoved = safeParse(isGalleryRemoved)

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

    const heroImageObj = {
      url: heroImageResult?.url || heroImageOBJ?.url || null,
      key: heroImageResult?.key || heroImageOBJ?.key || null,
    }
    const ogImageObj = {
      url: ogImageResult?.url || ogProjectImageOBJ?.url || null,
      key: ogImageResult?.key || ogProjectImageOBJ?.key || null,
    }
    const galleryObjs = galleryResults.length
      ? galleryResults.map(item => {
          return {
            key: item.key,
            url: item.url,
          }
        })
      : galleryOBJS || []

    uploadedKeys.push(
      heroImageResult?.key,
      ogImageResult?.key,
      ...galleryResults.map(item => item.key || [])
    )

    if (isUpdate) {
      // if user removed hero image
      if (isHeroImageRemoved && !req.files?.heroImage?.[0] && heroImageOBJ?.key) {
        await deleteFromS3(heroImageOBJ.key).catch(err =>
          console.error('Prev Hero delete failed:', err)
        )
      }

      // if user removed og image
      if (isOgImageRemoved && !req.files?.ogProjectImage?.[0] && ogProjectImageOBJ?.key) {
        await deleteFromS3(ogProjectImageOBJ.key).catch(err =>
          console.error('Prev OG delete failed:', err)
        )
      }
      if (isGalleryRemoved && !req.files?.gallery?.length && galleryOBJS?.length) {
        for (const img of galleryOBJS) {
          if (img?.key)
            await deleteFromS3(img.key).catch(err => console.error('Gallery delete failed:', err))
        }
      }

      if (req.files?.heroImage?.[0]) {
        await deleteFromS3(heroImageOBJ?.key).catch(err =>
          console.error('Prev Hero Image delete failed:', err)
        )
      }
      if (req.files?.ogProjectImage?.[0]) {
        await deleteFromS3(ogProjectImageOBJ?.key).catch(err =>
          console.error('Prev Og Image delete failed:', err)
        )
      }
      if (req.files?.gallery?.length) {
        for (const item of galleryOBJS || []) {
          await deleteFromS3(item?.key).catch(err =>
            console.error('Prev Gallery delete failed:', err)
          )
        }
      }

      // ✅ Normalize image states before DB update

      // Hero Image
      let finalHeroImage = heroImageObj
      if (isHeroImageRemoved && !req.files?.heroImage?.[0]) {
        finalHeroImage = null
      }

      // OG Image
      let finalOgImage = ogImageObj
      if (isOgImageRemoved && !req.files?.ogProjectImage?.[0]) {
        finalOgImage = null
      }

      // Gallery
      let finalGallery = galleryObjs
      if (isGalleryRemoved && !req.files?.gallery?.length) {
        finalGallery = []
      }

      // --- 🧩 Update existing project ---
      const query = `
        UPDATE projects SET
          title = ?, slug = ?, shortDesc = ?, content = ?, repoLink = ?, liveDemo = ?, canonicalUrl = ?,
          heroImage = ?, ogProjectImage = ?, gallery = ?, techStack = ?, tag = ?, metaKeywords = ?,
          seoTitle = ?, metaDesc = ?, category = ?, status = ?, featured = ?, visibility = ?, estTime = ?
        WHERE id = ?
      `
      const values = [
        title,
        slug,
        shortDesc,
        content,
        repoLink || null,
        liveDemo || null,
        canonicalUrl || null,
        finalHeroImage ? JSON.stringify(finalHeroImage) : null,
        finalOgImage ? JSON.stringify(finalOgImage) : null,
        finalGallery?.length ? JSON.stringify(finalGallery) : JSON.stringify([]),
        JSON.stringify(Array.isArray(techStack) ? techStack : []),
        JSON.stringify(Array.isArray(tag) ? tag : []),
        JSON.stringify(Array.isArray(metaKeywords) ? metaKeywords : []),
        seoTitle || null,
        metaDesc || null,
        category,
        status,
        featured === 'true' || false,
        visibility,
        estTime || null,
        projectId,
      ]

      await pool.query(query, values)

      return res.status(200).json({
        success: true,
        message: '✅ Project updated successfully!',
      })
    } else {
      // --- 🗃️ Insert new project ---
      const query = `
        INSERT INTO projects
        (title, slug, shortDesc, content, repoLink, liveDemo, canonicalUrl, heroImage, ogProjectImage, gallery, techStack, tag, metaKeywords, seoTitle, metaDesc, category, status, featured, visibility, estTime)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

      const values = [
        title,
        slug,
        shortDesc,
        content,
        repoLink || null,
        liveDemo || null,
        canonicalUrl || null,
        JSON.stringify(heroImageObj),
        JSON.stringify(ogImageObj),
        JSON.stringify(galleryObjs),
        JSON.stringify(Array.isArray(techStack) ? techStack : []),
        JSON.stringify(Array.isArray(tag) ? tag : []),
        JSON.stringify(Array.isArray(metaKeywords) ? metaKeywords : []),
        seoTitle || null,
        metaDesc || null,
        category,
        status,
        featured === 'true' || false,
        visibility,
        estTime || null,
      ]

      await pool.query(query, values)

      return res.status(201).json({
        success: true,
        message: '🚀 Project added successfully!',
      })
    }
  } catch (error) {
    console.error('❌ Error saving project:', error)

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

export const getProjects = async (req, res) => {
  try {
    const [projects] = await pool.query('SELECT * FROM projects')

    return res.status(200).json({
      success: true,
      successCode: 'GET_PROJECTS',
      message: 'Projects fetched successfully.',
      projects,
    })
  } catch (error) {
    console.error('GET_PROJECTS_ERROR:', error)

    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}

export const deleteProject = async (req, res) => {
  const { id } = req.params

  try {
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        errorCode: 'INVALID_ID',
        message: 'Invalid project ID provided.',
      })
    }

    // ✅ Check if project exists
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id])
    const existingProject = rows[0]

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        errorCode: 'NOT_FOUND',
        message: 'Project not found!',
      })
    }

    // ✅ Helper function to safely delete from S3
    const safeDeleteFromS3 = async (key, label) => {
      try {
        if (key) await deleteFromS3(key)
      } catch (err) {
        console.warn(`⚠️ Failed to delete ${label || 'file'} from S3 (key: ${key}):`, err.message)
      }
    }

    // ✅ Delete related S3 files (if exist)
    await Promise.all([
      safeDeleteFromS3(existingProject.heroImage?.key, 'hero image'),
      safeDeleteFromS3(existingProject.ogProjectImage?.key, 'OG image'),
      ...(existingProject.gallery
        ? existingProject.gallery.map(item => safeDeleteFromS3(item?.key, `gallery image`))
        : []),
    ])

    // ✅ Delete project
    const [deleteResult] = await pool.query('DELETE FROM projects WHERE id = ?', [id])

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        errorCode: 'NOT_FOUND',
        message: 'Project could not be deleted (already removed or missing).',
      })
    }

    return res.status(200).json({
      success: true,
      message: '✅ Project deleted successfully!',
    })
  } catch (error) {
    console.error('❌ DELETE_PROJECT_ERROR:', error)

    // ✅ Handle MySQL constraint issues
    if (error?.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        success: false,
        errorCode: 'SQL_FOREIGN_KEY_CONSTRAINT',
        message:
          'Cannot delete this project because it is referenced by another record (foreign key constraint).',
      })
    }

    // ✅ Generic error
    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error — please try again later.',
    })
  }
}
