import React, {useState} from 'react'

const Icon = ({Component, color, hoverColor, clickedColor, clickedHoverColor, onClick, className, ...props}) => {
  const [isClicked, setClicked] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const getColor = () => {
    if(isClicked && isHovered && clickedHoverColor) return clickedHoverColor;
    if(isClicked && clickedColor) return clickedColor;
    if(isHovered) return hoverColor;
    return color;
  }

  return (
    <Component
      className={`clickable ${className}`}    
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setClicked(!isClicked);
        onClick();
      }}
      color={getColor()}
      {...props}
    />
  )
}

export default Icon;