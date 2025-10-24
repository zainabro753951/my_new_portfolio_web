import React, { useState } from 'react'
import { motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { FaCode } from 'react-icons/fa6'

const glassClass = `
  w-full bg-gradient-to-br from-[#0a0a2a]/70 to-[#101040]/40
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
  md:placeholder:text-[1vw] xs:placeholder:text-[2vw] xs:placeholder:text-[4vw]
  md:text-[1vw] sm:text-[2vw] xs:text-[3vw]
`

const DPricingPlanForm = () => {
  const [featurePointInput, setFeaturePointInput] = useState('')
  const [featurePoints, setFeaturePoints] = useState([])

  const addFeaturePoint = () => {
    const val = featurePointInput.trim()
    if (val && !featurePoints.includes(val)) {
      setFeaturePoints(p => [...p, val])
    }
    setFeaturePointInput('')
  }
  console.log(featurePoints)

  const removeFeaturePoint = t => setFeaturePoints(p => p.filter(x => x !== t))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = data => console.log(data)

  const featureKeyHandler = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addFeaturePoint()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={glassClass}
    >
      <h3 className="text-white font-semibold md:text-[1.6vw] sm:text-[2.6vw] xs:text-[4.6vw] tracking-wide mb-[1vw]">
        Add Plan
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col md:gap-[1.2vw] sm:gap-[2.2vw] xs:gap-[3.2vw]"
      >
        {/* Row 1 */}
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[1vw] sm:gap-[2vw] xs:gap-[3vw]">
          <div className="w-full flex flex-col gap-0.5">
            <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
              Plan Name
            </span>
            <label>
              <select
                className={fieldBase}
                {...register('planName', {
                  required: 'Please select a proficiency level',
                })}
              >
                <option className="bg-black" value={''}>
                  -- Select Plan Name --
                </option>
                <option className="bg-black" value={'basic'}>
                  Basic
                </option>
                <option className="bg-black" value={'standard'}>
                  Standard
                </option>
                <option className="bg-black" value={'premium'}>
                  Premium
                </option>
                <option className="bg-black" value={'enterprise'}>
                  Enterprise
                </option>
              </select>
            </label>
            {errors.planName && (
              <span className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-0.5">
            <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
              Plan Name
            </span>
            <label>
              <select
                className={fieldBase}
                {...register('currency', {
                  required: 'Please select a proficiency level',
                })}
              >
                <option className="bg-black" value={''}>
                  -- Select Currency --
                </option>
                <option className="bg-black" value={'$'}>
                  USD
                </option>
                <option className="bg-black" value={'Rs'}>
                  PKR
                </option>
                <option className="bg-black" value={'€'}>
                  EUR
                </option>
              </select>
            </label>
            {errors.currency && (
              <span className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-red-500">
                This field is required
              </span>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="w-full flex flex-col gap-0.5">
          <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
            Billing Cycle
          </span>
          <label>
            <select
              className={fieldBase}
              {...register('currency', {
                required: 'Please select a proficiency level',
              })}
            >
              <option className="bg-black" value={''}>
                -- Select Billing Cycle --
              </option>
              <option className="bg-black" value={'Monthly'}>
                Monthly
              </option>
              <option className="bg-black" value={'One-time'}>
                One-time
              </option>
              <option className="bg-black" value={'Lifetime'}>
                Lifetime
              </option>
            </select>
          </label>
          {errors.currency && (
            <span className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-red-500">
              This field is required
            </span>
          )}
        </div>

        {/* Row 3 */}
        <div className="bg-white/4 backdrop-blur-md border border-white/10 md:rounded-[1.5vw] sm:rounded-[2vw] xs:rounded-[2.5vw] md:p-[1.2vw] sm:p-[2.2vw] xs:p-[3.2vw]">
          <div className="flex flex-wrap items-center justify-between md:mb-[1vw] sm:mb-[2vw] xs:mb-[3vw]">
            <h3 className="font-medium md:text-[1.3vw] sm:text-[2.3vw] xs:text-[4.3vw] flex items-center md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
              <FaCode /> Feature Point
            </h3>
            <small className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-gray-400">
              Press Enter to add
            </small>
          </div>

          <div className="flex md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw] items-center md:mb-[0.7vw] sm:mb-[1.7vw] xs:mb-[2.7vw]">
            <input
              value={featurePointInput}
              onChange={e => setFeaturePointInput(e.target.value)}
              onKeyDown={featureKeyHandler}
              placeholder="Add your feature point"
              className={fieldBase}
            />
            <button
              onClick={addFeaturePoint}
              className="md:py-[1vw] sm:py-[1.5vw] xs:py-[2vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-white/6 border border-white/8 text-white hover:bg-white/8 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw]"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]">
            {featurePoints.map(t => (
              <span
                key={t}
                className="md:px-[1vw] sm:px-[1.5vw] xs:px-[2vw] md:py-[0.4vw] sm:py-[0.9vw] xs:py-[1.4vw] rounded-full bg-white/6 md:text-[1.1vw] sm:text-[2.1vw] xs:text-[4.1vw] text-white flex items-center md:gap-[0.9vw] sm:gap-[1.4vw] xs:gap-[1.9vw]"
              >
                {t}{' '}
                <button
                  onClick={() => removeFeaturePoint(t)}
                  className="text-gray-400 hover:text-red-300 ml-2"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Short Description */}
        <div className="flex flex-col">
          <span className="md:text-[1vw] sm:text-[2vw] xs:text-[3.5vw] text-gray-300 mb-[0.5vw]">
            Short Description
          </span>
          <textarea
            rows="5"
            {...register('shortDesc', { required: true })}
            placeholder="e.g., “Perfect for individuals starting out.”"
            className={`${fieldBase} resize-none`}
          ></textarea>
          {errors.shortDesc && (
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
          Add Plan
        </motion.button>
      </form>
    </motion.div>
  )
}

export default DPricingPlanForm
