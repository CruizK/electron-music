import React, { useState } from 'react'
import Player from 'react-sound'

const MusicPlayer = ({url, status}) => {
  const [playStatus, setPlayStatus] = useState(Player.status.STOPPED);
  
}


export default MusicPlayer;