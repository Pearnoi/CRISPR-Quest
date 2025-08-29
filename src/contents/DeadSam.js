import React, { useState, useEffect, useRef } from 'react';
import '../styles/App.css';
import Homepage from './Home'
import GRNA from './GRNA'
import backgroundSound from '../sound/monitor.mp3';

export default function DEAD() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameRetry, setGameRetry] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(backgroundSound);
    audioRef.current.volume = 1; 
    audioRef.current.play().catch(error => {
    console.log('Auto-play was prevented:', error);
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
    
  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleRetryGame = () => {
    setGameRetry(true);
  }

  if (gameStarted) {
    if (audioRef.current) {
        audioRef.current.pause();
      }
    return <Homepage />;
  }

  if (gameRetry) {
    if (audioRef.current) {
        audioRef.current.pause();
      }
    return <GRNA />;
  }

  return (
    <div>
    <div className='topper'></div>
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
    </div>
);
}
