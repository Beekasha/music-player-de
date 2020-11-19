import React, { useState } from 'react';

// Styles
import './styles/app.scss'

//Components
import Player from './components/Player';
import Song from './components/Song';

// Util
import data from './util'

function App() {
  // State
  const [songs, setSongs] = useState(data());
  // grab first song
  const [currentSong, setCurrentSong] = useState(songs[0])
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} />
      
    </div>
  );
}

export default App;
