import React, { useState, useEffect } from 'react'
import Sound from 'react-sound'
const electron = window.require('electron');


const YTListItem = ({item, progress}) => {
  
  const [downloading, setDownloading] = useState(false);

  const truncator = (str, len) => {
    let i = str.indexOf(' ', len);
    return str.substring(0, i) + "   ...";
  }

  useEffect(() => {
    setDownloading(false);
  }, [item])
  

  const handleDownload = () => {
    electron.ipcRenderer.send('downloadVideo', item);
    setDownloading(true);
  }

  return (
    <React.Fragment>
      <img src={item.snippet.thumbnails.high.url} />
      <div className="video-data">
        <span className="video-title yt-span">{item.snippet.title}</span>
        <span className="video-channel yt-span">{item.snippet.channelTitle}</span>
        <span className="video-description yt-span">{truncator(item.snippet.description, 80)}</span>
        {!downloading ? <button className="video-btn" onClick={() => handleDownload()}>Download</button> :
          <span>{`Downloading: ${progress[item.id.videoId] || '0%'}`}</span>
        }
      </div>
    </React.Fragment>
  )
}

export default YTListItem;
