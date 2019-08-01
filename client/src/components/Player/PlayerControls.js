import React from 'react'
import ScrollingText from '../ScrollingText/ScrollingText'
import {formatSongDuration} from '../../utils/timeUtils'
import { FaPlay, FaPause, FaStepForward, FaStepBackward} from 'react-icons/fa'


const PlayerControls = ({song, progress, isPlaying, togglePlay}) => {


  return (
    <div className="player-controls">
      <div className="player-controls-progress">
        <span className="player-controls-progress-text">{progress}/{formatSongDuration(song.duration)}</span>
      </div>
      <div className="player-controls-navigation">
        <ScrollingText className="player-controls-song" text={song.title} maxWidth={50}/>
        <span className="player-controls-back"><FaStepBackward color={'#ccc'} size={32}/></span>
        <span className="player-controls-play" onClick={() => togglePlay()}>
          {isPlaying ? <FaPause color={'#ccc'} size={32}/> : <FaPlay color={'#ccc'} size={32}/>}
        </span>
        <span className="player-controls-forward"><FaStepForward color={'#ccc'} size={32}/></span>
      </div>
    </div>
  )
}

export default PlayerControls