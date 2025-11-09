import pool from '../db.config.js'
import { body, validationResult } from 'express-validator'
import { deleteFromS3, uploadToS3 } from '../Utils/UploadToS3.js'
import { safeParse } from '../Utils/SafeParser.js'

export const AddEducationValidation = [
  body('institutionName').notEmpty().withMessage('Institution name is required!'),

  body('degree').notEmpty().withMessage('Degree is required!'),

  body('fieldStudy').notEmpty().withMessage('Field of study is required!'),

  body('grade').notEmpty().withMessage('Grade is required!'),

  body('startYear').notEmpty().withMessage('Start year is required!'),

  body('location').notEmpty().withMessage('Location is required!'),

  body('eduDesc').notEmpty().withMessage('Education description is required!'),
]

export const addEducation = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errorCode: 'VALIDATION_ERROR',
      errors: errors.array(),
    })
  }

  let {
    institutionName,
    degree,
    fieldStudy,
    grade = null,
    startYear,
    endYear = null,
    location = null,
    eduDesc = null,
    certificateOBJ,
    isUpdate,
    educationId,
  } = req.body
  isUpdate = isUpdate === 'true'

  if (typeof certificateOBJ === 'string') certificateOBJ = safeParse(certificateOBJ)

  let certificateObj = {}

  try {
    // ---------- Upload new certificate if provided ----------
    if (req.file) {
      const uploadedCertificate = await uploadToS3(req.file, 'certificate')
      certificateObj = {
        key: uploadedCertificate?.key || certificateOBJ?.key || null,
        url: uploadedCertificate?.url || certificateOBJ?.url || null,
      }
    }

    // ---------- Update logic ----------
    if (isUpdate) {
      // Fetch existing education record
      const [existingEducation] = await pool.query('SELECT * FROM education WHERE id = ?', [
        educationId,
      ])

      if (!existingEducation.length) {
        // Delete newly uploaded certificate if record doesn't exist
        if (req.file && certificateObj?.key) await deleteFromS3(certificateObj?.key)
        return res.status(404).json({
          success: false,
          errorCode: 'NOT_FOUND',
          message: 'Education record not found!',
        })
      }

      // Delete old certificate if replaced
      let oldCertificate = {}
      try {
        oldCertificate =
          typeof existingEducation[0]?.certificate === 'string'
            ? JSON.parse(existingEducation[0].certificate)
            : existingEducation[0]?.certificate || {}
      } catch {
        oldCertificate = {}
      }

      if (req.file && oldCertificate?.key) await deleteFromS3(oldCertificate.key)

      // Update record
      const [updateResult] = await pool.query(
        `UPDATE education
         SET institutionName = ?, degree = ?, fieldStudy = ?, grade = ?,
             startYear = ?, endYear = ?, location = ?, eduDesc = ?, certificate = ?
         WHERE id = ?`,
        [
          institutionName,
          degree,
          fieldStudy,
          grade,
          startYear,
          endYear,
          location,
          eduDesc,
          JSON.stringify(certificateObj && certificateObj),
          educationId,
        ]
      )

      if (!updateResult.affectedRows) {
        if (certificateObj?.key) await deleteFromS3(certificateObj.key)
        return res.status(500).json({
          success: false,
          errorCode: 'UPDATE_FAILED',
          message: 'Failed to update education record.',
        })
      }

      return res.status(200).json({
        success: true,
        successCode: 'ENTRY_UPDATED',
        message: 'Education successfully updated.',
      })
    }

    // ---------- Insert logic ----------
    const [existing] = await pool.query(
      'SELECT 1 FROM education WHERE degree = ? AND fieldStudy = ? AND institutionName = ?',
      [degree, fieldStudy, institutionName]
    )

    if (existing.length > 0) {
      if (certificateObj?.key) await deleteFromS3(certificateObj.key)
      return res.status(400).json({
        success: false,
        errorCode: 'ENTRY_EXISTS',
        message: 'Education already registered!',
      })
    }

    const [results] = await pool.query(
      `INSERT INTO education
       (institutionName, degree, fieldStudy, grade, startYear, endYear, location, eduDesc, certificate)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        institutionName,
        degree,
        fieldStudy,
        grade,
        startYear,
        endYear,
        location,
        eduDesc,
        JSON.stringify(certificateObj && certificateObj),
      ]
    )

    if (!results.affectedRows) {
      if (certificateObj?.key) await deleteFromS3(certificateObj.key)
      return res.status(500).json({
        success: false,
        errorCode: 'INSERT_FAILED',
        message: 'Failed to register education.',
      })
    }

    res.status(201).json({
      success: true,
      successCode: 'ENTRY_REGISTERED',
      message: 'Education successfully registered.',
    })
  } catch (error) {
    console.error('Add/Update education error:', error)
    if (certificateObj?.key) await deleteFromS3(certificateObj.key)
    res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}

export const getEducation = async (req, res) => {
  try {
    const [education] = await pool.query('SELECT * FROM education')

    return res.status(200).json({
      success: true,
      successCode: 'GET_EDUCATION',
      message: 'Education fetched successfully.',
      education,
    })
  } catch (error) {
    console.error('GET_EDUCATION_ERROR:', error)

    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}

export const deleteEducation = async (req, res) => {
  const { id } = req.params
  try {
    const [educationExisting] = await pool.query('SELECT * FROM education WHERE id = ?', [id])
    if (educationExisting.length === 0) {
      return res.status(404).json({
        success: false,
        errorCode: 'NOT_FOUND',
        message: 'Education not found!',
      })
    }

    if(educationExisting?.certificate){
      await deleteFromS3(educationExisting?.certificate?.key).catch((e) => console.log("Failed to delete certificate " + e))
    }

    await pool.query('DELETE FROM education WHERE id = ?', [id])

    return res.status(200).json({
      success: true,
      message: 'Education deleted successfully!',
    })
  } catch (error) {
    console.error('DELETE_EDUCATION_ERROR:', error)

    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}
