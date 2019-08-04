import React from 'react'
import "./Tooltip.css"

const Tooltip = ({className, isVisible, left, top, children}) => {

  const displayTooltip = () => {
    if(!isVisible) return null;
    return <span className={`${className || ''} tooltip`} 
      style={{left: `${left}px`, top: `${top}px`}}>
        {children}
      </span>
  }

  return displayTooltip();
}

export default Tooltip;
