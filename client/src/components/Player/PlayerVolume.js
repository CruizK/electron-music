import React, { useState, useEffect, useRef } from 'react'
import Tooltip from '../Tooltip/Tooltip'
import './PlayerVolume.css'



const PlayerVolume = ({volume, setVolume, className}) => {
  const [isHovered, setHovered] = useState(false);
  const [volumeSeek, setVolumeSeek] = useState(0);
  const [offset, setOffset] = useState(0);
  const ref = useRef();
  let width;
  let offsetLeft;

  useEffect(() => {
    if(ref.current) {
      width = ref.current.offsetWidth;
      offsetLeft = ref.current.offsetLeft;
    }
  })

  const handleMouseMove = e => {
    if(!width) return;
    let offsetX = e.nativeEvent.offsetX;
    setVolumeSeek(100 * (offsetX/width));
    setOffset(e.clientX - offsetLeft);
  }

  const handleMouseEnter = e => {
    setOffset(e.clientX - offsetLeft);
    setHovered(true);
  }

  const handleMouseLeave = () => {
    setHovered(false);
  }

  const handleClick = () => {
    setVolume(Math.round(volumeSeek));
  }

  return (
    <span className={`player-volume ${className}`} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} ref={ref}>
      <Tooltip isVisible={isHovered} left={offset - 5} top={-30}>{Math.round(volumeSeek)}</Tooltip>
      <span className="player-volume-background"></span>
      <span className="player-volume-foreground" style={{width: `${volume}%`}}></span>
    </span>
  )
}

export default PlayerVolume