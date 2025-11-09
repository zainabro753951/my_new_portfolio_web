import { body, validationResult } from 'express-validator'
import pool from '../db.config.js'
import { hashIp } from '../Utils/hashIp.js'
import { getGeoLocation } from '../Utils/geoLookup.js'

export const contactMessageValidation = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 3 })
    .withMessage('Full name must be at least 3 characters long'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email address'),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Subject must be between 3 and 200 characters'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10 })
    .withMessage('Message should be at least 10 characters long'),
]

export const sendMessage = async (req, res) => {
  // 🧩 1. Handle validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errorCode: 'VALIDATION_ERROR',
      errors: errors.array(),
    })
  }

  try {
    // 🧩 2. Extract data
    const { fullName, email, subject, message } = req.body
    const rawIp = req.ip || req.headers['x-forwarded-for'] || null
    const user_agent = req.headers['user-agent'] || null

    // 🧩 3. Hash + anonymize IP
    const hashedIp = await hashIp(rawIp)

    // 🧩 4. Geo lookup (country + city)
    const { country, city } = getGeoLocation(rawIp)

    console.log(`User raw Ip: ${rawIp}`)

    // 🧩 5. Insert into DB (safe parameterized query)
    const sql = `
      INSERT INTO contact_messages (full_name, email, subject, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    const [result] = await pool.query(sql, [
      fullName,
      email,
      subject,
      message,
      hashedIp,
      user_agent,
    ])

    // 6️⃣ Create notification entry
    const sqlNotification = `
      INSERT INTO notifications (type, title, message, reference_id)
      VALUES (?, ?, ?, ?)
    `
    await pool.query(sqlNotification, [
      'contact_message',
      'New Contact Message',
      `${fullName} sent you a new message.`,
      result.insertId, // reference to contact message ID
    ])

    // 🧩 6. Response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      location: { country, city },
    })
  } catch (error) {
    console.error('SEND_MESSAGE_ERROR:', error)
    res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}

export const getMessage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const [messages] = await pool.query(
      `SELECT
        id,
        full_name AS fullName,
        email,
        subject,
        message,
        status,
        ip_address AS ipAddress,
        user_agent AS userAgent,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM contact_messages
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?`,
      [limit, offset]
    )

    const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM contact_messages')

    const messagesWithSelected = messages.map(msg => ({ ...msg, selected: false }))

    return res.status(200).json({
      success: true,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      count: messages.length,
      data: messagesWithSelected,
    })
  } catch (error) {
    console.error('GET_MESSAGES_ERROR:', error)
    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Failed to fetch contact messages!',
    })
  }
}

export const deleteContactMessages = async (req, res) => {
  try {
    const { ids } = req.body

    // ✅ 1. Validate input
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        errorCode: 'INVALID_INPUT',
        message: 'Please provide at least one valid message ID to delete.',
      })
    }

    // ✅ 2. Validate IDs are numbers
    const invalidIds = ids.filter(id => isNaN(Number(id)))
    if (invalidIds.length > 0) {
      return res.status(400).json({
        success: false,
        errorCode: 'INVALID_ID_TYPE',
        message: 'All IDs must be numeric values.',
      })
    }

    // ✅ 3. Check if messages exist
    const [existingMessages] = await pool.query(
      `SELECT id, full_name, email FROM contact_messages WHERE id IN (${ids
        .map(() => '?')
        .join(',')})`,
      ids
    )

    if (existingMessages.length === 0) {
      return res.status(404).json({
        success: false,
        errorCode: 'NOT_FOUND',
        message: 'No matching contact messages found to delete.',
      })
    }

    // ✅ 4. Delete messages safely
    const [deleteResult] = await pool.query(
      `DELETE FROM contact_messages WHERE id IN (${ids.map(() => '?').join(',')})`,
      ids
    )

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        errorCode: 'DELETE_FAILED',
        message: 'Failed to delete contact messages (may already be removed).',
      })
    }

    // ✅ 5. Optional — Log notification for admin dashboard
    await pool.query(
      `INSERT INTO notifications (title, message, type, created_at)
       VALUES (?, ?, ?, NOW())`,
      [
        'Contact Messages Deleted',
        `${existingMessages.length} contact message${
          existingMessages.length > 1 ? 's' : ''
        } deleted successfully.`,
        'info',
      ]
    )

    // ✅ 6. Success Response
    return res.status(200).json({
      success: true,
      message: `${existingMessages.length} contact message${
        existingMessages.length > 1 ? 's' : ''
      } deleted successfully.`,
      deletedIds: ids,
    })
  } catch (error) {
    console.error('❌ DELETE_CONTACT_MESSAGES_ERROR:', error)

    if (error?.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        success: false,
        errorCode: 'SQL_FOREIGN_KEY_CONSTRAINT',
        message:
          'Cannot delete because of a foreign key constraint. Try removing related records first.',
      })
    }

    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error — please try again later.',
    })
  }
}

export const toggleReadStatus = async (req, res) => {
  try {
    const { ids } = req.body

    // ✅ Validate input
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        errorCode: 'INVALID_INPUT',
        message: 'At least one message ID is required!',
      })
    }

    let query = ''
    let params = []

    if (ids.length === 1) {
      // 🎯 Single message → toggle between read/unread
      query = `
        UPDATE contact_messages
        SET status = CASE
          WHEN status = 'read' THEN 'unread'
          WHEN status = 'unread' THEN 'read'
          ELSE status
        END
        WHERE id = ?
      `
      params = [ids[0]]
    } else {
      // 📩 Multiple messages → mark all as read
      query = `
        UPDATE contact_messages
        SET status = 'read'
        WHERE id IN (?)
      `
      params = [ids]
    }

    const [result] = await pool.query(query, params)

    // ✅ Handle no updates
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        errorCode: 'NOT_FOUND',
        message: 'No matching messages found for the provided IDs!',
      })
    }

    // ✅ Success Response
    const mode = ids.length === 1 ? 'toggled' : 'marked as read'
    res.status(200).json({
      success: true,
      message: `${result.affectedRows} message(s) ${mode} successfully.`,
    })
  } catch (error) {
    console.error('TOGGLE_READ_STATUS_ERROR:', error)
    res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}
