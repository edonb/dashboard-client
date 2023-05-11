import React, { useState } from 'react';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const nrkRadio = document.getElementById('nrkRadio');
    const playPauseBtn = document.getElementById('playPauseBtn');

    if (isPlaying) {
      nrkRadio.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      nrkRadio.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio id="nrkRadio" preload="auto" src="https://lyd.nrk.no/nrk_radio_p3_mp3_h"></audio>
      <div className="custom-controls">
        <button id="playPauseBtn" className="play-pause-btn" onClick={handlePlayPause}>
          {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
        </button>
      </div>
    </div>
  );
}

export default App;