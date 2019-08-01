import React from 'react'
import MusicListItem from './SongListItem'
const electron = window.require('electron');

const SongList = ({onSelection}) => {
  const musicMap = electron.ipcRenderer.sendSync("getMusicMap");

  
  const displayList = () => {
    return <ul>
    {Object.values(musicMap).map((x, index) => 
      <li onClick={() => onSelection(x)} key={index}><MusicListItem item={x} /></li>
    )}
    </ul>
  }

  return displayList();
}

export default SongList;