import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/App.css';
import SAVED from './SamSaved'

export default function SAMREPEXP({score, onPauseTimer}) {
    const [samStarted, setSamStarted] = useState(false);

    useEffect(() => {
        console.log('SAMREPEXP mounted - pausing timer');
        onPauseTimer(false); 
        
        return () => {
            console.log('SAMREPEXP unmounting - KEEPING timer paused');
        };
    }, [onPauseTimer]);

    const handleNextClick = () => {
        setSamStarted(true);
    };

    if (samStarted) {
        return <SAVED score={score}/>;
    }

    return (
        <div className='desc-container'>
            <button className="ex" onClick={handleNextClick}>
            <u>Next</u>
            </button>
            <p>
               <p><strong>Repair Template</strong></p> 
            <strong style={{color: 'green'}}>Correct repair template sequence: 3’ …..CTCCTCTTCAGACGGCAATGCT….- 5’</strong>
            <br></br>
                <strong style={{color: 'red'}}>Faulty repair template sequence: <br></br>
                i. 3’- ...CACCTCTTCAGACGGCAATGCT...- 5’<br></br>
                ii. 3’-...CTCCTCTTAGACGGCAATGCT...5’</strong>
            <br></br>
            <br></br>
            <p><strong>Reason</strong></p>
            In this part, you need to understand how to correct the mutation. We provided the reference sequence, which is the correct, healthy sequence, 
            and mutated sequence that we have seen in the previous part, i.e., 5’- GAGGAGAAGTCTGCCGTTAC -3’. We want to insert the healthy sequence back. 
            So, you need to choose the sequence which is complementary to the reference sequence.
            </p>
        </div>
    )
}