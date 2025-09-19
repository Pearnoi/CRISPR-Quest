import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/App.css';
import keyboardSound from '../sound/keyboard.mp3';
import clickSound from '../sound/click.mp3';

export default function CORND() {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(100);
  const audioRef = useRef(null);
  const audioRef1 = useRef(null);

  const fullText = "The sun blazes across the dry fields, and a local farmer watches helplessly as her harvest fails. In maize, the gene ZmARGOSE helps plants tolerate drought by reducing their sensitivity to ethylene, a hormone that limits growth under stress. As a gene scientist, you must use CRISPR-Cas9 to edit the promoter region of ZmARGOS8 to boost its expression. Can you feed the future?";

  useEffect(() => {
    audioRef1.current = new Audio(clickSound);
    audioRef1.current.volume = 1; 
  }, []);

  const playClickSound = () => {
    if (audioRef1.current) {
      audioRef1.current.currentTime = 0;
      audioRef1.current.play().catch(console.error);
    }
  };

  useEffect(() => {
    audioRef.current = new Audio(keyboardSound); 
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
        setSpeed(20);

        if (fullText[currentIndex] !== ' ' && audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(console.error);
        }
      } else if (currentIndex === fullText.length) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, fullText, speed]);

  useEffect(() => {
  return () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    };
    }, []);

  const handleStartGame = () => {
    playClickSound();
    if (audioRef.current) {
      audioRef.current.pause();
    }
    navigate("/corn/grna");
  }

  return (
    <div className='container2'>
      <img 
        className='sam-desc' 
        src={require('../images/unhealthy.png')} 
        alt="Unhealthy Corn"
        data-pin-nopin="true"
      />

      <div className='container3'>
        <div className='text-container'>
          <div className='description2'>
            {displayText}
          </div>
        </div>
        <div className='text-container' style={{ cursor: 'pointer', background: 'red' }}>
          <div className='description' onClick={handleStartGame} style={{ color: 'red' }}>OF COURSE!!!</div>
        </div>
      </div>

      <img 
        className='sickle' 
        src={require('../images/singlecorn.png')} 
        alt="Single Corn"
        data-pin-nopin="true"
      />

      <img 
        className='sickle2' 
        src={require('../images/singlecorn.png')} 
        alt="Single Corn"
        data-pin-nopin="true"
      />
    </div>
  );
}