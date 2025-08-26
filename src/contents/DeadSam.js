import React, { useState } from 'react';
import '../styles/App.css';
import Homepage from './Home'
import GRNA from './GRNA'

export default function DEAD() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameRetry, setGameRetry] = useState(false);
    
      const handleStartGame = () => {
        setGameStarted(true);
      };

      const handleRetryGame = () => {
        setGameRetry(true);
      }
    
      if (gameStarted) {
        return <Homepage />;
      }

      if (gameRetry) {
        return <GRNA />;
      }

  return (
    <div className='container'>
        <div className='header'>
            SAM IS DEAD
        </div>

        <img 
        className='halo' 
        src={require('../images/halo.png')} 
        alt="Halo"
        data-pin-nopin="true"
      />

        <div className='all2'>
            <button className='another'
            onClick={handleStartGame}>
              Home
            </button>

            <img 
            className='sam-unhappy-img' 
            src={require('../images/sam-unhappy.png')} 
            alt="Happy Sam"
            data-pin-nopin="true"
            />

            <button className='another'
            onClick={handleRetryGame}>
              Retry
            </button>
        </div>
      </div>
);
}
