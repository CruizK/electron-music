import React, {useState, useEffect, useRef} from 'react'
import './ScrollingText.css'

const ScrollingText = ({className, text, maxWidth}) => {

  useEffect(() => {

  })

  
  return (
    <div className='scrolling-text-container'>
      <span 
        className={'scrolling-text ' + className}
        >{text}</span>
    </div>

  )
}

export default ScrollingText;