import React, { useState } from 'react'
import {FaPlay} from 'react-icons/fa'

const SongListItem = ({item}) => {
  const [isHovered, setHovered] = useState(false);

  const formatDuration = () => {
    let minutes = Math.floor(item.duration/60);
    let seconds = item.duration % 60;
    if(seconds < 10) {
      seconds = '0'+seconds;
    }

    return `${minutes}:${seconds}`
  }

  return (
  <div className="music-item"
  onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
    <span className="music-play"><FaPlay color={isHovered ? '#ccc' : '#999'} size={16}/></span>
    <span className="music-title">{item.title}</span>
    <span className="music-channel">{item.channel}</span>
    <span className="music-duration">{formatDuration()}</span>
  </div>
  )
}

export default SongListItem;