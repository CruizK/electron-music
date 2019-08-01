import React from 'react'
import SongListItem from './SongListItem'
import './SongList.css'
const electron = window.require('electron');

const SongList = ({setSong}) => {
  const musicMap = electron.ipcRenderer.sendSync("getMusicMap");

  const playSong = item => {
    setSong("file://" + item.path)
  }

  const displayList = () => {
    return <ul>
    {Object.values(musicMap).map((x, index) => 
      <li className="music-list" onClick={() => playSong(x)} key={index}><SongListItem item={x} /></li>
    )}
    </ul>
  }

  return displayList();
}

export default SongList;