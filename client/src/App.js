import React, {useState} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import YTVideoList from './components/YTVideoList/YTVideoList'
import Navigation from './components/Navigation/Navigation'
import SongList from './components/SongList/SongList'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import "./App.css"


function App() {
  const [songURL, setSongURL] = useState('');

  return (
    <Router>
      <Navigation />
      <div className="container">
        <Route path="/search" component={YTVideoList} />
        <Route exact path="/" render={props => {
          return <SongList {...props} setSong={setSongURL} />
        }}/>
        <Route exact path="/player" component={YTVideoList} />
        <MusicPlayer url={songURL} />
      </div>
    </Router>
  );
}

export default App;
