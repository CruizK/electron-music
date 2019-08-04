import React, { useState, useContext } from 'react'
import Sound from 'react-sound'
import PlayerControls from './PlayerControls'
import {PlayerContext} from '../../providers/PlayerProvider'
import './Player.css'

const Player = () => {
  const { incrementPlaylist, isPlaying, playlist, currentSong, isLooping} = useContext(PlayerContext);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);

  const handleLoad = () => {
    console.log("Loaded");
    setProgress(0);
  }

  const handleSongPlaying = data => {
    setProgress(data.position/1000);
  } 

  const handleSongFinish = () => {
    if(isLooping) {
      return setProgress(0);
    }
    return incrementPlaylist();
    
  }

  const displayPlayer = () => {
    return (
      <div className="player">
        <PlayerControls 
          progress={progress}
          volume={volume}
          setProgress={setProgress}
          setVolume={setVolume}
          song={currentSong()}
        />
      </div>
    )
  }

  return <div>
      <Sound
        url={playlist ? currentSong().path : ''}
        onLoad={handleLoad}
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
        position={progress * 1000}
        volume={volume}
        onPlaying={handleSongPlaying}
        onFinishedPlaying={handleSongFinish}
      />
      {playlist ? displayPlayer() : null}
  </div>
}


export default Player;