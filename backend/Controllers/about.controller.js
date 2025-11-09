import pool from '../db.config.js'
import { body } from 'express-validator'

import { deleteFromS3, uploadToS3 } from '../Utils/UploadToS3.js'
import { safeParse } from '../Utils/SafeParser.js'

export const AddAboutValidator = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),

  body('shortRole').trim().notEmpty().withMessage('Role is required'),

  body('shortDesc').trim().notEmpty().withMessage('Short description is required'),

  body('longDesc').trim().notEmpty().withMessage('Long description is required'),
]

export const AddAbout = async (req, res) => {
  let aboutImageKey = ''

  try {
    let { fullName, shortRole, shortDesc, longDesc, isUpdate, aboutImageOBJ, isAboutImageRemoved } =
      req.body

    // ✅ Fix: Convert isUpdate isImageRemoved string → boolean
    isUpdate = isUpdate === 'true'

    // ✅ Safe parse existing image object if it's a string
    if (typeof aboutImageOBJ === 'string') aboutImageOBJ = safeParse(aboutImageOBJ)
    if (typeof isAboutImageRemoved === 'string')
      isAboutImageRemoved = safeParse(isAboutImageRemoved)

    console.log(true)

    // ✅ Upload new file if provided
    let aboutImageUrl = null
    if (req.file) {
      aboutImageUrl = await uploadToS3(req.file, 'about')
      aboutImageKey = aboutImageUrl?.key || ''
    }

    // ✅ Merge image data (existing + new)
    const aboutImgOBJ = {
      key: aboutImageUrl?.key || aboutImageOBJ?.key || null,
      url: aboutImageUrl?.url || aboutImageOBJ?.url || null,
    }

    if (isUpdate) {
      if (isAboutImageRemoved && !req.file && aboutImageOBJ?.key) {
        await deleteFromS3(aboutImageOBJ?.key).catch(err =>
          console.error('Rollback delete failed:', err)
        )
      }
      // 🔹 Update existing record
      const [existingAbout] = await pool.query('SELECT id FROM about LIMIT 1')
      if (existingAbout.length === 0) {
        // 🔹 Rollback S3 upload if DB fails
        if (aboutImageKey) {
          await deleteFromS3(aboutImageKey).catch(err =>
            console.error('Rollback delete failed:', err)
          )
        }
        return res.status(404).json({
          success: false,
          errorCode: 'ABOUT_NOT_FOUND',
          message: 'No about record found to update.',
        })
      }

      if (req.file) {
        await deleteFromS3(aboutImageOBJ?.key).catch(err =>
          console.error('Prev About Image delete failed:', err)
        )
      }

      const aboutId = existingAbout[0].id

      let finalAboutImageObj = aboutImgOBJ
      if (isAboutImageRemoved && !req.file) {
        finalAboutImageObj = null
      }

      const [updateResult] = await pool.query(
        'UPDATE about SET fullName = ?, shortRole = ?, shortDesc = ?, longDesc = ?, aboutImage = ? WHERE id = ?',
        [fullName, shortRole, shortDesc, longDesc, JSON.stringify(finalAboutImageObj), aboutId]
      )

      if (updateResult.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          successCode: 'ABOUT_UPDATED',
          message: 'About section updated successfully.',
        })
      }
    } else {
      // 🔹 Insert new record
      const [results] = await pool.query(
        'INSERT INTO about (fullName, shortRole, shortDesc, longDesc, aboutImage) VALUES (?, ?, ?, ?, ?)',
        [fullName, shortRole, shortDesc, longDesc, JSON.stringify(aboutImgOBJ)]
      )

      if (results.affectedRows > 0) {
        return res.status(201).json({
          success: true,
          successCode: 'ABOUT_CREATED',
          message: 'About successfully created.',
        })
      }
    }

    // 🔹 If no changes were made
    return res.status(400).json({
      success: false,
      errorCode: 'NO_CHANGES',
      message: 'No changes were made.',
    })
  } catch (error) {
    console.error('ADD_ABOUT_ERROR:', error)

    // 🔹 Rollback S3 upload if DB fails
    if (aboutImageKey) {
      await deleteFromS3(aboutImageKey).catch(err => console.error('Rollback delete failed:', err))
    }

    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}

export const getAbout = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM about LIMIT 1')
    const about = rows[0] || null

    return res.status(200).json({
      success: true,
      successCode: 'GET_ABOUT',
      message: 'About fetched successfully.',
      about,
    })
  } catch (error) {
    console.error('GET_ABOUT_ERROR:', error)

    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}
