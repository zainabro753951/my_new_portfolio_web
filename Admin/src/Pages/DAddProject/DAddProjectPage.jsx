// DAddProjectPage.jsx
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import {
  FaUpload,
  FaCode,
  FaTags,
  FaFolderOpen,
  FaLink,
  FaGlobe,
  FaClock,
  FaStar,
  FaEyeSlash,
} from 'react-icons/fa'
import DAddProjectHeader from './components/DAddProjectHeader'

/**
 * Professional, modern Add / Edit Project page
 * - Autoslug generation
 * - Hero image preview & gallery
 * - Tech stack + tags chips
 * - SEO fields with counters
 * - Publish / Save Draft functions (console.log for now)
 */

const fieldBase =
  'w-full bg-gradient-to-r from-white/6 to-white/3 border border-cyan-400/20 focus:border-cyan-300/70 md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] outline-none text-white placeholder:text-gray-400 backdrop-blur-xl md:px-[1vw] sm:px-[2vw] xs:px-[3vw] md:py-[1vw] sm:py-[1.5vw] xs:py-[2vw] transition-shadow duration-200 md:text-[1.1vw] sm:text-[2.1vw] xs:text-[3.1vw] focus:ring-theme-cyan/30 focus:ring-3'

const DAddProjectPage = () => {
  // form state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')
  const [heroFile, setHeroFile] = useState(null)
  const [heroPreview, setHeroPreview] = useState('')
  const [galleryFiles, setGalleryFiles] = useState([])
  const [techInput, setTechInput] = useState('')
  const [techStack, setTechStack] = useState([])
  const [tagsInput, setTagsInput] = useState('')
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState('Frontend Development')
  const [status, setStatus] = useState('Draft')
  const [visibility, setVisibility] = useState('Public')
  const [repoLink, setRepoLink] = useState('')
  const [liveDemo, setLiveDemo] = useState('')
  const [estTime, setEstTime] = useState('2 days')
  const [featured, setFeatured] = useState(false)

  // SEO fields
  const [seoTitle, setSeoTitle] = useState('')
  const [metaDesc, setMetaDesc] = useState('')
  const [metaKeywordsInput, setMetaKeywordsInput] = useState('')
  const [metaKeywords, setMetaKeywords] = useState([])
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [ogImage, setOgImage] = useState(null)
  const [ogPreview, setOgPreview] = useState('')

  // counters limits
  const SEO_TITLE_LIMIT = 60
  const META_DESC_LIMIT = 160

  // refs
  const heroInputRef = useRef(null)
  const galleryInputRef = useRef(null)
  const ogInputRef = useRef(null)

  // Auto generate slug from title (editable)
  useEffect(() => {
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(title))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  // handle hero image preview
  useEffect(() => {
    if (!heroFile) {
      setHeroPreview('')
      return
    }
    const url = URL.createObjectURL(heroFile)
    setHeroPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [heroFile])

  // og image preview
  useEffect(() => {
    if (!ogImage) {
      setOgPreview('')
      return
    }
    const url = URL.createObjectURL(ogImage)
    setOgPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [ogImage])

  // helper: slugify
  function generateSlug(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/&/g, '-and-')
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  // chips handlers
  const addTech = () => {
    const val = techInput.trim()
    if (val && !techStack.includes(val)) {
      setTechStack(p => [...p, val])
    }
    setTechInput('')
  }
  const removeTech = t => setTechStack(p => p.filter(x => x !== t))

  const addTag = () => {
    const val = tagsInput.trim()
    if (val && !tags.includes(val)) {
      setTags(p => [...p, val])
    }
    setTagsInput('')
  }
  const removeTag = t => setTags(p => p.filter(x => x !== t))

  const addMetaKeyword = () => {
    const val = metaKeywordsInput.trim()
    if (val && !metaKeywords.includes(val)) {
      setMetaKeywords(p => [...p, val])
    }
    setMetaKeywordsInput('')
  }
  const removeMetaKeyword = k => setMetaKeywords(p => p.filter(x => x !== k))

  // gallery add
  const handleGallery = e => {
    const files = Array.from(e.target.files || [])
    setGalleryFiles(p => [...p, ...files].slice(0, 12)) // limit to 12
  }

  // basic validation
  const validate = () => {
    const errors = []
    if (!title.trim()) errors.push('Title is required')
    if (!shortDesc.trim()) errors.push('Short description is required')
    if (!longDesc.trim()) errors.push('Long description is required')
    return errors
  }

  // Save handlers (replace console.log with API calls)
  const handleSaveDraft = () => {
    const errs = validate()
    if (errs.length) return alert(errs.join('\n'))
    const formData = gatherFormData('draft')
    console.log('Save Draft:', formData)
    alert('Draft saved (simulate). Check console for formData.')
  }

  const handlePublish = () => {
    const errs = validate()
    if (errs.length) return alert(errs.join('\n'))
    const formData = gatherFormData('publish')
    console.log('Publish:', formData)
    alert('Publish triggered (simulate). Check console for formData.')
  }

  function gatherFormData(action) {
    return {
      action,
      title,
      slug,
      shortDesc,
      longDesc,
      heroFile,
      galleryFiles,
      techStack,
      tags,
      category,
      status,
      visibility,
      repoLink,
      liveDemo,
      estTime,
      featured,
      seo: {
        seoTitle,
        metaDesc,
        metaKeywords,
        canonicalUrl,
        ogImage,
      },
    }
  }

  // small keyboard handlers to add chips on Enter
  const techKeyHandler = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTech()
    }
  }
  const tagsKeyHandler = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }
  const metaKeyHandler = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addMetaKeyword()
    }
  }

  // framer variants
  const fadeIn = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.45 } },
  }

  return (
    <div className="w-full h-screen font-inter bg-gradient-to-br from-[#0b1120] via-[#0f1e3a] to-[#111827] relative overflow-hidden text-white">
      {/* background glows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.8 }}
        className="absolute -top-28 -left-28 w-[34vw] h-[34vw] bg-cyan-500/28 blur-[90px] rounded-full pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.8, delay: 0.2 }}
        className="absolute -bottom-28 -right-20 w-[30vw] h-[30vw] bg-indigo-500/20 blur-[90px] rounded-full pointer-events-none"
      />

      <div className="relative w-full h-full flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Header />

          <motion.section
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            className="md:p-[1.5vw] sm:p-[2.5vw] xs:p-[3.5vw]"
          >
            <DAddProjectHeader handlePublish={handlePublish} handleSaveDraft={handleSaveDraft} />

            {/* FORM GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]">
              {/* left: main form */}
              <motion.div
                variants={fadeIn}
                className="lg:col-span-2 md:p-[2vw] sm:p-[2.5vw] xs:p-[3vw] md:rounded-[1.5vw] sm:rounded-[2vw] xs:rounded-[2.5vw]
      bg-gradient-to-br from-[#0a0a2a]/60 to-[#101040]/30
                 border border-white/20 backdrop-blur-2xl shadow-[0_0_20px_rgba(34,211,238,0.2)]
       w-full flex flex-col md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]"
              >
                {/* Title & slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
                  <label className="flex flex-col">
                    <span className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300 md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                      Title
                    </span>
                    <input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Project title"
                      className={fieldBase}
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300 md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                      Slug
                    </span>
                    <input
                      value={slug}
                      onChange={e => setSlug(e.target.value)}
                      placeholder="project-slug"
                      className={fieldBase}
                    />
                    <small className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-gray-400 mt-1">
                      Auto-generated from title — editable.
                    </small>
                  </label>
                </div>

                {/* Short + long description */}
                <label className="flex flex-col">
                  <span className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300 md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                    Short description
                  </span>
                  <input
                    value={shortDesc}
                    onChange={e => setShortDesc(e.target.value)}
                    placeholder="Short summary (shown in listings)"
                    className={fieldBase}
                  />
                </label>

                <label className="flex flex-col">
                  <span className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300 md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                    Long description
                  </span>
                  <textarea
                    value={longDesc}
                    onChange={e => setLongDesc(e.target.value)}
                    rows={8}
                    placeholder="Full project description, case study, details, process..."
                    className={fieldBase + ' resize-y'}
                  />
                </label>

                {/* Repo + Live Demo */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw] ">
                  <label className="flex flex-col">
                    <span className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300 md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                      Repository (Git)
                    </span>
                    <div className="relative">
                      <input
                        value={repoLink}
                        onChange={e => setRepoLink(e.target.value)}
                        placeholder="https://github.com/you/repo"
                        className={fieldBase + ' md:pr-[2.5vw] sm:pr-[3.5vw] xs:pr-[4.5vw]'}
                      />
                      <FaLink className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 md:text-[1.2vw] sm:text-[2.2vw] xs:text-[4.2vw]" />
                    </div>
                  </label>

                  <label className="flex flex-col">
                    <span className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300 md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                      Live demo
                    </span>
                    <div className="relative">
                      <input
                        value={liveDemo}
                        onChange={e => setLiveDemo(e.target.value)}
                        placeholder="https://your-live-demo.com"
                        className={fieldBase + ' md:pr-[2.5vw] sm:pr-[3.5vw] xs:pr-[4.5vw]'}
                      />
                      <FaGlobe className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 md:text-[1.2vw] sm:text-[2.2vw] xs:text-[4.2vw]" />
                    </div>
                  </label>
                </div>
                {/* Hero image */}
                <div className="bg-white/4 backdrop-blur-md border border-white/10 md:rounded-[1.5vw] sm:rounded-[2vw] xs:rounded-[2.5vw] md:p-[1.2vw] sm:p-[2.2vw] xs:p-[3.2vw]">
                  <div className="flex flex-wrap items-center justify-between md:mb-[1vw] sm:mb-[2vw] xs:mb-[3vw]">
                    <h3 className="font-medium md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw]">
                      Hero Image
                    </h3>
                    <small className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-gray-400">
                      Recommended 1600×900
                    </small>
                  </div>

                  <div className="flex flex-col md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
                    <div className="relative md:h-[15vw] sm:h-[25vw] xs:h-[35vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] overflow-hidden bg-gradient-to-br from-white/6 to-white/3 border border-white/8 flex items-center justify-center">
                      {heroPreview ? (
                        <img
                          src={heroPreview}
                          alt="hero preview"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="text-center text-gray-400">
                          <FaUpload className="mx-auto mb-1 md:text-[2.2vw] sm:text-[3.2vw] xs:text-[5.2vw]" />
                          <div className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw]">
                            No hero image
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
                      <button
                        onClick={() => heroInputRef.current.click()}
                        className="md:py-[0.7vw] sm:py-[1.2vw] xs:py-[1.7vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-cyan-500 text-black font-semibold hover:brightness-110 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw] w-full"
                      >
                        Upload
                      </button>
                      <button
                        onClick={() => {
                          setHeroFile(null)
                          setHeroPreview('')
                        }}
                        className="md:py-[0.7vw] sm:py-[1.2vw] xs:py-[1.7vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-white/6 border border-white/8 text-white hover:bg-white/8 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw]"
                      >
                        Remove
                      </button>
                    </div>

                    <input
                      ref={heroInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => setHeroFile(e.target.files?.[0] ?? null)}
                    />
                  </div>
                </div>
                {/*  */}
                {/* Gallery (multiple) */}
                <div className="bg-white/4 backdrop-blur-md border border-white/10 md:rounded-[1.5vw] sm:rounded-[2vw] xs:rounded-[2.5vw] md:p-[1.2vw] sm:p-[2.2vw] xs:p-[3.2vw]">
                  <div className="flex items-center justify-between ">
                    <h3 className="font-medium md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw]">
                      Gallery
                    </h3>
                    <small className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-gray-400">
                      Up to 12 screenshots
                    </small>
                  </div>

                  <div className="flex flex-col md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
                    <div className="grid grid-cols-4 md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
                      {galleryFiles.length ? (
                        galleryFiles.map((f, i) => {
                          const src = URL.createObjectURL(f)
                          return (
                            <img
                              key={i}
                              src={src}
                              alt={`gallery-${i}`}
                              className="w-full md:h-[5vw] sm:h-[10vw] xs:h-[15vw] object-cover md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw]"
                            />
                          )
                        })
                      ) : (
                        <div className="col-span-4 text-gray-400 md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw]">
                          No screenshots uploaded
                        </div>
                      )}
                    </div>
                    <div className="flex md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
                      <button
                        onClick={() => galleryInputRef.current.click()}
                        className="md:py-[0.7vw] sm:py-[1.2vw] xs:py-[1.7vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-white/6 border border-white/8 text-white hover:bg-white/8 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw] w-full"
                      >
                        Add Images
                      </button>
                      <button
                        onClick={() => setGalleryFiles([])}
                        className="md:py-[0.7vw] sm:py-[1.2vw] xs:py-[1.7vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-white/6 border border-white/8 text-white hover:bg-white/8 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw]"
                      >
                        Clear
                      </button>
                    </div>
                    <input
                      ref={galleryInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleGallery}
                    />
                  </div>
                </div>
                <div className="w-full grid md:grid-cols-2 xs:grid-cols-1 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
                  {/* Tech stack */}
                  <div className="bg-white/4 backdrop-blur-md border border-white/10 md:rounded-[1.5vw] sm:rounded-[2vw] xs:rounded-[2.5vw] md:p-[1.2vw] sm:p-[2.2vw] xs:p-[3.2vw]">
                    <div className="flex flex-wrap items-center justify-between md:mb-[1vw] sm:mb-[2vw] xs:mb-[3vw]">
                      <h3 className="font-medium md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] flex items-center md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
                        <FaCode /> Tech Stack
                      </h3>
                      <small className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-gray-400">
                        Press Enter to add
                      </small>
                    </div>

                    <div className="flex md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw] items-center md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                      <input
                        value={techInput}
                        onChange={e => setTechInput(e.target.value)}
                        onKeyDown={techKeyHandler}
                        placeholder="Add tech (React, Tailwind)"
                        className={fieldBase}
                      />
                      <button
                        onClick={addTech}
                        className="md:py-[1vw] sm:py-[1.5vw] xs:py-[2vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-white/6 border border-white/8 text-white hover:bg-white/8 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw]"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
                      {techStack.map(t => (
                        <span
                          key={t}
                          className="md:px-[1vw] sm:px-[1.5vw] xs:px-[2vw] md:py-[0.4vw] sm:py-[0.9vw] xs:py-[1.4vw] rounded-full bg-white/6 md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-white flex items-center md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]"
                        >
                          {t}{' '}
                          <button
                            onClick={() => removeTech(t)}
                            className="text-gray-400 hover:text-red-300 ml-2"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="bg-white/4 backdrop-blur-md border border-white/10 md:rounded-[1.5vw] sm:rounded-[2vw] xs:rounded-[2.5vw] md:p-[1.2vw] sm:p-[2.2vw] xs:p-[3.2vw]">
                    <div className="flex flex-wrap items-center justify-between md:mb-[1vw] sm:mb-[2vw] xs:mb-[3vw]">
                      <h3 className="font-medium md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] flex items-center md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
                        <FaTags /> Tags
                      </h3>
                      <small className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-gray-400">
                        Press Enter to add
                      </small>
                    </div>

                    <div className="flex md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw] items-center md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                      <input
                        value={tagsInput}
                        onChange={e => setTagsInput(e.target.value)}
                        onKeyDown={tagsKeyHandler}
                        placeholder="Add tag (portfolio, ui)"
                        className={fieldBase}
                      />
                      <button
                        onClick={addTag}
                        className="md:py-[1vw] sm:py-[1.5vw] xs:py-[2vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-white/6 border border-white/8 text-white hover:bg-white/8 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw]"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
                      {tags.map(t => (
                        <span
                          key={t}
                          className="md:px-[1vw] sm:px-[1.5vw] xs:px-[2vw] md:py-[0.4vw] sm:py-[0.9vw] xs:py-[1.4vw] rounded-full bg-white/6 md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-white flex items-center md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]"
                        >
                          {t}{' '}
                          <button
                            onClick={() => removeTag(t)}
                            className="text-gray-400 hover:text-red-300 md:ml-[0.3vw] sm:ml-[0.8vw] xs:ml-[1.3vw]"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* right: settings / SEO / media */}
              <motion.aside
                variants={fadeIn}
                className="md:space-y-[1.5vw] sm:space-y-[2.5vw] xs:space-y-[3.5vw]"
              >
                {/* Category/Status/Visibility */}
                <div
                  className="md:p-[2vw] sm:p-[2.5vw] xs:p-[3vw] md:rounded-[1.5vw] sm:rounded-[2vw] xs:rounded-[2.5vw]
      border border-cyan-400/20 bg-gradient-to-br from-[#0a0a2a]/60 to-[#101040]/30
      backdrop-blur-2xl shadow-[0_0_20px_rgba(34,211,238,0.2)]
       w-full flex flex-col md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]"
                >
                  <div className="grid grid-cols-1 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
                    <label className="flex flex-col">
                      <span className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300 md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                        Category
                      </span>
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className={fieldBase}
                      >
                        <option className="bg-black">UI Design</option>
                        <option className="bg-black">Frontend Development</option>
                        <option className="bg-black">React Projects</option>
                        <option className="bg-black">Open Source</option>
                      </select>
                    </label>

                    <label className="flex flex-col">
                      <span className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300 md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                        Status
                      </span>
                      <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className={fieldBase}
                      >
                        <option className="bg-black">Draft</option>
                        <option className="bg-black">Published</option>
                        <option className="bg-black">Archived</option>
                      </select>
                    </label>

                    <label className="flex items-center md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={() => setFeatured(s => !s)}
                        className="md:w-[1vw] md:h-[1vw] sm:w-[2vw] sm:h-[2vw] xs:w-[3.5vw] xs:h-[3.5vw]"
                      />
                      <span className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300">
                        Mark as Featured
                      </span>
                    </label>

                    <label className="flex flex-col">
                      <span className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300 md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                        Visibility
                      </span>
                      <select
                        value={visibility}
                        onChange={e => setVisibility(e.target.value)}
                        className={fieldBase}
                      >
                        <option className="bg-black">Public</option>
                        <option className="bg-black">Unlisted</option>
                        <option className="bg-black">Private</option>
                      </select>
                    </label>

                    <label className="flex flex-col">
                      <span className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300 md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                        Estimated time
                      </span>
                      <input
                        value={estTime}
                        onChange={e => setEstTime(e.target.value)}
                        placeholder="e.g. 3 days"
                        className={fieldBase}
                      />
                    </label>
                  </div>
                </div>

                {/* SEO Section */}
                <div
                  className="md:p-[2vw] sm:p-[2.5vw] xs:p-[3vw] md:rounded-[1.5vw] sm:rounded-[2vw] xs:rounded-[2.5vw]
      border border-cyan-400/20 bg-gradient-to-br from-[#0a0a2a]/60 to-[#101040]/30
      backdrop-blur-2xl shadow-[0_0_20px_rgba(34,211,238,0.2)]
       w-full flex flex-col md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]"
                >
                  <div className="flex items-center justify-between md:mb-[1vw] sm:mb-[2vw] xs:mb-[3vw]">
                    <h3 className="font-medium md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] flex items-center md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
                      <FaFolderOpen /> SEO
                    </h3>
                    <small className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-gray-400">
                      Improve search visibility
                    </small>
                  </div>

                  <label className="flex flex-col md:mb-[1vw] sm:mb-[2vw] xs:mb-[3vw]">
                    <span className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-gray-300 mb-1">
                      SEO Title{' '}
                      <span className="text-gray-400 md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw]">
                        ({seoTitle.length}/{SEO_TITLE_LIMIT})
                      </span>
                    </span>
                    <input
                      value={seoTitle}
                      onChange={e => setSeoTitle(e.target.value.slice(0, SEO_TITLE_LIMIT))}
                      placeholder="SEO title (recommended under 60 chars)"
                      className={fieldBase}
                    />
                  </label>

                  <label className="flex flex-col md:mb-[1vw] sm:mb-[2vw] xs:mb-[3vw]">
                    <span className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-gray-300 mb-1">
                      Meta description{' '}
                      <span className="text-gray-400 md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw]">
                        ({metaDesc.length}/{META_DESC_LIMIT})
                      </span>
                    </span>
                    <textarea
                      value={metaDesc}
                      onChange={e => setMetaDesc(e.target.value.slice(0, META_DESC_LIMIT))}
                      rows={3}
                      placeholder="Short meta description (max 160 chars)"
                      className={fieldBase + ' resize-none'}
                    />
                  </label>

                  <div className="md:mb-[1vw] sm:mb-[2vw] xs:mb-[3vw]">
                    <div className="flex md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw] items-center md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                      <input
                        value={metaKeywordsInput}
                        onChange={e => setMetaKeywordsInput(e.target.value)}
                        onKeyDown={metaKeyHandler}
                        placeholder="Add meta keyword and press Enter"
                        className={fieldBase}
                      />
                      <button
                        onClick={addTag}
                        className="md:py-[1vw] sm:py-[1.5vw] xs:py-[2vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-white/6 border border-white/8 text-white hover:bg-white/8 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw]"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
                      {metaKeywords.map(k => (
                        <span
                          key={k}
                          className="px-3 py-1 bg-white/6 rounded-full md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-white flex md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw] items-center"
                        >
                          {k}{' '}
                          <button
                            onClick={() => removeMetaKeyword(k)}
                            className="text-gray-400 md:ml-[0.3vw] sm:ml-[0.8vw] xs:ml-[1.3vw]"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <label className="flex flex-wrap flex-col md:mb-[1vw] sm:mb-[2vw] xs:mb-[3vw]">
                    <span className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-gray-300 mb-1">
                      Canonical URL
                    </span>
                    <input
                      value={canonicalUrl}
                      onChange={e => setCanonicalUrl(e.target.value)}
                      placeholder="https://yourdomain.com/projects/slug"
                      className={fieldBase}
                    />
                  </label>

                  <div className="md:mb-[1vw] sm:mb-[2vw] xs:mb-[3vw]">
                    <div className="flex flex-wrap items-center justify-between md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
                      <span className="md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-gray-300">
                        Open Graph Image
                      </span>
                      <small className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-gray-400">
                        Used when sharing on social
                      </small>
                    </div>
                    <div className="relative md:h-[15vw] sm:h-[25vw] xs:h-[35vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] overflow-hidden bg-white/6 border border-white/8 md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw] flex items-center justify-center">
                      {ogPreview ? (
                        <img
                          src={ogPreview}
                          alt="og preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw]">
                          No OG image
                        </div>
                      )}
                    </div>

                    <div className="flex md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
                      <button
                        onClick={() => ogInputRef.current.click()}
                        className="md:py-[0.7vw] sm:py-[1.2vw] xs:py-[1.7vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-white/6 border border-white/8 text-white hover:bg-white/8 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw]"
                      >
                        Upload OG
                      </button>
                      <button
                        onClick={() => {
                          setOgImage(null)
                          setOgPreview('')
                        }}
                        className="md:py-[0.7vw] sm:py-[1.2vw] xs:py-[1.7vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-white/6 border border-white/8 text-white hover:bg-white/8 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw]"
                      >
                        Remove
                      </button>
                    </div>

                    <input
                      ref={ogInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => setOgImage(e.target.files?.[0] ?? null)}
                    />
                  </div>
                </div>
              </motion.aside>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  )
}

export default DAddProjectPage
