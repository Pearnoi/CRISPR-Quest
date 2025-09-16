import React, { useState, useEffect, useRef } from 'react';
import '../styles/App.css';
import { useNavigate } from "react-router-dom";
import backgroundSound from '../sound/success.mp3';
import clickSound from '../sound/click.mp3';

export default function CORNSAVED({score}) {
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const audioRef1 = useRef(null);
  const [finalScore, setFinalScore] = useState(score);

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
    setFinalScore(score);
  }, []);

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
    if (audioRef.current) {
        audioRef.current.pause();
      }
    playClickSound();
    setTimeout(() => {
    navigate("/"); 
  }, 100); 
  };

  return (
    <div className='container'>
        <div className='header'>
            CORN IS SAVED
        </div>

        <p className='score'>Score: {finalScore}</p>

        <div className='all'>
          <button className='another'
          onClick={handleStartGame}>
            Home
          </button>

          <img 
          className='sam-unhappy-img' 
          src={require('../images/healthy.png')} 
          alt="Happy Sam"
          data-pin-nopin="true"
          />

          <button
            className='another'
            onClick={() => {
              console.log("Next -> /step4");   
              navigate("/choices");
            }}
          >
            Next
          </button>
      </div>
    </div>
  );
}