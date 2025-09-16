import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/App.css';
import keyboardSound from '../sound/keyboard.mp3';
import clickSound from '../sound/click.mp3';

export default function EARTHD() {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(100);
  const audioRef = useRef(null);
  const audioRef1 = useRef(null);

  const fullText = "The basidiomycetous yeast, Pseudozyma antarctica, has the ability to express industrially beneficial biodegradable plastic-degrading enzymes, known as polyester degrading enzymes (PaE). We want to increase enzymatic activity by inserting a gene PaURA3 into PaCLE1. Could you do it?";

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
    navigate("/earth/grna");
  }

  return (
    <div className='container2'>
      <img 
        className='sam-desc' 
        src={require('../images/plasticbag.png')} 
        alt="Unhealthy Earth"
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
        className='sickle4' 
        src={require('../images/bottle.png')} 
        data-pin-nopin="true"
        alt="Single Corn"
      />

      <img 
        className='sickle2' 
        src={require('../images/bottle.png')} 
        data-pin-nopin="true"
        alt="Single Corn"
      />
    </div>
  );
}