import React, {useContext} from 'react'
import SongListItem from './SongListItem'
import {PlayerContext} from '../../providers/PlayerProvider'
import './SongList.css'
const electron = window.require('electron');

const SongList = () => {
  const playerContext = useContext(PlayerContext)
  const musicMap = electron.ipcRenderer.sendSync("getMusicMap");

  const playSong = item => {
    playerContext.setSong(item);
    if(!playerContext.isPlaying) playerContext.togglePlaying();
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