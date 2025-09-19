import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import clickSound from '../sound/click.mp3';
import backgroundSound from '../sound/home.mp3';
import '../styles/App.css';

export default function Homepage() {
  const navigate = useNavigate();
  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);

  useEffect(() => {
    audioRef1.current = new Audio(clickSound);
    audioRef1.current.volume = 1;

    const backgroundAudio = new Audio(backgroundSound);
    backgroundAudio.volume = 0.5;
    backgroundAudio.loop = true;
    audioRef2.current = backgroundAudio;

    const playMusic = async () => {
      try {
        await backgroundAudio.play();
      } catch (error) {
        const startMusicOnClick = () => {
          backgroundAudio.play().catch(console.error);
          document.removeEventListener('click', startMusicOnClick);
        };
        document.addEventListener('click', startMusicOnClick, { once: true });
      }
    };

    playMusic();

    return () => {
      if (audioRef2.current) {
        audioRef2.current.pause();
        audioRef2.current.currentTime = 0;
      }
    };
  }, []);

  const stopBackgroundMusic = () => {
    if (audioRef2.current) {
      audioRef2.current.pause();
      audioRef2.current.currentTime = 0;
    }
  };

  const playClickSound = () => {
    if (audioRef1.current) {
      audioRef1.current.pause();
      audioRef1.current.currentTime = 0;
      audioRef1.current.play().catch(console.error);
    }
  };

  const handleNavigation = (path) => {
    stopBackgroundMusic();
    playClickSound();
    navigate(path);
  };

  return (
    <div className="homepage-container">
      <img 
        className='mascot' 
        src={require('../images/mascot.png')} 
        data-pin-nopin="true"
        alt="Mascot"
      />
      <div className="homepage-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            className='qr' 
            src={require('../images/ig.png')} 
            data-pin-nopin="true"
            alt="Mascot"
            onClick={() => window.open('https://www.instagram.com/hku.igem/', '_blank')}
          />

          <h3
            style={{
              fontSize: '3rem',
              color: '#ffeb8f',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              cursor: 'pointer'
            }}
            onClick={() => handleNavigation("/description")}
          >
            HKU iGEM 2025
          </h3>
          
          <img
            className="clickme"
            src={require('../images/click.png')}
            alt="Tap to view description"
          />
        </div>

        <h1 style={{ fontSize: '7rem', color: '#ffeb8f', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', marginTop: '-40px' }}>
          CRISPR Quest
        </h1>

        <div className="choices">
          <button className="another" onClick={() => handleNavigation("/instructions")}>
            How to play
          </button>

          <div>
            <img
              onClick={() => handleNavigation("/choices")}
              className="start-button"
              src={require('../images/start.png')}
              style={{ cursor: 'pointer' }}
              alt="Start game"
              data-pin-nopin="true"
            />
          </div>

          <button className="another" onClick={() => handleNavigation("/crispr")}>
            What is CRISPR
          </button>
        </div>
      </div>
    </div>
  );
}