import React, { useState } from 'react';
import SAM from './Sam'; 
import Homepage from './Home';
import '../styles/App.css';

export default function CHOICES() {
  const [samStarted, setSamStarted] = useState(false);

  const handleStartSam = () => {
    setSamStarted(true);
  };

  const handleFirstDivClick = () => {
    handleStartSam();
  }

  if (samStarted) {
    return <SAM />;
  }

  return (
    <div className='choice-container'>
        <div className='bigger'><div className='choices2' onClick={handleFirstDivClick}>Save Sam</div></div>
        <div className='bigger'><div className='choices2'>Save Earth</div></div>
        <div className='bigger'><div className='choices2'>Save Corn</div></div>
    </div>
  );
}
