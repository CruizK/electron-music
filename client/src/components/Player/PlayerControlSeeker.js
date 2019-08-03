import React, {useState, useEffect, useRef, useContext} from 'react'
import {PlayerContext} from '../../providers/PlayerProvider'
import {formatSongDuration} from '../../utils/timeUtils'
import "./Seeker.css"

let song;
const PlayerControlSeeker = ({total, className, setProgress}) => {
  const playerContext = useContext(PlayerContext);
  const [seekProgress, setSeek] = useState(0);
  const [isHovered, setHovered] = useState(false);
  const [offset, setOffset] = useState(0);
  const [animation, setAnimation] = useState(`seeker`)
  const [delay, setDelay] = useState(0);
  const ref = useRef();
  let width;
  let offsetLeft;


  const resetAnimation = () => {
    if(animation == 'seeker') setAnimation('seeker2');
    else setAnimation('seeker');
  }
  
  useEffect(() => {
    if(ref.current) {
      width = ref.current.offsetWidth;
      offsetLeft = ref.current.offsetLeft;
    }
    
  })

  useEffect(() => {
    console.log("UPDATES SONG", song);
    if(!song)
      song = playerContext.song;
    if(song != playerContext.song) {
      console.log('setting animation state');
      resetAnimation();
    }
  }, [playerContext.song])

  const handleMouseMove = e => {
    if(!width) return;
    let offsetX = e.nativeEvent.offsetX;
    setSeek(total * (offsetX/width));
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
    <span className={`seeker ${className}`} onMouseEnter={handleMouseEnter} onClick={handleClick} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} ref={ref}>
      {isHovered ? <span className="seeker-tooltip" 
        style={{display: 'block', position: 'absolute', left: `${offset-11}px`}}>
        {formatSongDuration(seekProgress)}
      </span> : null}
      
      <span className="seeker-background"></span>
      <span className="seeker-foreground" style={{animation: `${animation} ${total}s linear ${delay}s`, animationPlayState: playerContext.isPlaying ? 'running' : 'paused' }}></span>
    </span>
  )
}

//      <span className="seeker-foreground" style={{transform: `scaleX(${(0*(1-(progress/total)) + 100 * (progress/total))/100}`}}></span>
export default PlayerControlSeeker