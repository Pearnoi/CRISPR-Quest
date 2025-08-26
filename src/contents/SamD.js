import React, { useState } from 'react';
import GRNA from './GRNA'; 
import '../styles/App.css';

export default function SAMD() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleNextLevel = () => {
    setScore(prevScore => prevScore + 1);
  };

  if (gameStarted) {
    return <GRNA onNext={handleNextLevel} setScore={setScore} />;
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
              <div className='description'>
                Sam, a young patient, suffers from sickle cell anemia caused by a single-point 
                mutation in the β-globin (HBB) gene. As a gene scientist, you must correctly use 
                CRISPR-Cas9 to fix this mutation. Are you ready to save Sam?
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
        onClick={handleStartGame}
      />

      <img 
        className='sickle2' 
        src={require('../images/sickle.png')} 
        alt="Sickle Blood Cell"
        data-pin-nopin="true"
        onClick={handleStartGame}
      />

      <img 
        className='sickle3' 
        src={require('../images/sickle.png')} 
        alt="Sickle Blood Cell"
        data-pin-nopin="true"
        onClick={handleStartGame}
      />
    </div>
  );
}
