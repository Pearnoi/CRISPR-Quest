import React, { useState, useEffect, useRef } from 'react';
import EARTHGRNAEXP from './EarthGRNAExp'; 
import '../styles/App.css';
import backgroundSound from '../sound/scissors.mp3';
import { useLocation } from "react-router-dom";

export default function EARTHCUTTING({hearts, time, setHearts, setTime, onDead, onPauseTimer}) {
  const [samStarted, setSamStarted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
      console.log('CUTTING mounted - pausing timer');
      // Pause timer during the cutting animation (false means timer should NOT run)
      onPauseTimer(false);
      
      audioRef.current = new Audio(backgroundSound);
      audioRef.current.volume = 1; 
      audioRef.current.play().catch(error => {
        console.log('Auto-play was prevented:', error);
      });
      
      const timer = setTimeout(() => {
        console.log('Cutting animation finished, moving to SAMGRNAEXP');
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        // Resume timer before transitioning
        onPauseTimer(true);
        setSamStarted(true);
      }, 5000);
      
      return () => {
        console.log('CUTTING unmounting');
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        clearTimeout(timer);
      };
    }, [onPauseTimer]);

  if (samStarted) {
    return <EARTHGRNAEXP hearts={hearts} time={time} setHearts={setHearts} setTime={setTime} onDead={onDead} onPauseTimer={onPauseTimer}/>;
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