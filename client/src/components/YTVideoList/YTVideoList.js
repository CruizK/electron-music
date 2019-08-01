import React, { useEffect, useState } from 'react'
import YTListItem from './YTListItem'
import './YTVideoList.css'
const electron = window.require('electron');

const YTVideoList = () => {
  const [vidData, setVidData] = useState(null);
  const [query, setQuery] = useState('')
  const [progress, setProgress] = useState({})



  useEffect(() => {
    electron.ipcRenderer.removeAllListeners();
    electron.ipcRenderer.on('gotVideos', (event, args) => {
      console.log(args);
      for(let i = 0; i < args.items.length; i++) {
        let item = args.items[i]
        item.snippet.title = replaceEntities(item.snippet.title);
      }
      setVidData(args);
    })
  
    electron.ipcRenderer.on('updateDownloadProgress', (event, args) => {
      console.log(progress);
      setProgress({...progress, [args.videoId]: args.progress})
    })
  })

  const replaceEntities = (str) => {
    return str.replace(/&amp;/g, '&').replace(/&lt/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
  }

  const handleSubmit = e => {
    e.preventDefault();
    electron.ipcRenderer.send('getVideos', query);
  }

  const displayVideos = () => {
    if(!vidData) return <h1></h1>;

    return (
      <ul className="yt-list">
        {vidData.items.map((x, i) => <li className="yt-list-item" key={i}>
          <YTListItem item={x} progress={progress}/>
        </li>)}
      </ul>
    )
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="video-form">
        <input type="text" placeholder="Song Name..." className="video-search" autoFocus
        onChange={e => setQuery(e.target.value)} value={query} />
      </form>
      {displayVideos()}
    </div>
  )
}

export default YTVideoList;