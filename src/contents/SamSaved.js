import React, { useState } from 'react';
import '../styles/App.css';
import Homepage from './Home'
import { useNavigate } from "react-router-dom";

export default function SAVED({score}) {
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();
  
    const handleStartGame = () => {
      setGameStarted(true);
    };
  
    if (gameStarted) {
      return <Homepage />;
    }

  return (
    <div className='container'>
        <div className='header'>
            SAM IS SAVED
        </div>

        <p className='score'>Score: {score}</p>

        <div className='all'>
          <button className='another'
          onClick={handleStartGame}>
            Home
          </button>

          <img 
          className='sam-unhappy-img' 
          src={require('../images/sam-happy.png')} 
          alt="Happy Sam"
          data-pin-nopin="true"
          style={{ width: '30vw', height: '30vw', minWidth: '180px', minHeight: '180px', maxWidth: '300px', maxHeight: '300px', objectFit: 'contain' }}
          />

          <button
            className='another'
            onClick={() => {
              console.log("Next -> /step4");   // should appear in DevTools console
              navigate("/step4");
            }}
          >
            Next
          </button>
      </div>
    </div>
  );
}
