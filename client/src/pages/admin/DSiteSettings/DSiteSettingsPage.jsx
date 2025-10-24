import { motion } from 'motion/react'
import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import DSiteSettingsHeader from './components/DSiteSettingsHeader'
import { useForm } from 'react-hook-form'
import FormField from '../Components/FormField'
import { useState } from 'react'
import { appendFormData } from '../../../Utils/Utils'

const glassClass = `
  w-full bg-gradient-to-br from-[#0a0a2a]/70 to-[#101040]/40
  border border-white/20 backdrop-blur-2xl
  shadow-[0_0_30px_rgba(34,211,238,0.25)]
  md:p-[2vw] sm:p-[3vw] xs:p-[4vw]
  md:rounded-[1.5vw] sm:rounded-[2.5vw] xs:rounded-[3.5vw]
`

const fieldBase = `
  w-full bg-gradient-to-r from-white/5 to-white/10
  border border-cyan-400/20 focus:border-cyan-300/60
  md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw]
  outline-none text-white placeholder:text-gray-400
  backdrop-blur-xl md:px-[1vw] sm:px-[2vw] xs:px-[3vw]
  md:py-[1vw] sm:py-[1.5vw] xs:py-[2vw]
  transition-all duration-200 ease-in-out
  focus:ring-2 focus:ring-cyan-400/30 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)]
  md:placeholder:text-[1vw] xs:placeholder:text-[2vw] xs:placeholder:text-[4vw] md:text-[1vw] sm:text-[2vw] xs:text-[3vw]
`

const DSiteSettingsPage = () => {
  const [SEOPagesContent, setSEOPagesContent] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = data => {
    const formattedData = {
      siteInfo: {
        websiteName: data.websiteName,
        tagline: data.tagline,
        footerText: data.footerText,
        googleAnalytics: data.googleAnalytics,
        logoImage: data.logoImage?.[0]?.name || '',
        favicon: data.favicon?.[0]?.name || '',
      },
      seoPages: SEOPagesContent.map((_, i) => ({
        pageSlug: data[`pageSlug_${i}`],
        metaTitle: data[`metaTitle_${i}`],
        metaDescription: data[`metaDescription_${i}`],
        metaKeyword: data[`metaKeyword_${i}`],
        canonicalURL: data[`canonicalURL_${i}`],
        OGTitle: data[`OGTitle_${i}`],
        OGDescription: data[`OGDescription_${i}`],
        twitterCardType: data[`twitterCardType_${i}`],
        metaRobots: data[`metaRobots_${i}`],
      })),
      contactInfo: {
        linkedin: data.linkedinUrl,
        github: data.githubUrl,
        facebook: data.facebookUrl,
        instagram: data.instagramUrl,
        email: data.email,
        contactPhone: data.contactPhone,
      },
    }
    const formData = new FormData()
    appendFormData(formData, formattedData)
    console.log(formData)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:my-[2vw] sm:my-[3vw] xs:my-[5vw] space-y-[2vw]"
      >
        {/* Site Setting Header */}
        <DSiteSettingsHeader />
        {/* Site Settings form */}

        <div className="w-full flex flex-col md:gap-[2vw] sm:gap-[3vw] xs:gap-[4vw]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={glassClass}
          >
            <h3 className="text-white font-semibold md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] tracking-wide mb-[1vw]">
              Basic Site Settings
            </h3>

            <div className="w-full flex flex-col md:gap-[1.2vw] sm:gap-[2.2vw] xs:gap-[3.2vw]">
              {/* Row 1 */}
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
                <FormField
                  label="Website Name"
                  name="websiteName"
                  register={register}
                  errors={errors}
                  placeholder="Website Name"
                />
                <FormField
                  label="Tagline"
                  name="tagline"
                  register={register}
                  errors={errors}
                  placeholder="Tagline"
                />
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
                <FormField
                  label="Footer Text"
                  name="footerText"
                  register={register}
                  errors={errors}
                  placeholder="Footer Text"
                />
                <FormField
                  label="Google Analytics / Tracking ID"
                  name="googleAnalytics"
                  register={register}
                  errors={errors}
                  placeholder="Google Analytics / Tracking ID"
                />
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
                <div className="w-full flex flex-col gap-0.5">
                  <label className="flex flex-col">
                    <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
                      Logo Image
                    </span>
                    <input
                      type="file"
                      className={`${fieldBase}  cursor-pointer`}
                      {...register('logoImage', { required: true })}
                    />
                  </label>
                  {errors['logoImage'] && (
                    <span className="md:text-[0.9vw] sm:text-[1.8vw] xs:text-[3.5vw] text-red-400 mt-[0.3vw]">
                      logoImage is required
                    </span>
                  )}
                </div>
                <div className="w-full flex flex-col gap-0.5">
                  <label className="flex flex-col">
                    <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
                      Favicon
                    </span>
                    <input
                      type="file"
                      className={`${fieldBase}  cursor-pointer`}
                      {...register('favicon', { required: true })}
                    />
                  </label>
                  {errors['favicon'] && (
                    <span className="md:text-[0.9vw] sm:text-[1.8vw] xs:text-[3.5vw] text-red-400 mt-[0.3vw]">
                      Favicon is required
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={glassClass}
          >
            <div>
              <h3 className="md:text-[1.5vw] sm:text-[2.5vw] xs:text-[4.5vw] font-semibold">
                SEO — Per Page Settings
              </h3>
              <p className="md:text-[1vw] sm:text-[2vw] xs:text-[4vw] text-gray-400">
                Add page-specific SEO title & description. These entries will be used when rendering
                specific pages.
              </p>
            </div>

            {/* ===================  Add SEO Pages Hidden ====================== */}

            {SEOPagesContent.map((_, idx) => {
              return (
                <div
                  key={idx}
                  className="md:mt-[1.5vw] sm:mt-[2.5vw] xs:mt-[3.5vw] md:p-[2vw] sm:p-[2.5vw] xs:p-[3vw] md:rounded-[1.5vw] sm:rounded-[2vw] xs:rounded-[2.5vw]
      bg-gradient-to-br from-[#0a0a2a]/60 to-[#101040]/30
                 border border-white/20 backdrop-blur-2xl shadow-[0_0_20px_rgba(34,211,238,0.2)]
       w-full flex md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]"
                >
                  <div className="w-full flex flex-col md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw] ">
                    {/* Row 1 */}
                    <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
                      <FormField
                        label="Page Name / Slug"
                        name={`pageSlug_${idx}`}
                        register={register}
                        errors={errors}
                        placeholder="e.g /about /project"
                      />

                      <FormField
                        label="Meta Title"
                        name={`metaTitle_${idx}`}
                        register={register}
                        errors={errors}
                        placeholder="Meta Title"
                      />
                    </div>

                    {/* Row 2 */}

                    <div className="flex flex-col">
                      <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
                        Meta Description
                      </span>
                      <textarea
                        rows="5"
                        {...register(`metaDescription__${idx}`, { required: true })}
                        placeholder="Describe your coursework, achievements, or focus areas..."
                        className={`${fieldBase} resize-none`}
                      ></textarea>
                      {errors[`metaDescription_${idx}`] && (
                        <span className="md:text-[0.9vw] sm:text-[1.8vw] xs:text-[3.5vw] text-red-400 mt-[0.3vw]">
                          Meta Description is required
                        </span>
                      )}
                    </div>

                    {/* Row 3 */}
                    <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
                      <FormField
                        label="Meta Keyword"
                        name={`metaKeyword_${idx}`}
                        register={register}
                        errors={errors}
                        placeholder="frontend, developer, portfolio"
                      />

                      <FormField
                        label="Canonical URL"
                        name={`canonicalURL_${idx}`}
                        register={register}
                        errors={errors}
                        placeholder="https://yourwebsite.com/about"
                      />
                    </div>
                    {/* Row 4 */}
                    <FormField
                      label="OG Title (Open Graph)"
                      name={`OGTitle_${idx}`}
                      register={register}
                      errors={errors}
                      placeholder="OG Title (Open Graph)"
                    />
                    {/* Row 5 */}
                    <div className="flex flex-col">
                      <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
                        OG Description
                      </span>
                      <textarea
                        rows="5"
                        {...register(`OGDescription_${idx}`, { required: true })}
                        placeholder="Describe your coursework, achievements, or focus areas..."
                        className={`${fieldBase} resize-none`}
                      ></textarea>
                      {errors[`OGDescription_${idx}`] && (
                        <span className="md:text-[0.9vw] sm:text-[1.8vw] xs:text-[3.5vw] text-red-400 mt-[0.3vw]">
                          OG Description is required
                        </span>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
                      <div className="w-full flex flex-col gap-0.5">
                        <label className="w-full flex flex-col">
                          <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
                            Twitter Card Type
                          </span>
                          <select
                            className={fieldBase}
                            {...register(`twitterCardType_${idx}`, {
                              required: 'Please select a proficiency level',
                            })}
                          >
                            <option className="bg-black" value={''}>
                              -- Select Twitter Card Type --
                            </option>
                            <option className="bg-black" value={'summary'}>
                              summary
                            </option>
                            <option className="bg-black" value={'summary_large_image'}>
                              summary_large_image
                            </option>
                            <option className="bg-black" value={'app'}>
                              app
                            </option>
                            <option className="bg-black" value={'player'}>
                              player
                            </option>
                          </select>
                        </label>
                        {errors[`twitterCardType_${idx}`] && (
                          <span className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-red-500">
                            This field is required
                          </span>
                        )}
                      </div>

                      <div className="w-full flex flex-col gap-0.5">
                        <label className="w-full flex flex-col">
                          <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
                            Meta Robots
                          </span>
                          <select
                            className={fieldBase}
                            {...register(`metaRobots_${idx}`, {
                              required: 'Please select a proficiency level',
                            })}
                          >
                            <option className="bg-black" value={''}>
                              -- Select Meta Robots --
                            </option>
                            <option className="bg-black" value={'index, follow'}>
                              index, follow
                            </option>
                            <option className="bg-black" value={'noindex, follow'}>
                              noindex, follow
                            </option>
                            <option className="bg-black" value={'index, nofollow'}>
                              index, nofollow
                            </option>
                            <option className="bg-black" value={'noindex, nofollow'}>
                              noindex, nofollow
                            </option>
                          </select>
                        </label>
                        {errors[`metaRobots_${idx}`] && (
                          <span className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-red-500">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="flex md:md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw] items-center md:mt-[1.5vw] sm:mt-[2.5vw] xs:mt-[3.5vw]">
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSEOPagesContent(p => [...p, {}])
                }}
                type="button"
                className="md:py-[0.7vw] sm:py-[1.2vw] xs:py-[1.7vw] md:px-[2.5vw] sm:px-[3.5vw] xs:px-[4.5vw] bg-gradient-to-r from-cyan-500 to-blue-500 text-cyan-100 border border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.25)] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] md:text-[1vw] sm:text-[2vw] xs:text-[4vw] "
              >
                Add SEO Page
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.05 }}
                type="button"
                onClick={() => {
                  setSEOPagesContent([])
                }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="md:py-[0.7vw] sm:py-[1.2vw] xs:py-[1.7vw] md:px-[2.5vw] sm:px-[3.5vw] xs:px-[4.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-white/6 border border-white/8 text-white hover:bg-white/8  md:text-[1vw] sm:text-[2vw] xs:text-[4vw]"
              >
                Clear All
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={glassClass}
          >
            <h3 className="text-white font-semibold md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] tracking-wide mb-[1vw]">
              Social & Contact
            </h3>

            <div className=" flex flex-col md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]">
              <div className=" w-full grid md:grid-cols-2 xs:grid-cols-1 md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]">
                <FormField
                  label={'Linkedin Url'}
                  name={'linkedinUrl'}
                  register={register}
                  required={false}
                  errors={errors}
                  placeholder="https://linkedin.com"
                />
                <FormField
                  label={'Github Url'}
                  name={'githubUrl'}
                  register={register}
                  required={false}
                  errors={errors}
                  placeholder="https://github.com"
                />
              </div>
              <div className=" w-full grid md:grid-cols-2 xs:grid-cols-1 md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]">
                <FormField
                  label={'Facebook Url'}
                  name={'facebookUrl'}
                  register={register}
                  required={false}
                  errors={errors}
                  placeholder="https://facebook.com"
                />
                <FormField
                  label={'Instagram Url'}
                  name={'instagramUrl'}
                  register={register}
                  required={false}
                  errors={errors}
                  placeholder="https://instagram.com"
                />
              </div>

              <div className=" w-full grid md:grid-cols-2 xs:grid-cols-1 md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw]">
                <FormField
                  label={'Contact Email'}
                  name={'email'}
                  register={register}
                  required={false}
                  errors={errors}
                  placeholder="www://email.com"
                />
                <FormField
                  label={'Contact Phone'}
                  name={'contactPhone'}
                  register={register}
                  required={false}
                  errors={errors}
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </form>
    </>
  )
}

export default DSiteSettingsPage
