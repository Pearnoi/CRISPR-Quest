import React, { useState, useEffect } from 'react';
import SAVED from './SamSaved'; 
import Homepage from './Home';
import '../styles/App.css';

export default function CUTTING({score}) {
  const [samStarted, setSamStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSamStarted(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  if (samStarted) {
    return <SAVED score={score}/>;
  }

  return (
    <div>
        <div class="dna-container">
            <div class="dna2"> 
                <div class="mutated-region2"></div>
            </div>
            <div class="sequence">5'- CT(CCT)GAGGAGAAGTCTGCCGTTACTGCC -3'</div>
        </div>

        <img 
        className='scissors' 
        src={require('../images/scissors.gif')} 
        alt="Scissors"
        data-pin-nopin="true"
      />
    </div>
  );
}