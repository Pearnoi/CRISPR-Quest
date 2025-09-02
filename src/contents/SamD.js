import React, { useState, useEffect, useRef } from 'react';
import GRNA from './GRNA'; 
import '../styles/App.css';
import keyboardSound from '../sound/keyboard.mp3';
import clickSound from '../sound/click.mp3';

export default function SAMD() {
  const [gameStarted, setGameStarted] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(100);
  const audioRef = useRef(null);
  const audioRef1 = useRef(null);

  const fullText = " Sam, a young patient, suffers from sickle cell anemia caused by a single-point mutation in the β-globin (HBB) gene. As a gene scientist, you must correctly use CRISPR-Cas9 to fix this mutation. Are you ready to save Sam?";

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
          audioRef.current.play().catch(error => {
            console.log("Audio play failed:", error);
          });
        }
      } else if (currentIndex === fullText.length) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, fullText, speed]);

  const handleStartGame = () => {
    playClickSound();
    setGameStarted(true);
  }

  if (gameStarted) {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    return <GRNA />;
  }

  return (
    <div className='container2'>
      <img 
        className='sam-desc' 
        src={require('../images/sam-unhappy.png')} 
        alt="Unhappy Sam"
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
        src={require('../images/sickle.png')} 
        alt="Sickle Blood Cell"
        data-pin-nopin="true"
      />

      <img 
        className='sickle2' 
        src={require('../images/sickle.png')} 
        alt="Sickle Blood Cell"
        data-pin-nopin="true"
      />

      <img 
        className='sickle3' 
        src={require('../images/sickle.png')} 
        alt="Sickle Blood Cell"
        data-pin-nopin="true"
      />
    </div>
  );
}
