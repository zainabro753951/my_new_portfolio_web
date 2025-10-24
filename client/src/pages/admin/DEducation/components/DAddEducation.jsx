import React from 'react'
import { motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import FormField from '../../Components/FormField'

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

const DAddEducation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = data => console.log(data)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={glassClass}
    >
      <h3 className="text-white font-semibold md:text-[1.6vw] sm:text-[2.6vw] xs:text-[4.6vw] tracking-wide mb-[1vw]">
        🎓 Add Education
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col md:gap-[1.2vw] sm:gap-[2.2vw] xs:gap-[3.2vw]"
      >
        {/* Row 1 */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[1vw]">
          <FormField
            label="Institution Name"
            name="institutionName"
            register={register}
            errors={errors}
            placeholder="e.g., Sindh Agricultural University"
          />
          <FormField
            label="Degree"
            name="degree"
            register={register}
            errors={errors}
            placeholder="e.g., Bachelor of Computer Science"
          />
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[1vw]">
          <FormField
            label="Field of Study"
            name="fieldStudy"
            register={register}
            errors={errors}
            placeholder="e.g., Information Technology"
          />
          <FormField
            label="Grade / CGPA"
            name="grade"
            register={register}
            errors={errors}
            placeholder="e.g., 3.8 CGPA"
          />
        </div>

        {/* Row 3 */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[1vw]">
          <FormField
            label="Start Year"
            name="startYear"
            register={register}
            errors={errors}
            placeholder="e.g., 2021"
          />
          <FormField
            label="End Year"
            name="endYear"
            register={register}
            errors={errors}
            placeholder="e.g., 2025"
          />
        </div>

        {/* Row 4 */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[1vw]">
          <FormField
            label="Location"
            name="location"
            register={register}
            errors={errors}
            placeholder="e.g., Tandojam, Sindh"
          />

          <label className="flex flex-col">
            <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
              Upload Certificate (optional)
            </span>
            <input
              type="file"
              className={`${fieldBase}  cursor-pointer`}
              {...register('certificate')}
            />
          </label>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
            Description
          </span>
          <textarea
            rows="5"
            {...register('longDesc', { required: true })}
            placeholder="Describe your coursework, achievements, or focus areas..."
            className={`${fieldBase} resize-none`}
          ></textarea>
          {errors.longDesc && (
            <span className="md:text-[0.9vw] sm:text-[1.8vw] xs:text-[3.5vw] text-red-400 mt-[0.3vw]">
              Description is required
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
          Add Education
        </motion.button>
      </form>
    </motion.div>
  )
}

export default DAddEducation
