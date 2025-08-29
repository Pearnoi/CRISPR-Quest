import React, { useState } from 'react';
import CHOICES from './Choices'; 
import DESCRIPTION from './Description'
import CRISPR from './CRISPR'
import INSTRUCTIONS from './Instructions'
import '../styles/App.css';

export default function Homepage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [description, setDescription] = useState(false);
  const [crispr, setCRISPR] = useState(false);
  const [instructions, setInstructions] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleDescription = () => {
    setDescription(true);
  };
  
  const handleCRISPR = () => {
    setCRISPR(true);
  };

  const handleInstructions = () => {
    setInstructions(true);
  };

  if (gameStarted) {
    return <CHOICES />;
  }

  if (description) {
    return <DESCRIPTION />;
  }

  if (instructions) {
    return <INSTRUCTIONS />;
  }

    if (crispr) {
    return <CRISPR />;
  }

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3 style={{ fontSize: '3rem', 
            color: '#ffeb8f', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
            cursor: 'pointer' }}
            onClick={handleDescription}>HKU iGEM 2025</h3>

          <img className="clickme"
            src={require('../images/click.png')}
            data-pin-nopin="true"/>
        </div>
        
        <h1 style={{ fontSize: '7rem', 
          color: '#ffeb8f', 
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          marginTop: '-40px' }}>CRISPR Quest</h1>
        
        <div className="choices">
          
          <button className='another'
          onClick={handleInstructions}>
            How to play
          </button>
          
          <div>
            <img onClick={handleStartGame}
            className="start-button"
            src={require('../images/start.png')}
            data-pin-nopin="true"
            style={{ cursor: 'pointer' }} />
          </div>

          <button className="another"
          onClick={handleCRISPR}>
            What is CRISPR
          </button>
        </div>
        
      </div>
    </div>
  );
}
