// src/contents/Home.js
import React, { useState, useEffect, useRef } from 'react';
import CHOICES from './Choices'; 
import DESCRIPTION from './Description';
import CRISPR from './CRISPR';
import INSTRUCTIONS from './Instructions';
import clickSound from '../sound/click.mp3';
import backgroundSound from '../sound/home.mp3';
import '../styles/App.css';
import { Link } from "react-router-dom";

export default function Homepage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [description, setDescription] = useState(false);
  const [crispr, setCRISPR] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);

  const handleStartGame = () => setGameStarted(true);
  const handleDescription = () => setDescription(true);
  const handleCRISPR = () => setCRISPR(true);
  const handleInstructions = () => setInstructions(true);

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
        console.log('Background music started successfully');
      } catch (error) {
        console.log('Autoplay blocked, will play on user interaction:', error);
        const startMusicOnClick = () => {
          backgroundAudio.play().catch(e => console.log('Still blocked:', e));
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
      audioRef1.current.currentTime = 0;
      audioRef1.current.play().catch(error => {
        console.log('Audio play prevented:', error);
      });
    }
  };

  if (gameStarted) {
    stopBackgroundMusic();
    playClickSound();
    return <CHOICES />;
  } 

  if (description)  {
    stopBackgroundMusic();
    playClickSound();
    return <DESCRIPTION />;
  }
  if (instructions) {
    stopBackgroundMusic();
    playClickSound();
    return <INSTRUCTIONS />;
  }

  if (crispr) {
    stopBackgroundMusic();
    playClickSound();
    return <CRISPR />;
  } 

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3
            style={{
              fontSize: '3rem',
              color: '#ffeb8f',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              cursor: 'pointer'
            }}
            onClick={handleDescription}
          >
            HKU iGEM 2025
          </h3>

          <img
            className="clickme"
            src={require('../images/click.png')}
            data-pin-nopin="true"
            alt="Tap to view description"
          />
        </div>

        <h1
          style={{
            fontSize: '7rem',
            color: '#ffeb8f',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            marginTop: '-40px'
          }}
        >
          CRISPR Quest
        </h1>

        <div className="choices">
          <button className="another" onClick={handleInstructions}>
            How to play
          </button>

          <div>
            <img
              onClick={handleStartGame}
              className="start-button"
              src={require('../images/start.png')}
              data-pin-nopin="true"
              style={{ cursor: 'pointer' }}
              alt="Start game"
            />
          </div>

          <button className="another" onClick={handleCRISPR}>
            What is CRISPR
          </button>
        </div>
      </div>
    </div>
  );
}
