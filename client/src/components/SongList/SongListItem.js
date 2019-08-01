import React from 'react'

const SongListItem = ({item}) => {
  


  return (
  <div className="music-item">
    <span className="video-title yt-span">{item.snippet.title}</span>
    <span className="video-channel yt-span">{item.snippet.channelTitle}</span>
    <span className="video-description yt-span">{truncator(item.snippet.description, 80)}</span>
    {!downloading ? <button className="video-btn" onClick={() => handleDownload()}>Download</button> :
      <span>{progress[item.id.videoId] || '0%'}</span>
    }
  </div>
  )
}