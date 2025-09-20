import React, { useState, useEffect, useRef } from 'react';
import SAMGRNAEXP from './SamGRNAExp'; 
import '../styles/App.css';
import backgroundSound from '../sound/scissors.mp3';

export default function CUTTING({hearts, time, setHearts, onDead, onPauseTimer}) {
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
    console.log('Rendering SAMGRNAEXP from CUTTING');
    return <SAMGRNAEXP hearts={hearts} time={time} setHearts={setHearts} onDead={onDead} onPauseTimer={onPauseTimer}/>;
  }

  return (
    <div>
        <div className="dna-container">
            <div className="dna2"> 
                <div className="mutated-region2"></div>
            </div>
            <div className="sequence">5'- GTGGAGAAGTCTGCCGTTAC -3'</div>
        </div>

        <img 
          className='scissors' 
          src={require('../images/scissors.gif')} 
          alt="Scissors"
          data-pin-nopin="true"
        />
    </div>
  );
}