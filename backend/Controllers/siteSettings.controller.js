import pool from '../db.config.js'
import { deleteFromS3, uploadToS3 } from '../Utils/UploadToS3.js'
import { safeParse } from '../Utils/SafeParser.js'

export const addSiteSettings = async (req, res) => {
  let { contactInfo, seoPages, siteInfo, isUpdate, deletedSeoPageIds = [] } = req.body
  let { websiteName, tagline, footerText, googleAnalytics, logoImageOBJ, faviconOBJ } = siteInfo
  const { linkedin, github, facebook, instagram, email, contactPhone } = contactInfo

  if (typeof logoImageOBJ === 'string') logoImageOBJ = safeParse(logoImageOBJ)
  if (typeof faviconOBJ === 'string') faviconOBJ = safeParse(faviconOBJ)
  if (typeof deletedSeoPageIds === 'string') deletedSeoPageIds = safeParse(deletedSeoPageIds)

  const imagesKey = []

  try {
    // ✅ Upload images (if new files provided)
    const [logoImage, favicon] = await Promise.all([
      req.files?.['siteInfo[logoImage]']?.[0]
        ? uploadToS3(req.files['siteInfo[logoImage]'][0], 'logoImage')
        : Promise.resolve(null),
      req.files?.['siteInfo[favicon]']?.[0]
        ? uploadToS3(req.files['siteInfo[favicon]'][0], 'favicon')
        : Promise.resolve(null),
    ])

    // ✅ Merge new uploads with old values
    const logoImageObj = {
      key: logoImage?.key || logoImageOBJ?.key || null,
      url: logoImage?.url || logoImageOBJ?.url || null,
    }
    const faviconImageObj = {
      key: favicon?.key || faviconOBJ?.key || null,
      url: favicon?.url || faviconOBJ?.url || null,
    }

    if (logoImage?.key) imagesKey.push(logoImage.key)
    if (favicon?.key) imagesKey.push(favicon.key)

    // ✅ Check if site_info already exists
    const [existingSite] = await pool.query(`SELECT id FROM site_info LIMIT 1`)
    let siteInfoId

    if (!existingSite.length) {
      // ➕ Insert if not exists
      const [siteInfoResult] = await pool.query(
        `
        INSERT INTO site_info
        (websiteName, tagline, footerText, googleAnalytics, logoImage, favicon)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          websiteName,
          tagline,
          footerText,
          googleAnalytics,
          JSON.stringify(logoImageObj),
          JSON.stringify(faviconImageObj),
        ]
      )

      siteInfoId = siteInfoResult.insertId
    } else {
      // Delete Prev Images
      if (req.files?.['siteInfo[logoImage]']) {
        await deleteFromS3(logoImageOBJ?.key).catch(e =>
          console.log('Failed to delete old logoImage ' + e)
        )
      }

      if (req.files?.['siteInfo[favicon]']) {
        await deleteFromS3(faviconImageObj?.key).catch(e =>
          console.log('Failed to delete old favicon ' + e)
        )
      }

      // ✏️ Update existing record
      siteInfoId = existingSite[0].id
      await pool.query(
        `
        UPDATE site_info
        SET websiteName = ?, tagline = ?, footerText = ?, googleAnalytics = ?, logoImage = ?, favicon = ?
        WHERE id = ?
        `,
        [
          websiteName,
          tagline,
          footerText,
          googleAnalytics,
          JSON.stringify(logoImageObj),
          JSON.stringify(faviconImageObj),
          siteInfoId,
        ]
      )
    }

    // ✅ Handle contact_info (only one record)
    const [existingContact] = await pool.query(`SELECT id FROM contact_info LIMIT 1`)
    if (!existingContact.length) {
      await pool.query(
        `
        INSERT INTO contact_info
        (siteInfoId, linkedin, github, facebook, instagram, email, contactPhone)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [siteInfoId, linkedin, github, facebook, instagram, email, contactPhone]
      )
    } else {
      await pool.query(
        `
        UPDATE contact_info
        SET linkedin = ?, github = ?, facebook = ?, instagram = ?, email = ?, contactPhone = ?
        WHERE id = ?
        `,
        [linkedin, github, facebook, instagram, email, contactPhone, existingContact[0].id]
      )
    }

    // ✅ Delete SEO Pages (if marked for deletion)
    if (Array.isArray(deletedSeoPageIds) && deletedSeoPageIds.length > 0) {
      await pool.query(
        `DELETE FROM seo_pages WHERE id IN (${deletedSeoPageIds.map(() => '?').join(',')})`,
        deletedSeoPageIds
      )
    }

    // ✅ Handle SEO Pages (insert or update per page)
    if (Array.isArray(seoPages) && seoPages.length > 0) {
      for (const page of seoPages) {
        if (page.isUpdate && page.id) {
          // ✏️ Update existing page
          await pool.query(
            `
            UPDATE seo_pages
            SET pageSlug = ?, metaTitle = ?, metaDescription = ?, metaKeyword = ?, canonicalURL = ?,
                OGTitle = ?, OGDescription = ?, twitterCardType = ?, metaRobots = ?
            WHERE id = ?
            `,
            [
              page.pageSlug,
              page.metaTitle,
              page.metaDescription,
              page.metaKeyword,
              page.canonicalURL,
              page.OGTitle,
              page.OGDescription,
              page.twitterCardType,
              page.metaRobots,
              page.id,
            ]
          )
        } else {
          // ➕ Insert new page
          await pool.query(
            `
            INSERT INTO seo_pages
            (siteInfoId, pageSlug, metaTitle, metaDescription, metaKeyword, canonicalURL, OGTitle, OGDescription, twitterCardType, metaRobots)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
              siteInfoId,
              page.pageSlug,
              page.metaTitle,
              page.metaDescription,
              page.metaKeyword,
              page.canonicalURL,
              page.OGTitle,
              page.OGDescription,
              page.twitterCardType,
              page.metaRobots,
            ]
          )
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: isUpdate
        ? 'Site settings updated successfully!'
        : 'Site settings added successfully!',
    })
  } catch (error) {
    console.error('❌ Error in addSiteSettings:', error)
    for (const key of imagesKey.filter(Boolean)) {
      await deleteFromS3(key).catch(err => console.error('Rollback delete failed:', err))
    }
    res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}

export const getSiteSettings = async (req, res) => {
  try {
    // ✅ Step 1: Get latest site_info.id (so we only fetch for that site)
    const [[latestSiteInfo]] = await pool.query(`
      SELECT id FROM site_info ORDER BY id DESC LIMIT 1
    `)

    if (!latestSiteInfo) {
      return res.status(404).json({
        success: false,
        message: 'No site settings found!',
      })
    }

    const latestSiteInfoId = latestSiteInfo.id

    // ✅ Step 2: Now get all data for that specific site_info.id
    const [rows] = await pool.query(
      `
      SELECT
        si.id AS siteInfoId,
        si.websiteName,
        si.tagline,
        si.footerText,
        si.googleAnalytics,
        si.logoImage,
        si.favicon,

        ci.linkedin,
        ci.github,
        ci.facebook,
        ci.instagram,
        ci.email,
        ci.contactPhone,

        sp.id AS seoPageId,
        sp.pageSlug,
        sp.metaTitle,
        sp.metaDescription,
        sp.metaKeyword,
        sp.canonicalURL,
        sp.OGTitle,
        sp.OGDescription,
        sp.twitterCardType,
        sp.metaRobots
      FROM site_info si
      LEFT JOIN contact_info ci ON si.id = ci.siteInfoId
      LEFT JOIN seo_pages sp ON si.id = sp.siteInfoId
      WHERE si.id = ?
      ORDER BY sp.id ASC
    `,
      [latestSiteInfoId]
    )

    // ✅ Step 3: Format response
    const siteSettings = {
      siteInfo: {
        id: rows[0].siteInfoId,
        websiteName: rows[0].websiteName,
        tagline: rows[0].tagline,
        footerText: rows[0].footerText,
        googleAnalytics: rows[0].googleAnalytics,
        logoImage: rows[0].logoImage,
        favicon: rows[0].favicon,
      },
      contactInfo: {
        linkedin: rows[0].linkedin,
        github: rows[0].github,
        facebook: rows[0].facebook,
        instagram: rows[0].instagram,
        email: rows[0].email,
        contactPhone: rows[0].contactPhone,
      },
      seoPages: rows
        .filter(row => row.seoPageId !== null)
        .map(row => ({
          id: row.seoPageId,
          pageSlug: row.pageSlug,
          metaTitle: row.metaTitle,
          metaDescription: row.metaDescription,
          metaKeyword: row.metaKeyword,
          canonicalURL: row.canonicalURL,
          OGTitle: row.OGTitle,
          OGDescription: row.OGDescription,
          twitterCardType: row.twitterCardType,
          metaRobots: row.metaRobots,
        })),
    }

    return res.status(200).json({
      success: true,
      siteSettings,
    })
  } catch (error) {
    console.error('❌ getSiteSettings Error:', error)
    return res.status(500).json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal Server Error!',
    })
  }
}
