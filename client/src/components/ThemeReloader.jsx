import React from 'react'

const ThemeReloader = () => {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
      <img className="w-[45%] object-cover object-center" src="/imgs/reloader.gif" alt="" />
      <h1 className="md:text-[2.8vw] sm:text-[3.8vw] xs:text-[5.8vw] relative -top-24 reloader-text font-bold animate-pulse font-fira-code">
        Loading...
      </h1>
    </div>
  )
}

export default ThemeReloader
