import pool from '../db.config.js'
import { body } from 'express-validator'

import { deleteFromS3, uploadToS3 } from '../Utils/UploadToS3.js'

export const AddAboutValidator = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),

  body('shortRole').trim().notEmpty().withMessage('Role is required'),

  body('shortDesc').trim().notEmpty().withMessage('Short description is required'),

  body('longDesc').trim().notEmpty().withMessage('Long description is required'),
]

export const AddAbout = async (req, res) => {
  let aboutImageKey = ''
  try {
    const { fullName, shortRole, shortDesc, longDesc } = req.body
    const aboutImageUrl = await uploadToS3(req.file, 'about')
    aboutImageKey = aboutImageUrl?.key

    const [results] = await pool.query(
      'INSERT INTO about (fullName, shortRole, shortDesc, longDesc, aboutImage) VALUES (?, ?, ?, ?, ?)',
      [fullName, shortRole, shortDesc, longDesc, aboutImageUrl?.url]
    )

    if (results.affectedRows) {
      res.status(201).json({
        success: true,
        successCode: 'ABOUT_CREATED',
        message: 'About successfully created.',
      })
    }
  } catch (error) {
    console.log(error)

    await deleteFromS3(aboutImageKey).catch(err => console.error('Rollback delete failed:', err))

    res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}
