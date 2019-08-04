import React, {useContext} from 'react'
import ScrollingText from '../ScrollingText/ScrollingText'
import {formatSongDuration} from '../../utils/timeUtils'
import Icon from '../Icon/Icon'
import { FiRepeat, FiPlay, FiPause, FiSkipBack, FiSkipForward, FiShuffle } from 'react-icons/fi'
import Seeker from './PlayerControlSeeker'
import {PlayerContext} from '../../providers/PlayerProvider'
import PlayerVolume from './PlayerVolume'

const PlayerControls = ({progress, volume, setProgress, setVolume, song}) => {
  const { 
    isPlaying, 
    togglePlaying, 
    toggleLooping, 
    incrementPlaylist, 
    decrementPlaylist,
    toggleShuffle
  } = useContext(PlayerContext)

  return (
    <div className="player-controls">
      <div className="player-controls-progress">
        <span className="player-controls-progress-start">{formatSongDuration(progress)}</span>
        <Seeker className="player-controls-progress-seeker" progress={progress} total={song.duration} setProgress={setProgress}/>
        <span className="player-controls-progress-end">{formatSongDuration(song.duration)}</span>
      </div>
      <div className="player-controls-navigation">
        <ScrollingText className="player-controls-title" text={song.title}/>
        <div className="player-controls-icons">
          <Icon className="player-controls-shuffle" Component={FiShuffle} color="#ccc" hoverColor="#eee" size={32} clickedColor="#eee" onClick={() => toggleShuffle()}/>
          <Icon className="player-controls-back" Component={FiSkipBack} color="#ccc" hoverColor="#eee" size={32} onClick={() => decrementPlaylist()}/>
          {!isPlaying ? <Icon className="player-controls-play" Component={FiPlay} color="#ccc" hoverColor="#eee" size={32} onClick={() => togglePlaying()} /> :
            <Icon className="player-controls-play" Component={FiPause} color="#ccc" hoverColor="#eee" size={32} onClick={() => togglePlaying()} />
          }
          <Icon className="player-controls-forward" Component={FiSkipForward} color="#ccc" size={32} onClick={() => incrementPlaylist()} />
          <Icon className="player-controls-loop" Component={FiRepeat} color="#ccc" hoverColor="#eee" size={32} clickedColor="#eee" onClick={() => toggleLooping()}/>
        </div>
        <PlayerVolume className="player-controls-volume" volume={volume} setVolume={setVolume} />
      </div>
    </div>
  )
}

export default PlayerControls