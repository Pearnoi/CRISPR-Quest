import React, { useState, useEffect, useRef } from 'react';
import GRNA from './GRNA'; 
import '../styles/App.css';
import keyboardSound from '../sound/keyboard.mp3';

export default function SAMD() {
  const [gameStarted, setGameStarted] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(100);
  const audioRef = useRef(null);

  const fullText = " Sam, a young patient, suffers from sickle cell anemia caused by a single-point mutation in the β-globin (HBB) gene. As a gene scientist, you must correctly use CRISPR-Cas9 to fix this mutation. Are you ready to save Sam?";

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
    setGameStarted(true);
  };

  if (gameStarted) {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    return <GRNA />;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
      minHeight: '320px',
      width: '100vw',
      gap: '0',
      position: 'relative',
    }}>
      <div style={{
        flex: '0 0 40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
        <img
          className='sam-desc'
          src={require('../images/sam-unhappy.png')}
          alt="Unhappy Sam"
          data-pin-nopin="true"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '38vw',
            maxHeight: '56vh',
            minWidth: '120px',
            minHeight: '120px',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </div>
      <div style={{
        flex: '0 0 40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
        <div className='text-container' style={{ margin: 0 }}>
          <div className='description2' style={{ minWidth: 'unset', minHeight: 'unset', wordBreak: 'break-word', fontSize: '1.25em', lineHeight: 1.4 }}>
            {displayText}
          </div>
        </div>
        <button className='another' onClick={handleStartGame} style={{ marginTop: '2vh' }}>OF COURSE!!!</button>
      </div>
    </div>
  );
}
