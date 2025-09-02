import React, { useState, useEffect, useRef } from 'react';
import '../styles/App.css';
import Homepage from './Home'
import { useNavigate } from "react-router-dom";
import backgroundSound from '../sound/success.mp3';
import clickSound from '../sound/click.mp3';

export default function SAVED({score}) {
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const audioRef1 = useRef(null);

  useEffect(() => {
      audioRef1.current = new Audio(clickSound);
      audioRef1.current.volume = 1; 
    }, []);
  
    const playClickSound = () => {
      if (audioRef1.current) {
        audioRef1.current.currentTime = 0;
        audioRef1.current.play().catch(error => {
          console.log('Audio play prevented:', error);
        });
      }
    };

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
  
  const handleStartGame = () => setGameStarted(true);

  if (gameStarted) {
    if (audioRef.current) {
        audioRef.current.pause();
      }
    playClickSound();
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

          <button
            className='another'
            onClick={() => {
              console.log("Next -> /step4");   // should appear in DevTools console
              navigate("/step4");
            }}
          >
            Next
          </button>
      </div>
    </div>
  );
}
