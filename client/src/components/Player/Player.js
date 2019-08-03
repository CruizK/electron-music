import React, { useState, useContext } from 'react'
import Sound from 'react-sound'
import PlayerControls from './PlayerControls'
import {PlayerContext} from '../../providers/PlayerProvider'
import './Player.css'

const Player = () => {
  const playerContext = useContext(PlayerContext);
  const [progress, setProgress] = useState(0);
  const handleSongLoading = () => {

  }

  const handleSongPlaying = data => {
    setProgress(data.position/1000);
  } 

  const handleSongFinish = () => {

  }

  const displayPlayer = () => {
    return (
      <div className="player">
        <PlayerControls 
          progress={progress}
          setProgress={setProgress}
        />
      </div>
    )
  }

  return <div>
      <Sound
        url={playerContext.song ? playerContext.song.path : ''}
        playStatus={playerContext.isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
        position={progress * 1000}
        onLoading={handleSongLoading}
        onPlaying={handleSongPlaying}
        onFinishedPlaying={handleSongFinish}
      />
      {playerContext.song ? displayPlayer() : null}
  </div>
}


export default Player;