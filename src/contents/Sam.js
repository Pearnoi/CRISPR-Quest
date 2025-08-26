import React, { useState } from 'react';
import SAMD from './SamD'; 
import '../styles/App.css';

export default function SAM() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleNextLevel = () => {
    setScore(prevScore => prevScore + 1);
  };

  if (gameStarted) {
    return <SAMD onNext={handleNextLevel} setScore={setScore} />;
  }

  return (
    <div className='container'>
        <div className='header'>
            Save Sam
        </div>

        <img 
        className='sam-unhappy-img' 
        src={require('../images/sam-unhappy.png')} 
        alt="Unappy Sam"
        data-pin-nopin="true"
        onClick={handleStartGame}
      />
    </div>
  );
}
