import { body, validationResult } from 'express-validator'
import pool from '../db.config.js'
import { deleteFromS3, uploadToS3 } from '../Utils/UploadToS3.js'
import { safeParse } from '../Utils/SafeParser.js'

export const serviceValidations = [
  body('title').trim().notEmpty().withMessage('Title is required'),

  body('shortDesc').trim().notEmpty().withMessage('Service description is required'),

  body('category').notEmpty().withMessage('Category is required'),
]

export const addService = async (req, res) => {
  let { serviceId, isUpdate, serviceImageOBJ, title, shortDesc, status, category } = req.body
  console.log(req.body)

  if (typeof serviceImageOBJ === 'string') {
    serviceImageOBJ = safeParse(serviceImageOBJ)
  }

  isUpdate = isUpdate === 'true'

  let serviceImageObj = {}
  let uploadedImage = null // ✅ Track uploaded image for cleanup if needed

  try {
    // ✅ Validation check
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // ❌ If validation fails, delete uploaded file (if any)
      if (req.file && uploadedImage?.key) await deleteFromS3(uploadedImage.key)
      return res.status(400).json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        errors: errors.array(),
      })
    }

    // ✅ Upload image if file exists
    if (req.file) {
      uploadedImage = await uploadToS3(req.file, 'service')
    }

    serviceImageObj = {
      key: uploadedImage?.key || serviceImageOBJ?.key || null,
      url: uploadedImage?.url || serviceImageOBJ?.url || null,
    }

    // ✅ UPDATE (if isUpdate true)
    if (isUpdate && serviceId) {
      const [existingService] = await pool.query('SELECT serviceImage FROM services WHERE id = ?', [
        serviceId,
      ])

      if (existingService.length === 0) {
        // ❌ Delete newly uploaded image (not needed anymore)
        if (uploadedImage?.key) await deleteFromS3(uploadedImage.key)
        return res.status(404).json({
          success: false,
          errorCode: 'NOT_FOUND',
          message: 'The service you are trying to update was not found.',
        })
      }

      // 🧹 Delete old image from S3 if new file uploaded
      if (req.file && existingService[0]?.serviceImage) {
        try {
          const oldImage = existingService[0].serviceImage
          console.log(oldImage)

          if (oldImage?.key) {
            await deleteFromS3(oldImage.key)
            console.log(`🧹 Old image deleted from S3: ${oldImage.key}`)
          }
        } catch (err) {
          console.error('⚠️ Failed to delete old service image:', err.message)
        }
      }

      const [updateResult] = await pool.query(
        `UPDATE services
         SET title = ?, shortDesc = ?, category = ?, serviceImage = ?, status = ?, updatedAt = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [title, shortDesc, category, JSON.stringify(serviceImageObj), status || 'draft', serviceId]
      )

      if (updateResult.affectedRows === 0) {
        if (uploadedImage?.key) await deleteFromS3(uploadedImage.key)
        return res.status(400).json({
          success: false,
          errorCode: 'UPDATE_FAILED',
          message: 'Failed to update the service. Please try again.',
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Service updated successfully!',
        data: {
          id: serviceId,
          title,
          shortDesc,
          category,
          status,
          image: serviceImageObj,
        },
      })
    }

    // ✅ INSERT (new service)
    const [existingTitle] = await pool.query('SELECT id FROM services WHERE title = ?', [title])
    if (existingTitle.length > 0) {
      if (uploadedImage?.key) await deleteFromS3(uploadedImage.key)
      return res.status(409).json({
        success: false,
        errorCode: 'ENTRY_EXISTS',
        message: 'A service with this title already exists. Please choose a different title.',
      })
    }

    const [insertResult] = await pool.query(
      'INSERT INTO services (title, shortDesc, category, serviceImage, status) VALUES (?, ?, ?, ?, ?)',
      [title, shortDesc, category, JSON.stringify(serviceImageObj), status || 'draft']
    )

    if (insertResult.affectedRows === 0) {
      if (uploadedImage?.key) await deleteFromS3(uploadedImage.key)
      return res.status(400).json({
        success: false,
        errorCode: 'INSERT_FAILED',
        message: 'Something went wrong while saving your service. Please try again.',
      })
    }

    // ✅ Success response
    res.status(201).json({
      success: true,
      message: 'Service added successfully!',
      data: {
        id: insertResult.insertId,
        title,
        shortDesc,
        category,
        status,
        image: serviceImageObj,
      },
    })
  } catch (error) {
    console.error('❌ Error adding/updating service:', error.message)
    console.log(error)

    // 🧹 Delete uploaded image if something goes wrong
    if (uploadedImage?.key) {
      await deleteFromS3(uploadedImage.key).catch(err =>
        console.error(`⚠️ Failed to delete uploaded image after error: ${err.message}`)
      )
    }

    res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message:
        'An unexpected error occurred while processing your request. Please try again later.',
    })
  }
}

// Controller: Get all Services
export const getServices = async (req, res) => {
  try {
    // 🧠 Fetch data from DB (ordered by most recent first)
    const [rows] = await pool.query(
      `
      SELECT * FROM services ORDER BY createdAt DESC
      `
    )

    // 🟢 Success Response
    return res.status(200).json({
      success: true,
      total: rows.length,
      services: rows,
    })
  } catch (error) {
    console.error('Error in Get Services:', error)
    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}

export const deleteServices = async (req, res) => {
  const { id } = req.params
  console.log(id)

  try {
    // ✅ Check if Experience exists
    const [existingService] = await pool.query('SELECT * FROM services WHERE id = ?', [id])

    if (existingService.length === 0) {
      return res.status(404).json({
        success: false,
        errorCode: 'NOT_FOUND',
        message: 'Service not found!',
      })
    }

    if (existingService?.serviceImage) {
      await deleteFromS3(existingService?.serviceImage?.key).catch(e =>
        console.log(`Service Image failed to delete ${e}`)
      )
    }

    // ✅ Delete Experience
    await pool.query('DELETE FROM services WHERE id = ?', [id])

    return res.status(200).json({
      success: true,
      message: 'Service deleted successfully!',
    })
  } catch (error) {
    console.error('DELETE_SERVICE_ERROR:', error)

    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}
