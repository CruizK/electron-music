import React from 'react'
import ScrollingText from '../ScrollingText/ScrollingText'
import {formatSongDuration} from '../../utils/timeUtils'
import Icon from '../Icon/Icon'
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom} from 'react-icons/fa'
import { FiRepeat } from 'react-icons/fi'

const PlayerControls = ({song, progress, isPlaying, togglePlay}) => {


  return (
    <div className="player-controls">
      <div className="player-controls-progress">
        <span className="player-controls-progress-text">{progress}/{formatSongDuration(song.duration)}</span>
      </div>
      <div className="player-controls-navigation">
        

        <div className="player-controls-middle">
          <Icon className="player-controls-shuffle" Component={FaRandom} color="#ccc" hoverColor="#eee" size={32}/>
          <Icon className="player-controls-back" Component={FaStepBackward} color="#ccc" hoverColor="#eee" size={32} />
          {isPlaying ? <Icon className="player-controls-play" Component={FaPause} color="#ccc" hoverColor="#eee" size={32} onClick={() => togglePlay()} /> :
            <Icon className="player-controls-play" Component={FaPlay} color="#ccc" hoverColor="#eee" size={32} onClick={() => togglePlay()} />
          }
          <Icon className="player-controls-forward" Component={FaStepForward} color="#ccc" size={32} />
          <Icon className="player-controls-loop" Component={FiRepeat} color="#ccc" hoverColor="#eee" size={32}/>
        </div>
      </div>
    </div>
  )
}

export default PlayerControls