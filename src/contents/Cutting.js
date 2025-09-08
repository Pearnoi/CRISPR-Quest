import React, { useState, useEffect, useRef } from 'react';
import RepairTemplateChoice from './RepairTemplateChoice'; 
import '../styles/App.css';
import backgroundSound from '../sound/scissors.mp3';

export default function CUTTING({hearts, time, setHearts, onDead, onPauseTimer}) {
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
    return <RepairTemplateChoice hearts={hearts} time={time} setHearts={setHearts} onDead={onDead} onPauseTimer={onPauseTimer}/>;
  }

  return (
    <div>
        <div class="dna-container">
            <div class="dna2"> 
                <div class="mutated-region2"></div>
            </div>
            <div class="sequence">5'- CT(CCT)GAGGAGAAGTCTGCCGTTACTGCC -3'</div>
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