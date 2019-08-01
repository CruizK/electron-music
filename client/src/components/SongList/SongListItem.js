import React from 'react'

const SongListItem = ({item}) => {
  

  const formatDuration = () => {
    let minutes = Math.floor(item.duration/60);
    let seconds = item.duration % 60;
    if(seconds < 10) {
      seconds = '0'+seconds;
    }

    return `${minutes}:${seconds}`
  }

  return (
  <div className="music-item">
    <span className="music-title yt-span">{item.title}</span>
    <span className="music-channel yt-span">{item.channel}</span>
    <span className="music-duration yt-span">{formatDuration()}</span>
  </div>
  )
}

export default SongListItem;