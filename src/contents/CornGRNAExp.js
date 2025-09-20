import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/App.css';
import CORNTEMPLATE from './CornTemplate';

export default function CORNGRNAEXP({hearts, time, setHearts, onDead, onPauseTimer, setTime}) {
    const [samStarted, setSamStarted] = useState(false);

    useEffect(() => {
        console.log('SAMGRNAEXP mounted - pausing timer');
        onPauseTimer(false); 
        
        return () => {
            console.log('SAMGRNAEXP unmounting - resuming timer');
            onPauseTimer(true); 
        };
    }, [onPauseTimer]);

    const handleNextClick = () => {
        setSamStarted(true);
    };

    if (samStarted) {
        return <CORNTEMPLATE hearts={hearts} time={time} setHearts={setHearts} onDead={onDead} onPauseTimer={onPauseTimer} setTime={setTime}/>;
      }

    return (
        <div className='desc-container'>
            <button className="ex" onClick={handleNextClick}>
            <u>Next</u>
            </button>
            <h4 style={{fontSize: '2em', textAlign: 'center', marginTop: '20px', color: 'blue'}}>Targeted DNA strand: 5'-GACCGGCCTTGACCTGGGCC-3'</h4> 
            <p>
               <p><strong>Explanation</strong></p> 
                This is the sequence of the PaCLE1 gene by gRNA (decided by experiments). The basidiomycetous yeast, 
                Pseudozyma antarctica, has the ability to express industrially beneficial biodegradable plastic-degrading 
                enzymes, known as polyester degrading enzymes (PaE). We want to increase enzymatic activity by inserting a gene 
                PaURA3 into PaCLE1. 
            <br></br>
            <br></br>
            <p><strong>gRNA</strong></p>
            <strong style={{color: 'green'}}>Correct gRNA sequence: 3'- CTGGCCGGAACTGGACCCGG -5'</strong>
            <br></br>
                <strong style={{color: 'red'}}>Faulty gRNA sequence: <br></br>
                i. 3’-3'- CTGGCCGGAACTG_ACCCGG-5’<br></br>
                ii. 3’-CTGGCC<u>C</u>GAACTGGACCCGG-5’</strong>
            <br></br>
            <br></br>
            <p><strong>Reason</strong></p>
            gRNA should be complementary to the targeted DNA sequence for our molecular scissor (Cas 9 
            protein) to make a cut in the targeted DNA sequence. Basically, it provides a signal that tells 
            Cas9 protein, our molecular scissor, "This is the correct site, proceed with the cut." Correct 
            gRNA sequence is perfectly complementary to the targeted sequence, i.e., Adenine pairs up with Thymine 
            (A-T), and Cytosine pairs up with Guanine (C-G). 
            <br></br>
            <br></br>
            Now, let’s look at the <strong>faulty gRNA sequences</strong>. 
            <br></br>
            <br></br>
            i. <strong style={{color: 'red'}}>3’-3'- CTGGCCGGAACTG_ACCCGG -5'-5’</strong> has a deletion of G in the 7th position (reading from 5’ side), 
            which is known as deletion mutation. Because of this, we are now unable to form complementary pairing with the targeted sequence. 
            <br></br>
            <br></br>
            ii. <strong style={{color: 'red'}}>3'- CTGGCC<u>C</u>GAACTGGACCCGG-5'</strong> has a G to C base substitution in the 14th position (reading 
            from 5’ side). In the targeted DNA seq, this position was G, so it cannot form more complementary pairing. 
            </p>
        </div>
    )
}