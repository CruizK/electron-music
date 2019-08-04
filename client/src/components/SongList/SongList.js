import React, {useContext} from 'react'
import SongListItem from './SongListItem'
import {PlayerContext} from '../../providers/PlayerProvider'
import './SongList.css'
const electron = window.require('electron');

const SongList = ({playlist}) => {
  const { setPlaylistIndex, setPlaylist, isPlaying, togglePlaying} = useContext(PlayerContext)

  const playSong = index => {
    setPlaylist(playlist);
    setPlaylistIndex(index);
    if(!isPlaying) togglePlaying();
  }

  const displayList = () => {
    return <ul>
    {playlist.songs.map((x, index) => 
      <li className="music-list" onClick={() => playSong(index)} key={index}><SongListItem item={x} /></li>
    )}
    </ul>
  }

  return displayList();
}

export default SongList;