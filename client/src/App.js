import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import YTVideoList from './components/YTVideoList/YTVideoList'
import Navigation from './components/Navigation/Navigation'
import "./App.css"


function App() {
  return (
    <Router>
      <Navigation />
      <div className="container">
        <Route exact path="/" component={YTVideoList} />
        <Route path="/search" component={YTVideoList} />
      </div>
    </Router>
  );
}

export default App;
