import React, { useState, useEffect, useRef } from 'react';
import EARTHTEMPLATE from './EarthTemplate'; 
import '../styles/App.css';
import backgroundSound from '../sound/scissors.mp3';
import { useLocation } from "react-router-dom";

export default function EARTHCUTTING({hearts, time, setHearts, setTime, onDead, onPauseTimer}) {
  const [samStarted, setSamStarted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(backgroundSound);
    audioRef.current.volume = 1; 
    audioRef.current.play().catch(error => {
      console.log('Auto-play was prevented:', error);
    });
    
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setSamStarted(true);
    }, 5000);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      clearTimeout(timer);
    };
  }, []);

  if (samStarted) {
    return <EARTHTEMPLATE hearts={hearts} time={time} setHearts={setHearts} setTime={setTime} onDead={onDead} onPauseTimer={onPauseTimer}/>;
  }

  return (
    <div>
        <div class="dna-container">
            <div class="dna2"> 
                <div class="earthmutated-region2"></div>
            </div>
            <div class="sequence">5'- GACCGGCCTTGACCTGGGCC -3'</div>
        </div>

        <img 
        className='scissors2' 
        src={require('../images/scissors.gif')} 
        alt="Scissors"
        data-pin-nopin="true"
      />
    </div>
  );
}