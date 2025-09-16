import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/App.css';

export default function CORN() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/corn/description-corn");
  };

  return (
    <div className='container'>
        <div className='header'>
            Save Corn
        </div>

        <img 
        className='sam-unhappy-img' 
        src={require('../images/unhealthy.png')} 
        alt="Unhealthy Corn"
        onClick={handleStartGame}
      />
    </div>
  );
}