import React from 'react'
import './ScrollingText.css'

const ScrollingText = ({className, text}) => {
  
  return (
    <div className='scrolling-text-container'>
      <span 
        className={'scrolling-text ' + className}
        >{text}</span>
    </div>

  )
}

export default ScrollingText;