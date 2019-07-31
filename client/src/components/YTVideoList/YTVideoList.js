import React, { useEffect, useState } from 'react'
import YTListItem from './YTListItem'
import './YTVideoList.css'
const electron = window.require('electron');

const YTVideoList = () => {
  const [vidData, setVidData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState('')

  useEffect(() => {
    electron.ipcRenderer.on('gotVideos', (event, args) => {
      console.log(args);
      setVidData(args);
    })
  
    electron.ipcRenderer.on('updateDownloadProgress', (event, args) => {
      setProgress(args);
    })
  }, [])


  const handleSubmit = e => {
    e.preventDefault();
    electron.ipcRenderer.send('getVideos', query);
  }

  const displayVideos = () => {
    if(!vidData) return <h1></h1>;

    return (
      <ul>
        {vidData.items.map((x, i) => <li key={i}><YTListItem item={x} progress={progress}/></li>)}
      </ul>
    )
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Song Name..." onChange={e => setQuery(e.target.value)} value={query} />
      </form>
      {displayVideos()}
    </div>
  )
}

export default YTVideoList;