import React from 'react'
import ScrollingText from '../ScrollingText/ScrollingText'
import {formatSongDuration} from '../../utils/timeUtils'
import Icon from '../Icon/Icon'
import { FaPlay, FaPause, FaStepForward, FaStepBackward} from 'react-icons/fa'


const PlayerControls = ({song, progress, isPlaying, togglePlay}) => {


  return (
    <div className="player-controls">
      <div className="player-controls-progress">
        <span className="player-controls-progress-text">{progress}/{formatSongDuration(song.duration)}</span>
      </div>
      <div className="player-controls-navigation">
        <ScrollingText className="player-controls-song" text={song.title}/>
        <div className="player-controls-middle">
          <Icon className="player-controls-back" Component={FaStepBackward} color="#ccc" hoverColor="#eee" size={32} />
          {isPlaying ? <Icon className="player-controls-play" Component={FaPause} color="#ccc" hoverColor="#eee" size={32} onClick={() => togglePlay()} /> :
            <Icon className="player-controls-play" Component={FaPlay} color="#ccc" hoverColor="#eee" size={32} onClick={() => togglePlay()} />
          }
          <Icon className="player-controls-forward" Component={FaStepForward} color="#ccc" size={32} />
        </div>
      </div>
    </div>
  )
}

export default PlayerControls