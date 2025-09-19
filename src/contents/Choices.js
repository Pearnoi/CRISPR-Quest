import React, { useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import clickSound from '../sound/click.mp3';
import '../styles/App.css';

export default function CHOICES() {
  const navigate = useNavigate();
  const audioRef1 = useRef(null);

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

  const handleNavigation = (path) => {
    playClickSound();
    navigate(path);
  };

  return (
    <div className='choice-container'>
        <div className='bigger'><div className='choices2' onClick={() => handleNavigation("/save-sam")}>Save Sam</div></div>
        <div className='bigger'><div className='choices2' onClick={() => handleNavigation("/save-earth")}>Save Earth</div></div>
        <div className='bigger'><div className='choices2' onClick={() => handleNavigation("/save-corn")}>Save Corn</div></div>
        <img 
        className='return' 
        src={require('../images/return.png')} 
        alt="Return"
        data-pin-nopin="true"
        onClick={() => handleNavigation("/")}
      />
    </div>
  );
}