import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/App.css';
import backgroundSound from '../sound/monitor.mp3';
import clickSound from '../sound/click.mp3';

export default function CORNDEAD() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameRetry, setGameRetry] = useState(false);
  const audioRef = useRef(null);
  const audioRef1 = useRef(null);
  const navigate = useNavigate();

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
    
  const handleStartGame = () => {
    if (audioRef.current) {
        audioRef.current.pause();
      }
    playClickSound();
    setTimeout(() => {
    navigate("/");
  }, 100); 
  };

  const handleRetryGame = () => {
    if (audioRef.current) {
        audioRef.current.pause();
      }
    playClickSound();
    setTimeout(() => {
    navigate("/corn/grna");
  }, 100);
  }

  return (
    <div>
    <div className='topper'></div>
      <div className='container'>
        <div className='header'>
            Earth IS DEAD
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
            src={require('../images/plasticbag.png')} 
            alt="Dead Earth"
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