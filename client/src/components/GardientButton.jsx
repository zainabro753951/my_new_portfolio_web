import React from 'react'
import { Link } from 'react-router-dom'
import { useCursorHoverContext } from '../context/CursorHover'

const GardientButton = ({
  text = 'Button',
  link,
  sizeY = 'medium',
  hoverShadow = false,
  hoverOpacity = true,
}) => {
  const { onCursorEnter, onCursorLeave } = useCursorHoverContext()
  return (
    <button
      onMouseEnter={onCursorEnter}
      onMouseLeave={onCursorLeave}
      className={` ${
        (sizeY.toLowerCase() == 'short' && 'md:py-[0.6vw] sm:py-[1.6vw] xs:py-[2.6vw]') ||
        (sizeY.toLocaleLowerCase() == 'medium' && 'md:py-[0.9vw] sm:py-[1.9vw] xs:py-[2.9vw]')
      } md:px-[2vw] sm:px-[2.5vw] xs:px-[3vw] gradient-button md:rounded-[0.6vw] sm:rounded-[1.1vw] xs:rounded-[1.6vw] transition-all duration-300 ${
        hoverOpacity && 'hover:opacity-90'
      } ${hoverShadow && 'gradient-button-shadow'}`}
    >
      <Link to={link}>{text}</Link>
    </button>
  )
}

export default GardientButton
