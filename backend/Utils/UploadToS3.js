import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import s3Client from '../aws_s3.config.js'
import { Upload } from '@aws-sdk/lib-storage'
import path from 'path'
import sharp from 'sharp'

/**
 * Compress + upload to S3 (optimized)
 */
export const uploadToS3 = async (file, folder = 'projects') => {
  try {
    if (!file) throw new Error('No file provided for upload')

    const ext = path.extname(file.originalname).toLowerCase()
    const shouldCompress = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)

    let fileBuffer = file.buffer
    if (shouldCompress) {
      fileBuffer = await sharp(file.buffer)
        .resize({ width: 1500, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer()
    }

    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
    const key = `${folder}/${uniqueName}`

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: file.mimetype,
        // ✅ No ACL here
      },
    })

    await upload.done()

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    return { url, key }
  } catch (error) {
    console.error('⚠️ S3 Upload Error:', error)
    throw new Error('Failed to upload file to S3')
  }
}

/**
 * Delete file from S3
 */
export const deleteFromS3 = async key => {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
    )
    console.log(`🗑️ Deleted from S3: ${key}`)
  } catch (error) {
    console.error('S3 Delete Error:', error)
  }
}
