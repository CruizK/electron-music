import React, {useState} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import YTVideoList from './components/YTVideoList/YTVideoList'
import Navigation from './components/Navigation/Navigation'
import SongList from './components/SongList/SongList'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import Player from './components/Player/Player'
import PlayerProvider from './PlayerProvider'
import "./App.css"


function App() {

  return (
    <Router>
      <PlayerProvider>
        <Navigation />
        <div className="container">
          <Route exact path="/" component={SongList}/>
          <Route path="/search" component={YTVideoList} />
          <Route exact path="/player" component={MusicPlayer} />
        </div>
        <Player />
      </PlayerProvider>
    </Router>
  );
}

export default App;
