import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/App.css';

export default function EARTH() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/earth/description-earth");
  };

  return (
    <div className='container'>
        <div className='header'>
            Save Earth
        </div>

        <img 
        className='sam-unhappy-img' 
        src={require('../images/plasticbag.png')} 
        alt="Unhealthy Earth"
        data-pin-nopin="true"
        onClick={handleStartGame}
      />
    </div>
  );
}