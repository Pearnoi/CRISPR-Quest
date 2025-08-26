import React, { useState } from 'react';
import '../styles/App.css';
import Homepage from './Home'

export default function SAVED({score}) {
  const [gameStarted, setGameStarted] = useState(false);
  
    const handleStartGame = () => {
      setGameStarted(true);
    };
  
    if (gameStarted) {
      return <Homepage />;
    }

  return (
    <div className='container'>
        <div className='header'>
            SAM IS SAVED
        </div>

        <p className='score'>Score: {score}</p>

        <div className='all'>
          <button className='another'
          onClick={handleStartGame}>
            Home
          </button>

          <img 
          className='sam-unhappy-img' 
          src={require('../images/sam-happy.png')} 
          alt="Happy Sam"
          data-pin-nopin="true"
          />

          <button className='another'>
            Next
          </button>
      </div>
    </div>
  );
}
