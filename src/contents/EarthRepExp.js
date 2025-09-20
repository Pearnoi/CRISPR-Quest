import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/App.css';
import EARTHSAVED from './EarthSaved';

export default function EARTHREPEXP({score, onPauseTimer}) {
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
        return <EARTHSAVED score={score}/>;
    }

    return (
        <div className='desc-container'>
            <button className="ex" onClick={handleNextClick}>
            <u>Next</u>
            </button>
            <p>
               <p><strong>Repair Template</strong></p> 
            <strong style={{color: 'green'}}>Correct repair template sequence: 5’-...GGCCCTGGCGTCATCTCTGGCCTGGCCAAG...-3’</strong>
            <br></br>
                <strong style={{color: 'red'}}>Faulty repair template sequence: <br></br>
                i. 5’ -...CTGGCGTCATCTCTGGCCTGG-3’ <br></br>
                ii. 5’-GTCATCTCTGGCCTGGCCAAG-3’ </strong>
            <br></br>
            <br></br>
            <p><strong>Reason</strong></p>
            In this case, we want to add the PaURA3 into the PaCLE1 to increase the efficiency of polyester 
            degradation. Hence, the repair template sequence here is a part of the gene sequence of PaURA3.  
            The ... represents homology arms, which are identical sequences of DNA that flank the "edit" you 
            want to make in your repair template. If you imagine that the repair template is a patch for a tear 
            in a piece of fabric (the cut), the homology arms are the undamaged parts of the fabric around the tear 
            that you use to align and sew the patch perfectly into place. 
            <br></br>
            <br></br>
            In the faulty template sequences, there are missing homology arms. <br></br>
            i. <strong>There is no right homology arm.</strong> The cellular machinery can recognize and bind the left side, but it 
            cannot properly align and stabilize the right side of the insert. This leads to very inefficient repair. <br></br>
            ii. <strong>There are no homology arms at all.</strong> Hence, the cellular machinery has no way to recognize that this piece of 
            DNA belongs at the PaCLE1 cut site. We have no matching sequences to facilitate alignment and repair the cut.
            </p>
        </div>
    )
}