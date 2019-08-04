import React, { useState } from 'react'

export const PlayerContext = React.createContext();

const PlayerProvider = ({children}) => {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [playlist, setPlaylist] = useState(null);
  const [isPlaying, setPlaying] = useState(true);
  const [isLooping, setLooping] = useState(false);
  const [isShuffle, setShuffle] = useState(false);

  const incrementPlaylist = () => {
    if(!playlist) return;

    if(isShuffle) return randomizeIndex();
    
    if(playlistIndex + 1 == playlist.songs.length) {
      setPlaylistIndex(0);
    }
    else {
      setPlaylistIndex(playlistIndex + 1);
    }
  }

  const decrementPlaylist = () => {
    if(!playlist) return;

    if(playlistIndex - 1 < 0) {
      setPlaylistIndex(playlist.songs.length - 1);
    }
    else {
      setPlaylistIndex(playlistIndex - 1);
    }
  }

  const randomizeIndex = () => {
    if(playlist.songs.length == 1 || playlist.songs.length == 2) return incrementPlaylist();

    let random = playlistIndex;
    while(random == playlistIndex) {
      random = Math.floor(Math.random() * playlist.songs.length);
    }
    console.log("SHUFFLING TO: ", random);
    setPlaylistIndex(random);
  }

  const currentSong = () => {
    return playlist.songs[playlistIndex];
  }

  return (
    <div>
      <PlayerContext.Provider value={{
        playlist, setPlaylist, currentSong,
        playlistIndex, setPlaylistIndex,
        incrementPlaylist, decrementPlaylist,
        isPlaying, togglePlaying: () => setPlaying(!isPlaying),
        isLooping, toggleLooping: () => setLooping(!isLooping),
        isShuffle, toggleShuffle: () => setShuffle(!isShuffle)
      }}>
        {children}
      </PlayerContext.Provider>
    </div>
  )
}

export default PlayerProvider