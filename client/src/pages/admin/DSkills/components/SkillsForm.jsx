import React from 'react'
import { useForm } from 'react-hook-form'

const fieldBase =
  'w-full bg-gradient-to-r from-white/6 to-white/3 border border-cyan-400/20 focus:border-cyan-300/70 md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] outline-none text-white placeholder:text-gray-400 backdrop-blur-xl md:px-[1vw] sm:px-[2vw] xs:px-[3vw] md:py-[1vw] sm:py-[1.5vw] xs:py-[2vw] transition-shadow duration-200 md:text-[1.1vw] sm:text-[2.1vw] xs:text-[3.1vw] focus:ring-theme-cyan/30 focus:ring-3 md:text-[1vw] sm:text-[2vw] xs:text-[3vw]'

const SkillsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = data => console.log(data)
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex xs:flex-col md:flex-row items-start md:gap-[1.5vw] sm:gap-[2.5vw] xs:gap-[3.5vw] md:mt-[2vw] sm:mt-[3vw] xs:mt-[4vw]"
    >
      <div className="w-full flex flex-col gap-0.5">
        <input
          type="text"
          {...register('skillName', { required: true })}
          placeholder="Write your skills"
          className={fieldBase}
        />
        {errors.skillName && (
          <span className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-red-500 ">
            This field is required
          </span>
        )}
      </div>
      <div className="w-full flex flex-col gap-0.5">
        <label>
          <select
            className={fieldBase}
            {...register('proficiency', {
              required: 'Please select a proficiency level',
            })}
          >
            <option className="bg-black" value={''}>
              -- Select Proficiency --
            </option>
            <option className="bg-black" value={'easy'}>
              Easy
            </option>
            <option className="bg-black" value={'medium'}>
              Medium
            </option>
            <option className="bg-black" value={'advance'}>
              Advance
            </option>
          </select>
        </label>
        {errors.proficiency && (
          <span className="md:text-[0.9vw] sm:text-[1.9vw] xs:text-[3.9vw] text-red-500">
            This field is required
          </span>
        )}
      </div>
      <button
        type="submit"
        className="md:py-[1vw] sm:py-[1.5vw] xs:py-[2vw] md:px-[1.5vw] sm:px-[2.5vw] xs:px-[3.5vw] md:rounded-[0.7vw] sm:rounded-[1.2vw] xs:rounded-[1.7vw] bg-cyan-500 text-black font-semibold hover:brightness-110 transition md:text-[1vw] sm:text-[2vw] xs:text-[4vw] w-full"
      >
        Save
      </button>
    </form>
  )
}

export default SkillsForm
