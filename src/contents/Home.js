import React, { useState } from 'react';
import CHOICES from './Choices'; 
import '../styles/App.css';

export default function Homepage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleNextLevel = () => {
    setScore(prevScore => prevScore + 1);
  };

  if (gameStarted) {
    return <CHOICES onNext={handleNextLevel} setScore={setScore} />;
  }

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h3 style={{ fontSize: '3rem', 
          color: '#ffeb8f', 
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>HKU iGEM 2025</h3>
        
        <h1 style={{ fontSize: '7rem', 
          color: '#ffeb8f', 
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          marginTop: '-40px' }}>CRISPR Quest</h1>
        
        <div className="choices">
          
          <button className='another'>
            How to play
          </button>
          
          <div>
            <img onClick={handleStartGame}
            className="start-button"
            src={require('../images/start.png')}
            data-pin-nopin="true"
            style={{ cursor: 'pointer' }} />
          </div>

          <button className="another">
            What is CRISPR
          </button>
        </div>
        
      </div>
    </div>
  );
}
