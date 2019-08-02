import React, { useState } from 'react'

export const PlayerContext = React.createContext();

const PlayerProvider = ({children}) => {
  const [song, setSong] = useState(null);
  const [isPlaying, setPlaying] = useState(false);

  return (
    <div>
      <PlayerContext.Provider value={{
        song, setSong, isPlaying,
        togglePlaying: () => setPlaying(!isPlaying)
      }}>
        {children}
      </PlayerContext.Provider>
    </div>
  )
}

export default PlayerProvider