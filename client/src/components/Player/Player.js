import React, { useState, useContext } from 'react'
import Sound from 'react-sound'
import PlayerControls from './PlayerControls'
import {PlayerContext} from '../../PlayerProvider'
import {formatSongDuration} from '../../utils/timeUtils'
import './Player.css'

const Player = () => {
  const playerContext = useContext(PlayerContext);
  const [progress, setProgress] = useState('0:00');

  const handleSongLoading = () => {

  }

  const handleSongPlaying = data => {
    let duration = Math.ceil(data.position/1000);
    setProgress(formatSongDuration(duration));
  }

  const handleSongFinish = () => {

  }

  const displayPlayer = () => {
    return (
      <div className="player">
        <PlayerControls 
          isPlaying={playerContext.isPlaying}
          togglePlay={playerContext.togglePlaying}
          song={playerContext.song}
          progress={progress}
        />
      </div>
    )
  }

  return playerContext.song ? (<div>
      <Sound
        url={playerContext.song ? playerContext.song.path : ''}
        playStatus={playerContext.isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
        onLoading={handleSongLoading}
        onPlaying={handleSongPlaying}
        onFinishedPlaying={handleSongFinish}
      />
      {displayPlayer()}
  </div>) : null
}


export default Player;