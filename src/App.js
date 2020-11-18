import React from 'react';

// Styles
import './styles/app.scss'

//Components
import Player from './components/Player';
import Song from './components/Song';

function App() {
  return (
    <div className="App">
      <h1>Music Player</h1>
      <Player />
      <Song />
    </div>
  );
}

export default App;
