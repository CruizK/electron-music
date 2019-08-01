import React, { useState } from 'react'
import Player from 'react-sound'

const MusicPlayer = ({url}) => {
  const [playStatus, setPlayStatus] = useState(Player.status.PLAYING);
  
  const handleSongLoading = () => {

  }

  const handleSongPlaying = () => {
    
  }

  const handleSongFinish = () => {

  }

  return (
    <Player
      url={url}
      playStatus={playStatus}
      onLoading={handleSongLoading}
      onPlaying={handleSongPlaying}
      onFinishedPlaying={handleSongFinish}
    />
  )
}


export default MusicPlayer;