import React, { useState, useRef, useEffect } from 'react';
import SAM from './Sam'; 
import clickSound from '../sound/click.mp3';
import Homepage from './Home';
import '../styles/App.css';

export default function CHOICES() {
  const [samStarted, setSamStarted] = useState(false);
  const audioRef1 = useRef(null);

  useEffect(() => {
      audioRef1.current = new Audio(clickSound);
      audioRef1.current.volume = 1; 
    }, []);
  
    const playClickSound = () => {
      if (audioRef1.current) {
        audioRef1.current.currentTime = 0; // Reset to start
        audioRef1.current.play().catch(error => {
          console.log('Audio play prevented:', error);
        });
      }
    };

  const handleStartSam = () => setSamStarted(true);

  if (samStarted) {
    playClickSound();
    return <SAM />;
  }

  return (
    <div className='choice-container'>
        <div className='bigger'><div className='choices2' onClick={handleStartSam}>Save Sam</div></div>
        <div className='bigger'><div className='choices2'>Save Earth</div></div>
        <div className='bigger'><div className='choices2'>Save Corn</div></div>
    </div>
  );
}
