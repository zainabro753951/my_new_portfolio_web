import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const MetaUpdater = () => {
  const { site_info, seo_pages, isLoading } = useSelector(state => state.siteSettings)
  const location = useLocation()

  useEffect(() => {
    if (isLoading || !site_info || !seo_pages) return

    // normalize pathname (handle trailing slash)
    const currentPath = location.pathname.replace(/\/+$/, '') || '/'
    const currentSEO = seo_pages.find(page => page.pageSlug === currentPath)

    // --- Meta Data ---
    const metaTitle = currentSEO?.metaTitle || `${site_info.websiteName} | ${site_info.tagline}`
    const metaDescription = currentSEO?.metaDescription || site_info.tagline || ''
    const metaKeywords = currentSEO?.metaKeyword || ''
    const ogImage = site_info.logoImage?.url || site_info.favicon?.url || ''
    const canonical = `${window.location.origin}${currentPath}`

    // --- Document Title ---
    document.title = metaTitle

    // --- Description ---
    updateMetaTag('name', 'description', metaDescription)
    updateMetaTag('name', 'keywords', metaKeywords)

    // --- Open Graph ---
    updateMetaTag('property', 'og:title', metaTitle)
    updateMetaTag('property', 'og:description', metaDescription)
    updateMetaTag('property', 'og:image', ogImage)
    updateMetaTag('property', 'og:url', canonical)
    updateMetaTag('property', 'og:type', 'website')

    // --- Twitter ---
    updateMetaTag('name', 'twitter:title', metaTitle)
    updateMetaTag('name', 'twitter:description', metaDescription)
    updateMetaTag('name', 'twitter:image', ogImage)

    // --- Favicon ---
    updateFavicon(site_info.favicon?.url)

    // --- Canonical ---
    updateLinkTag('canonical', canonical)

    // --- Google Analytics (optional) ---
    if (site_info.googleAnalytics) {
      injectGoogleAnalytics(site_info.googleAnalytics)
    }
  }, [site_info, seo_pages, location.pathname, isLoading])

  // helpers
  const updateMetaTag = (attr, name, content) => {
    if (!content) return
    let tag = document.querySelector(`meta[${attr}="${name}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute(attr, name)
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  }

  const updateLinkTag = (rel, href) => {
    if (!href) return
    let link = document.querySelector(`link[rel="${rel}"]`)
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', rel)
      document.head.appendChild(link)
    }
    link.setAttribute('href', href)
  }

  const updateFavicon = href => {
    if (!href) return
    let favicon = document.querySelector('link[rel="icon"]')
    if (!favicon) {
      favicon = document.createElement('link')
      favicon.setAttribute('rel', 'icon')
      document.head.appendChild(favicon)
    }
    favicon.setAttribute('href', href)
  }

  const injectGoogleAnalytics = code => {
    if (!code) return
    // Prevent duplicate GA tags
    if (document.getElementById('google-analytics-script')) return

    // simple check: only inject if it looks like valid GA code
    const isGAValid =
      code.includes('gtag(') || code.includes('analytics.js') || code.includes('function gtag')
    if (!isGAValid) {
      console.warn('⚠️ Skipping invalid Google Analytics code:', code)
      return
    }

    const script = document.createElement('script')
    script.id = 'google-analytics-script'
    script.type = 'text/javascript'
    script.innerHTML = code
    document.head.appendChild(script)
  }

  return null
}

export default MetaUpdater
