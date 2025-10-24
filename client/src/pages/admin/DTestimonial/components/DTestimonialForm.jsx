import { motion } from 'motion/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import FormField from '../../Components/FormField'

const glassClass = `
  w-full bg-gradient-to-br from-[#0a0a2a]/70 to-[#101040]/40
  border border-white/20 backdrop-blur-2xl
  shadow-[0_0_30px_rgba(34,211,238,0.25)]
  md:p-[2vw] sm:p-[3vw] xs:p-[4vw]
  md:rounded-[1.5vw] sm:rounded-[2.5vw] xs:rounded-[3.5vw]

`

const fieldBase = ` w-full bg-gradient-to-r from-white/5 to-white/10
  border border-cyan-400/20 focus:border-cyan-300/60
  md:rounded-[0.8vw] sm:rounded-[1.3vw] xs:rounded-[1.8vw]
  outline-none text-white placeholder:text-gray-400
  backdrop-blur-xl md:px-[1vw] sm:px-[2vw] xs:px-[3vw]
  md:py-[1vw] sm:py-[1.5vw] xs:py-[2vw]
  transition-all duration-200 ease-in-out
  focus:ring-2 focus:ring-cyan-400/30 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)]
  md:placeholder:text-[1vw] xs:placeholder:text-[2vw] xs:placeholder:text-[4vw]
  md:text-[1vw] sm:text-[2vw] xs:text-[4vw]
`
const DTestimonialForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = data => console.log(data)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={glassClass}
      >
        <h3 className="text-white font-semibold md:text-[1.6vw] sm:text-[2.6vw] xs:text-[4.6vw] tracking-wide mb-[1vw]">
          Add Testimonial
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col md:gap-[1.2vw] sm:gap-[2.2vw] xs:gap-[3.2vw]"
        >
          {/* Row 1 */}
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
            <FormField
              label="Name"
              name="name"
              register={register}
              errors={errors}
              placeholder="e.g., “John Doe”"
            />
            <FormField
              label="Designation / Role"
              name="designationRole"
              register={register}
              errors={errors}
              placeholder="e.g., CEO at TechSoft"
            />
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
            <FormField
              label="Company / Organization"
              name="company"
              register={register}
              errors={errors}
              placeholder="e.g., TechSoft Solutions"
            />
            <label className="flex flex-col">
              <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
                Profile Image (optional)
              </span>
              <input
                type="file"
                className={`${fieldBase}  cursor-pointer`}
                {...register('certificate')}
              />
            </label>
          </div>

          {/* Row 3 */}
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
            <div className="w-full flex flex-col gap-0.5">
              <label className="w-full flex flex-col">
                <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
                  Rating
                </span>
                <select className={fieldBase} {...register('ratting', { required: true })}>
                  <option className="bg-black" value={''}>
                    -- Select Ratting --
                  </option>
                  <option className="bg-black" value={'1'}>
                    1
                  </option>
                  <option className="bg-black" value={'2'}>
                    2
                  </option>
                  <option className="bg-black" value={'3'}>
                    3
                  </option>
                  <option className="bg-black" value={'4'}>
                    4
                  </option>
                  <option className="bg-black" value={'5'}>
                    5
                  </option>
                </select>
              </label>
              {errors['ratting'] && (
                <span className="md:text-[0.9vw] sm:text-[1.8vw] xs:text-[3.5vw] text-red-400 mt-[0.3vw]">
                  Ratting is required
                </span>
              )}
            </div>
            <div className="w-full flex flex-col gap-0.5">
              <label className="w-full flex flex-col">
                <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
                  Project Title
                </span>
                <select className={fieldBase} {...register('projectTitle', { required: true })}>
                  <option className="bg-black" value={''}>
                    -- Select Project Title --
                  </option>
                  <option className="bg-black" value={'1'}>
                    Travel Dashboard
                  </option>
                  <option className="bg-black" value={'2'}>
                    TelemedMenu
                  </option>
                  <option className="bg-black" value={'3'}>
                    AI Personal Assistant
                  </option>
                  <option className="bg-black" value={'4'}>
                    CloundStorage
                  </option>
                  <option className="bg-black" value={'5'}>
                    Intellvid AI
                  </option>
                </select>
              </label>
              {errors['projectTitle'] && (
                <span className="md:text-[0.9vw] sm:text-[1.8vw] xs:text-[3.5vw] text-red-400 mt-[0.3vw]">
                  Ratting is required
                </span>
              )}
            </div>
          </div>

          {/* Row 4 */}

          <div className="w-full flex flex-col gap-0.5">
            <label className="flex flex-col">
              <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
                Testimonial Date
              </span>
              <input
                type="datetime-local"
                {...register('testimonialDate', { required: 'Testimonial Date is required' })}
                className={`${fieldBase} cursor-pointer`}
              />
            </label>

            {errors['testimonialDate'] && (
              <span className="md:text-[0.9vw] sm:text-[1.8vw] xs:text-[3.5vw] text-red-400 mt-[0.3vw]">
                {errors['testimonialDate']?.message}
              </span>
            )}
          </div>

          {/* client message */}
          <div className="flex flex-col">
            <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
              Message
            </span>
            <textarea
              rows="5"
              {...register('message', { required: true })}
              placeholder="Enter your client message"
              className={`${fieldBase} resize-none`}
            ></textarea>
            {errors.message && (
              <span className="md:text-[0.9vw] sm:text-[1.8vw] xs:text-[3.5vw] text-red-400 mt-[0.3vw]">
                Message is required
              </span>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-fit self-end mt-[1vw] md:px-[2vw] sm:px-[3vw] xs:px-[4vw] md:py-[0.8vw] sm:py-[1.5vw] xs:py-[2vw]
          rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-white
          font-semibold md:text-[1vw] sm:text-[2vw] xs:text-[3.2vw]
          transition-all duration-200 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          >
            Add Testimonial
          </motion.button>
        </form>
      </motion.div>
    </>
  )
}

export default DTestimonialForm
