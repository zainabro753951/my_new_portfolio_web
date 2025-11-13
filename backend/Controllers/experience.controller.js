import pool from '../db.config.js'
import { validationResult, body } from 'express-validator'
import { uploadToS3, deleteFromS3 } from '../Utils/UploadToS3.js'
import { safeParse } from '../Utils/SafeParser.js'

/* ✅ Validation Schema */
export const experienceValidation = [
  body('position').trim().notEmpty().withMessage('Position is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('startedAt').notEmpty().withMessage('Start date is required'),
  body('currentlyWorking').isBoolean().withMessage('Currently working must be a boolean'),
  body('description').trim().notEmpty().withMessage('Description is required'),
]

/* ✅ Controller: Add or Update Experience */
export const addExp = async (req, res) => {
  // 🧩 Validate Request Fields
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errorCode: 'VALIDATION_ERROR',
      message: errors.array()[0].msg,
      errors: errors.array(),
    })
  }

  let {
    isUpdate,
    expId,
    position,
    company,
    employmentType,
    startedAt,
    endDate,
    currentlyWorking,
    description,
    technologies,
    companyLogoOBJ,
  } = req.body

  if (typeof companyLogoOBJ === 'string') companyLogoOBJ = safeParse(companyLogoOBJ)

  let newLogoObj = null

  try {
    // ✅ Normalize working status and dates
    const isCurrentlyWorking = currentlyWorking === 'true'
    const normalizedEndDate = isCurrentlyWorking ? null : endDate
    isUpdate = isUpdate === 'true'

    // 🖼️ Upload company logo (if file provided)
    if (req.file) {
      const uploaded = await uploadToS3(req.file, 'company-logos')
      newLogoObj = {
        url: uploaded?.url,
        key: uploaded?.key,
      }
    }

    // ✅ ADD Experience
    if (!isUpdate) {
      const [result] = await pool.query(
        `
        INSERT INTO work_experience
        (position, company, employmentType, startedAt, endDate, currentlyWorking, description, technologies, companyLogo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          position,
          company,
          employmentType || 'Full-time',
          startedAt,
          normalizedEndDate, // ✅ auto null if currently working
          isCurrentlyWorking,
          description,
          technologies || null,
          JSON.stringify(newLogoObj),
        ]
      )

      return res.status(201).json({
        success: true,
        message: 'Experience added successfully!',
        expId: result.insertId,
      })
    }

    // ✅ UPDATE Experience
    if (isUpdate && expId) {
      // 🗑️ Delete old logo if a new one is uploaded
      if (req.file && companyLogoOBJ?.key) {
        try {
          await deleteFromS3(companyLogoOBJ.key)
        } catch (e) {
          console.warn(`⚠️ Failed to delete old logo from S3: ${e.message}`)
        }
      }

      const logoToSave = newLogoObj || companyLogoOBJ || null
      console.log(currentlyWorking)

      const [result] = await pool.query(
        `
        UPDATE work_experience
        SET
          position = ?,
          company = ?,
          employmentType = ?,
          startedAt = ?,
          endDate = ?,
          currentlyWorking = ?,
          description = ?,
          technologies = ?,
          companyLogo = ?,
          updatedAt = NOW()
        WHERE id = ?
        `,
        [
          position,
          company,
          employmentType || 'Full-time',
          startedAt,
          normalizedEndDate, // ✅ auto null if currently working
          isCurrentlyWorking,
          description,
          technologies || null,
          JSON.stringify(logoToSave),
          expId,
        ]
      )

      if (result.affectedRows === 0) {
        // 🧹 Cleanup new logo if experience not found
        if (newLogoObj?.key) {
          await deleteFromS3(newLogoObj.key).catch(e =>
            console.warn(`⚠️ Cleanup failed for new logo: ${e.message}`)
          )
        }

        return res.status(404).json({
          success: false,
          message: 'Experience not found!',
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Experience updated successfully!',
      })
    }

    // ❌ Invalid request
    return res.status(400).json({
      success: false,
      message: 'Invalid request parameters!',
    })
  } catch (error) {
    console.error('❌ Error in addExp:', error)

    // 🧹 Cleanup new upload if something fails
    if (newLogoObj?.key) {
      await deleteFromS3(newLogoObj.key).catch(e => console.warn(`⚠️ Cleanup failed: ${e.message}`))
    }

    res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}

// Controller: Get all experiences
export const getExp = async (req, res) => {
  try {
    // 🧠 Fetch data from DB (ordered by most recent first)
    const [rows] = await pool.query(
      `
      SELECT * FROM work_experience ORDER BY startedAt DESC
      `
    )

    // 🟢 Success Response
    return res.status(200).json({
      success: true,
      total: rows.length,
      experiences: rows,
    })
  } catch (error) {
    console.error('Error in getExp:', error)
    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}

export const deleteExp = async (req, res) => {
  const { id } = req.params
  try {
    // ✅ Check if Experience exists
    const [existingExp] = await pool.query('SELECT * FROM work_experience WHERE id = ?', [id])

    if (existingExp.length === 0) {
      return res.status(404).json({
        success: false,
        errorCode: 'NOT_FOUND',
        message: 'Experience not found!',
      })
    }

    if (existingExp?.companyLogo) {
      await deleteFromS3(existingExp?.companyLogo?.key).catch(e =>
        console.log(`Company Image failed to delete ${e}`)
      )
    }

    // ✅ Delete Experience
    await pool.query('DELETE FROM work_experience WHERE id = ?', [id])

    return res.status(200).json({
      success: true,
      message: 'Experience deleted successfully!',
    })
  } catch (error) {
    console.error('DELETE_EXP_ERROR:', error)

    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}
