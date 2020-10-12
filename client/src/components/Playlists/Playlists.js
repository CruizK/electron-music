import React, { useEffect, useContext, useState } from 'react'
import { PlayerContext } from '../../providers/PlayerProvider'
import PlaylistItem from './PlaylistItem'
import SongList from '../SongList/SongList'
import "./Playlists.css"
const electron = window.require('electron');



const Playlist = () => {
  const playerContext = useContext(PlayerContext)
  const [playlists, setPlaylists] = useState(null);
  const [showSongs, setShowSongs] = useState('');

  useEffect(() => {
    //console.log('setting playlist to ');
    
    setPlaylists(electron.ipcRenderer.sendSync('getPlaylistMap'));
  }, [])

  const displayPlaylists = () => {
    if (!playlists) return <ul></ul>;

    if(showSongs != '') {
      return <SongList playlist={playlists[showSongs]}/>
    }
    return <ul className="playlist-list">
      {Object.values(playlists).map((x, i) => <PlaylistItem item={x} index={i} setShowingSongs={setShowSongs}/>)}
    </ul>
  }

  return displayPlaylists();
}

export default Playlist;