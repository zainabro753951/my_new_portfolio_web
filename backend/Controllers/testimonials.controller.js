import pool from '../db.config.js'
import { body, validationResult } from 'express-validator'
import { deleteFromS3, uploadToS3 } from '../Utils/UploadToS3.js'
import { safeParse } from '../Utils/SafeParser.js'

export const AddTestimonialValidation = [
  body('clientName').notEmpty().withMessage('Client name is required!'),

  body('designationRole').notEmpty().withMessage('Designation/Role is required!'),

  body('company').notEmpty().withMessage('Company name is required!'),

  body('ratting').notEmpty().withMessage('Ratting is required!'),

  body('projectId').notEmpty().withMessage('Project title is required!'),

  body('testimonialDate').notEmpty().withMessage('Testimonial date is required!'),

  body('message').notEmpty().withMessage('Client message is required!'),
]

export const addTestimonial = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errorCode: 'VALIDATION_ERROR',
      errors: errors.array(),
    })
  }

  let {
    clientName,
    designationRole,
    company,
    ratting,
    projectId,
    testimonialDate,
    message,
    clientImageOBJ,
    isUpdate,
    testimonialID,
  } = req.body

  // Convert string values properly
  isUpdate = isUpdate === 'true'
  if (typeof clientImageOBJ === 'string') clientImageOBJ = safeParse(clientImageOBJ)

  let clientImageObj = {}

  try {
    // ---------- Upload new image if provided ----------
    let uploadedClientImage = null
    if (req.file) {
      uploadedClientImage = await uploadToS3(req.file, 'testimonial')
    }

    clientImageObj = {
      url: uploadedClientImage?.url || clientImageOBJ?.url || null,
      key: uploadedClientImage?.key || clientImageOBJ?.key || null,
    }

    // ---------- UPDATE LOGIC ----------
    if (isUpdate) {
      const [existingTestimonial] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [
        testimonialID,
      ])

      if (!existingTestimonial.length) {
        // Delete uploaded image if record not found
        if (uploadedClientImage?.key) await deleteFromS3(uploadedClientImage.key)
        return res.status(404).json({
          success: false,
          errorCode: 'NOT_FOUND',
          message: 'Testimonial not found!',
        })
      }

      // Delete old image if replaced
      let oldClientImage = {}
      try {
        oldClientImage =
          typeof existingTestimonial[0]?.clientImage === 'string'
            ? JSON.parse(existingTestimonial[0].clientImage)
            : existingTestimonial[0]?.clientImage || {}
      } catch {
        oldClientImage = {}
      }

      if (req.file && oldClientImage?.key) await deleteFromS3(oldClientImage.key)

      // ---------- Perform update ----------
      const [updateResult] = await pool.query(
        `UPDATE testimonials
         SET clientName = ?, designationRole = ?, company = ?, clientImage = ?, ratting = ?,
             projectId = ?, testimonialDate = ?, message = ?
         WHERE id = ?`,
        [
          clientName,
          designationRole,
          company,
          JSON.stringify(clientImageObj || {}),
          ratting,
          projectId,
          testimonialDate,
          message,
          testimonialID,
        ]
      )

      if (!updateResult.affectedRows) {
        if (uploadedClientImage?.key) await deleteFromS3(uploadedClientImage.key)
        return res.status(500).json({
          success: false,
          errorCode: 'UPDATE_FAILED',
          message: 'Failed to update testimonial!',
        })
      }

      return res.status(200).json({
        success: true,
        successCode: 'ENTRY_UPDATED',
        message: 'Testimonial successfully updated.',
      })
    }

    // ---------- INSERT LOGIC ----------
    const [insertResult] = await pool.query(
      `INSERT INTO testimonials
       (clientName, designationRole, company, clientImage, ratting, projectId, testimonialDate, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        clientName,
        designationRole,
        company,
        JSON.stringify(clientImageObj || {}),
        ratting,
        projectId,
        testimonialDate,
        message,
      ]
    )

    if (!insertResult.affectedRows) {
      if (uploadedClientImage?.key) await deleteFromS3(uploadedClientImage.key)
      return res.status(500).json({
        success: false,
        errorCode: 'INSERT_FAILED',
        message: 'Failed to add testimonial!',
      })
    }

    res.status(201).json({
      success: true,
      successCode: 'ENTRY_REGISTERED',
      message: 'Testimonial successfully added.',
    })
  } catch (error) {
    console.error('Add/Update testimonial error:', error)

    // Cleanup newly uploaded file if something failed
    if (clientImageObj?.key && req.file)
      await deleteFromS3(clientImageObj.key).catch(err =>
        console.error('Failed to delete client image after error:', err)
      )

    res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}

export const getTestimonial = async (req, res) => {
  try {
    const [testimonials] = await pool.query('SELECT * FROM testimonials')

    return res.status(200).json({
      success: true,
      successCode: 'GET_TESTIMONIAL',
      message: 'Testimonial fetched successfully.',
      testimonials,
    })
  } catch (error) {
    console.error('GET_TESTIMONIAL_ERROR:', error)

    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}

export const deleteTestimonial = async (req, res) => {
  const { id } = req.params
  try {
    // ✅ Check if Testimonial exists
    const [existingTestimonial] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [id])

    if (existingTestimonial.length === 0) {
      return res.status(404).json({
        success: false,
        errorCode: 'NOT_FOUND',
        message: 'Testimonials not found!',
      })
    }

    if (existingTestimonial?.clientImage) {
      await deleteFromS3(existingTestimonial?.clientImage?.key).catch(e =>
        console.log(`Client Image failed to delete ${e}`)
      )
    }

    // ✅ Delete Testimonial
    await pool.query('DELETE FROM testimonials WHERE id = ?', [id])

    return res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully!',
    })
  } catch (error) {
    console.error('DELETE_Testimonial_ERROR:', error)

    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}
