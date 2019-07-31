import React, { useState } from 'react'
import Sound from 'react-sound'
const electron = window.require('electron');



const YTListItem = ({item, progress}) => {
  
  const [downloading, setDownloading] = useState(false);

  const truncator = (str, len) => {
    let i = str.indexOf(' ', len);
    return str.substring(0, i) + "   ...";
  }

  const handleDownload = () => {
    setTimeout(() => {
      setDownloading(true)
    }, 2000)
    electron.ipcRenderer.send('downloadVideo', {url:"https://www.youtube.com/watch?v=" + item.id.videoId, title:item.snippet.title});
  }
  
  return (
    <React.Fragment>
      <img src={item.snippet.thumbnails.high.url} />
      <div className="video-data">
        <span className="video-title">{item.snippet.title}</span>
        <span className="video-channel">{item.snippet.channelTitle}</span>
        <span className="video-description">{truncator(item.snippet.description, 80)}</span>
        {!downloading ? <button className="video-btn" onClick={() => handleDownload()}>Download</button> :
          <span>{`${progress}%`}</span>
        }
      </div>
    </React.Fragment>
  )
}

export default YTListItem;
