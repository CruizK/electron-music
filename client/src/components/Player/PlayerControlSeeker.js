import React, {useState, useEffect, useRef, useContext} from 'react'
import {PlayerContext} from '../../providers/PlayerProvider'
import {formatSongDuration} from '../../utils/timeUtils'
import Tooltip from '../Tooltip/Tooltip'
import "./Seeker.css"

let song;
let width;
let offsetLeft;
const PlayerControlSeeker = ({className, progress, setProgress}) => {
  const { isPlaying, currentSong, playlistIndex } = useContext(PlayerContext);
  const [seekProgress, setSeek] = useState(0);
  const [isHovered, setHovered] = useState(false);
  const [offset, setOffset] = useState(0);
  const [animation, setAnimation] = useState(`seeker`)
  const [delay, setDelay] = useState(0);
  const ref = useRef();



  const resetAnimation = () => {
    console.log("RESTTING ANIMATION", isPlaying);
    if(animation == 'seeker') setAnimation('seeker2');
    else setAnimation('seeker');
    setDelay(0);
  }
  
  useEffect(() => {
    if(progress == 0) resetAnimation(); //For looping to reset the bar

    if(ref.current) {
      width = ref.current.offsetWidth;
      offsetLeft = ref.current.offsetLeft;
    }
  })

  useEffect(() => {
    console.log("UPDATES SONG", song, currentSong());
    if(!song)
      song = currentSong();
    else if(song.path != currentSong().path) {
      setProgress(0);
      resetAnimation();
      song = currentSong();
    }
  }, [playlistIndex])

  const handleMouseMove = e => {
    if(!width) return;
    let offsetX = e.nativeEvent.offsetX;
    setSeek(song.duration * (offsetX/width));
    setOffset(e.clientX - offsetLeft);
  }

  const handleMouseEnter = (e) => {
    setOffset(e.clientX - offsetLeft);
    setHovered(true);
  }

  const handleMouseLeave = () => {
    setHovered(false);
  }

  const handleClick = () => {
    resetAnimation();
    setDelay(-seekProgress);
    setProgress(seekProgress);
  }
  
  
  return (
    <span className={`seeker ${className}`} onMouseOver={handleMouseEnter} onClick={handleClick} onMouseOut={handleMouseLeave} onMouseMove={handleMouseMove} ref={ref}>
      <Tooltip isVisible={isHovered} left={offset-12} top={-25}>{formatSongDuration(seekProgress)}</Tooltip>
      
      <span className="seeker-background"></span>
      <span className="seeker-foreground" style={{animation: `${animation} ${currentSong().duration}s linear ${delay}s ${isPlaying ? 'running' : 'paused'}`}}></span>
    </span>
  )
}

//      <span className="seeker-foreground" style={{transform: `scaleX(${(0*(1-(progress/total)) + 100 * (progress/total))/100}`}}></span>
export default PlayerControlSeeker