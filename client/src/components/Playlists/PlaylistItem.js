import React, { useEffect, useContext, useState } from 'react'
import { PlayerContext } from '../../providers/PlayerProvider'
import Icon from '../Icon/Icon'
import { FiPlay } from 'react-icons/fi'

const PlaylistItem = ({item, index, setShowingSongs}) => {
  const { setPlaylist } = useContext(PlayerContext);
  
  const handleIconClick = e => {
    e.stopPropagation();
    setPlaylist(item)
  }

  return <li className="playlist-list-item" key={index} onClick={() => setShowingSongs(item.name)}>
    <Icon Component={FiPlay} color={'#ccc'} onClick={handleIconClick} hoverColor={'#eee'} size={20}  className="playlist-list-data" />
    <span className="playlist-list-right">
      <span className="playlist-list-data">{item.name}</span>
      <span className="playlist-list-data">{item.subtext}</span>
      <span className="playlist-list-data">{`${item.songs.length} Songs`}</span>
    </span>
  </li>
}

export default PlaylistItem

