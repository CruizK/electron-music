import React, { useEffect, useState } from 'react'
import YTListItem from './YTListItem'
import './YTVideoList.css'
const electron = window.require('electron');

const YTVideoList = () => {
  const [vidData, setVidData] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    electron.ipcRenderer.send('getVideos', 'NF No Name');

    electron.ipcRenderer.on('gotVideos', (event, args) => {
      console.log(args);
      setVidData(args);
    })
  
    electron.ipcRenderer.on('updateDownloadProgress', (event, args) => {
      setProgress(args);
    })
  }, [])


  const displayVideos = () => {
    if(!vidData) return <h1>Loading...</h1>;

    return (
      <ul>
        {vidData.items.map((x, i) => <li key={i}><YTListItem item={x} progress={progress}/></li>)}
      </ul>
    )
  }
  return (
    <div>
      {displayVideos()}
    </div>
  )
}

export default YTVideoList;